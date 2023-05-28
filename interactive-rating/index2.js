const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const score = urlParams.get('score');
const scoreTxt = document.querySelector('[data-score]');


scoreTxt.textContent = `You selected ${score} out of 5`
