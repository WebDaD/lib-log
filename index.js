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
  this.info = function (message, tags) {
    this.log('INFO', message, tags)
  }
  this.notice = function (message, tags) {
    this.log('NOTICE', message, tags)
  }
  this.fatal = function (message, tags) {
    this.log('FATAL', message, tags)
  }
  this.warn = function (message, tags) {
    this.log('WARN', message, tags)
  }
  this.error = function (message, tags) {
    this.log('ERROR', message, tags)
  }
  this.debug = function (message, tags) {
    this.log('DEBUG', message, tags)
  }
  this.log = function (tag, message, tags) {
    let tadd = ''
    if (typeof tags !== 'undefined') {
      if (Array.isArray(tags)) {
        tadd = '#' + tags.join(' #')
      } else if (tags.includes(' ')) {
        tadd = '#' + tags.split(' ').join(' #')
      } else if (tags.includes(',')) {
        tadd = '#' + tags.split(',').join(' #')
      } else {
        tadd = '#' + tags
      }
    }
    let msg = this.getDate() + '\t' + this.hostname + '\t' + this.name + '\t' + tag + '\t' + message + '\t' + tadd
    switch (tag) {
      case 'INFO':
        console.info(msg)
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
