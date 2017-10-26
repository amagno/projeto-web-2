export const configureMiddlewares = (middewares = [], app) => {
  middewares.forEach(middleware => {
    if (typeof middleware === 'function') {
      console.log('configure middleware')
      app.use(middleware)
    }
  })
}