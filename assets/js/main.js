// constants
const animInterval = 200;
const scrollIntoViewDenom = 0.85;


// setup anim array
let animElementArr = document.querySelectorAll("[data-sm]");


// setup anim effects for the nodelist
animElementArr.forEach(ele => {
    const transitionTime = ele.getAttribute("data-sm-time");
    const eastType = ele.getAttribute("data-sm-ease");
    const startingOpacity = ele.getAttribute("data-sm-opac");
    const distanceToTravel = ele.getAttribute("data-sm-dist");

    ele.style.transitionTimingFunction = eastType ? `${eastType}` : "ease-in";
    ele.style.opacity= startingOpacity ? `${startingOpacity}` : "0";
    ele.style.transform = distanceToTravel ? `translate(0, ${distanceToTravel})` : "translate(0, 40px)";
    ele.style.transition = transitionTime ? `transform ${transitionTime}` : "transform 750ms";
});

animElementArr.forEach(ele => {
    const transitionTime = ele.getAttribute("data-sm-time");
    ele.style.transition = transitionTime ? `all ${transitionTime}` : "all 750ms";
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

    // counter to determine what to remove from the array
    let counter = 0;
    
    // for each element in the nodelist, check to see if it 
    // should be faded. if so, fade it in and increment the counter
    [...animElementArr].forEach((ele, i) => {
        eleTop = ele.getBoundingClientRect().top + window.scrollY;
        if (window.scrollY > (eleTop - windowInnerHeight * scrollIntoViewDenom)) {
            ele.style.opacity= "1";
            ele.style.transform = "translate(0, 0)";
            counter++;
        }
    });

    // then remove it/the group from the array
    animElementArr = [].slice.call(animElementArr, counter);
}

scrollFadeHandler();