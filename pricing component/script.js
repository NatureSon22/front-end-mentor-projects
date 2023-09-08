const toggleButton = document.querySelector('.header__toggle > div');
const prices = document.querySelectorAll('.card-section__price');

let isClicked = false;

const displayPrice = () => {
    const randomEffect = () => {
        prices.forEach(price => {
            const randomPrice = Math.random() * 49 + Math.random() * 250;
            price.innerHTML = `<span>$</span>${randomPrice.toFixed(2)}`;
        });
        
    }

    const interval = setInterval(randomEffect, 60);
    setTimeout(() => {
        clearInterval(interval);

        if(isClicked) {
            prices[0].innerHTML = `<span>$</span>${19.99}`;
            prices[1].innerHTML = `<span>$</span>${24.99}`;
            prices[2].innerHTML = `<span>$</span>${39.99}`;
        } else {
            prices[0].innerHTML = `<span>$</span>${199.99}`;
            prices[1].innerHTML = `<span>$</span>${249.99}`;
            prices[2].innerHTML = `<span>$</span>${399.99}`;
        }

        isClicked = !isClicked;

    }, 800);
}

toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('active');
    displayPrice();
});