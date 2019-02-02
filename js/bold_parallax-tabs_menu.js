!function ($) {
  'use strict';
  var filter = function (value, options) {
    var acc = this;
    acc['element'] = value;
    acc['$element'] = $(value);
    acc['tabs'] = acc['$element']['children']();
    acc['options'] = $['extend']({}, $['fn']['mtabs']['defaults'], options);
    acc['current_tab'] = 0;
    acc['init']();
  };
  filter['prototype'] = {
    init: function () {
      var _0x9667x1 = this;
      if (_0x9667x1['tabs']['length']) {
        _0x9667x1['build']();
        _0x9667x1['buildTabMenu']();
      }
    },
    build: function () {
      var _0x9667x2 = this;
      var $set = _0x9667x2['options'];
      var transformElem = $set['tab_text_el'];
      var _0x9667x5 = $set['container_class'];
      _0x9667x2['tab_names'] = [];
      _0x9667x2['$wrapper'] = _0x9667x2['$element']['wrapInner']('<div class="' + _0x9667x5 + '" />')['find']('.' + _0x9667x5);
      _0x9667x2['tabs']['wrapAll']('<div class="' + $set['tabs_container_class'] + '" />');
      _0x9667x2['tabs']['each'](function (canCreateDiscussions, text) {
        var GET_AUTH_URL_TIMEOUT;
        var list = $(text);
        var data = transformElem;
        GET_AUTH_URL_TIMEOUT = list['find'](data)['filter'](':first')['hide']()['text']();
        _0x9667x2['tab_names']['push'](GET_AUTH_URL_TIMEOUT);
      });
      if ($['isFunction']($set['onReady'])) {
        $set['onReady']['call'](_0x9667x2['element']);
      }
    },
    buildTabMenu: function () {
      var artistTrack;
      var _this = this;
      var node = _this['options'];
      var tempZone = node['tabsmenu_el'];
      var storage = _this['tab_names'];
      var html = '<' + tempZone + ' class="' + node['tabsmenu_class'] + '">';
      var type = 0;
      var provList = storage['length'];
      var cb = function () {
        var loadedModules = arguments;
        return node['tmpl']['tabsmenu_tab']['replace'](/\{[0-9]\}/g, function (att) {
          var id = Number(att['replace'](/\D/g, ''));
          return loadedModules[id] || '';
        });
      };
      for (; provList > type; type++) {
        html = html + cb(type + 1, storage[type]);
      }
      html = html + ('</' + tempZone + '>');
      _this['$tabs_menu'] = $(html)['prependTo'](_this.$wrapper);
      artistTrack = _this['$tabs_menu']['find'](':first')[0]['nodeName']['toLowerCase']();
      _this['$tabs_menu']['on']('click', artistTrack, function (canCreateDiscussions) {
        var question = $(this);
        var templatePathFrom = question['index']();
        _this['show'](templatePathFrom);
        canCreateDiscussions['preventDefault']();
      })['find'](':first')['trigger']('click');
    },
    show: function (value) {
      var recording = this;
      var $set = recording['options'];
      var transformElem = $set['active_tab_class'];
      recording['tabs']['hide']()['filter'](':eq(' + value + ')')['show']();
      recording['$tabs_menu']['children']()['removeClass'](transformElem)['filter'](':eq(' + value + ')')['addClass'](transformElem);
      if ($['isFunction']($set['onTabSelect']) && value !== recording['current_tab']) {
        $set['onTabSelect']['call'](recording['element'], value);
      }
      recording['current_tab'] = value;
    },
    destroy: function () {
      var _0x9667x1 = this;
      var _0x9667x2 = _0x9667x1['options']['tab_text_el'];
      _0x9667x1['$tabs_menu']['remove']();
      _0x9667x1['tabs']['unwrap']()['unwrap']();
      _0x9667x1['tabs']['removeAttr']('style');
      _0x9667x1['tabs']['children'](_0x9667x2 + ':first')['removeAttr']('style');
      _0x9667x1['$element']['removeData']('mtabs');
    }
  };
  $['fn']['mtabs'] = function (trait, person) {
    return this['each'](function () {
      var d3_svg_brushX;
      var relativeUrlImg = $(this);
      var bonusTraitModifiers = relativeUrlImg['data']('mtabs');
      d3_svg_brushX = 'object' == typeof trait && trait;
      if (!bonusTraitModifiers) {
        relativeUrlImg['data']('mtabs', bonusTraitModifiers = new filter(this, d3_svg_brushX));
      }
      if ('string' == typeof trait) {
        bonusTraitModifiers[trait](person);
      }
    });
  };
  $['fn']['mtabs']['defaults'] = {
    container_class: 'tabs',
    tabs_container_class: 'tabs-content',
    active_tab_class: 'active-tab',
    tab_text_el: 'h1, h2, h3, h4, h5, h6',
    tabsmenu_class: 'tabs-menu',
    tabsmenu_el: 'ul',
    tmpl: {
      tabsmenu_tab: '<li class="tab-{0}"><span>{1}</span></li>'
    },
    onTabSelect: null
  };
}(window['jQuery'], window, document);