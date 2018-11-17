import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import path from 'path'

import { requestLogger, enableAllCors } from './middleware'

const app = express()

const defaultConfig = {
  port: process.env.PORT || 3000,
  verbose: process.env.VERBOSE === 'true',
}

const nodeEnv = process.env.NODE_ENV || 'development'
const isDev = nodeEnv === 'development'

let serverInstance

export function startServer (config = defaultConfig) {
  console.log('Starting server')

  let webpackDevMiddleware

  if (isDev) {
    console.log('Webpack processing...')
    const webpack = require('webpack')
    const webpackConfig = require('../webpack.config')
    const compiler = webpack(webpackConfig)

    webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      index: 'index.html',
      hot: true,
      noInfo: true,
      stats: {
        colors: true
      }
    })
    const webpackHotMiddleware = require('webpack-hot-middleware')(compiler)

    app.use(webpackDevMiddleware)
    app.use(webpackHotMiddleware)

    app.use(requestLogger)
    app.use(enableAllCors)

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())

    app.get('/favicon.ico', (req, res) => res.status(204))

    app.all('*', (req, res) => {
      res.write(webpackDevMiddleware.fileSystem.readFileSync(path.join(__dirname, '..', '..', 'build', 'index.html')))
      res.end()
    })

    console.log(`Server currently listening on port ${config.port}`)
    serverInstance = http.createServer(app).listen(config.port)
  }
}

export function stopServer () {
  if (serverInstance) {
    console.log('Stopping simulator server.')
    return serverInstance.close()
  }
  console.log('Server is not currently running.')
}

startServer()
