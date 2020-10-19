// default motion values
const def_transitionTime    = "1000ms"
const def_easeType          = "ease-in"
const def_unitMeasurement   = "px"
const def_distanceToTravel  = 30
const def_startingOpacity   = 0
const def_finalOpacity      = 1


// constants
const animInterval    = 200
const revealPosition  = 0.5


// =============================================
// =============================================
// =============================================


// Build our nodelist from all HTML elements with the "data-sm" attribute
let animElementArr = document.querySelectorAll("[data-sm]")


// setup anim effects for the nodelist
animElementArr.forEach(ele => {
    const distanceToTravel  = ele.getAttribute("data-sm-dist")
    const easeType          = ele.getAttribute("data-sm-ease")
    const transitionTime    = ele.getAttribute("data-sm-time")
    const startingOpacity   = ele.getAttribute("data-sm-opac")

    const unitMeasurement   = (ele.getAttribute("data-sm-unit")) ? ele.getAttribute("data-sm-unit") : def_unitMeasurement

    // Set motion attributes:                                 >  user input values                                        > default values
    ele.style.transform                 = (distanceToTravel)  ? `translate(0, ${distanceToTravel}${unitMeasurement})`     : `translate(0, ${def_distanceToTravel}${def_unitMeasurement})`
    ele.style.transitionTimingFunction  = (easeType)          ? `${easeType}`                                             : `${def_unitMeasurement}`
    ele.style.transition                = (transitionTime)    ? `transform ${transitionTime}, opacity ${transitionTime}`  : `transform ${def_transitionTime}, opacity ${def_transitionTime}`
    ele.style.opacity                   = (startingOpacity)   ? `${startingOpacity}`                                      : `${def_startingOpacity}`
})


// scrolling listener
let scrolling = false;
window.addEventListener("scroll", function(e) {
    if (animElementArr.length >= 1) scrolling = true;
});


// when scrolling, fire our scrollHandler function every ${animInterval}
let scrollInterval = setInterval(() => {
    if (scrolling) {
        scrolling = false;
        scrollHandler();
    };
}, animInterval);


// Where the magic happens
scrollHandler = () => {
    // Change in window height can cause unexpected behavior so we calculate the window's height every scrollInterval
    const windowInnerHeight = window.innerHeight;

    // When a simplemotion element is triggered, the counter increments; triggered elements will be removed from the nodelist 
    let counter = 0;
    
    // For each element in the nodelist, check to see if it should trigger based on scroll position
    animElementArr.forEach(ele => {
        const distanceToTravelAttr = ele.getAttribute("data-sm-dist");
        const distanceOffset = (distanceToTravelAttr != null) ? distanceToTravelAttr : def_distanceToTravel;
        eleTop = ele.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY > (eleTop - (windowInnerHeight * revealPosition) - distanceOffset)) {

            ele.style.opacity = def_finalOpacity;
            ele.style.transform = "translate(0, 0)";

            counter++
        };
    });

    // Remove triggered elements from the nodelist
    animElementArr = [].slice.call(animElementArr, counter)

    // When all simplemotion elements have been triggered and the nodelist is empty, clear our scrollInterval
    if (animElementArr.length <= 0) clearInterval(scrollInterval);
};


// Fire scrollHandler on page load to trigger any relevant simplemotion elements before the user scrolls
scrollHandler();