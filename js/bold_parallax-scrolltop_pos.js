$(document)['ready'](function () {
  function _insert_template() {
    var backoffDelay = wrappedWindow['height']();
    var pixelSizeTargetMax = $('#nav')['height']() / 2;
    var zeroSizeMax = backoffDelay / 2;
    var tabPadding = zeroSizeMax - pixelSizeTargetMax;
    $('#nav')['css']({
      top: tabPadding
    });
  }

  function newPos(x, windowHeight, pos, adjuster, inertia) {
    return x + '% ' + -(windowHeight + pos - adjuster) * inertia + 'px';
  }

  function Move() {
    var pos = wrappedWindow['scrollTop']();
    if ($realtime['hasClass']('inview')) {
      $realtime['css']({
        backgroundPosition: newPos(0, windowHeight, pos, 500, 0)
      });
      $gBCRBottom['css']({
        backgroundPosition: newPos(50, windowHeight, pos, 400, 0.2)
      });
    }
    $('#pixels')['html'](pos);
  }
  var wrappedWindow = $(window);
  var $realtime = $('#intro');
  var $gBCRBottom = $('#intro .bg1');
  var windowHeight = wrappedWindow['height']();
  $('#intro')['bind']('inview', function (canCreateDiscussions, isSlidingUp) {
    if (1 == isSlidingUp) {
      $(this)['addClass']('inview');
    } else {
      $(this)['removeClass']('inview');
    }
  });
  _insert_template();
  wrappedWindow['resize'](function () {
    Move();
    _insert_template();
  });
  wrappedWindow['bind']('scroll', function () {
    Move();
  });
});