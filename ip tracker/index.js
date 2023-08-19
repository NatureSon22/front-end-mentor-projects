const input = document.querySelector('#input');
const button = document.querySelector('.button');
const dataInfo = document.querySelectorAll('.info'); 
const loader = document.querySelector('.loader-container');
const spinner = document.querySelector('.loader');
const errorText = document.querySelector('.loader-text');
const API_KEY = '00a2d3e27621478b946e4132424690f7';


let map;
let successful = true;

const showLoader = (loadArr = null) => {
    if(loadArr == null) return;

    loadArr.forEach(load => {
        if (Array.from(load.classList).includes('active')) {
            load.classList.remove('active');
        } else {
            load.classList.add('active');
        }
    });
}


const displayInfo = (...info) => {
    dataInfo.forEach((element, i) => {
        element.textContent = info[i] || '--';

        if (i === 2 && info[2] && typeof info[2].current_time === 'string') {
            element.textContent = info[2].current_time.substring(10) || '--';
        }        
    });
}

const initMap = (latitude = null, longitude = null) => {
    if(map) {
        map.remove();
    }

    if (latitude === null || longitude === null) {
        input.value = '';
        return;
    }

    map = L.map('map').setView([latitude, longitude], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const marker = L.marker([latitude, longitude]).addTo(map);
};


const fetchIP = async(ip = '') => {
    setTimeout(() => showLoader([loader, spinner]), 450);
    try {
        const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${API_KEY}&ip=${ip}`);

        if (!response.ok) {
            throw new Error('Error fetching IP geolocation data');
        }

        const data = await response.json(); 
        
        const placeData = {
            ip: data.ip,
            country_name: `${data.country_capital}, ${data.country_name}`,
            time_zone: data.time_zone,
            isp: data.isp,
            latitude: data.latitude,
            longitude: data.longitude
        }

        initMap(placeData.latitude, placeData.longitude);
        displayInfo(placeData.ip, placeData.country_name, placeData.time_zone, placeData.isp);
    } catch (error) {
        displayInfo();
        showLoader([loader, errorText]);
        successful = false;
    }
};

window.addEventListener('load',  () => {
    showLoader([loader, spinner]);
    setTimeout(fetchIP, 800);
});
button.addEventListener('click', () => {
    if(!successful) {
        showLoader([loader, errorText]);
        successful = true;
    }

    showLoader([loader, spinner]);
    setTimeout(() => fetchIP(input.value), 800);
})
input.addEventListener('keypress', e => {
    if(e.key === "Enter") {
        if(!successful) {
            showLoader([loader, errorText]);
            successful = true;
        }
    
        showLoader([loader, spinner]);
        setTimeout(() => fetchIP(input.value), 800);
    }
})