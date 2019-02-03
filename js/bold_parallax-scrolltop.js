(function ($) {
  /**
   * @return {?}
   */
  function parseInt() {
    var result = window['innerHeight'];
    var el = document['compatMode'];
    if (el || !$['support']['boxModel']) {
      result = el == 'CSS1Compat' ? document['documentElement']['clientHeight'] : document['body']['clientHeight'];
    }
    return result;
  }
  $(window)['scroll'](function () {
    var line_height = parseInt();
    var py = document['documentElement']['scrollTop'] ? document['documentElement']['scrollTop'] : document['body']['scrollTop'];
    /** @type {!Array} */
    var delete_behavior_form = [];
    $['each']($['cache'], function () {
      if (this['events'] && this['events']['inview']) {
        delete_behavior_form['push'](this['handle']['elem']);
      }
    });
    if (delete_behavior_form['length']) {
      $(delete_behavior_form)['each'](function () {
        var $realtime = $(this);
        var y = $realtime['offset']()['top'];
        var h = $realtime['height']();
        var _0x918dxa = $realtime['data']('inview') || false;
        if (py > y + h || py + line_height < y) {
          if (_0x918dxa) {
            $realtime['data']('inview', false);
            $realtime['trigger']('inview', [false]);
          }
        } else {
          if (py < y + h) {
            if (!_0x918dxa) {
              $realtime['data']('inview', true);
              $realtime['trigger']('inview', [true]);
            }
          }
        }
      });
    }
  });
  $(function () {
    $(window)['scroll']();
  });
})(jQuery);