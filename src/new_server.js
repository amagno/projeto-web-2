import Application from './application'
import routes from './routes'
import middlewares from './middlewares'

new Application(routes, middlewares).listen(process.env.PORT, process.env.ADDRESS)