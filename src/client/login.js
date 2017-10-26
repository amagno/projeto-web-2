import axios from 'axios'
import cookie from 'js-cookie'
import { loginFormValid } from '../user/validator'
const error = (message) => {
  const el = document.createElement('span')
  el.className = 'error-form'
  const msg = `<b style="color: red">${message}</b>`
  el.innerHTML = msg

  return el
}
const handlerSubmitLogin = (event) => {
  event.preventDefault()
  
  const errors = document.getElementsByClassName('error-form')
  if (errors.length > 0) {
    errors.remove()
  }
  const form = event.target
  const email = document.getElementsByName('email')[0]
  const password = document.getElementsByName('password')[0]
  // if(email.value.length < 3 || password.value.length < 3) {
  //   console.log('error')
  //   email.parentNode.insertBefore(error('error'), email.nextSibling)
  //   password.parentNode.insertBefore(error('error'), password.nextSibling)
  //   return
  // }
  const validator = loginFormValid({ email: email.value, password: password.value })
  if (validator.error) {
    email.parentNode.insertBefore(error(validator.message), email.nextSibling)
    password.parentNode.insertBefore(error(validator.message), password.nextSibling)
    return null
  }
  errors.remove()
  form.submit()

}
const handlerLogout = (event) => {
}

window.handlerSubmitLogin = handlerSubmitLogin
window.handlerLogout = handlerLogout