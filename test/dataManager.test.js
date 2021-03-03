require('iconv-lite').encodingExists('foo')
const dataManagerTest = require('../src/dataManager');
const sampleEventsData = require('../sampleData/event.json');
const sampleCardsData = require('../sampleData/cards-events.json');

describe('Test dataManager', () => {
    test('Wrapping up all methods', async () => {
        let parse = JSON.parse(JSON.stringify(sampleEventsData));
        for (const [key, value] of Object.entries(parse)) {
            let dataSample = dataManagerTest.parseData(value);
            let find = await dataManagerTest.findTransaction({
                transaction_id: dataSample.transaction_id,
                sub_transaction_id: dataSample.sub_transaction_id
            });
            if(find){
                await dataManagerTest.updateTransaction(dataSample);
            }else {
                await dataManagerTest.createTransaction(dataSample);
            }
        }
        await dataManagerTest.dbClient.destroy();
    });
});

