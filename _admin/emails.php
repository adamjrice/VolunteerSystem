<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
require_once('class.VolunteerAdminPage.php');
$page = new VolunteerAdminPage('Volunteer System Admin');

$page->addJS('//cdn.ckeditor.com/4.7.0/full/ckeditor.js', false);
$page->addJS('//cdn.ckeditor.com/4.7.0/full/adapters/jquery.js', false);

    $page->body .= '
<div class="row">
  <div class="col-lg-12">
    <select id="emailTextName" name="emailTextName" class="form-control" onchange="emailTextChanged()">
      <option value="shiftCanceledSource" selected>Shift Canceled Email</option>
      <option value="shiftChangedSource">Shift Changed Email</option>
      <option value="shiftEmptiedSource">Shift Emptied Email</option>
    </select>
  </div>
</div>
<div class="row">
  <textarea id="emailSource" style="width: 100%"></textarea>
</div>
<div class="row">
  <button onclick="save()">Save</button>
</div>
<div class="row">
    {$firstName}       => The shift holder\'s First Name<br/>
    {$lastName}        => The shift holder\'s Last Name<br/>
    {$paperName}       => The shift holder\'s Name as it is shown on a schedule<br/>
    {$webName}         => The short holder\'s Name as it is shown on the website<br/>
    {$department}      => The department name of the shift<br/>
    {$role}            => The role name of the shift<br/>
    {$event}           => The event name of the shift<br/>
    {$start}           => The start time<br/>
    {$end}             => The end time<br/>
</div>
';

$page->printPage();
// vim: set tabstop=4 shiftwidth=4 expandtab: