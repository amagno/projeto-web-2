import path from 'path'

export const configureRoutes = (routes = [], app, io) => {
  routes.forEach(route => {
    const middlewares = route.middlewares || []
    if (middlewares.length) {
      route.middlewares.forEach(middleware => {
        const middlewareFunction = require(path.join(__dirname, '..', 'middlewares', middleware)).default
        app.use(route.path, middlewareFunction)
      })
    }
    if (route.render) {
      app[route.type](route.path, (req, res) => {
        res.render(route.render)
      })
    }
    if (route.controller) {
      const controllerText = route.controller.split('@')
      const controllerPath = path.join(__dirname, '..', 'controllers', controllerText[0] + '.js')
      console.log(controllerPath)
      const ControllerClass = require(controllerPath).default
      const controller = new ControllerClass(app, io)

      
      if (!controllerText[1] || typeof controller[controllerText[1]] === 'undefined') {
        throw new Error(`${controllerText[1] || 'define method of controle @method'} : function not define on controller`)
      }
      app[route.type](route.path, controller[controllerText[1]])
    }
  })
  return routes
}