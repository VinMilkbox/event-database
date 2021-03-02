const dataManager = require('dataManager');

exports.handler =  async (event, context, callback) => {
    let objectNormalize = dataManager.parseData(event);
    let findTransaction = await dataManager.findTransaction({
        transaction_id: objectNormalize.transactionId
    });
    if(!findTransaction){
        let insertData = await dataManager.createTransaction(objectNormalize);
    }else {
        await dataManager.updateTransaction(objectNormalize);
    }
}