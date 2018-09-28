function Log (options) {
  this.options = options || {}
  if (this.options.name) {
    this.name = this.options.name
  } else {
    this.name = require('./package.json').name
  }
  if (this.options.hostname) {
    this.hostname = this.options.hostname
  } else {
    let os = require('os')
    this.hostname = os.hostname()
  }
  if (this.options.file) {
    this.fs = require('fs')
  }
  this.info = function (message) {
    this.log('INFO', message)
  }
  this.notice = function (message) {
    this.log('NOTICE', message)
  }
  this.fatal = function (message) {
    this.log('FATAL', message)
  }
  this.warn = function (message) {
    this.log('WARN', message)
  }
  this.error = function (message) {
    this.log('ERROR', message)
  }
  this.debug = function (message) {
    this.log('DEBUG', message)
  }
  this.log = function (tag, message) {
    let msg = this.getDate() + '\t' + this.hostname + '\t' + this.name + '\t' + tag + '\t' + message
    switch (tag) {
      case 'INFO':
        console.log(msg)
        break
      case 'NOTICE':
        console.log(msg)
        break
      case 'WARN':
        console.warn(msg)
        break
      case 'ERROR':
        console.error(msg)
        break
      case 'FATAL':
        console.error(msg)
        break
      case 'DEBUG':
        console.log(msg)
        break
      default:
        console.log(msg)
    }
    if (this.options.file) {
      this.fs.appendFile(this.options.file, msg + '\n', function (error) {
        if (error) {
          console.error('Cannot write to File ' + this.options.file)
        }
      })
    }
  }
  this.getDate = function () {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000 // offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1)
    return localISOTime.split('.')[0].trim()
  }
  return this
}
module.exports = Log
