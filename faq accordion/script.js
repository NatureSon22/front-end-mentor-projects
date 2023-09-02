const accordionBox = document.querySelectorAll('.accordion__box');

const toggleActiveClass = (...element) => {
  element.forEach(el => el.classList.toggle('active'))
};

accordionBox.forEach(box => {
  const accordionHeader = box.querySelector('div:nth-child(1) p');
  const accordionPanelArrow = box.querySelector('div:nth-child(1) img');
  const accordionContent = box.querySelector('div:nth-child(2)');


  box.addEventListener('click', () => toggleActiveClass(accordionHeader, accordionPanelArrow, accordionContent))
});