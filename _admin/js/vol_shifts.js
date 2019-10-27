function gotShifts(jqXHR) {
  if(jqXHR.status !== 200) {
    return;
  }
  var table = $('#shiftTable');
  var data = jqXHR.responseJSON;
  var participants = {};
  for(var i = 0; i < data.length; i++) {
    if(data[i].participant !== undefined) {
      if(participants[data[i].participant] === undefined) {
        participants[data[i].participant] = 1;
      }
      else {
        participants[data[i].participant]++;
      }
    }
  }
  var min = $('#minShifts').val()*1;
  var max = $('#maxShifts').val()*1;
  if(max === 0) {
    max = 9999;
  }
  table.find(':nth-child(2)').remove();
  for(var uid in participants) {
    console.log(participants[uid]);
    if(participants[uid] > min && participants[uid] < max) {
      table.append('<tr><td>'+uid+'</td><td>'+participants[uid]+'</td></tr>');
    }
  }
}

function minShiftsChanged(e) {
  rolesChanged(e);
}

function maxShiftsChanged(e) {
  rolesChanged(e);
}

function rolesChanged(e) {
  var selectedRoles = $('#roles').select2('data');
  var filter = '$filter=';
  for(var i = 0; i < selectedRoles.length; i++) {
    filter+='roleID eq '+selectedRoles[i].id;
    if(i < selectedRoles.length-1) {
      filter+=' or ';
    }
  }
  $.ajax({
    url: '../api/v1/events/'+$('#event').val()+'/shifts?'+filter,
    complete: gotShifts
  });
}

function gotRoles(jqXHR) {
  if(jqXHR.status !== 200) {
    return;
  }
  var data = jqXHR.responseJSON;
  for(var i = 0; i < data.length; i++) {
    var newOption = new Option(data[i].display_name, data[i].short_name, true, true);
    $('#roles').append(newOption);
  }
  $('#roles').trigger('change');
}

function departmentSelected(e) {
  var value = e.target.value;
  $.ajax({
    url: '../api/v1/departments/'+value+'/roles',
    complete: gotRoles
  });
}

function initPage() {
  $('#event').select2({
    ajax: {
      url: '../api/v1/events',
      processResults: function(data) {
        var res = [];
        data.sort((a,b) => {
          return a.name.localeCompare(b.name);
        });
        for(var i = 0; i < data.length; i++) {
          res.push({id: data[i]['_id']['$oid'], text: data[i].name});
        }
        return {results: res};
      }
    }
  });
  $('#department').select2({
    ajax: {
      url: '../api/v1/departments',
      processResults: function(data) {
        var res = [];
        data.sort((a,b) => {
          return a.departmentName.localeCompare(b.departmentName);
        });
        for(var i = 0; i < data.length; i++) {
          if(data[i].isAdmin) {
            res.push({id: data[i].departmentID, text: data[i].departmentName});
          }
        }
        return {results: res};
      }
    }
  });
  $('#roles').select2();
  $('#department').change(departmentSelected);
  $('#roles').change(rolesChanged);
  $('#minShifts').change(minShiftsChanged);
  $('#maxShifts').change(maxShiftsChanged);
}

$(initPage);