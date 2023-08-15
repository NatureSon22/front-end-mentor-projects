const dataFilter = document.querySelectorAll('.time');
const currentHour = document.querySelectorAll('.current-hour');
const previousHour = document.querySelectorAll('.previous-hour');


let timeData;
let prevFiltered = dataFilter[1];

async function fetchData() {
    try {
        const response = await fetch('http://localhost:5500/data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        timeData = data;
        
    } catch (err) {
        console.error('Error fetching data:', err);
    }
}

const numEffect = () => {
    const randomNum = () => {
        const length = currentHour.length;
        for(let i = 0; i < length; i++) {
            currentHour[i].textContent = `${Math.floor(Math.random() * 100 + 1)}hrs`;
            previousHour[i].textContent = `Last Week - ${Math.floor(Math.random() * 100 + 1)}hrs`;
        }
    };

    const interval = setInterval(randomNum, 70);
    setTimeout(() => {
        clearInterval(interval);
    }, 800);
}


const showData = (index, current, previous) => {
    currentHour[index].textContent = `${current}hrs`;
    previousHour[index].textContent = `Last Week - ${previous}hrs`;
}

const toggleActive = (filter) => {
    filter.classList.toggle('active');
    prevFiltered.classList.remove('active');
    prevFiltered = filter;
}


const filterData = (filter) => {
    let date = '';

    if (filter == 0) {
        date = 'daily';
    } else if (filter == 1) {
        date = 'weekly';
    } else {
        date = 'monthly';
    }

    setTimeout(() => {
        numEffect(); // Call numEffect first
        setTimeout(() => {
            timeData.forEach(data => {
                const { timeframes } = data;
                const current = timeframes[date].current;
                const previous = timeframes[date].previous;
                const index = Array.from(timeData).findIndex(e => e === data);
                showData(index, current, previous);
            });
        }, 800); // Delay for numEffect to finish
    }, 100);
};


dataFilter.forEach(filter => {
    filter.addEventListener('click', () => {
        const filterIndex = Array.from(dataFilter).findIndex(i => i === filter);
        filterData(filterIndex);

        toggleActive(filter);
    });
})


fetchData();