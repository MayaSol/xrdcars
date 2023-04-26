const ready = require('./utils/documentReady.js');
const getParents = require('./utils/getParents.js');
var throttle = require('lodash.throttle');

ready(function() {

  initComparisons();

  window.addEventListener('resize', throttle(initComparisons, 100));

  function initComparisons() {
    // if (document.documentElement.clientWidth >= 768) {
    //   return;
    // }
    var x, i;
    /* Find all elements with an "overlay" class: */
    x = document.getElementsByClassName("compare-slider__before");
    for (i = 0; i < x.length; i++) {
      /* Once for each "overlay" element:
      pass the "overlay" element as a parameter when executing the compareImages function: */
      compareImages(x[i]);
    }


    function compareImages(img) {
      var slider, clicked = 0, w, h;
      /* Get the width and height of the img element */
      img.style.width =  "";
      w = img.offsetWidth;
      h = img.offsetHeight;
      /* Set the width of the img element to 50%: */

      var before = getParents(img,'.compare-slider__before')[0];
      var after = getParents(img,'.compare-slider__after')[0];
      var contentBefore = before.querySelector('.compare-slider__content--before');
      var contentAfter = after.querySelector('.compare-slider__content--after');
      contentAfter.style.width = "";
      contentBefore.style.width = "";
      var contentBeforeHeight = contentBefore.offsetHeight;
      var contentAfterHeight = contentAfter.offsetHeight;
      var height = (contentBeforeHeight > contentAfterHeight) ? contentBeforeHeight : contentAfterHeight;
      contentAfter.style.width = contentAfter.offsetWidth + 'px';
      contentBefore.style.width = contentAfter.offsetWidth + 'px';
      after.style.height = height + 'px';
      before.style.position = 'absolute';

      img.style.width = (w / 2) + "px";
      // img.style.width = "0px";

      // /* Create slider: */
      var slider = after.querySelector('.compare-slider__slider');
      if (!slider) {
        slider = document.createElement("DIV");
        slider.setAttribute("class", "compare-slider__slider");
        sliderHandle = document.createElement("DIV");
        sliderHandle.setAttribute("class", "compare-slider__slider-handle");
        sliderHandle.innerHTML = "<i class='bx bx-move-horizontal'></i>";
        // var sliderIcon = document.createElement('I');
        // sliderIcon.setAttribute("class","bx");
        // sliderIcon.classList.add("bx-move-horizontal");
        // sliderHandle.appendChild(sliderIcon);
        slider.appendChild(sliderHandle);

        // /* Insert slider */
        // // console.log(contentBefore);
        // // console.log(contentAfter);
        // // var sliderWrapper = getParents(before,'.compare-slider')[0];
        // // contentBefore.style.width = sliderWrapper.offsetWidth + 'px';
        after.insertBefore(slider, before);
      }

      //  Position the slider in the middle:
      // slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
      /* Execute a function when the mouse button is pressed: */
      slider.addEventListener("mousedown", slideReady);
      /* And another function when the mouse button is released: */
      window.addEventListener("mouseup", slideFinish);
      /* Or touched (for touch screens: */
      slider.addEventListener("touchstart", slideReady);
      /* And released (for touch screens: */
      window.addEventListener("touchend", slideFinish);

      slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

      function slideReady(e) {
        /* Prevent any other actions that may occur when moving over the image: */
        e.preventDefault();
        /* The slider is now clicked and ready to move: */
        clicked = 1;
        /* Execute a function when the slider is moved: */
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
      }

      function slideFinish() {
        /* The slider is no longer clicked: */
        clicked = 0;
      }

      function slideMove(e) {
        var pos;
        /* If the slider is no longer clicked, exit this function: */
        if (clicked == 0) return false;
        /* Get the cursor's x position: */
        pos = getCursorPos(e)
        /* Prevent the slider from being positioned outside the image: */
        if (pos < 0) pos = 0;
        if (pos > w) pos = w;
        /* Execute a function that will resize the overlay image according to the cursor: */
        slide(pos);
      }

      function getCursorPos(e) {
        var a, x = 0;
        e = (e.changedTouches) ? e.changedTouches[0] : e;
        /* Get the x positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x coordinate, relative to the image: */
        x = e.pageX - a.left;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        return x;
      }

      function slide(x) {
        /* Resize the image: */
        img.style.width = x + "px";
        /* Position the slider: */
        slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
      }
    }
  }
});
