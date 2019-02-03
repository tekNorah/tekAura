!function ($) {
  var defaults = {
    topSpacing: 0,
    bottomSpacing: 0,
    className: 'is-sticky',
    wrapperClassName: 'sticky-wrapper'
  };
  var wrappedWindow = $(window);
  var $DOCUMENT = $(document);
  /** @type {!Array} */
  var nextIdLookup = [];
  var pixelSizeTargetMax = wrappedWindow['height']();
  /**
   * @return {undefined}
   */
  var cb = function () {
    var iwNorthLat = wrappedWindow['scrollTop']();
    var zeroSizeMax = $DOCUMENT['height']();
    /** @type {number} */
    var mapNorthLat = zeroSizeMax - pixelSizeTargetMax;
    /** @type {number} */
    var duedate = iwNorthLat > mapNorthLat ? mapNorthLat - iwNorthLat : 0;
    /** @type {number} */
    var indexLookupKey = 0;
    for (; indexLookupKey < nextIdLookup['length']; indexLookupKey++) {
      var splitEmailAddressFragments = nextIdLookup[indexLookupKey];
      var resampleValue = splitEmailAddressFragments['stickyWrapper']['offset']()['top'];
      /** @type {number} */
      var timeSubmittedDiff = resampleValue - splitEmailAddressFragments['topSpacing'] - duedate;
      if (timeSubmittedDiff >= iwNorthLat) {
        if (null !== splitEmailAddressFragments['currentTop']) {
          splitEmailAddressFragments['stickyElement']['css']('position', '')['css']('top', '')['removeClass'](splitEmailAddressFragments['className']);
          splitEmailAddressFragments['stickyElement']['parent']()['removeClass'](splitEmailAddressFragments['className']);
          /** @type {null} */
          splitEmailAddressFragments['currentTop'] = null;
        }
      } else {
        /** @type {number} */
        var nextEmailAddress = zeroSizeMax - splitEmailAddressFragments['stickyElement']['outerHeight']() - splitEmailAddressFragments['topSpacing'] - splitEmailAddressFragments['bottomSpacing'] - iwNorthLat - duedate;
        if (0 > nextEmailAddress) {
          nextEmailAddress = nextEmailAddress + splitEmailAddressFragments['topSpacing'];
        } else {
          nextEmailAddress = splitEmailAddressFragments['topSpacing'];
        }
        if (splitEmailAddressFragments['currentTop'] != nextEmailAddress) {
          splitEmailAddressFragments['stickyElement']['css']('position', 'fixed')['css']('top', nextEmailAddress)['addClass'](splitEmailAddressFragments['className']);
          splitEmailAddressFragments['stickyElement']['parent']()['addClass'](splitEmailAddressFragments['className']);
          /** @type {number} */
          splitEmailAddressFragments['currentTop'] = nextEmailAddress;
        }
      }
    }
  };
  /**
   * @return {undefined}
   */
  var selectorText = function () {
    pixelSizeTargetMax = wrappedWindow['height']();
  };
  var result = {
    init: function (callback) {
      var args = $['extend'](defaults, callback);
      return this['each'](function () {
        var stickyElement = $(this);
        stickyId = stickyElement['attr']('id');
        wrapper = $('<div></div>')['attr']('id', stickyId + '-sticky-wrapper')['addClass'](args['wrapperClassName']);
        stickyElement['wrapAll'](wrapper);
        var stickyWrapper = stickyElement['parent']();
        stickyWrapper['css']('height', stickyElement['outerHeight']());
        nextIdLookup['push']({
          topSpacing: args['topSpacing'],
          bottomSpacing: args['bottomSpacing'],
          stickyElement: stickyElement,
          currentTop: null,
          stickyWrapper: stickyWrapper,
          className: args['className']
        });
      });
    },
    update: cb
  };
  if (window['addEventListener']) {
    window['addEventListener']('scroll', cb, false);
    window['addEventListener']('resize', selectorText, false);
  } else {
    if (window['attachEvent']) {
      window['attachEvent']('onscroll', cb);
      window['attachEvent']('onresize', selectorText);
    }
  }
  /**
   * @param {string} ids
   * @return {?}
   */
  $['fn']['sticky'] = function (ids) {
    return result[ids] ? result[ids]['apply'](this, Array['prototype']['slice']['call'](arguments, 1)) : 'object' != typeof ids && ids ? ($['error']('Method ' + ids + ' does not exist on jQuery.sticky'), void 0) : result['init']['apply'](this, arguments);
  };
  $(function () {
    setTimeout(cb, 0);
  });
}(jQuery);
jQuery(document).ready(function () {
  jQuery("nav").sticky({
    topSpacing: 0
  });
});