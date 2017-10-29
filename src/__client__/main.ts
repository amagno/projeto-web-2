const message = document.getElementById('message');

if (message) {
  message.style.cursor = 'pointer';
  message.addEventListener('click', (event) => {
    message.innerHTML = '';
  });
}
