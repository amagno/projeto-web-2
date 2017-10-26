import expressHandlebars from 'express-handlebars'
import handlebarsIntl from 'handlebars-intl'
import path from 'path'



export const configureHbsView = (app) => {
  const hbs = expressHandlebars.create({
    defaultLayout: 'default',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '..', 'views', 'layouts'),
    partialsDir: path.join(__dirname, '..', 'views', 'partials')
  })
  app.engine('.hbs', hbs.engine)
  app.set('view engine', '.hbs')
  app.set('views', path.join(__dirname, '..', 'views'))
  handlebarsIntl.registerWith(hbs.handlebars)
  return hbs
}