(function ($) {
  var newerLink = $("a.newer-link");
  var olderLink = $("a.older-link");
  $.get(newerLink.attr("href"), function (data) {
    newerLink.html("<strong>Next</strong> <span>" + $(data).find(".post h1.post-title").text() + "</span>");
  }, "html");
  $.get(olderLink.attr("href"), function (data2) {
    olderLink.html("<strong>Previous</strong> <span>" + $(data2).find(".post h1.post-title").text() + "</span>");
  }, "html");
})(jQuery);