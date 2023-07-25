const inputField = Array.from(document.querySelectorAll('.input-field'));
const errorMessage = document.querySelectorAll('.input-error');
const category = document.querySelectorAll('.category');
const age = Array.from(document.querySelectorAll('.age')).reverse();
const computeBtn = document.querySelector('#compute-btn');
let isCLicked = false;
let deg = 0;

const displayError = (condition, index, message) => {
    if(condition) {
        errorMessage[index].textContent = message;
        category[index].classList.add('active');
        errorMessage[index].classList.add('active');
    } else {
        category[index].classList.remove('active');
        errorMessage[index].classList.remove('active');
    }
}

const validateFields = ([index, input, day, month, year]) => {
    if(input.value.length == 0) {
        displayError(true, index, 'This field is required');
        return false;
    }   
    
    if(!Number.isInteger(Number(input.value))) {
        displayError(true, index, 'Invalid input');
        return false;
    }
    if(index == 0) {
        const getLastDayOfMonth = ([year, month, day]) => {
            month = Math.max(0, Math.min(11, month - 1));
            const nextMonth = new Date(year, month , 1);
            const lastDayOfMonth = new Date(nextMonth.getTime() - 1);
            return lastDayOfMonth.getDate() >= day;
        }

        if (!getLastDayOfMonth([year, month, day])) {
            displayError(true, index, 'Must be a valid day');
            return false;
        }
    }

    if(index == 1) {
        if(month < 1 || month > 12) {
            displayError(true, index, 'Must be a valid month');
            return false;
        }
    }

    if(index == 2) {
        const date = new Date();
        if(year > date.getFullYear() || year < 1900) {
            displayError(true, index, 'Must be a valid year');
            return false;
        }
    }

    displayError(false, index, null);
    return true;
}

const checkInput = () => {
    let valid = true;
    let finalValid = true;

    const [day, month, year] = inputField.map(input => Number(input.value));

    for(const [index, input] of inputField.entries()) {
        valid = validateFields([index, input, day, month, year]);

        if(!valid) {
            finalValid = false
        }
    }

    return finalValid;
}



const displayAge = (computedAge) => {
    function randomizeAge() {
      age[0].textContent = Math.floor(Math.random() * 31) + 1;
      age[1].textContent = Math.floor(Math.random() * 12) + 1;
      age[2].textContent = Math.floor(Math.random() * 99) + 1;
    }
    
    let interval = setInterval(randomizeAge, 70);
    setTimeout(() => {
        clearInterval(interval);
        for(let i = computedAge.length - 1; i >= 0; i--) {
            if(computedAge[i] < 10) {
                age[i].textContent = `0${computedAge[i]}`;
            } else {
                age[i].textContent = computedAge[i];
            }
        }
        age.forEach(ageText => ageText.classList.add('active'));
    }, 800);

    isCLicked = !isCLicked;
}

const ageCompute = () => {
    let valid = checkInput();

    if(!valid) {
        return;
    }

    if (isCLicked) {
        age.forEach(ageText => ageText.classList.remove('active'));
        isCLicked = !isCLicked;
    }

    const currentData = new Date();
    const currentDate = [
        currentData.getDate(),
        currentData.getMonth() + 1,
        currentData.getFullYear(),
    ];
    const inputDate = Array.from(inputField).map(input => Number(input.value));
    let computedResult = [];

    if (inputDate[1] > currentDate[1]) {
        // If the inputted month is greater than the current month, adjust the year and month
        currentDate[1] += 12;
        currentDate[2] -= 1;
    }

    for (let i = 0; i < inputDate.length; i++) {
        computedResult.push(currentDate[i] - inputDate[i]);
    }

    displayAge(computedResult);
}

const rotateBtn = () => {
    gsap.to('#compute-btn', {
        rotate: deg += 360,
        duration: 1
    })
}


computeBtn.addEventListener('click', () => {
    rotateBtn();
    ageCompute();
});

