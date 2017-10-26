import validator from 'validator'
import { errorParser, successParser } from '../utils/parseError'



export const registerFormValid = value => {
  if (!validator.isLength(value.name, 3)) {
    return errorParser('digite um nome valido!')
  }
  if (!validator.isEmail(value.email)) {
    return errorParser('digite um e-mail valido!')
  }
  if (!validator.isLength(value.password, 3)) {
    return errorParser('digite uma senha valida!')
  }
  return successParser()
}
export const loginFormValid = value => {
  if (!validator.isEmail(value.email)) {
    return errorParser('digite um e-mail valido!')    
  }
  if (!validator.isLength(value.password, 3)) {
    return errorParser('digite uma senha valida!')    
  }
  return successParser()
}