require('iconv-lite').encodingExists('foo')
const dataManagerTest = require('../src/dataManager');
const sampleEventsData = require('../sampleData/event.json');
const sampleCardsData = require('../sampleData/cards-events.json');

describe('Test dataManager', () => {
    test('Wrapping up all methods', async () => {
        let parse = JSON.parse(JSON.stringify(sampleEventsData));
        for (const [key, value] of Object.entries(parse)) {
            let dataSample = dataManagerTest.parseData(value);
            let findTransaction = await dataManagerTest.findTransaction(dataManagerTest.getTransactionsTable(),{
                transaction_id: dataSample.transactionId
            });
            if(findTransaction){

                /** Find subTransaction on TransactionDetails table **/
                let findSubTransaction = await dataManagerTest.findSubTransaction(
                    dataManagerTest.getTransactionDetailsTable(),
                    {sub_transaction_id: dataSample.subTransactionId},
                    {entity_type: dataSample.entityType}
                );
                if(findSubTransaction){
                    /** UPDATE on TransactionDetails table **/
                    await dataManagerTest.updateSubTransaction(
                        dataManagerTest.getTransactionDetailsTable(),
                        dataManagerTest.transactionDetailsFields(dataSample),
                        {sub_transaction_id: dataSample.subTransactionId},
                        {entity_type: dataSample.entityType}
                    );
                }else {
                    /** Insert on TransactionDetails table **/
                    await dataManagerTest.createTransaction(
                        dataManagerTest.getTransactionDetailsTable(),
                        dataManagerTest.transactionDetailsFields(dataSample)
                    );
                }

                /** Update main transaction on Transactions table **/
                let updateTransaction = {};
                updateTransaction.updated_at = new Date().getTime();
                switch (dataSample.type){
                    case 'auth':
                        updateTransaction.auth_amount = dataSample.amount;
                        break;
                    case 'sale':
                        updateTransaction.sale_amount = dataSample.amount;
                        break;
                    case 'capture':
                        updateTransaction.capture_amount = dataSample.amount;
                        break;
                    case 'void':
                        updateTransaction.void_amount = dataSample.amount;
                        break;
                    case 'refund':
                        updateTransaction.refund_amount = dataSample.amount;
                        break;
                }

                await dataManagerTest.updateTransaction(
                    dataManagerTest.getTransactionsTable(),
                    updateTransaction,
                    {transaction_id: dataSample.transactionId}
                );
            }else {
                /** Create Transactions **/
                await dataManagerTest.createTransaction(
                    dataManagerTest.getTransactionsTable(),
                    dataManagerTest.transactionsFields(dataSample)
                );
                /** Insert on TransactionDetails table **/
                await dataManagerTest.createTransaction(
                    dataManagerTest.getTransactionDetailsTable(),
                    dataManagerTest.transactionDetailsFields(dataSample)
                );
            }
        }
    });

    test('Cards events', async () => {
        let parse = JSON.parse(JSON.stringify(sampleCardsData));
        for (const [key, value] of Object.entries(parse)) {
            let dataSample = dataManagerTest.parseData(value);
            let findTransaction = await dataManagerTest.findCards({
                pk: dataSample.pk,
                sk: dataSample.sk
            });
            if(!findTransaction){
                await dataManagerTest.createCards(dataManagerTest.getCardsTable(),dataManagerTest.cardsFields(dataSample));
            }
        }
    });

    test('Close connection', async () => {
        await dataManagerTest.dbClient.destroy();
    });
});


