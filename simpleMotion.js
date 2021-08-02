window.onload = function() {
	// Default motion values
	const def_distanceToTravelX = 0;
	const def_distanceToTravelY = 30;
  const def_startingScale     = 1;
	const def_animationTime     = 1000;
	const def_startingOpacity   = 0;
	const def_finalOpacity      = 1;
	const def_animationEaseType = "ease";
	const def_finalTransform    = "translate(0, 0)";

	// Constants
	const animInterval   = 100;
	const revealPosition = 0.75;

	// =============================================

	// Build our SimpleMotion array from all HTML elements with the "data-sm" attribute
	let nodeList = document.querySelectorAll("[data-sm]");
	let animElementArr = Array.prototype.slice.call(nodeList);

	// Setup initial CSS attributes for each element in the array
	animElementArr.forEach(ele => {
		const distanceToTravelX = ele.getAttribute("data-sm-dist-x")      ? ele.getAttribute("data-sm-dist-x")      : def_distanceToTravelX;
		const distanceToTravelY = ele.getAttribute("data-sm-dist-y")      ? ele.getAttribute("data-sm-dist-y")      : def_distanceToTravelY;
		const startingScale     = ele.getAttribute("data-sm-start-scale") ? ele.getAttribute("data-sm-start-scale") : def_startingScale;
		const startingOpacity   = ele.getAttribute("data-sm-start-opac")  ? ele.getAttribute("data-sm-start-opac")  : def_startingOpacity;

		ele.style.opacity   = startingOpacity;
		ele.style.transform = `translate(${distanceToTravelX}px, ${distanceToTravelY}px) scale(${startingScale})`;
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

		// When a SimpleMotion element is animated, the element is added to this array; animated elements will be removed from the array 
		let eleToRemove = [];
		
		// For each element in the array, check to see if it should animate based on scroll position
		animElementArr.forEach(ele => {
			const eleTop = ele.getBoundingClientRect().top + window.scrollY;
			const distanceOffsetY = ele.getAttribute("data-sm-dist-y") ? ele.getAttribute("data-sm-dist-y") : def_distanceToTravelY;
			
			if (window.scrollY > (eleTop - (windowInnerHeight * revealPosition) - distanceOffsetY)) {
				const delay = ele.getAttribute("data-sm-delay");

				if (delay) {
					setTimeout(() => { animateElement(ele); }, delay);
				} else {
					animateElement(ele);
				}

				eleToRemove = [...eleToRemove, ele];
			};
		});

		// Remove animated elements from the array
		animElementArr = animElementArr.filter(ele => !eleToRemove.includes(ele));

		// When all SimpleMotion elements have been animated and the array is empty, clear our scrollInterval
		if (animElementArr.length <= 0) clearInterval(scrollInterval);
	};

	// Animating the element
	animateElement = (ele) => {
		const animationTime     = ele.getAttribute("data-sm-time")            ? ele.getAttribute("data-sm-time")            : def_animationTime;
		const animationEaseType = ele.getAttribute("data-sm-ease")            ? ele.getAttribute("data-sm-ease")            : def_animationEaseType;
		const finalOpacity      = ele.getAttribute("data-sm-final-opac")      ? ele.getAttribute("data-sm-final-opac")      : def_finalOpacity;
		const finalTransform    = ele.getAttribute("data-sm-final-transform") ? ele.getAttribute("data-sm-final-transform") : def_finalTransform;

		ele.style.transitionDuration       = `${animationTime}ms`;
		ele.style.transitionTimingFunction = animationEaseType;
		ele.style.opacity                  = finalOpacity;
		ele.style.transform                = finalTransform;
	};

	// Fire handleAnimation on page load to animate any in-view SimpleMotion elements before the user scrolls
	handleAnimation();
};