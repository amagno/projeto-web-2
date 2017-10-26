export default (req, res, next) => {
  console.log('testing middleware')
  return next()
}