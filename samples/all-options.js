const Log = require('../index.js')

let log = new Log({
  name: 'Sample-Application',
  hostname: 'test-server'
})

log.info('This is an Information')
log.warn('This is a Warning')
log.error('This is an Error')
log.debug('This is a Debug Message')