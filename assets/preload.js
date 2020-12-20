const preload = document.querySelector(".preload");
preload.style.opacity = 0;
setTimeout(()=> {
	preload.remove();
}, 333);