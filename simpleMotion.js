window.onload = function() {
	// Default motion values
	const def_animationEaseType = "ease";
	const def_animationTime     = "1000ms";
	const def_distanceToTravelX = 0;
	const def_distanceToTravelY = 30;
	const def_startingOpacity   = 0;
	const def_finalOpacity      = 1;
	const def_finalTransform    = "translate(0, 0)";

	// Constants
	const animInterval   = 100;
	const revealPosition = 0.8;

	// =============================================

	// Build our SimpleMotion nodelist from all HTML elements with the "data-sm" attribute
	let animElementArr = document.querySelectorAll("[data-sm]");

	// Setup initial CSS attributes for each element in the nodelist
	animElementArr.forEach(ele => {
		const distanceToTravelX = ele.getAttribute("data-sm-dist-x")     ? ele.getAttribute("data-sm-dist-x")     : def_distanceToTravelX;
		const distanceToTravelY = ele.getAttribute("data-sm-dist-y")     ? ele.getAttribute("data-sm-dist-y")     : def_distanceToTravelY;
		const startingOpacity   = ele.getAttribute("data-sm-start-opac") ? ele.getAttribute("data-sm-start-opac") : def_startingOpacity;

		ele.style.opacity   = startingOpacity;
		ele.style.transform = `translate(${distanceToTravelX}px, ${distanceToTravelY}px)`;
	});

	// Scroll listener
	let scrolling = false;
	window.addEventListener("scroll", function(e) {
		if (animElementArr.length >= 1) scrolling = true;
	});

	// When scrolling, fire our handleAnimation function every ${animInterval} (default 100ms)
	let scrollInterval = setInterval(() => {
		if (scrolling) {
			scrolling = false;
			handleAnimation();
		};
	}, animInterval);

	// Where the magic happens
	handleAnimation = () => {
		// Changes in window height can cause unexpected behavior so we calculate the window's height every scrollInterval
		const windowInnerHeight = window.innerHeight;

		// When a SimpleMotion element is animated, the counter increments; animated elements will be removed from the nodelist 
		let counter = 0;
		
		// For each element in the nodelist, check to see if it should animate based on scroll position
		animElementArr.forEach(ele => {
			const eleTop          = ele.getBoundingClientRect().top + window.scrollY;
			const distanceOffsetY = ele.getAttribute("data-sm-dist-y") ? ele.getAttribute("data-sm-dist-y") : def_distanceToTravelY;
			
			if (window.scrollY > (eleTop - (windowInnerHeight * revealPosition) - distanceOffsetY)) {
				const delay = ele.getAttribute("data-sm-delay");

				if (delay) {
					setTimeout(() => {animateElement(ele)}, delay);
				} else {
					animateElement(ele);
				}

				counter++
			};
		});

		// Remove animated elements from the nodelist
		animElementArr = [].slice.call(animElementArr, counter);

		// When all SimpleMotion elements have been animated and the nodelist is empty, clear our scrollInterval
		if (animElementArr.length <= 0) clearInterval(scrollInterval);
	};

	// Animating the element
	animateElement = (ele) => {
		const animationTime     = ele.getAttribute("data-sm-time") ? ele.getAttribute("data-sm-time") : def_animationTime;
		const animationEaseType = ele.getAttribute("data-sm-ease") ? ele.getAttribute("data-sm-ease") : def_animationEaseType;
		const finalOpacity      = ele.getAttribute("data-sm-final-opac") ? ele.getAttribute("data-sm-final-opac") : def_finalOpacity;
		const finalTransform    = ele.getAttribute("data-sm-final-transform") ? ele.getAttribute("data-sm-final-transform") : def_finalTransform;

		ele.style.transition               = animationTime;
		ele.style.transitionTimingFunction = animationEaseType;
		ele.style.opacity                  = finalOpacity;
		ele.style.transform                = finalTransform;
	};

	// Fire handleAnimation on page load to animate any in-view SimpleMotion elements before the user scrolls
	handleAnimation();
};