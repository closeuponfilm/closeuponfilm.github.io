$(function () {
	console.log('carousel');
	var carousel = $('.carousel');
	var slides = carousel.children('.slide')
	var controls = carousel.children('.controls').find('li');

	var maxIndex = slides.length;
	var currentIndex = 0;

	function setActiveAt(elementGroup, activeIndex) {
		elementGroup.select('.active').removeClass('active');
		$(elementGroup[activeIndex]).addClass('active');
	}

	function getActiveIndex(elementGroup) {
		return $('.slide.active').index(elementGroup);
	}

	function slideTo(activeIndex) {
		setActiveAt(slides, activeIndex);
		setActiveAt(controls, activeIndex);
	}

	function rotateCarousel() {
		currentIndex = (currentIndex + 1) % maxIndex;
		console.log(currentIndex, maxIndex);
		slideTo(currentIndex);
	}

	controls.on('click', function () {
		slideTo($(this).data('slide-to'))
	});

	setInterval(rotateCarousel, 2000);

	console.log(controls);
});