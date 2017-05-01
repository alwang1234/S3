'use strict'; // eslint-disable-line strict
require('babel-core/register');

const config = require('./lib/Config.js').default;
const MetadataServer = require('arsenal').storage.metadata.server;

if (config.backends.metadata === 'file') {
    const mdServer = new MetadataServer(
        { metadataPath: config.filePaths.metadataPath,
          metadataPort: config.metadataDaemon.port,
          log: config.log,
          versioning: { siteId: config.replicationGroupToken },
        });
    mdServer.startServer();
}

