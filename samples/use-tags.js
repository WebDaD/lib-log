const Log = require('../index.js')

let log = new Log()

log.info('This is an Information', 'info')
log.notice('This is a Notice', 'notice system ping')
log.warn('This is a Warning', 'some,tags,added')
log.error('This is an Error', ['tag', 'error', 'crit', 'api'])
log.debug('This is a Debug Message')
log.fatal('This is a Fatal Message')
