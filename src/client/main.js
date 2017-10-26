import io from 'socket.io-client'
import './login'
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for(var i = this.length - 1; i >= 0; i--) {
      if(this[i] && this[i].parentElement) {
          this[i].parentElement.removeChild(this[i]);
      }
  }
}

const socket = io('http://localhost:3000')

const MessageELement = (msg) => {
  return `<span><b>[Message]</b>${msg}</span>`
}
const container = document.getElementById('message')
socket.on('message', (message) => {
  localStorage.setItem('message', message)
})
if (localStorage.getItem('message')) container.innerHTML = MessageELement(localStorage.getItem('message'))

setTimeout(() => {
  localStorage.removeItem('message') 
  container.innerHTML = ''
}, 5000)