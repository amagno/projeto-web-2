export const errorParser = (message) => ({
  error: true,
  valid: false,
  message
})
export const successParser = (message = '') => ({
  error: false,
  valid: true,
  message
})