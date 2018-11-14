/* global it, describe, beforeEach, afterEach */
const assert = require('assert')
const os = require('os')
const path = require('path')
const fs = require('fs')
const LOG = require(path.join(__dirname, '../index.js'))
const hostname = os.hostname()
function getDate () {
  var tzoffset = (new Date()).getTimezoneOffset() * 60000 // offset in milliseconds
  var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1)
  return localISOTime.split('.')[0].trim()
}
const manualhostname = 'testhost'
const name = 'testapp'
const file = '/tmp/testfile'
let log
let line
let testline
describe('Log.js', function () {
  describe(': No Options', function () {
    beforeEach('create Object', function () {
      log = new LOG()
    })
    afterEach('destroy Object', function () {
      log = undefined
    })
    describe(': Info', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + hostname + '\tlog\tINFO\ttestline'
        line = log.info('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + hostname + '\tlog\tINFO\ttestline #tag1 #tag2 #tag3'

        line = log.info('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.info('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.info('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
    describe(': Notice', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + hostname + '\tlog\tNOTICE\ttestline'
        line = log.notice('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + hostname + '\tlog\tNOTICE\ttestline #tag1 #tag2 #tag3'

        line = log.notice('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.notice('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.notice('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
    describe(': Warn', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + hostname + '\tlog\tWARN\ttestline'
        line = log.warn('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + hostname + '\tlog\tWARN\ttestline #tag1 #tag2 #tag3'

        line = log.warn('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.warn('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.warn('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
    describe(': Error', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + hostname + '\tlog\tERROR\ttestline'
        line = log.error('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + hostname + '\tlog\tERROR\ttestline #tag1 #tag2 #tag3'

        line = log.error('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.error('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.error('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
    describe(': Fatal', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + hostname + '\tlog\tFATAL\ttestline'
        line = log.fatal('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + hostname + '\tlog\tFATAL\ttestline #tag1 #tag2 #tag3'

        line = log.fatal('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.fatal('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.fatal('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
    describe(': Debug', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + hostname + '\tlog\tDEBUG\ttestline'
        line = log.debug('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + hostname + '\tlog\tDEBUG\ttestline #tag1 #tag2 #tag3'

        line = log.debug('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.debug('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.debug('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
  })
  describe(': Hostname Set', function () {
    beforeEach('create Object', function () {
      log = new LOG({
        hostname: manualhostname
      })
    })
    afterEach('destroy Object', function () {
      log = undefined
    })
    describe(': Info', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + manualhostname + '\tlog\tINFO\ttestline'
        line = log.info('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + manualhostname + '\tlog\tINFO\ttestline #tag1 #tag2 #tag3'

        line = log.info('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.info('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.info('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
    describe(': Notice', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + manualhostname + '\tlog\tNOTICE\ttestline'
        line = log.notice('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + manualhostname + '\tlog\tNOTICE\ttestline #tag1 #tag2 #tag3'

        line = log.notice('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.notice('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.notice('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
    describe(': Warn', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + manualhostname + '\tlog\tWARN\ttestline'
        line = log.warn('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + manualhostname + '\tlog\tWARN\ttestline #tag1 #tag2 #tag3'

        line = log.warn('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.warn('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.warn('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
    describe(': Error', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + manualhostname + '\tlog\tERROR\ttestline'
        line = log.error('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + manualhostname + '\tlog\tERROR\ttestline #tag1 #tag2 #tag3'

        line = log.error('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.error('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.error('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
    describe(': Fatal', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + manualhostname + '\tlog\tFATAL\ttestline'
        line = log.fatal('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + manualhostname + '\tlog\tFATAL\ttestline #tag1 #tag2 #tag3'

        line = log.fatal('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.fatal('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.fatal('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
    describe(': Debug', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + manualhostname + '\tlog\tDEBUG\ttestline'
        line = log.debug('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + manualhostname + '\tlog\tDEBUG\ttestline #tag1 #tag2 #tag3'

        line = log.debug('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.debug('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.debug('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
  })
  describe(': Name Set', function () {
    beforeEach('create Object', function () {
      log = new LOG({
        name: name
      })
    })
    afterEach('destroy Object', function () {
      log = undefined
    })
    describe(': Info', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + hostname + '\t' + name + '\tINFO\ttestline'
        line = log.info('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + hostname + '\t' + name + '\tINFO\ttestline #tag1 #tag2 #tag3'

        line = log.info('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.info('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.info('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
    describe(': Notice', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + hostname + '\t' + name + '\tNOTICE\ttestline'
        line = log.notice('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + hostname + '\t' + name + '\tNOTICE\ttestline #tag1 #tag2 #tag3'

        line = log.notice('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.notice('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.notice('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
    describe(': Warn', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + hostname + '\t' + name + '\tWARN\ttestline'
        line = log.warn('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + hostname + '\t' + name + '\tWARN\ttestline #tag1 #tag2 #tag3'

        line = log.warn('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.warn('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.warn('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
    describe(': Error', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + hostname + '\t' + name + '\tERROR\ttestline'
        line = log.error('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + hostname + '\t' + name + '\tERROR\ttestline #tag1 #tag2 #tag3'

        line = log.error('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.error('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.error('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
    describe(': Fatal', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + hostname + '\t' + name + '\tFATAL\ttestline'
        line = log.fatal('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + hostname + '\t' + name + '\tFATAL\ttestline #tag1 #tag2 #tag3'

        line = log.fatal('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.fatal('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.fatal('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
    describe(': Debug', function () {
      it('should output the given Line', function () {
        testline = getDate() + '\t' + hostname + '\t' + name + '\tDEBUG\ttestline'
        line = log.debug('testline')
        assert.equal(line, testline)
      })
      it('should output the given Line with Tags', function () {
        testline = getDate() + '\t' + hostname + '\t' + name + '\tDEBUG\ttestline #tag1 #tag2 #tag3'

        line = log.debug('testline', 'tag1 tag2 tag3')
        assert.equal(line, testline)

        line = log.debug('testline', 'tag1,tag2,tag3')
        assert.equal(line, testline)

        line = log.debug('testline', ['tag1', 'tag2', 'tag3'])
        assert.equal(line, testline)
      })
    })
  })
  describe(': File Set', function () {
    beforeEach('create Object', function () {
      log = new LOG({
        file: file
      })
      fs.writeFileSync(file, '') // Create File if not exists
    })
    afterEach('destroy Object', function () {
      log = undefined
      fs.truncateSync(file) // Clean Up, clear contents
    })
    describe(': Info', function () {
      it('should output the given Line to the file', function (done) {
        testline = getDate() + '\t' + hostname + '\tlog\tINFO\ttestline\n'
        log.info('testline')
        setTimeout(function () {
          line = fs.readFileSync(file, 'utf-8')
          assert.equal(line, testline)
          done()
        }, 10)
      })
    })
    describe(': Notice', function () {
      it('should output the given Line to the file', function (done) {
        testline = getDate() + '\t' + hostname + '\tlog\tNOTICE\ttestline\n'
        log.notice('testline')
        setTimeout(function () {
          line = fs.readFileSync(file, 'utf-8')
          assert.equal(line, testline)
          done()
        }, 10)
      })
    })
    describe(': Warn', function () {
      it('should output the given Line to the file', function (done) {
        testline = getDate() + '\t' + hostname + '\tlog\tWARN\ttestline\n'
        log.warn('testline')
        setTimeout(function () {
          line = fs.readFileSync(file, 'utf-8')
          assert.equal(line, testline)
          done()
        }, 10)
      })
    })
    describe(': Error', function () {
      it('should output the given Line to the file', function (done) {
        testline = getDate() + '\t' + hostname + '\tlog\tERROR\ttestline\n'
        log.error('testline')
        setTimeout(function () {
          line = fs.readFileSync(file, 'utf-8')
          assert.equal(line, testline)
          done()
        }, 10)
      })
    })
    describe(': Fatal', function () {
      it('should output the given Line to the file', function (done) {
        testline = getDate() + '\t' + hostname + '\tlog\tFATAL\ttestline\n'
        log.fatal('testline')
        setTimeout(function () {
          line = fs.readFileSync(file, 'utf-8')
          assert.equal(line, testline)
          done()
        }, 10)
      })
    })
    describe(': Debug', function () {
      it('should output the given Line to the file', function (done) {
        testline = getDate() + '\t' + hostname + '\tlog\tDEBUG\ttestline\n'
        log.debug('testline')
        setTimeout(function () {
          line = fs.readFileSync(file, 'utf-8')
          assert.equal(line, testline)
          done()
        }, 10)
      })
    })
  })
})
