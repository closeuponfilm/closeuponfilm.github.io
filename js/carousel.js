function loadCarousel() {
	var carousel = $('.carousel');
	var slides = carousel.children('.slide')
	var controls = $('.carousel-container').children('.controls').find('li');

	var maxIndex = slides.length;
	var currentIndex = 0;

	var carouselWidth;

	function setCarouselSizes() {
		carouselWidth = $('.carousel-container').width();
		slides.css({width: carouselWidth});
		slides.find('img').css({width: carouselWidth});
	}

	function setActiveAt(elementGroup, activeIndex) {
		elementGroup.select('.active').removeClass('active');
		$(elementGroup[activeIndex]).addClass('active').css({left: 0});
	}

	function slideTo(toIndex) {
		var slideLeft = ((toIndex - currentIndex + maxIndex) % maxIndex) > (maxIndex / 2);

		populateSlides(toIndex, slideLeft);

		setActiveAt(controls, toIndex);
		slide(toIndex, slideLeft);
		currentIndex = toIndex;
	}

	function slide(toIndex, slideLeft) {
		var slidingToPosition = (slideLeft ? '' : '-')
			+ (getNumberOfSlidesInTransition(toIndex, slideLeft) * carouselWidth);

		carousel.animate(
			{
				left: slidingToPosition
			},
			800,
			'swing',
			callback = function () {
				setActiveAt(slides, toIndex);
				slides.css({left: 0});
				carousel.css({left: 0});
			});
	}

	function getNumberOfSlidesInTransition(toIndex, slideLeft) {
		return ((slideLeft
			? currentIndex - toIndex
			: toIndex - currentIndex) + maxIndex) % maxIndex;
	}

	function populateSlides(toIndex, populateLeft) {
		var populateSlideIndex = currentIndex;
		var slidesPopulated = 0;

		var slidesToPopulate = getNumberOfSlidesInTransition(toIndex, populateLeft);

		while (populateSlideIndex != toIndex
			&& slidesPopulated < slidesToPopulate) {
			if (populateLeft) {
				populateSlideIndex = (populateSlideIndex - 1 + maxIndex) % maxIndex;
			}
			else {
				populateSlideIndex = (populateSlideIndex + 1 + maxIndex) % maxIndex;
			}

			$(slides[populateSlideIndex]).css({
				top: 0,
				left: (populateLeft ? -1 : 1) * (slidesPopulated + 1) * carouselWidth
			}).addClass('active');

			slidesPopulated++;
		}
	}

	function rotateCarousel() {
		var toIndex = (currentIndex + 1) % maxIndex;
		slideTo(toIndex);
	}

	setCarouselSizes();

	controls.on('click', function () {
		slideTo($(this).data('slide-to'))
	});

	setInterval(rotateCarousel, 3000);

	$(window).on('resize', setCarouselSizes);
}

$(loadCarousel);

