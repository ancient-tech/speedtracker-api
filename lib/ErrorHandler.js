'use strict'

const config = require(__dirname + '/../config')
const Raygun = require('raygun')

const ErrorHandler = function () {
  if (config.get('raygunApiKey').length) {
    this.client = new Raygun.Client().init({
      apiKey: config.get('raygunApiKey')
    })
  }
}

ErrorHandler.prototype.log = function (error) {
  if (this.client) {
    if (!(error instanceof Error)) {
      error = new Error(error)
    }

    this.client.send(error)
  } else {
    console.log(error)
  }
}

module.exports = (() => {
  return new ErrorHandler()
})()
