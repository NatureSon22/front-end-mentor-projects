const toggleButton = document.querySelector('#toggle-theme');
const toggleCircle = document.querySelector('.title-board__title-toggle-circle');
let clicked = false;

toggleButton.addEventListener('click', () => {
  toggleCircle.classList.toggle('active')
  
  if (!clicked) {
    document.documentElement.style.setProperty('--font-white', 'hsl(230, 17%, 14%)');
    document.documentElement.style.setProperty('--font-desaturated-blue', 'hsl(228, 12%, 44%)');
    document.documentElement.style.setProperty('--background-card', 'hsl(227, 47%, 96%)');
    document.documentElement.style.setProperty('--primary-background', 'hsl(0, 0%, 100%)');
    document.documentElement.style.setProperty('--hover-color', '#e1e3f0')
  } else {
    document.documentElement.style.setProperty('--font-white', 'hsl(0, 0%, 100%)');
    document.documentElement.style.setProperty('--font-desaturated-blue', 'hsl(228, 34%, 66%))');
    document.documentElement.style.setProperty('--background-card', 'hsl(228, 28%, 20%)');
    document.documentElement.style.setProperty('--primary-background', 'hsl(230, 17%, 14%)')
    document.documentElement.style.setProperty('--hover-color', '#333a56')
  }

  clicked = !clicked;
})
