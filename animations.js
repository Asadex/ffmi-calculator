// Create observer on load
window.addEventListener('load',createObserver);

function createObserver(){
    let observer;

    let options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3
    };

    observer = new IntersectionObserver(handleIntersect, options);
}

// Create intersection handler
function handleIntersect(entries){
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let elem = entry.target;
      console.log(elem);
    }
  });
}

// Now we have to handle the intersection and observe