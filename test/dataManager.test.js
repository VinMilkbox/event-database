require('iconv-lite').encodingExists('foo')
const dataManagerTest = require('../src/dataManager');
const sampleData = require('../sampleData/single.json');
const logger = () => console.log('Testing.. ');

/*describe('Test index', async () => {
    //beforeEach(async () => logger());

    /!*test('Passing EventJson return OBJ', async () => {
        let testIt = dataManagerTest.parseData(sampleData);
    });*!/

    const sampleDataObj = {
        pk: "a#trans#trans_1",
        sk: "a#trans#trans_1",
        transactionId: "trans_1",
        customerId: "cust_1",
        organisationId: "org_1",
        amount: "1",
        currency: "usd",
        status: "pending",
        entityType: "Transaction",
        createdDate: "2021-02-04T20:37:00",
        refundedDate: "2021-02-05T20:37:00",
        chargebackDate: "2021-02-06T20:37:00",
        partition: "a#trans#2",
        timestamp: "1612485499",
        gsi1pk: "cust_1",
        gsi1sk: "a#trans#trans_1",
        gsi2pk: "a#card#card_1",
        gsi2sk: "a#trans#trans_1",
        gsi3pk: "pending",
        gsi3sk: "2021-02-06T20:37:00",
        cardId: "a#card#card_1",
        aggregateVersion: "2"
    };

});*/
test('Passing Obj Test return plain SQL', async () => {
    let testIt;
    testIt = await dataManagerTest.findTransaction('1');
    console.log(testIt);
});