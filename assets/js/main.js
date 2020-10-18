// constants
const animInterval = 200;
const scrollIntoViewDenom = 0.8;
const defaultDistance = 40;


// master array of animated elements
let animElementArr = [...document.querySelectorAll("[data-sm]")];


// set ease type, opacity, ease type
animElementArr.forEach(ele => {
    const eastType = ele.getAttribute("data-sm-ease");
    const startingOpacity = ele.getAttribute("data-sm-opac");
    const distanceToTravel = ele.getAttribute("data-sm-dist");    

    ele.style.transitionTimingFunction = eastType ? `${eastType}` : "ease-out";
    ele.style.opacity= startingOpacity ? `${startingOpacity}` : "0";
    ele.style.transform = distanceToTravel ? `translate(0, ${distanceToTravel}px)` : `translate(0, ${defaultDistance}px)`;
});


// scrolling logic
let scrolling = false;
window.addEventListener("scroll", function(e) {
    if (animElementArr.length != 0) scrolling = true;
});


// when scrolling, fire f{scrollFadeHandler} every ${animInterval}
setInterval(() => {
    if (scrolling) {
        scrolling = false;
        scrollFadeHandler();
    }
}, animInterval);


scrollFadeHandler = () => {
    const windowInnerHeight = window.innerHeight;

    // for each element in the nodelist, check to see if it should be rendered
    animElementArr.forEach((ele, i) => {
        let eleTop = ele.getBoundingClientRect().top + window.scrollY;
        let eleOffset = ele.getAttribute("data-sm-dist") != null ? ele.getAttribute("data-sm-dist") : defaultDistance;
        if (window.scrollY > (eleTop - eleOffset - (windowInnerHeight * scrollIntoViewDenom))) {
            ele.style.opacity= "1";
            ele.style.transform = "translate(0, 0)";
            ele.setAttribute("data-sm", "complete");
        }
    });

    // remove the rendered elements from the master array
    animElementArr = animElementArr.filter(ele => {
        return ele.getAttribute("data-sm") != "complete";
    });

    console.log(animElementArr);
};


// late setup for transition on our elements
window.onload = () => {
    animElementArr.forEach(ele => {
        const transitionTime = ele.getAttribute("data-sm-time");
        ele.style.transition = transitionTime ? `all ${transitionTime}` : "all 750ms"
    });

    // fire the scroll handler once to load items that have been scrolled into view on refresh
    scrollFadeHandler();
}