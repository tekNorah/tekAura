function checkjQueryLoad() {
  if (window.jQuery) {
    window.selectnav = function () {
      return function (p, methodOrOptions) {
        var element;
        /**
         * @param {!Object} e
         * @return {undefined}
         */
        var handleIntent = function (e) {
          var t;
          if (!e) {
            e = window.event;
          }
          if (e.target) {
            t = e.target;
          } else {
            if (e.srcElement) {
              t = e.srcElement;
            }
          }
          if (3 === t.nodeType) {
            t = t.parentNode;
          }
          if (t.value) {
            window.location.href = t.value;
          }
        };
        /**
         * @param {!Object} nodeName
         * @return {?}
         */
        var islist = function (nodeName) {
          nodeName = nodeName.nodeName.toLowerCase();
          return "ul" === nodeName || "ol" === nodeName;
        };
        /**
         * @param {string} nextId
         * @return {?}
         */
        var id = function (nextId) {
          /** @type {number} */
          var j = 1;
          for (; document.getElementById("selectnav" + j); j++) {}
          return nextId ? "selectnav" + j : "selectnav" + (j - 1);
        };
        /**
         * @param {!Object} list
         * @return {?}
         */
        var parselist = function (list) {
          item++;
          var inputsSize = list.children.length;
          /** @type {string} */
          var html = "";
          /** @type {string} */
          var pix_color = "";
          /** @type {number} */
          var i = item - 1;
          if (inputsSize) {
            if (i) {
              for (; i--;) {
                /** @type {string} */
                pix_color = pix_color + pix_base;
              }
              /** @type {string} */
              pix_color = pix_color + " ";
            }
            /** @type {number} */
            i = 0;
            for (; i < inputsSize; i++) {
              var element = list.children[i].children[0];
              if ("undefined" !== typeof element) {
                var h = element.innerText || element.textContent;
                /** @type {string} */
                var type = "";
                if (classnameRE) {
                  /** @type {string} */
                  type = -1 !== element.className.search(classnameRE) || -1 !== element.parentElement.className.search(classnameRE) ? _aFilterData : "";
                }
                if (url && !type) {
                  /** @type {string} */
                  type = element.href === document.URL ? _aFilterData : "";
                }
                /** @type {string} */
                html = html + ('<option value="' + element.href + '" ' + type + ">" + pix_color + h + "</option>");
                if (enable && (element = list.children[i].children[1]) && islist(element)) {
                  /** @type {string} */
                  html = html + parselist(element);
                }
              }
            }
            if (1 === item && o) {
              /** @type {string} */
              html = '<option value="">' + o + "</option>" + html;
            }
            if (1 === item) {
              /** @type {string} */
              html = '<select class="selectnav" id="' + id(true) + '">' + html + "</select>";
            }
            item--;
            return html;
          }
        };
        if ((element = document.getElementById(p)) && islist(element)) {
          document.documentElement.className += " js";
          var options = methodOrOptions || {};
          var classnameRE = options.activeclass || "active1";
          /** @type {boolean} */
          var url = "boolean" === typeof options.autoselect ? options.autoselect : true;
          /** @type {boolean} */
          var enable = "boolean" === typeof options.nested ? options.nested : true;
          var pix_base = options.indent || "\u2192";
          var o = options.label || "- Navigation -";
          /** @type {number} */
          var item = 0;
          /** @type {string} */
          var _aFilterData = " selected ";
          element.insertAdjacentHTML("afterend", parselist(element));
          /** @type {(Element|null)} */
          element = document.getElementById(id());
          if (element.addEventListener) {
            element.addEventListener("change", handleIntent);
          }
          if (element.attachEvent) {
            element.attachEvent("onchange", handleIntent);
          }
        }
      };
    }();
    jQuery;
    $(document)
      .ready(function () {
        selectnav("navigation", {
          label: "Select Here ",
          nested: true,
          autoselect: false,
          indent: "-"
        });
      });
    $(document)
      .ready(function () {
        /** @type {number} */
        var eWidth = document.body.clientWidth;
        $(document)
          .ready(function () {
            $(".nav li a")
              .each(function () {
                if ($(this)
                  .next()
                  .length > 0) {
                  $(this)
                    .addClass("parent");
                }
              });
            $(".toggleMenu")
              .click(function (event) {
                event.preventDefault();
                $(this)
                  .toggleClass("active");
                $(".nav")
                  .toggle();
              });
            link();
          });
        $(window)
          .bind("resize orientationchange", function () {
            /** @type {number} */
            eWidth = document.body.clientWidth;
            link();
          });
        /**
         * @return {undefined}
         */
        var link = function () {
          if (eWidth < 768) {
            $(".toggleMenu")
              .css("display", "inline-block");
            if (!$(".toggleMenu")
              .hasClass("active")) {
              $(".nav")
                .hide();
            } else {
              $(".nav")
                .show();
            }
            $(".nav li")
              .unbind("mouseenter mouseleave");
            $(".nav li a.parent")
              .unbind("click")
              .bind("click", function (event) {
                event.preventDefault();
                $(this)
                  .parent("li")
                  .toggleClass("hover");
              });
          } else {
            if (eWidth >= 768) {
              $(".toggleMenu")
                .css("display", "none");
              $(".nav")
                .show();
              $(".nav li")
                .removeClass("hover");
              $(".nav li a")
                .unbind("click");
              $(".nav li")
                .unbind("mouseenter mouseleave")
                .bind("mouseenter mouseleave", function () {
                  $(this)
                    .toggleClass("hover");
                });
            }
          }
        };
      });
    $("#back-top")
      .click(function () {
        $(".st-content")
          .animate({
            scrollTop: 0
          }, "slow");
        $("html, body")
          .animate({
            scrollTop: 0
          }, "slow");
        return false;
      });
    $(document)
      .ready(function () {
        $("#top-comment .widget2")
          .hide();
        $("#top-comment .widget2:first")
          .show();
        $(".top-comment-widget-menu ul dl:first")
          .addClass("selected");
        $(".top-comment-widget-menu ul dl")
          .click(function () {
            $(".top-comment-widget-menu ul dl")
              .removeClass("selected");
            $(this)
              .addClass("selected");
            $("#top-comment .widget2")
              .hide();
            $("#top-comment .widget2")
              .eq($(".top-comment-widget-menu ul dl")
                .index(this))
              .slideDown(300);
          });
      });
    (function ($) {
      var relevance_tab = $("a.newer-link");
      var $linkElem = $("a.older-link");
      $.get(relevance_tab.attr("href"), function (mei) {
        relevance_tab.html("<strong>Next</strong><span>" + $(mei)
          .find(".post h1.post-title")
          .text() + "</span>");
      }, "html");
      $.get($linkElem.attr("href"), function (mei) {
        $linkElem.html("<strong>Previous</strong><span>" + $(mei)
          .find(".post h1.post-title")
          .text() + "</span>");
      }, "html");
    })(jQuery);
    $(document)
      .ready(function () {
        $(".searchIcon")
          .on("click", function () {
            $(".searchPopup")
              .addClass("show")
              .find('input[type="text"]')
              .focus();
          });
        $(".closeBtn")
          .on("click", function () {
            $(this)
              .closest(".searchPopup")
              .removeClass("show");
          });
      });
    /** @type {!Array} */
    var keys = ["jQuery", "use strict", "init", "current_tab", "options", "tabs", "$element", "element", "children", "defaults", "mtabs", "fn", "extend", "prototype", "length", "buildTabMenu", "build", "tab_text_el", "container_class", "onReady", "isFunction", "push", "tab_names", "text", "hide", ":first", "filter", "find", "each", '<div class="', "tabs_container_class", '" />', "wrapAll", "$wrapper", ".", "wrapInner", "call", "tabsmenu_el", "<", ' class="', "tabsmenu_class", '">', "", "replace",
      "tabsmenu_tab", "tmpl", "click", "trigger", "index", "preventDefault", "show", "on", "$tabs_menu", "</", ">", "prependTo", "toLowerCase", "nodeName", "active_tab_class", "onTabSelect", "addClass", ":eq(", ")", "removeClass", "removeData", "style", "removeAttr", "unwrap", "remove", "data", "object", "string", "tabs-content", "active-tab", "h1, h2, h3, h4, h5, h6", "tabs-menu", "ul", '<li class="tab-{0}"><span>{1}</span></li>'
    ];
    ! function (filter) {
      keys[1];
      /**
       * @param {?} pkg
       * @param {?} opts
       * @return {undefined}
       */
      var parser = function (pkg, opts) {
        var obj = this;
        obj[keys[7]] = pkg;
        obj[keys[6]] = filter(pkg);
        obj[keys[5]] = obj[keys[6]][keys[8]]();
        obj[keys[4]] = filter[keys[12]]({}, filter[keys[11]][keys[10]][keys[9]], opts);
        /** @type {number} */
        obj[keys[3]] = 0;
        obj[keys[2]]();
      };
      parser[keys[13]] = {
        init: function () {
          var state = this;
          if (state[keys[5]][keys[14]]) {
            state[keys[16]]();
            state[keys[15]]();
          }
        },
        build: function () {
          var json = this;
          var data = json[keys[4]];
          var pkValue = data[keys[17]];
          var _ = data[keys[18]];
          /** @type {!Array} */
          json[keys[22]] = [];
          json[keys[33]] = json[keys[6]][keys[35]](keys[29] + _ + keys[31])[keys[27]](keys[34] + _);
          json[keys[5]][keys[32]](keys[29] + data[keys[30]] + keys[31]);
          json[keys[5]][keys[28]](function (canCreateDiscussions, html) {
            var GET_AUTH_URL_TIMEOUT;
            var res = filter(html);
            var approxRes = pkValue;
            GET_AUTH_URL_TIMEOUT = res[keys[27]](approxRes)[keys[26]](keys[25])[keys[24]]()[keys[23]]();
            json[keys[22]][keys[21]](GET_AUTH_URL_TIMEOUT);
          });
          if (filter[keys[20]](data[keys[19]])) {
            data[keys[19]][keys[36]](json[keys[7]]);
          }
        },
        buildTabMenu: function () {
          var GET_AUTH_URL_TIMEOUT;
          var data = this;
          var list = data[keys[4]];
          var _ = list[keys[37]];
          var result = data[keys[22]];
          var html = keys[38] + _ + keys[39] + list[keys[40]] + keys[41];
          /** @type {number} */
          var i = 0;
          var $ = result[keys[14]];
          /**
           * @return {?}
           */
          var process = function () {
            /** @type {!Arguments} */
            var names = arguments;
            return list[keys[45]][keys[44]][keys[43]](/\{[0-9]\}/g, function (filter) {
              /** @type {number} */
              var i = Number(filter[keys[43]](/\D/g, keys[42]));
              return names[i] || keys[42];
            });
          };
          for (; $ > i; i++) {
            html = html + process(i + 1, result[i]);
          }
          html = html + (keys[53] + _ + keys[54]);
          data[keys[52]] = filter(html)[keys[55]](data.$wrapper);
          GET_AUTH_URL_TIMEOUT = data[keys[52]][keys[27]](keys[25])[0][keys[57]][keys[56]]();
          data[keys[52]][keys[51]](keys[46], GET_AUTH_URL_TIMEOUT, function (resolvedObject) {
            var refs = filter(this);
            var parameter = refs[keys[48]]();
            data[keys[50]](parameter);
            resolvedObject[keys[49]]();
          })[keys[27]](keys[25])[keys[47]](keys[46]);
        },
        show: function (_) {
          var row = this;
          var options = row[keys[4]];
          var singleFrameIndex = options[keys[58]];
          row[keys[5]][keys[24]]()[keys[26]](keys[61] + _ + keys[62])[keys[50]]();
          row[keys[52]][keys[8]]()[keys[63]](singleFrameIndex)[keys[26]](keys[61] + _ + keys[62])[keys[60]](singleFrameIndex);
          if (filter[keys[20]](options[keys[59]]) && _ !== row[keys[3]]) {
            options[keys[59]][keys[36]](row[keys[7]], _);
          }
          row[keys[3]] = _;
        },
        destroy: function () {
          var state = this;
          var uid = state[keys[4]][keys[17]];
          state[keys[52]][keys[68]]();
          state[keys[5]][keys[67]]()[keys[67]]();
          state[keys[5]][keys[66]](keys[65]);
          state[keys[5]][keys[8]](uid + keys[25])[keys[66]](keys[65]);
          state[keys[6]][keys[64]](keys[10]);
        }
      };
      /**
       * @param {number} trait
       * @param {?} person
       * @return {?}
       */
      filter[keys[11]][keys[10]] = function (trait, person) {
        return this[keys[28]](function () {
          var offset;
          var map = filter(this);
          var bonusTraitModifiers = map[keys[69]](keys[10]);
          offset = keys[70] == typeof trait && trait;
          if (!bonusTraitModifiers) {
            map[keys[69]](keys[10], bonusTraitModifiers = new parser(this, offset));
          }
          if (keys[71] == typeof trait) {
            bonusTraitModifiers[trait](person);
          }
        });
      };
      filter[keys[11]][keys[10]][keys[9]] = {
        container_class: keys[5],
        tabs_container_class: keys[72],
        active_tab_class: keys[73],
        tab_text_el: keys[74],
        tabsmenu_class: keys[75],
        tabsmenu_el: keys[76],
        tmpl: {
          tabsmenu_tab: keys[77]
        },
        onTabSelect: null
      };
    }(window[keys[0]], window, document);
    jQuery.easing.jswing = jQuery.easing.swing;
    jQuery.extend(jQuery.easing, {
      def: "easeOutQuad",
      swing: function (p, t, diff, n, c) {
        return jQuery.easing[jQuery.easing.def](p, t, diff, n, c);
      },
      easeInQuad: function (duration, t, b, c, d) {
        return c * (t = t / d) * t + b;
      },
      easeOutQuad: function (b, x, t, d, a) {
        return -d * (x = x / a) * (x - 2) + t;
      },
      easeInOutQuad: function (c, t, b, m, d) {
        return (t = t / (d / 2)) < 1 ? m / 2 * t * t + b : -m / 2 * (--t * (t - 2) - 1) + b;
      },
      easeInCubic: function (duration, t, b, c, d) {
        return c * (t = t / d) * t * t + b;
      },
      easeOutCubic: function (d, t, a, b, c) {
        return b * ((t = t / c - 1) * t * t + 1) + a;
      },
      easeInOutCubic: function (c, t, b, m, d) {
        return (t = t / (d / 2)) < 1 ? m / 2 * t * t * t + b : m / 2 * ((t = t - 2) * t * t + 2) + b;
      },
      easeInQuart: function (t, d, c, pos, x) {
        return pos * (d = d / x) * d * d * d + c;
      },
      easeOutQuart: function (d, pos, c, t, segment) {
        return -t * ((pos = pos / segment - 1) * pos * pos * pos - 1) + c;
      },
      easeInOutQuart: function (c, pos, from, d, t) {
        return (pos = pos / (t / 2)) < 1 ? d / 2 * pos * pos * pos * pos + from : -d / 2 * ((pos = pos - 2) * pos * pos * pos - 2) + from;
      },
      easeInQuint: function (t, a, b, d, sx) {
        return d * (a = a / sx) * a * a * a * a + b;
      },
      easeOutQuint: function (c, pos, d, b, total) {
        return b * ((pos = pos / total - 1) * pos * pos * pos * pos + 1) + d;
      },
      easeInOutQuint: function (c, pos, from, d, t) {
        return (pos = pos / (t / 2)) < 1 ? d / 2 * pos * pos * pos * pos * pos + from : d / 2 * ((pos = pos - 2) * pos * pos * pos * pos + 2) + from;
      },
      easeInSine: function (t, x, c, d, dx) {
        return -d * Math.cos(x / dx * (Math.PI / 2)) + d + c;
      },
      easeOutSine: function (t, c, y, x, d) {
        return x * Math.sin(c / d * (Math.PI / 2)) + y;
      },
      easeInOutSine: function (x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
      },
      easeInExpo: function (pos, x, n, t, c) {
        return 0 == x ? n : t * Math.pow(2, 10 * (x / c - 1)) + n;
      },
      easeOutExpo: function (x, t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
      },
      easeInOutExpo: function (duration, t, b, c, d) {
        return 0 == t ? b : t == d ? b + c : (t = t / (d / 2)) < 1 ? c / 2 * Math.pow(2, 10 * (t - 1)) + b : c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      },
      easeInCirc: function (d, pos, c, t, duration) {
        return -t * (Math.sqrt(1 - (pos = pos / duration) * pos) - 1) + c;
      },
      easeOutCirc: function (pos, d, n, t, c) {
        return t * Math.sqrt(1 - (d = d / c - 1) * d) + n;
      },
      easeInOutCirc: function (d, pos, c, t, speed) {
        return (pos = pos / (speed / 2)) < 1 ? -t / 2 * (Math.sqrt(1 - pos * pos) - 1) + c : t / 2 * (Math.sqrt(1 - (pos = pos - 2) * pos) + 1) + c;
      },
      easeInElastic: function (c, t, x_min, dx, d) {
        /** @type {number} */
        var s = 1.70158;
        /** @type {number} */
        var f = 0;
        /** @type {number} */
        var a = dx;
        if (0 == t) {
          return x_min;
        }
        if (1 == (t = t / d)) {
          return x_min + dx;
        }
        if (f || (f = .3 * d), a < Math.abs(dx)) {
          /** @type {number} */
          a = dx;
          /** @type {number} */
          s = f / 4;
        } else {
          /** @type {number} */
          s = f / (2 * Math.PI) * Math.asin(dx / a);
        }
        return -(a * Math.pow(2, 10 * (t = t - 1)) * Math.sin((t * d - s) * 2 * Math.PI / f)) + x_min;
      },
      easeOutElastic: function (d, x, b, c, factor) {
        /** @type {number} */
        var y = 1.70158;
        /** @type {number} */
        var r = 0;
        /** @type {number} */
        var a = c;
        if (0 == x) {
          return b;
        }
        if (1 == (x = x / factor)) {
          return b + c;
        }
        if (r || (r = .3 * factor), a < Math.abs(c)) {
          /** @type {number} */
          a = c;
          /** @type {number} */
          y = r / 4;
        } else {
          /** @type {number} */
          y = r / (2 * Math.PI) * Math.asin(c / a);
        }
        return a * Math.pow(2, -10 * x) * Math.sin((x * factor - y) * 2 * Math.PI / r) + c + b;
      },
      easeInOutElastic: function (c, t, x_min, dx, d) {
        /** @type {number} */
        var s = 1.70158;
        /** @type {number} */
        var f = 0;
        /** @type {number} */
        var a = dx;
        if (0 == t) {
          return x_min;
        }
        if (2 == (t = t / (d / 2))) {
          return x_min + dx;
        }
        if (f || (f = d * .3 * 1.5), a < Math.abs(dx)) {
          /** @type {number} */
          a = dx;
          /** @type {number} */
          s = f / 4;
        } else {
          /** @type {number} */
          s = f / (2 * Math.PI) * Math.asin(dx / a);
        }
        return 1 > t ? -.5 * a * Math.pow(2, 10 * (t = t - 1)) * Math.sin((t * d - s) * 2 * Math.PI / f) + x_min : .5 * a * Math.pow(2, -10 * (t = t - 1)) * Math.sin((t * d - s) * 2 * Math.PI / f) + dx + x_min;
      },
      easeInBack: function (b, t, pos, c, d, s) {
        return void 0 == s && (s = 1.70158), c * (t = t / d) * t * ((s + 1) * t - s) + pos;
      },
      easeOutBack: function (s, t, c, b, unit, amount) {
        return void 0 == amount && (amount = 1.70158), b * ((t = t / unit - 1) * t * ((amount + 1) * t + amount) + 1) + c;
      },
      easeInOutBack: function (b, t, c, pos, d, s) {
        return void 0 == s && (s = 1.70158), (t = t / (d / 2)) < 1 ? pos / 2 * t * t * (((s = s * 1.525) + 1) * t - s) + c : pos / 2 * ((t = t - 2) * t * (((s = s * 1.525) + 1) * t + s) + 2) + c;
      },
      easeInBounce: function (x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
      },
      easeOutBounce: function (t, pos, c, s, duration) {
        return (pos = pos / duration) < 1 / 2.75 ? s * 7.5625 * pos * pos + c : 2 / 2.75 > pos ? s * (7.5625 * (pos = pos - 1.5 / 2.75) * pos + .75) + c : 2.5 / 2.75 > pos ? s * (7.5625 * (pos = pos - 2.25 / 2.75) * pos + .9375) + c : s * (7.5625 * (pos = pos - 2.625 / 2.75) * pos + .984375) + c;
      },
      easeInOutBounce: function (x, y1, px, c, d) {
        return d / 2 > y1 ? .5 * jQuery.easing.easeInBounce(x, 2 * y1, 0, c, d) + px : .5 * jQuery.easing.easeOutBounce(x, 2 * y1 - d, 0, c, d) + .5 * c + px;
      }
    });
    /** @type {!Array} */
    var methods = ["innerHeight", "compatMode", "boxModel", "support", "CSS1Compat", "clientHeight", "documentElement", "body", "scrollTop", "cache", "events", "inview", "elem", "handle", "push", "each", "length", "top", "offset", "height", "data", "trigger", "scroll"];
    (function ($) {
      /**
       * @return {?}
       */
      function parseInt() {
        var result = window[methods[0]];
        var el = document[methods[1]];
        if (el || !$[methods[3]][methods[2]]) {
          result = el == methods[4] ? document[methods[6]][methods[5]] : document[methods[7]][methods[5]];
        }
        return result;
      }
      $(window)[methods[22]](function () {
        var line_height = parseInt();
        var py = document[methods[6]][methods[8]] ? document[methods[6]][methods[8]] : document[methods[7]][methods[8]];
        /** @type {!Array} */
        var window = [];
        $[methods[15]]($[methods[9]], function () {
          if (this[methods[10]] && this[methods[10]][methods[11]]) {
            window[methods[14]](this[methods[13]][methods[12]]);
          }
        });
        if (window[methods[16]]) {
          $(window)[methods[15]](function () {
            var timer = $(this);
            var y = timer[methods[18]]()[methods[17]];
            var h = timer[methods[19]]();
            var _0x918dxa = timer[methods[20]](methods[11]) || false;
            if (py > y + h || py + line_height < y) {
              if (_0x918dxa) {
                timer[methods[20]](methods[11], false);
                timer[methods[21]](methods[11], [false]);
              }
            } else {
              if (py < y + h) {
                if (!_0x918dxa) {
                  timer[methods[20]](methods[11], true);
                  timer[methods[21]](methods[11], [true]);
                }
              }
            }
          });
        }
      });
      $(function () {
        $(window)[methods[22]]();
      });
    })(jQuery);
    /** @type {!Array} */
    var args = ["height", "#nav", "css", "% ", "px", "scrollTop", "html", "#pixels", "inview", "hasClass", "#intro", "#intro .bg1", "scroll", "bind", "resize", "addClass", "removeClass", "ready"];
    $(document)[args[17]](function () {
      /**
       * @return {undefined}
       */
      function _insert_template() {
        var backoffDelay = instance[args[0]]();
        /** @type {number} */
        var pixelSizeTargetMax = $(args[1])[args[0]]() / 2;
        /** @type {number} */
        var zeroSizeMax = backoffDelay / 2;
        /** @type {number} */
        var tabPadding = zeroSizeMax - pixelSizeTargetMax;
        $(args[1])[args[2]]({
          top: tabPadding
        });
      }
      /**
       * @param {number} index
       * @param {(Object|number)} height
       * @param {!Object} x
       * @param {number} n
       * @param {number} node
       * @return {?}
       */
      function newPos(index, height, x, n, node) {
        return index + args[3] + -(height + x - n) * node + args[4];
      }
      /**
       * @return {undefined}
       */
      function Move() {
        var pos = instance[args[5]]();
        if (self[args[9]](args[8])) {
          self[args[2]]({
            backgroundPosition: newPos(0, windowHeight, pos, 500, 0)
          });
          times[args[2]]({
            backgroundPosition: newPos(50, windowHeight, pos, 400, 0.2)
          });
        }
        $(args[7])[args[6]](pos);
      }
      var instance = $(window);
      var self = $(args[10]);
      var times = $(args[11]);
      var windowHeight = instance[args[0]]();
      $(args[10])[args[13]](args[8], function (canCreateDiscussions, isSlidingUp) {
        if (1 == isSlidingUp) {
          $(this)[args[15]](args[8]);
        } else {
          $(this)[args[16]](args[8]);
        }
      });
      _insert_template();
      instance[args[14]](function () {
        Move();
        _insert_template();
      });
      instance[args[13]](args[12], function () {
        Move();
      });
    });
    $(document)
      .ready(function () {
        /** @type {number} */
        var url = 300;
        $("#PopularPosts1")
          .find("img")
          .each(function (n, img) {
            img = $(img);
            img.attr({
              src: img.attr("src")
                .replace(/s\B\d{2,4}/, "s" + url)
            });
            img.attr("width", url);
            img.attr("height", url);
          });
      });
    /** @type {!Array} */
    var match = ["is-sticky", "sticky-wrapper", "height", "scrollTop", "length", "top", "offset", "stickyWrapper", "topSpacing", "currentTop", "className", "removeClass", "parent", "stickyElement", "", "css", "position", "outerHeight", "bottomSpacing", "addClass", "fixed", "extend", "wrapAll", "id", "attr", "wrapperClassName", "-sticky-wrapper", "<div></div>", "push", "each", "sticky", "fn", "addEventListener", "resize", "scroll", "attachEvent", "onresize", "onscroll", "call", "slice", "prototype",
      "apply", "object", "Method ", " does not exist on jQuery.sticky", "error", "init"
    ];
    ! function ($) {
      var defaults = {
        topSpacing: 0,
        bottomSpacing: 0,
        className: match[0],
        wrapperClassName: match[1]
      };
      var wrappedWindow = $(window);
      var $DOCUMENT = $(document);
      /** @type {!Array} */
      var PL$13 = [];
      var pixelSizeTargetMax = wrappedWindow[match[2]]();
      /**
       * @return {undefined}
       */
      var cb = function () {
        var iwNorthLat = wrappedWindow[match[3]]();
        var zeroSizeMax = $DOCUMENT[match[2]]();
        /** @type {number} */
        var mapNorthLat = zeroSizeMax - pixelSizeTargetMax;
        /** @type {number} */
        var off = iwNorthLat > mapNorthLat ? mapNorthLat - iwNorthLat : 0;
        /** @type {number} */
        var PL$17 = 0;
        for (; PL$17 < PL$13[match[4]]; PL$17++) {
          var values = PL$13[PL$17];
          var num = values[match[7]][match[6]]()[match[5]];
          /** @type {number} */
          var i = num - values[match[8]] - off;
          if (i >= iwNorthLat) {
            if (null !== values[match[9]]) {
              values[match[13]][match[15]](match[16], match[14])[match[15]](match[5], match[14])[match[11]](values[match[10]]);
              values[match[13]][match[12]]()[match[11]](values[match[10]]);
              /** @type {null} */
              values[match[9]] = null;
            }
          } else {
            /** @type {number} */
            var value = zeroSizeMax - values[match[13]][match[17]]() - values[match[8]] - values[match[18]] - iwNorthLat - off;
            if (0 > value) {
              value = value + values[match[8]];
            } else {
              value = values[match[8]];
            }
            if (values[match[9]] != value) {
              values[match[13]][match[15]](match[16], match[20])[match[15]](match[5], value)[match[19]](values[match[10]]);
              values[match[13]][match[12]]()[match[19]](values[match[10]]);
              /** @type {number} */
              values[match[9]] = value;
            }
          }
        }
      };
      /**
       * @return {undefined}
       */
      var selectorText = function () {
        pixelSizeTargetMax = wrappedWindow[match[2]]();
      };
      var self = {
        init: function (callback) {
          var args = $[match[21]](defaults, callback);
          return this[match[29]](function () {
            var target = $(this);
            var stickyId = target[match[24]](match[23]);
            var wrapper = $(match[27])[match[24]](match[23], stickyId + match[26])[match[19]](args[match[25]]);
            target[match[22]](wrapper);
            var transforms = target[match[12]]();
            transforms[match[15]](match[2], target[match[17]]());
            PL$13[match[28]]({
              topSpacing: args[match[8]],
              bottomSpacing: args[match[18]],
              stickyElement: target,
              currentTop: null,
              stickyWrapper: transforms,
              className: args[match[10]]
            });
          });
        },
        update: cb
      };
      if (window[match[32]]) {
        window[match[32]](match[34], cb, false);
        window[match[32]](match[33], selectorText, false);
      } else {
        if (window[match[35]]) {
          window[match[35]](match[37], cb);
          window[match[35]](match[36], selectorText);
        }
      }
      /**
       * @param {string} i
       * @return {?}
       */
      $[match[31]][match[30]] = function (i) {
        return self[i] ? self[i][match[41]](this, Array[match[40]][match[39]][match[38]](arguments, 1)) : match[42] != typeof i && i ? ($[match[45]](match[43] + i + match[44]), void 0) : self[match[46]][match[41]](this, arguments);
      };
      $(function () {
        setTimeout(cb, 0);
      });
    }(jQuery);
    jQuery(document)
      .ready(function () {
        jQuery("nav")
          .sticky({
            topSpacing: 0
          });
      });
    $(document)
      .ready(function () {
        $(".set-1")
          .tabs();
      });
  } else {
    window.setTimeout("checkjQueryLoad();", 100);
  }
}
checkjQueryLoad();