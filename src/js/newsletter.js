const ready = require('./utils/documentReady.js');

ready(function() {


	const selectNewsletter = document.querySelector('select#newsletter');
	const itemNewsletterSearch = document.querySelector('.newsletter-item--my-search');
	const itemNewsletterDefault = document.querySelector('.newsletter-item--default');
	const newsLetterList = document.querySelector('.newsletter-list');
	console.log(itemNewsletterDefault);
	selectNewsletter.addEventListener('choice',function(event) {
		console.log('#newsletter choice');
		console.log(event);
		console.log(event.detail.choice.value);
			console.log(newsLetterList.classList);
		if (+event.detail.choice.value == 2) {
			console.log('animation');
			console.log(itemNewsletterSearch);
			newsLetterList.classList = [];
			newsLetterList.classList.add('newsletter-list');
			newsLetterList.classList.add('newsletter-list--my-search');
		}
		if (+event.detail.choice.value == 3) {
			console.log('modal here');
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
						console.log('advancedSearchSubmitted');
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