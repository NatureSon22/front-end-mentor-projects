const inputBar = document.querySelector('.input-bar');
const submitButton = document.querySelector('.submit-button');
const linkContainer = document.querySelector('.page-main_container'); 
const inputContainer = document.querySelector('.page-main_input');
const spinner = document.querySelector('.lds-container');
const deleteArea = document.querySelector('.page-delete-area');
const floatingNavButton = document.querySelector('.hamburger');
const floatElement = document.querySelector('.mobile-nav');
const floatContainer = document.querySelector('.mobile-nav-container');



let storedLinks = JSON.parse(localStorage.getItem('links')) || 
[
    {
        originalUrl: 'https://in.pinterest.com/pin/103934703889050207/',
        shortenedUrl: 'https://shrtco.de/yxbvJA'
    },
    {
        originalUrl: 'https://in.pinterest.com/pin/eu-sei-kpop-hum--633600241329521085/',
        shortenedUrl: 'https://shrtco.de/Ax9xqa'
    },
    {
        originalUrl: 'https://m.media-amazon.com/images/M/MV5BMDZiNGU5NGUtODc4Ni00M2FiLWJlN2QtOTYyMTk4MTBjMWRhXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
        shortenedUrl: 'https://shrtco.de/MAl7xE'
    }
];

const toggleActiveClass = (element) => {
    element.classList.toggle('active');
}

const displayLinks = () => {
    storedLinks.forEach((link, index) => {
        createLinkTile(link, index);
    });
}

const updateLinks = () => {
    const linkElements = document.querySelectorAll('.page-main_link');
    linkElements.forEach(element => {
        addFunctionToButton(element);
    });
}

const dragActions = (tile, index) => {
    const customDragImage = document.createElement('div');
    const shortenedUrl = tile.querySelector('.shortened-link').textContent;

    tile.addEventListener('dragstart', e => {
        customDragImage.innerHTML = `
            <div class="custom-image">
                <i class="fa-solid fa-link"></i>
                <p class="shortened-link">${shortenedUrl}</p>
            </div>
        `
        toggleActiveClass(deleteArea);

        document.body.appendChild(customDragImage);
        e.dataTransfer.setData('text/plain', index);
        e.dataTransfer.setDragImage(customDragImage, 0, 0);
    });

    tile.addEventListener('dragend', e => {
        toggleActiveClass(deleteArea);
    });
}

const addFunctionToButton = (element) => {
    const copyButton = element.querySelector('.copy-button');
    const shortenedUrlElement = element.querySelector('.shortened-link');

    copyButton.addEventListener('click', () => {
        const copyText = copyButton.classList.contains('active') ? '' : shortenedUrlElement.textContent;

        navigator.clipboard.writeText(copyText)
        .then(() => {
            copyButton.textContent = copyText ? 'Copied!' : 'Copy';
            toggleActiveClass(copyButton);
        })
        .catch(error => {
            console.error('Clipboard operation failed:', error);
        });
    });
}

const createLinkTile = ({originalUrl, shortenedUrl}, index) => {
    const tile = document.createElement('div');
    tile.innerHTML = `
        <div class="page-main_link flex" draggable=true>
            <p>${originalUrl}</p>
            <div class="flex">
                <p class="shortened-link">${shortenedUrl}</p>
                <button class="copy-button">Copy</button>
            </div>
        </div>
    `;

    dragActions(tile.firstElementChild, index);
    linkContainer.appendChild(tile.firstElementChild);

    updateLinks();
}

const getShortenedUrl = async (originalUrl) => {
    try {
        const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${originalUrl}`);

        if (!response.ok) {
            throw new Error("Oops! We couldn't shorten the link at the moment. Please try again later");
        }

        const data = await response.json();
        const { result: { full_short_link } } = data;

        const link = {
            originalUrl,
            shortenedUrl: full_short_link
        };

        storedLinks.push(link);
        localStorage.setItem('links', JSON.stringify(storedLinks));
        createLinkTile(link, storedLinks.length - 1); 

        inputBar.value = '';
    } catch (error) {
        errorEffect(error.message);
    }
};

const emptyInput = (success) => {
    let time = success ? 700 : 900;

    setTimeout(() => {
        inputBar.value = '';
    }, time)
}

const errorEffect = (errorMessage) => {
    toggleActiveClass(inputContainer);
    toggleActiveClass(inputBar);
    inputBar.value = errorMessage;

    setTimeout(() => {
        toggleActiveClass(inputContainer);
        toggleActiveClass(inputBar);
        inputBar.value = '';
    }, 1200);
};

submitButton.addEventListener('click', () => {
    if (inputBar.value.length === 0) {
        errorEffect('Please input a link'); 
    } else {
        getShortenedUrl(inputBar.value);
        toggleActiveClass(spinner);
        toggleActiveClass(submitButton);

        setTimeout(() => { 
            toggleActiveClass(spinner);
            toggleActiveClass(submitButton);
        }, 820);
    }
});

const start = (() => {
    window.addEventListener('resize', () => {
        const windowWidth = window.innerWidth;
    
        if (windowWidth > 790 && floatElement.classList.contains('active')) {
            floatElement.classList.remove('active');
        }

    });
    
    console.log(floatElement)

    deleteArea.addEventListener('dragover', e => {
        e.preventDefault();
    });
    
    deleteArea.addEventListener('drop', e => {
        e.preventDefault();
    
        const elementIndex = e.dataTransfer.getData('text/plain');
       
        storedLinks.splice(elementIndex, 1);
        localStorage.setItem('links', JSON.stringify(storedLinks));
        linkContainer.innerHTML = '';
        displayLinks();
    });

    floatingNavButton.addEventListener('click', () => toggleActiveClass(floatElement));
    
    displayLinks();
})();

