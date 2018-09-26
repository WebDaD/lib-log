# log.js

A real simple logger application

## Usage

`const log = require('log')(options)`

Note: The options Part may be omitted, as all parts are optional, but using the name is recommended, as without it, the folder-name will be used

Options:

{
  name: 'Name of App',
  hostname: 'Server Hostname',
  file: 'File to Append Log to',
  graylog: [
    {
      server: 'graylog-server',
      port: 'graylog-port'
    }
  ]
}