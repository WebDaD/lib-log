function Log (options) {
  this.levels = {
    'DEBUG': 5,
    'INFO': 4,
    'NOTICE': 3,
    'WARN': 2,
    'ERROR': 1,
    'FATAL': 0
  }
  this.options = options || {}
  if (this.options.loglevel) { // DEBUG, INFO, NOTICE, WARN, ERROR, FATAL
    this.loglevel = this.levels[this.options.loglevel]
  } else {
    this.loglevel = 2
  }
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
    this.path = require('path')
    this.options.file = this.path.resolve(this.options.file)
    if (!this.fs.lstatSync(this.options.file).isFile()) {
      throw new Error(this.options.file + ' is not a File...')
    }
    try {
      this.fs.accessSync(this.options.file, this.fs.constants.R_OK | this.fs.constants.W_OK)
    } catch (err) {
      try {
        this.fs.writeFileSync(this.options.file, '')
      } catch (err) {
        throw new Error('Could not Create File ' + this.options.file + '\n' + err.toString())
      }
    }
  }
  this.info = function (message) {
    if (this.loglevel >= this.levels.INFO) {
      return this.log('INFO', message)
    } else {
      return ''
    }
  }
  this.notice = function (message) {
    if (this.loglevel >= this.levels.NOTICE) {
      return this.log('NOTICE', message)
    } else {
      return ''
    }
  }
  this.fatal = function (message) {
    if (this.loglevel >= this.levels.FATAL) {
      return this.log('FATAL', message)
    } else {
      return ''
    }
  }
  this.warn = function (message) {
    if (this.loglevel >= this.levels.WARN) {
      return this.log('WARN', message)
    } else {
      return ''
    }
  }
  this.error = function (message) {
    if (this.loglevel >= this.levels.ERROR) {
      return this.log('ERROR', message)
    } else {
      return ''
    }
  }
  this.debug = function (message) {
    if (this.loglevel >= this.levels.DEBUG) {
      return this.log('DEBUG', message)
    } else {
      return ''
    }
  }
  this.log = function (tag, message) {
    let msg = this.getDate() + '\t' + this.hostname + '\t' + this.name + '\t' + tag + '\t' + message
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
    return msg
  }
  this.getDate = function () {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000 // offset in milliseconds
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1)
    return localISOTime.split('.')[0].trim()
  }
  return this
}
module.exports = Log
