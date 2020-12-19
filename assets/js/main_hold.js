window.onload = function() {
	/** Data attributes reference list. Set default values below.
	 * [required] data-sm                         : Enables Simple Motion animation on HTML elements.
	 * [optional] data-sm-ease="value"            : Transition ease type. Expected value: "ease" | "linear" | "ease-in" | "ease-out" | "ease-in-out" | "cubic-bezier(n,n,n,n)"
	 * [optional] data-sm-time="value"            : Duration of animation. Expected value: Number followed by time denotation, e.g. "2000ms" | "500ms" | "2s" | "0.5s" 
	 * [optional] data-sm-dist="value"            : Distance element will travel (followed by data-sm-unit unit of measurement). Expected value: Number, e.g. "250" | "10"
	 * [optional] data-sm-unit="value"            : Unit of measurement for animation distance. Expected value: "px" | "%" | "rem" | "em" | "vw" | "vh"
	 * [optional] data-sm-start-opac="value"      : Opacity of the element before animation starts. Expected value: Number between 0-1, e.g. "1" | "0.5" | "0.33" | "0"
	 * [optional] data-sm-final-opac="value"      : Opacity of the element after animation completes. Expected value: Number between 0-1, e.g. "1" | "0.5" | "0.33" | "0"
	 * [optional] data-sm-start-transform="value" : Customize the initial CSS transform. Expected value: Any valid CSS transform, e.g. "translate(0, 30px) rotate(45deg)" | "translate(25px, 25px) scale(1.5)"
	 * [optional] data-sm-final-transform="value" : Customize the final CSS transform. Expected value: Any valid CSS transform, e.g. "translate(0, 250px) scale(2)" | "translate(0, 0) rotate(45deg)"
	 */


	// Default motion values
	const def_animationEaseType = "ease-in";
	const def_animationTime     = "1000ms";
	const def_distanceToTravel  = 30;
	const def_measurementUnit   = "px";
	const def_startingOpacity   = 0;
	const def_finalOpacity      = 1;
	const def_finalTransform    = "translate(0, 0)";


	// Constants
	const animInterval   = 100;
	const revealPosition = 0.8;


	// =============================================

	// const test = document.querySelector('.test')
	// const transform = getComputedStyle(test)
	// console.log(transform);

	// =============================================


	// Build our SimpleMotion nodelist from all HTML elements with the "data-sm" attribute
	let animElementArr = document.querySelectorAll("[data-sm]");

	debugger;

	// Setup starting CSS attributes for each element in the nodelist
	animElementArr.forEach(ele => {
		// const animationEaseType = ele.getAttribute("data-sm-ease");
		// const animationTime     = ele.getAttribute("data-sm-time");
		const distanceToTravel  = ele.getAttribute("data-sm-dist");
		const measurementUnit   = ele.getAttribute("data-sm-unit") ? ele.getAttribute("data-sm-unit") : def_measurementUnit;
		const startingOpacity   = ele.getAttribute("data-sm-start-opac");

		// Set motion attributes:                                 >  user provided values                                 > default values if no user provided value
		// ele.style.transitionTimingFunction  = (animationEaseType) ? `${animationEaseType}`                                : `${def_animationEaseType}`;
		// ele.style.transition                = (animationTime)     ? `${animationTime}`                                    : `${def_animationTime}`;
		ele.style.transform                 = (distanceToTravel)  ? `translate(0, ${distanceToTravel}${measurementUnit})` : `translate(0, ${def_distanceToTravel}${def_measurementUnit})`;
		ele.style.opacity                   = (startingOpacity)   ? `${startingOpacity}`                                  : `${def_startingOpacity}`;
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

			// const distanceToTravelAttr = ele.getAttribute("data-sm-dist");
			const distanceOffset = ele.getAttribute("data-sm-dist") ? ele.getAttribute("data-sm-dist") : def_distanceToTravel;
			const eleTop = ele.getBoundingClientRect().top + window.scrollY;
			
			if (window.scrollY > (eleTop - (windowInnerHeight * revealPosition) - distanceOffset)) {
				const animationEaseType = ele.getAttribute("data-sm-ease");
				const animationTime     = ele.getAttribute("data-sm-time");

				ele.style.transitionTimingFunction  = (animationEaseType) ? `${animationEaseType}` : `${def_animationEaseType}`;
				ele.style.transition                = (animationTime)     ? `${animationTime}`     : `${def_animationTime}`;
		
				const finalOpacity   = ele.getAttribute("data-sm-final-opac");
				const finalTransform = ele.getAttribute("data-sm-final-transform");

				ele.style.opacity   = finalOpacity ? finalOpacity : def_finalOpacity;
				ele.style.transform = finalTransform ? finalTransform : def_finalTransform;
				counter++
			};
		});

		// Remove animated elements from the nodelist
		animElementArr = [].slice.call(animElementArr, counter)

		// When all SimpleMotion elements have been animated and the nodelist is empty, clear our scrollInterval
		if (animElementArr.length <= 0) clearInterval(scrollInterval);
	};


	// Fire handleAnimation on page load to animate any in-view SimpleMotion elements before the user scrolls
	setTimeout(() => {handleAnimation()}, 0);
};