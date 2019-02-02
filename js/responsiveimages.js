/*! Responsive Images.js *
 * load appropriate image based on webp compatibility and if Mobile Browser *
 * Requires: Modernizr && DetectMobileBrowsers !*/
          Modernizr.on("webp", function(result) {
            var nscript = document.getElementsByClassName("optimizedimg");
            var i;
            for (i = 0; i < nscript.length; i++) {
              var img = document.createElement("img");
              img.alt = nscript[i].getAttribute("data-alt");
              var classList = nscript[i].className.split(/\s+/);
              if (result) {
                img.src = nscript[i].getAttribute("data-webp");
              } else {
                if ($.browser.mobile) {
                  img.src = nscript[i].getAttribute("data-jpg-mobile");
                } else {
                  img.src = nscript[i].getAttribute("data-jpg");
                }
              }
              for (var j = 0; j < classList.length; j++) {
                if (classList[j] !== "optimizedimg") {
                  img.className = classList[j];
                }
              }
              nscript[i].parentNode.insertBefore(img, nscript[i].nextSibling);
            }
          });
