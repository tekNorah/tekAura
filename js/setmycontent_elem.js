window.onload = function() {
    var mycontent_elem = document.getElementById("mycontent");
    if (mycontent_elem == null) {
      window.location.href = "http://www.bthemez.com";
    }
    mycontent_elem.setAttribute("href", "http://www.bthemez.com/");
      mycontent_elem.innerHTML = "Bthemez";
};