function signupDone(jqXHR) {
  if(jqXHR.status !== 200) {
    console.log(jqXHR);
    alert('Unable to sign up for shift');
    return;
  }
  alert('Success!');
  window.history.back();
}

function abandon() {
  var shiftID = getParameterByName('shiftID'); 
  $.ajax({
    url: 'api/v1/shifts/'+shiftID+'/Actions/Abandon',
    method: 'POST',
    complete: signupDone
  });
}

function signup() {
  var shiftID = $('#shiftID').val();
  $.ajax({
    url: 'api/v1/shifts/'+shiftID+'/Actions/Signup',
    method: 'POST',
    complete: signupDone
  });
}

function revealPage() {
  $('#signupContent').removeClass('d-none');
}
