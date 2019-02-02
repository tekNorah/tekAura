$(document).ready(function () {
  $('#top-comment .widget2').hide();
  $('#top-comment .widget2:first').show();
  $('.top-comment-widget-menu ul dl:first').addClass('selected');
  $('.top-comment-widget-menu ul dl').click(function () {
    $('.top-comment-widget-menu ul dl').removeClass('selected');
    $(this).addClass('selected');
    $('#top-comment .widget2').hide();
    $('#top-comment .widget2').eq($('.top-comment-widget-menu ul dl').index(this)).slideDown(300);
  });
});