function Log (options) {
  this.fs = require('fs')
  this.os = require('os')
  this.options = options || {}
  if (this.options.name) {
    this.name = this.options.name
  } else {
    this.name = require('./package.json').name
  }
  this.hostname = (this.options.hostname) ? this.options.hostname : this.os.hostname()
  if (this.options.graylog) {
    this.graylog2 = require('graylog2')
    this.graylogger = new this.graylog2.graylog({ // eslint-disable-line new-cap
      servers: this.options.graylog,
      hostname: this.hostname,
      facility: this.name
    })
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
    if (this.options.graylog) {
      switch (tag) {
        case 'INFO':
          this.graylogger.info(message)
          break
        case 'NOTICE':
          this.graylogger.notice(message)
          break
        case 'WARN':
          this.graylogger.warning(message)
          break
        case 'ERROR':
          this.graylogger.error(message)
          break
        case 'FATAL':
          this.graylogger.critical(message)
          break
        case 'DEBUG':
          this.graylogger.debug(message)
          break
        default:
          this.graylogger.notice(message)
      }
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
