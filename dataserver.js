'use strict'; // eslint-disable-line strict
require('babel-core/register');

const arsenal = require('arsenal');
const config = require('./lib/Config.js').default;
const logger = require('./lib/utilities/logger').logger;

if (config.backends.data === 'file' ||
    config.backends.data === 'multiple') {
    /**
     * Configure the file paths for data if using the file
     * backend. If no path provided, uses data at the root of
     * the S3 project directory.
     */
    const dataPath = process.env.S3DATAPATH ?
              process.env.S3DATAPATH : `${__dirname}/localData`;
    const dataServer = new arsenal.network.rest.RESTServer(
        { bindAddress: config.dataDaemon.bindAddress,
          port: config.dataDaemon.port,
          dataStore: new arsenal.storage.data.file.DataFileStore(
              { dataPath, log: config.log }),
          log: config.log });
    dataServer.setup(err => {
        if (err) {
            logger.error('Error initializing REST data server',
                         { error: err });
            return;
        }
        dataServer.start();
    });
}
