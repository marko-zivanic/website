function animatebutton() {
    const changingText = document.getElementById('pozovite');
    
    changingText.style.animation = 'change-text 0.5s forwards'; // Start the animation

    // Change the text content after a delay
    setTimeout(() => {
      if(changingText.textContent === "POZOVITE NAS"){
        changingText.textContent ='064 9342714'
      }
      else{
        changingText.textContent ='POZOVITE NAS'
      }
    }, 250); // Adjust the delay (in milliseconds) based on your animation duration
    setTimeout(() => {
    changingText.style.animation = 'none';
    }, 500);

}

const observer = new IntersectionObserver((entries) =>{
  entries.forEach((entry) =>{
    console.log(entry);
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
    else{
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));
