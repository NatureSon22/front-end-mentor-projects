const fileField = document.querySelectorAll('input');
const loaderBar = document.querySelector('.container-data__loader');
const leftData = document.querySelector('.mb');
const usedMBLabel = document.querySelector('.used-mb');

const updateDataAnimation = (sizeInMB, maxSize) => {
    const interval = setInterval(() => {
        leftData.textContent = parseInt(leftData.textContent) - 1;
    }, 5);

    setTimeout(() => {
        clearInterval(interval);
        leftData.textContent = parseInt(leftData.textContent) - sizeInMB;
        usedMBLabel.textContent = `${maxSize - leftData.textContent} MB`;
    }, 1000);
}

const addLength = (sizeInMB) => {
    const maxSize = 1000; 
    const newWidth = Math.min(maxSize, sizeInMB);
    loaderBar.style.width = `${newWidth}px`;
    updateDataAnimation(sizeInMB, maxSize);
};

fileField.forEach(field => {
    field.addEventListener('change', () => {
        const size = Array.from(field.files).reduce((acc, file) => acc + file.size, 0);
        const mb = size / (1024 * 1024); // Convert from bytes to megabytes
        addLength(Math.floor(mb));
    });
});
