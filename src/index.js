const dataManager = require('dataManager');

exports.handler =  async (event, context, callback) => {
    let objectNormalize = dataManager.parseData(event);
    let findTransaction = dataManager.findTransaction(objectNormalize.transactionId);
}