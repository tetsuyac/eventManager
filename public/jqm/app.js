$(function () {
  "use strict";
  var app = app || {};
  $("#eventlist").on('tap', 'a', function () {
    app.selectedid = this.id;
  });
  $("#index").on('pagebeforeshow', function () {
    $.get('/event', function (data) {
      $("#eventlist").empty();
      for (var index = 0; index < data.length; index++) {
        $("#eventlist").append('<li><a href="#view" id="' + data[index]._id +
          '"><h2>' + data[index].title + '</h2><p>' + data[index].content + '</p></a></li>');
      }
      $("#eventlist").listview('refresh');
    });
  });
  $("#add").on('pagebeforeshow', function () {
    $("#add-title").val('');
    $("#add-content").val('');
  });
  $("#view").on('pagebeforeshow', function () {
    $.get('/event/' + app.selectedid, function (data) {
      $("#view-title").html(data.title);
      $("#view-content").html(data.content);
    });
  });
  $("#edit").on('pagebeforeshow', function () {
    $.get('/event/' + app.selectedid, function (data) {
      $("#edit-title").val(data.title);
      $("#edit-content").val(data.content);
    });
  });
  $("#save-addbtn").on('tap', function () {
    $.post('/event', {
      title:   $("#add-title").val(),
      content: $("#add-content").val()
    }, onSuccess, 'json');
  });
  $("#save-editbtn").on('tap', function () {
    $.ajax({
      type:     'PUT',
      url:      '/event/' + app.selectedid,
      data:     {
        title:   $("#edit-title").val(),
        content: $("#edit-content").val()
      },
      success:  onSuccess,
      dataType: 'json'
    });
  });
  $("#del-btn").on('tap', function () {
    $.ajax({
      type:    'DELETE',
      url:     '/event/' + app.selectedid,
      success: onSuccess
    });
  });
  function onSuccess(data) {
    $("#message").html(data.message);
    $.mobile.changePage('#msg-dialog', {
      transition: 'slidedown',
      role:       'dialog'
    });
  }
}());
