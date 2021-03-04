const dataManager = require('dataManager');


/// how i will receive events? as single event or multiple events?
exports.handler = async (event, context, callback) => {
    let objectNormalize = dataManager.parseData(event);
    let findTransaction = await dataManager.findTransaction({
        transaction_id: objectNormalize.transactionId
    });
    if(!findTransaction){
        await dataManager.createTransaction(objectNormalize);
    }else {
        await dataManager.updateTransaction(objectNormalize);
    }
}