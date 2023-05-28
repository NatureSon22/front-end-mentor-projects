const btn = document.querySelectorAll('.rate-btn');
const submitBtn = document.querySelector('[data-submit-btn]');
let prevClicked = null
let score = 0;


Array.from(btn).forEach((element) => {
  element.addEventListener("click", () => {
    if (prevClicked !== null) {
      btn[prevClicked].classList.remove('rate-btn-active');
    }
    element.classList.add('rate-btn-active');
    score = element.textContent
    prevClicked = Array.from(btn).indexOf(element);
  });
});

submitBtn.addEventListener('click', () => {
  if(score == 0) {
    flickerBtn(); 
  }else {
    window.location.href =`index2.html?score=${score}`
  }
})


function flickerBtn () {
    btn.forEach(btn => {
      btn.classList.add('flicker-btn')
    })

  setTimeout(() => {
    btn.forEach(btn => {
      btn.classList.remove('flicker-btn')
    })
  }, 1000);
}

