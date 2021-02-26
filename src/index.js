const mysql = require("mysql2");
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : '127.0.0.1',
        user : 'your_database_user',
        password : 'your_database_password',
        database : 'myapp_test'
    }
});

const transactionsTable = 'transactions';
const transactionDetails = 'transaction_details';
const sampleData = JSON.parse('{\n' +
    '    "pk": { "S": "a#trans#trans_1" },\n' +
    '    "sk": { "S": "e#seq#0" },\n' +
    '    "transactionId": { "S": "trans_1" },\n' +
    '    "subTransactionId": { "S": "auth_1" },\n' +
    '    "subTransactionType": { "S": "Auth" },\n' +
    '    "customerId": { "S": "cust_1" },\n' +
    '    "organisationId": { "S": "org_1" },\n' +
    '    "processorId": { "S": "proc_1" },\n' +
    '    "amount": { "S": "1" },\n' +
    '    "currency": { "S": "usd" },\n' +
    '    "type": { "S": "auth" },\n' +
    '    "entityType": { "S": "ChargeEvent#Initialize" },\n' +
    '    "createdDate": { "S": "2021-02-04T20:37:00" },\n' +
    '    "partition": { "S": "e#trans#1" },\n' +
    '    "timestamp": { "S": "1612485499" },\n' +
    '    "gsi1pk": { "S": "part#2021-02-05T00#1" },\n' +
    '    "gsi1sk": { "S": "1612485499" },\n' +
    '    "cardId": { "S": "a#card#card_1" }\n' +
    '}');

function parseData(data)
{
    let rebuildObj = {};
    for (const [key, value] of Object.entries(data)) {
        rebuildObj.push() = value;
        console.log(`${key}: ${value}`);
    }
}

exports.createTransaction = (objetStream) => {
    const fieldRows = events.map((m) => ({
        type: sampleData.type.S,
        status: sampleData.status,
        amount: sampleData.amount,
        currency: new Date().getTime(),
        converted_amount: true,
        converted_currency: true,
        auth_amount: true,
        sale_amount: true,
        void_amount: true,
        refund_amount: true,
        created_at: true,
        card_id: true,
        account_id: true,
        domain_name: true,
        customer_id: true,
        province: true,
        zip_code: true,
        credit_card_last_4_digits: true,
        credit_card_first_6_digits: true,
        credit_card_number_masked: true,
        version: true,
        source_reference_customer_id: true,
        client_id: true,
    }));
    return knex(transactionsTable).insert(fieldRows).toSQL().toNative();
}

parseData(sampleData);