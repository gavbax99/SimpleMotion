// constants
const animInterval = 200;
const scrollIntoViewDenom = 0.85;


// setup anim array


// setup anim effects for the nodelist
animElementArr.forEach(ele => {
    const transitionTime = ele.getAttribute("data-sm-time");
    const eastType = ele.getAttribute("data-sm-ease");
    const startingOpacity = ele.getAttribute("data-sm-opac");
    const distanceToTravel = ele.getAttribute("data-sm-dist");
    // delay before anim starts
    

    ele.style.transitionTimingFunction = eastType ? `${eastType}` : "ease-out";
    ele.style.opacity= startingOpacity ? `${startingOpacity}` : "0";
    ele.style.transform = distanceToTravel ? `translate(0, ${distanceToTravel}px)` : "translate(0, 40px)";
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

    // for each element in the nodelist, check to see if it should be rendered
    [...animElementArr].forEach((ele, i) => {

        // const offset = ele.getAttribute("data-sm-dist") != null ? parseInt(ele.getAttribute("data-sm-dist")) : 0;
        // eleTop = ele.getBoundingClientRect().top + window.scrollY + offset;

        eleTop = ele.getBoundingClientRect().top + window.scrollY + ele.getAttribute("data-sm-dist");
        if (window.scrollY > (eleTop - windowInnerHeight * scrollIntoViewDenom)) {
            ele.style.opacity= "1";
            ele.style.transform = "translate(0, 0)";
            ele.setAttribute("data-sm", "complete");
        }
    });
    

    // then remove it/the group from the array
    // animElementArr = [...animElementArr].filter.call(ele => {
    //     console.log(ele.getAttribute("data-sm", "complete"))
    //     return ele.getAttribute("data-sm", "complete");
    // });


    // animElementArr = [].slice.call(animElementArr, counter);
    console.log(animElementArr);
};

scrollFadeHandler();