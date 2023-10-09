const get = (selector) => document.querySelector(selector);
const getAll = (selector) => document.querySelectorAll(selector);

const toggleElement = (element) => {
    element.classList.toggle('toggle');
};

const images = [
    'images/image-product-1.jpg',
    'images/image-product-2.jpg',
    'images/image-product-3.jpg',
    'images/image-product-4.jpg',
];

let chosenThumbnail = '';
let imgChosenThumbnail = '';
let currentIndex = 0;
let effectCurrentIndex = 0;
let numItem = 0;
let addedItem = '';

const thumbnailImages = getAll('.page-product__list__image div');
const productImg = get('.page-product__main__image img');
const imgEffect = get('.img-effect');
const imgEffectMainImg = get('.img-effect__main-img img');
const imgEffecImgList = getAll('.img-effect__main-list div');
const exitImgEffect = get('.fa-xmark');
const prevImgEffect = get('.button-left-effect');
const nextImgEffect = get('.button-right-effect');
const sidebarBtn = get('.menu-burger');
const sideBar = get('.toggle-effect .effect');
const sideBarExit = get('.toggle-effect .exit');
const sideBarBg = get('.bg-effect');
const cartBtn = get('.page-header__user__cart');
const cartContainer = get('.page-header__cart');
const addToCartBtn = get('.add-to-cart');
const addItem = get('.add');
const subtractItem = get('.subtract');
const productItem = get('.num-item');
const emptyCartLbl = get('.empty-item');
const loader = get('.loader');
const cartItemNumber = window.getComputedStyle(cartBtn, '::before');
const prevMainImg = document.querySelector('.button-left');
const nextMainImg = document.querySelector('.button-right');

const changeImage = (index) => {
    imgEffectMainImg.src = images[index];
    if (imgChosenThumbnail) {
        imgChosenThumbnail.classList.remove('toggle');
    }
    toggleElement(imgEffecImgList[index]);
    imgChosenThumbnail = imgEffecImgList[index];
};

const updateEffectIndex = (delta) => {
    const newIndex = effectCurrentIndex + delta;
    if (newIndex >= 0 && newIndex < images.length) {
        effectCurrentIndex = newIndex;
        changeImage(effectCurrentIndex);
    }
};

const handleThumbnailClick = (index) => {
    if (chosenThumbnail) {
        chosenThumbnail.classList.remove('toggle');
    }
    toggleElement(thumbnailImages[index]);
    chosenThumbnail = thumbnailImages[index];
    productImg.src = images[index];
    currentIndex = index;
    effectCurrentIndex = index;
};

const createItemLabel = () => {
    const productPrice = 125.00;
    const getPrice = () => numItem * productPrice;

    const itemInfo = document.createElement('div');
    itemInfo.innerHTML = `
        <div class="item">
            <div class="item-info page-flex">
            <div class="item-img"><img src=${images[currentIndex]} alt=""></div>
            <div class="page-grid">
                <p class="item-name">Fall Limited Edition Sneakers</p>
                <p>$125.00 x ${numItem} <span class="item-price">$${getPrice().toFixed(2)}</span></p>
            </div>
            <div class="item-delete"><img src="images/icon-delete.svg" alt=""></div>
            </div>
            <button class="item-checkout">Checkout</button>
        </div>
    `; 

    const checkoutBtn = itemInfo.querySelector('.item-checkout');
    const deleteButton = itemInfo.querySelector('.item-delete');
    deleteButton.addEventListener('click', () => {
        const item = get('.item');
        item.remove();
        toggleElement(emptyCartLbl);
        cartBtn.setAttribute('data-num', '');
        addedItem = '';
    });

    checkoutBtn.addEventListener('click', () => { 
        toggleElement(checkoutBtn);
        cartBtn.setAttribute('data-num', '');
        addedItem = '';
    });

    const prevItem = cartContainer.querySelector('.item');
    if (prevItem) {
        prevItem.remove(); 
    }
    emptyCartLbl.classList.remove('toggle');
    cartContainer.append(itemInfo.querySelector('.item'));
    addedItem = itemInfo
}

sidebarBtn.addEventListener('click', () => { 
    toggleElement(sideBar);
    toggleElement(sideBarBg);
});

sideBarExit.addEventListener('click', () => {
    toggleElement(sideBar);
    toggleElement(sideBarBg);
});

cartBtn.addEventListener('click', () => {
    toggleElement(cartContainer);
    if(numItem == 0 && !addedItem) {
        toggleElement(emptyCartLbl);
    }
});

thumbnailImages.forEach((img, index) => {
    img.addEventListener('click', () => handleThumbnailClick(index));
});

productImg.addEventListener('click', () => {
    if (window.innerWidth >= 750) {
        if (imgChosenThumbnail) {
            imgChosenThumbnail.classList.remove('toggle');
        }
        imgEffectMainImg.src = images[currentIndex];
        toggleElement(imgEffecImgList[currentIndex]);
        toggleElement(imgEffect);
        imgChosenThumbnail = imgEffecImgList[currentIndex];
    }
});

exitImgEffect.addEventListener('click', () => {
    toggleElement(imgEffect)
    effectCurrentIndex = currentIndex;
});

prevImgEffect.addEventListener('click', () => updateEffectIndex(-1));
nextImgEffect.addEventListener('click', () => updateEffectIndex(1));

addToCartBtn.addEventListener('click', (e) => {
    if(numItem > 0) {
        toggleElement(loader);
        toggleElement(addToCartBtn);
        setTimeout(() => { 
            createItemLabel();
            toggleElement(loader);
            toggleElement(addToCartBtn);
            cartBtn.setAttribute('data-num', numItem);
            productItem.textContent = 0;
            numItem = 0;
        }, 1500);
    }
})

addItem.addEventListener('click', () => productItem.textContent = ++numItem);
subtractItem.addEventListener('click', () => productItem.textContent = Number(productItem.textContent) > 0 ? --numItem : 0);

prevMainImg.addEventListener('click', () => {
    currentIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    productImg.src = images[currentIndex];
});
nextMainImg.addEventListener('click', () => {
    currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : images.length - 1;
    productImg.src = images[currentIndex];
});

window.addEventListener('resize', () => {
    if (window.innerWidth < 750) {
        imgEffect.classList.remove('toggle');
    } else {
        sideBar.classList.remove('toggle');
    }
});
