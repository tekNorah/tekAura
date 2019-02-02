function checkjQueryLoad() {
  if (window.jQuery) {
    $(document).ready(function () {
        $(".searchIcon").on("click", function () {
          $(".searchPopup").addClass("show").find('input[type="text"]').focus();
        });
        $(".closeBtn").on("click", function () {
          $(this).closest(".searchPopup").removeClass("show");
        });
    });
  } else {
    window.setTimeout("checkjQueryLoad();", 100);
  }
}
checkjQueryLoad();