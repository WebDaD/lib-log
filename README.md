# log.js

A real simple logger application.
May Optional Log to A File and / or a Graylog-Server

## Installation

`npm install --save git+ssh://tfs-br-prod.br-edv.brnet.int:22/ArGOS/lib/_git/log`

## Usage

`const Log = require('log')`
`let log = new Log(options)`

Note: The options Part may be omitted, as all parts are optional, but using the name is recommended, as without it, the package-name will be used

### Methods


* `log.info('This is an Information' [, tags])`
* `log.notice('This is a Notice' [, tags])`
* `log.warn('This is a Warning' [, tags])`
* `log.error('This is an Error' [, tags])`
* `log.fatal('This is a Fatal Message' [, tags])`
* `log.debug('This is a Debug Message' [, tags])`

You may add Tags to a logline. These Tags may take the following forms:

* string = 'tag'
* string, seperated by whitespace = 'tag1 tag2 tag3'
* string, seperated by comma = 'tag1,tag2,tag3'
* array of strings = ['tag1', 'tag2', 'tag3']

These Tags will be added to the line with octothorpes added.
(#tag1 #tag2 #tag3) 

### Options

```json
{
  name: 'Name of App. Default: Name of BaseFolder',
  hostname: 'Server Hostname, Default: os.hostname()',
  file: 'File to Append Log to',
  logLevel: 'Minimal LogLevel. Default: WARN'
}
```