// Ex 1
document.getElementById("ex1").onclick = () => {
  let ex1 = document.getElementById("ex-1-1");
  let ex2 = document.getElementById("ex-1-2");
  
  ex1.style.transitionDuration = "0ms";
  ex1.style.opacity = 0;
  ex1.style.transform = "translate(50px, 0px)";
  
  ex2.style.transitionDuration = "0ms";
  ex2.style.opacity = 0;
  ex2.style.transform = "translate(-50px, 0px)";

  setTimeout(() => {
    ex1.style.transitionDuration = "1000ms";
    ex1.style.opacity = 1;
    ex1.style.transform = "translate(0px, 0px)";

    ex2.style.transitionDuration = "1000ms";
    ex2.style.opacity = 1;
    ex2.style.transform = "translate(0px, 0px)";
  }, 75);
};

// Ex 2
document.getElementById("ex2").onclick = () => {
  let ex1 = document.getElementById("ex-2-1");
  let ex2 = document.getElementById("ex-2-2");
  let ex3 = document.getElementById("ex-2-3");
  
  ex1.style.transitionDuration = "0ms";
  ex1.style.opacity = 0;
  ex1.style.transform = "translate(0px, 30px)";
  
  ex2.style.transitionDuration = "0ms";
  ex2.style.opacity = 0;
  ex2.style.transform = "translate(0px, 30px)";
  
  ex3.style.transitionDuration = "0ms";
  ex3.style.opacity = 0;
  ex3.style.transform = "translate(0px, 30px)";


  setTimeout(() => {
    ex1.style.transitionDuration = "1000ms";
    ex1.style.opacity = 1;
    ex1.style.transform = "translate(0px, 0px)";
    
    ex2.style.transitionDuration = "3000ms";
    ex2.style.opacity = 1;
    ex2.style.transform = "translate(0px, 0px)";
    
    ex3.style.transitionDuration = "5000ms";
    ex3.style.opacity = 1;
    ex3.style.transform = "translate(0px, 0px)";
  }, 75);
};

// Ex 3
document.getElementById("ex3").onclick = () => {
  let ex1 = document.getElementById("ex-3-1");
  let ex2 = document.getElementById("ex-3-2");
  
  ex1.style.transitionDuration = "0ms";
  ex1.style.opacity = 0;
  ex1.style.transform = "translate(0px, 50px)";
  
  ex2.style.transitionDuration = "0ms";
  ex2.style.opacity = 0;
  ex2.style.transform = "translate(0px, 50px)";

  setTimeout(() => {
    ex1.style.transitionDuration = "1000ms";
    ex1.style.opacity = 1;
    ex1.style.transform = "translate(0px, 0px)";
  }, 75);

  setTimeout(() => {
    ex2.style.transitionDuration = "1000ms";
    ex2.style.opacity = 1;
    ex2.style.transform = "translate(0px, 0px)";
  }, 2000);
};

// Ex 4
document.getElementById("ex4").onclick = () => {
  let ex1 = document.getElementById("ex-4-1");
  
  ex1.style.transitionDuration = "0ms";
  ex1.style.opacity = 0;
  ex1.style.transform = "translate(-200px, 100px)";

  setTimeout(() => {
    ex1.style.transitionDuration = "2000ms";
    ex1.style.opacity = 1;
    ex1.style.transform = "translate(0, 0) scale(1.5) rotate(360deg)";
  }, 75);
};

// Ex 5
document.getElementById("ex5").onclick = () => {
  let ex1 = document.getElementById("ex-5-1");
  let ex2 = document.getElementById("ex-5-2");
  let ex3 = document.getElementById("ex-5-3");
  
  ex1.style.transitionDuration = "0ms";
  ex1.style.opacity = 0;
  ex1.style.transform = "translate(0px, 30px)";
  
  ex2.style.transitionDuration = "0ms";
  ex2.style.opacity = 0;
  ex2.style.transform = "translate(0px, 30px)";
  
  ex3.style.transitionDuration = "0ms";
  ex3.style.opacity = 0;
  ex3.style.transform = "translate(0px, 30px)";


  setTimeout(() => {
    ex1.style.transitionDuration = "1000ms";
    ex1.style.opacity = 1;
    ex1.style.transform = "translate(0px, 0px)";
    
    ex2.style.transitionDuration = "1000ms";
    ex2.style.opacity = 1;
    ex2.style.transform = "translate(0px, 0px)";
    
    ex3.style.transitionDuration = "1000ms";
    ex3.style.opacity = 1;
    ex3.style.transform = "translate(0px, 0px)";
  }, 75);
};