  const makeEllipsis = function(selector) {
    // console.log('makeEllipsis');
    // console.log(selector);
    var ellipsisEls = document.querySelectorAll(selector);
    // console.log(ellipsisEls);
    for (var el of ellipsisEls) {
      var lines;
      if (document.documentElement.clientWidth >= 1024 && el.dataset.lgLines) {
        lines=el.dataset.lgLines;
      }
      else {
        lines = el.dataset.lines;
      }
      if (!lines) {
        var lineHeight = getLineHeight(el);
        var elHeight = el.clientHeight;
        lines = parseInt(elHeight / lineHeight);
      }
      if (lines) {
        truncateElement(el, lines);
      }
    }
  }


var getLineHeight = function getLineHeight(element) {
  var lineHeight = window.getComputedStyle(element)['line-height'];
  if (lineHeight === 'normal') {
    // sucky chrome
    return 1.16 * parseFloat(window.getComputedStyle(truncateElement)['font-size']);
  } else {
    return parseFloat(lineHeight);
  }
};

var truncateElement = function(element, lines) {
  // console.log('truncateElement lines: ' + lines);
  // console.log(element);
  var truncateText = element.innerHTML;
  var truncateTextParts = truncateText.split(' ');
  var lineHeight = getLineHeight(element);
  var maxHeight = lines * lineHeight;

  // console.log('lineHeight = ' + lineHeight);
  // console.log('maxHeight = ' + maxHeight);
  // console.log('element.clientHeight =' + element.clientHeight);

  adjust(element,maxHeight);
  setTimeout(() => {
    if (element.clientHeight > maxHeight) {
      // console.log('ellipsis.js correction: ' + element.clientHeight);
      adjust(element,maxHeight);
    }
  },300);


  function adjust(element,maxHeight) {
    // console.log('------------while-------------------');
    truncateText = element.innerHTML;
    truncateTextParts = truncateText.split(' ');
    while (element.clientHeight > maxHeight && truncateTextParts.length > 0) {
      truncateTextParts.pop();
      element.innerHTML = truncateTextParts.join(' ') + '...';
        // console.log('element.clientHeight = ' + element.clientHeight);
        // console.log(element.clientHeight > maxHeight && truncateTextParts.length > 0);
        // console.log(element.innerHTML);
    }
    // console.log('---------------------------------------------');
  }

}


module.exports = makeEllipsis;
