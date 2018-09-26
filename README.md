# log.js

A real simple logger application.
May Optional Log to A File and / or a Graylog-Server

## Installation

`npm install --save git+ssh://tfs-br-prod.br-edv.brnet.int:22/ArGOS/lib/_git/log`

## Usage

`const log = require('log')(options)`

Note: The options Part may be omitted, as all parts are optional, but using the name is recommended, as without it, the folder-name will be used

### Methods

* `log.info('This is an Information')`
* `log.warn('This is a Warning')`
* `log.error('This is an Error')`
* `log.debug('This is a Debug Message')`

### Options

```json
{
  name: 'Name of App. Default: Name of BaseFolder',
  hostname: 'Server Hostname, Default: os.hostname()',
  file: 'File to Append Log to',
  graylog: [
    {
      server: 'graylog-server',
      port: 'graylog-port'
    }
  ]
}
```