const submitBtn = document.querySelector('#submit-btn');
const emailField = document.querySelector('#input-field');
const apiKey = 'aa885f50ef57439d845df80027b3220d';
const errorLbl = document.querySelector('#error-label');
const image = document.querySelector('#newsletter__image-bg');
const loaderContainer = document.querySelector('.loading');



window.addEventListener('resize', () => {
    if (window.innerWidth >= 800) {
      image.src = 'assets/images/illustration-sign-up-desktop.svg';
    } else {
        image.src = 'assets/images/illustration-sign-up-mobile.svg';
    }
});
  
async function validateEmail() {
    if(!emailField.value) {
        alert('Input your email');
        return;
    }

    loaderContainer.style.display = 'grid';

    try {
        const response = await fetch(`https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${emailField.value}`);
        if(response.ok) {
            const data = await response.json();
            const {is_valid_format: {value}} = data;

            if(!value) {
                emailField.classList.add('active');
                errorLbl.classList.add('active');
                
                setTimeout(() => {
                    emailField.classList.remove('active');
                    errorLbl.classList.remove('active');
                }, 1300);

                loaderContainer.style.display = 'none';
            } else {
                loaderContainer.style.display = 'none';
                localStorage.setItem('user-email', emailField.value);
                window.location.href='index2.html'
            }
        }
    }catch(error) {
        console.log(error.message);
    }
}

submitBtn.addEventListener('click', validateEmail);