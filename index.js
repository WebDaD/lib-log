module.exports = function (options) {
  this.moment = require('moment')
  this.path = require('path')
  this.fs = require('fs')
  this.os = require('os')
  this.options = options || {}
  this.name = (this.options.name) ? this.options.name : this.path.basename(this.path.dirname(require.main.filename))
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
    let msg = this.moment().format('YYYY-MM-DDTHH:mm:ss') + '\t' + this.hostname + '\t' + this.name + '\t' + tag + '\t' + message
    switch (tag) {
      case 'INFO':
        console.log(msg)
        break
      case 'WARN':
        console.warn(msg)
        break
      case 'ERROR':
        console.error(msg)
        break
      case 'DEBUG':
        console.log(msg)
        break
      default:
        console.log(msg)
    }
    if (this.options.file) {
      this.fs.appendFileSync(this.options.file, msg + '\n')
    }
    if (this.options.graylog) {
      switch (tag) {
        case 'INFO':
          this.graylogger.info(msg)
          break
        case 'WARN':
          this.graylogger.warning(msg)
          break
        case 'ERROR':
          this.graylogger.error(msg)
          break
        case 'DEBUG':
          this.graylogger.debug(msg)
          break
        default:
          this.graylogger.notice(msg)
      }
    }
  }
  return this
}
