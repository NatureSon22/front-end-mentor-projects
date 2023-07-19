const featureBtn = document.querySelector('#feature-btn');
const companyBtn = document.querySelector('#company-btn');
const featureTab = document.querySelector('#feature-tab');
const companyTab = document.querySelector('#company-tab');
const imageGraphic = document.querySelector('.main-content__graphic');
const menuBtn = document.querySelector('#sidebar');
const closeBtn = document.querySelector('.close-icon');
const [featureArrow, companyArrow] = document.querySelectorAll('i');
const sideBar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
const featureSideBarBtn = document.querySelector('#feature-sidebar');
const companySideBarBtn = document.querySelector('#company-sidebar');
const featureSideBarTab = document.querySelector('.feature-sidebar-tab');
const companyeSideBarTab = document.querySelector('.company-sidebar-tab');


const sidebarTab = (tab, arrow) => {
  tab.classList.toggle('active');
  arrow.classList.toggle('active')
}

const showSideBar = () => {
  sideBar.classList.toggle('active');
  overlay.classList.toggle('active')
}

const handleSizeChange = () => {
  const contentMotto = document.querySelector('#content-motto');
  if(window.innerWidth <= 1000) {
    console.log('this')
    imageGraphic.src = 'images/image-hero-mobile.png';
  } else {
    imageGraphic.src = 'images/image-hero-desktop.png' ;
  }
  contentMotto.textContent = 'Make remote work';
}

const arrowRotate = (arrow) => {
  arrow.classList.toggle('active');
}

const showTab = (tab, arrow) => {
  tab.classList.toggle('active');
  arrowRotate(arrow);
}

featureBtn.addEventListener('click', () => {
  showTab(featureTab, featureArrow);
});

companyBtn.addEventListener('click', () => {
  showTab(companyTab, companyArrow);
});

menuBtn.addEventListener('click', showSideBar);
window.addEventListener('resize', handleSizeChange);
closeBtn.addEventListener('click', showSideBar);
featureSideBarBtn.addEventListener('click', () => sidebarTab(featureSideBarTab, featureSideBarBtn));
companySideBarBtn.addEventListener('click', () => sidebarTab(companyeSideBarTab, companySideBarBtn));

handleSizeChange();
