const generateBtn = document.querySelector('[data-generate-advice]');
const advicetxt = document.querySelector('[data-advice]');
const advicenum = document.querySelector('[data-advice-number]');
const advicewrapper = document.querySelector('[data-container]')
const API_URL = 'https://api.adviceslip.com/advice';

generateBtn.addEventListener('click', generateAdvice);

function generateAdvice() {
    fetch(API_URL)
    .then(res => {
        if(res.ok){
           return res.json();
        }else {
            throw new Error('An error has occured. Please try again.');
        }
    }).then(data => {
        displayAdvice(data)
    }).catch(err => {
        console.log(err.message)
    })
}

advicewrapper.addEventListener('click', () => {
  navigator.clipboard.writeText(advicetxt.textContent)
    .then(() => {
      copyTextToClipboard('Text is copied to clipboard')
    })
});


function displayAdvice({slip:{id, advice}}) {
    advicenum.textContent = `ADVICE #${id}`;
    advicetxt.textContent = `“${advice}”`
}

function copyTextToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  
    Swal.fire({
      title: 'Text Copied!',
      text: 'Text is copied to clipboard',
      icon: 'success',
      timer: 2000, // Duration for the popup message to be displayed (in milliseconds)
      toast: true,
      position: 'top-end',
      showConfirmButton: false
    });
  }
  
  // Example usage
  const textToCopy = '127.0.0.1:5500 says';
  copyTextToClipboard(textToCopy);
  
