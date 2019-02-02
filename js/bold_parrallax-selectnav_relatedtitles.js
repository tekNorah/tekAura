// Navigation
window.selectnav = function () {
  return function (p, q) {
    var a, h = function (b) {
        var c;
        b || (b = window.event);
        b.target ? c = b.target : b.srcElement && (c = b.srcElement);
        3 === c.nodeType && (c = c.parentNode);
        c.value && (window.location.href = c.value)
      },
      k = function (b) {
        b = b.nodeName.toLowerCase();
        return "ul" === b || "ol" === b
      },
      l = function (b) {
        for (var c = 1; document.getElementById("selectnav" + c); c++) {}
        return b ? "selectnav" + c : "selectnav" + (c - 1)
      },
      n = function (b) {
        g++;
        var c = b.children.length,
          a = "",
          d = "",
          f = g - 1;
        if (c) {
          if (f) {
            for (; f--;) {
              d += r
            }
            d += " "
          }
          for (f = 0; f < c; f++) {
            var e = b.children[f].children[0];
            if ("undefined" !== typeof e) {
              var h = e.innerText || e.textContent,
                i = "";
              j && (i = -1 !== e.className.search(j) || -1 !== e.parentElement.className.search(j) ? m : "");
              s && !i && (i = e.href === document.URL ? m : "");
              a += "<option value='" + e.href + "' " + i + ">" + d + h + "</option>";
              t && (e = b.children[f].children[1]) && k(e) && (a += n(e))
            }
          }
          1 === g && o && (a = "<option value=''>" + o + "</option>" + a);
          1 === g && (a = "<select class='selectnav' id='" + l(!0) + "'>" + a + "</select>");
          g--;
          return a
        }
      };
    if ((a = document.getElementById(p)) && k(a)) {
      document.documentElement.className += " js";
      var d = q || {},
        j = d.activeclass || "active1",
        s = "boolean" === typeof d.autoselect ? d.autoselect : !0,
        t = "boolean" === typeof d.nested ? d.nested : !0,
        r = d.indent || "\u2192",
        o = d.label || "- Navigation -",
        g = 0,
        m = " selected ";
      a.insertAdjacentHTML("afterend", n(a));
      a = document.getElementById(l());
      a.addEventListener && a.addEventListener("change", h);
      a.attachEvent && a.attachEvent("onchange", h)
    }
  }
}();
(jQuery);
$(document).ready(function () {
    selectnav("navigation", {
      label: "Select Here ",
      nested: true,
      autoselect: false,
      indent: "-"
    });
  });

// Related Posts
var relatedTitles = new Array();
var relatedTitlesNum = 0;
var relatedUrls = new Array();
var thumburl = new Array();

function related_results_labels_thumbs(json) {
  for (var i = 0; i < json.feed.entry.length; i++) {
    var entry = json.feed.entry[i];
    relatedTitles[relatedTitlesNum] = entry.title.$t;
    try {
      thumburl[relatedTitlesNum] = entry.gform_foot.url
    } catch (error) {
      s = entry.content.$t;
      a = s.indexOf("<img");
      b = s.indexOf("src=\"", a);
      c = s.indexOf("\"", b + 5);
      d = s.substr(b + 5, c - b - 5);
      if ((a != -1) && (b != -1) && (c != -1) && (d != "")) {
        thumburl[relatedTitlesNum] = d
      } else thumburl[relatedTitlesNum] = "http://3.bp.blogspot.com/-zP87C2q9yog/UVopoHY30SI/AAAAAAAAE5k/AIyPvrpGLn8/s1600/picture_not_available.png"
    }
    if (relatedTitles[relatedTitlesNum].length > 35) relatedTitles[relatedTitlesNum] = relatedTitles[relatedTitlesNum].substring(0, 35) + "...";
    for (var k = 0; k < entry.link.length; k++) {
      if (entry.link[k].rel == "alternate") {
        relatedUrls[relatedTitlesNum] = entry.link[k].href;
        relatedTitlesNum++
      }
    }
  }
}

function removeRelatedDuplicates_thumbs() {
  var tmp = new Array(0);
  var tmp2 = new Array(0);
  var tmp3 = new Array(0);
  for (var i = 0; i < relatedUrls.length; i++) {
    if (!contains_thumbs(tmp, relatedUrls[i])) {
      tmp.length += 1;
      tmp[tmp.length - 1] = relatedUrls[i];
      tmp2.length += 1;
      tmp3.length += 1;
      tmp2[tmp2.length - 1] = relatedTitles[i];
      tmp3[tmp3.length - 1] = thumburl[i]
    }
  }
  relatedTitles = tmp2;
  relatedUrls = tmp;
  thumburl = tmp3
}

function contains_thumbs(a, e) {
  for (var j = 0; j < a.length; j++)
    if (a[j] == e) return true;
  return false
}

function printRelatedLabels_thumbs() {
  for (var i = 0; i < relatedUrls.length; i++) {
    if ((relatedUrls[i] == currentposturl) || (!(relatedTitles[i]))) {
      relatedUrls.splice(i, 1);
      relatedTitles.splice(i, 1);
      thumburl.splice(i, 1);
      i--
    }
  }
  var r = Math.floor((relatedTitles.length - 1) * Math.random());
  var i = 0;
  if (relatedTitles.length > 0) document.write("<h1>" + relatedpoststitle + "</h1>");
  document.write("<div style='clear: both;'/>");
  while (i < relatedTitles.length && i < 20 && i < maxresults) {
    document.write("<a style='text-decoration:none;margin:0 7px 0px 0;float:left;");
    if (i != 0) document.write("'");
    else document.write("'");
    document.write(" href='" + relatedUrls[r] + "'><img class='related_img' src='" + thumburl[r] + "'/><br/><div class='related_title'>" + relatedTitles[r] + "</div></a>");
    if (r < relatedTitles.length - 1) {
      r++
    } else {
      r = 0
    }
    i++
  }
  document.write("</div>");
  relatedUrls.splice(0, relatedUrls.length);
  thumburl.splice(0, thumburl.length);
  relatedTitles.splice(0, relatedTitles.length)
}