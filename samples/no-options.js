const Log = require('../index.js')

let log = new Log()

log.info('This is an Information')
log.notice('This is a Notice')
log.warn('This is a Warning')
log.error('This is an Error')
log.debug('This is a Debug Message')
log.fatal('This is a Fatal Message')
