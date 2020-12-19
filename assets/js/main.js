window.onload = function() {
	/** Data attributes reference list. Set default values below.
	 * [required] data-sm                         : Enables Simple Motion animation on HTML elements.
	 * [optional] data-sm-ease="value"            : Transition ease type. Expected value: "ease" | "linear" | "ease-in" | "ease-out" | "ease-in-out" | "cubic-bezier(n,n,n,n)"
	 * [optional] data-sm-time="value"            : Duration of animation. Expected value: Number followed by time denotation, e.g. "2000ms" | "500ms" | "2s" | "0.5s" 
	 * [optional] data-sm-dist-x="value"          : Distance element will travel in pixels on the X axis. Expected value: Number, e.g. "250" | "10"
	 * [optional] data-sm-dist-y="value"          : Distance element will travel in pixels on the Y axis. Expected value: Number, e.g. "250" | "10"
	 * [optional] data-sm-start-opac="value"      : Opacity of the element before animation starts. Expected value: Number between 0-1, e.g. "1" | "0.5" | "0.33" | "0"
	 * [optional] data-sm-final-opac="value"      : Opacity of the element after animation completes. Expected value: Number between 0-1, e.g. "1" | "0.5" | "0.33" | "0"
	 * [optional] data-sm-final-transform="value" : Customize the final CSS transform. Expected value: Any valid CSS transform, e.g. "translate(0, 250px) scale(2)" | "translate(0, 0) rotate(45deg)"
	 */


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


	// Setup starting CSS attributes for each element in the nodelist
	animElementArr.forEach(ele => {
		const distanceToTravelX = ele.getAttribute("data-sm-dist-x")     ? ele.getAttribute("data-sm-dist-x")     : def_distanceToTravelX;
		const distanceToTravelY = ele.getAttribute("data-sm-dist-y")     ? ele.getAttribute("data-sm-dist-y")     : def_distanceToTravelY;
		const startingOpacity   = ele.getAttribute("data-sm-start-opac") ? ele.getAttribute("data-sm-start-opac") : def_startingOpacity;

		ele.style.opacity = startingOpacity;
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
		// Change in window height can cause unexpected behavior so we calculate the window's height every scrollInterval
		const windowInnerHeight = window.innerHeight;

		// When a SimpleMotion element is animated, the counter increments; animated elements will be removed from the nodelist 
		let counter = 0;
		
		// For each element in the nodelist, check to see if it should animate based on scroll position
		animElementArr.forEach(ele => {
			const distanceOffsetY = ele.getAttribute("data-sm-dist-y") ? ele.getAttribute("data-sm-dist-y") : def_distanceToTravelY;
			const eleTop = ele.getBoundingClientRect().top + window.scrollY;
			
			if (window.scrollY > (eleTop - (windowInnerHeight * revealPosition) - distanceOffsetY)) {
				const animationTime     = ele.getAttribute("data-sm-time") ? ele.getAttribute("data-sm-time") : def_animationTime;
				const animationEaseType = ele.getAttribute("data-sm-ease") ? ele.getAttribute("data-sm-ease") : def_animationEaseType;
				const finalOpacity      = ele.getAttribute("data-sm-final-opac") ? ele.getAttribute("data-sm-final-opac") : def_finalOpacity;
				const finalTransform    = ele.getAttribute("data-sm-final-transform") ? ele.getAttribute("data-sm-final-transform") : def_finalTransform;

				ele.style.transition               = animationTime;
				ele.style.transitionTimingFunction = animationEaseType;
				ele.style.opacity                  = finalOpacity;
				ele.style.transform                = finalTransform;

				counter++
			};
		});

		// Remove animated elements from the nodelist
		animElementArr = [].slice.call(animElementArr, counter)

		// When all SimpleMotion elements have been animated and the nodelist is empty, clear our scrollInterval
		if (animElementArr.length <= 0) clearInterval(scrollInterval);
	};


	// Fire handleAnimation on page load to animate any in-view SimpleMotion elements before the user scrolls
	handleAnimation();
};