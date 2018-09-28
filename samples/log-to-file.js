const Log = require('../index.js')

let log = new Log({
  name: 'Sample-File',
  file: 'file.log'
})

log.info('This is an Information')
log.warn('This is a Warning')
log.error('This is an Error')
log.debug('This is a Debug Message')