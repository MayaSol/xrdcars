const ready = require('./utils/documentReady.js');
const Choices = require('choices.js');
const getParents = require('./utils/getParents.js');


ready(function() {

	const selectNewsletter = document.querySelector('select#newsletter');
	const itemNewsletterSearch = document.querySelector('.newsletter-item--my-search');

	const selectNewsletterSearch = document.getElementById('newsletter-my-search');
	if (!selectNewsletterSearch) {
		return;
	}

	choiceNewsletterSearch = new Choices(selectNewsletterSearch, {
		searchEnabled: false,
        shouldSort: false,
		callbackOnCreateTemplates: function(strToEl) {
			// var classNames = this.config.classNames;
			// var itemSelectText = this.config.itemSelectText;
			return {
			  item: function({classNames}, data) {
			    return strToEl(
			      '\
			  <div\
			    class="' +
			        String(classNames.item) +
			        ' ' +
			        String(
			          data.highlighted
			            ? classNames.highlightedState
			            : classNames.itemSelectable
			        ) +
			        '"\
			    data-item\
			    data-id="' +
			        String(data.id) +
			        '"\
			    data-value="' +
			        String(data.value) +
			        '"\
			    ' +
			        String(data.active ? 'aria-selected="true"' : '') +
			        '\
			    ' +
			        String(data.disabled ? 'aria-disabled="true"' : '') +
			        '\
			    >\
			   <button class="newsletter-back-btn btn" id="newsletterBackBtn"><i class="flaticon-left-arrow"></i></button>' +
                String(data.label) +
                '\
          </div>\
        '
			    );
			  },
			};
		},

	})


	function onBtnBackClick() {
		// let btnBack = document.getElementById('newsletterBackBtn');
		// if (btnBack) {
		// 	btnBack.addEventListener('click', function(event) {
				newsLetterList.classList = [];
				newsLetterList.classList.add('newsletter-list');
				newsLetterList.classList.add('newsletter-list--default');
		// 	})
		// }
	}

	choiceNewsletterSearch.itemList.element.addEventListener('click', function(event) {
		// console.log('choiceNewsletterSearch click');
		// console.log(event.target.id);
		// console.log(getParents(event.target, '#newsletterBackBtn'));
		if (event.target.id == 'newsletterBackBtn' || getParents(event.target, '#newsletterBackBtn').length > 0) {
			onBtnBackClick();
		}
	})

	const itemNewsletterDefault = document.querySelector('.newsletter-item--default');
	const newsLetterList = document.querySelector('.newsletter-list');
	// setBtnBackClick();
	selectNewsletter.addEventListener('choice',function(event) {
		// console.log('#newsletter choice');
		// console.log(event.detail.choice.value);
		if (+event.detail.choice.value == 2) {
			newsLetterList.classList = [];
			newsLetterList.classList.add('newsletter-list');
			newsLetterList.classList.add('newsletter-list--my-search');
		}
		if (+event.detail.choice.value == 3) {
			var asideForm = document.getElementById('add-search-for-newsletter');
			if (asideForm) {
				asideForm.asideOpen();
				var asideFormSubmitBtn = asideForm.querySelector('#search-advanced-submit');
				var advancedSearchSubmitted = false;
				asideFormSubmitBtn.addEventListener('click', function(event) {
					advancedSearchSubmitted = true;
					var parent = this.closest('.aside-form');
					asideForm.asideClose();
				});
				asideForm.addEventListener('aside-close',function(event) {
					if (advancedSearchSubmitted) {
						advancedSearchSubmitted = false;
					}
					else {
					}
				});
			}
		}
	})

	const newsletterEmail = document.getElementById('newsletter-share-email');
	newsletterEmail.addEventListener('click',function(event) {
		var myModal = new bootstrap.Modal(document.getElementById('newsletter-email-modal'));
		myModal.show();
	})

});