const ready = require('./utils/documentReady.js');

ready(function() {


  var asideForms = document.getElementsByClassName('aside-form');
  for (form of asideForms) {
    form.asideOpen = asideOpen;
    form.asideClose = asideClose;
  }

  var openBtns = document.querySelectorAll('body *[data-aside-open]');

   for (let btn of openBtns) {
    btn.addEventListener('click', function(event) {
      let form = document.querySelector(this.dataset.asideOpen);
      // form && form.classList.add('aside-form--show');
      form && form.asideOpen();
    })
   }

  var closeBtns = document.querySelectorAll('body *[data-aside-close]');
  for (btn of closeBtns) {
    btn.addEventListener('click', function(event) {
      for (form of asideForms) {
        form.asideClose();
        // form.classList.remove('aside-form--show');
      }
    })
  }

  document.addEventListener('keydown', function(e) {
    if (e.key == "Escape") {
      for (form of asideForms) {
        form.asideClose();
        // form.classList.remove('aside-form--show');
      }
    }
  });

  const openEvent = new CustomEvent('aside-open');

  function asideOpen() {
    console.log('asideOPen');
    console.log(this);
    this.classList.add('aside-form--show');
    this.dispatchEvent(new CustomEvent('aside-open'));
    document.body.classList.add('no-scroll');
  }

  function asideClose() {
    console.log('asideClose');
    console.log(this);
    this.classList.remove('aside-form--show');
    this.dispatchEvent(new CustomEvent('aside-close'));
    document.body.classList.remove('no-scroll');
  }

});
