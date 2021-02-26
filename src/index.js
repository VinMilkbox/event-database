const mysql = require("mysql2");
const fs = require("fs");

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

exports.parseData = (data) =>
{
    let parse = JSON.parse(JSON.stringify(data));
    let rebuildObj = [];
    for (const [key, value] of Object.entries(parse)) {
        let sub = value;
        if(typeof value == "object"){
            for (const [key1, value1] of Object.entries(sub)) {
                rebuildObj[key] = value;
            }
        }else{
            rebuildObj[key] = value;
        }
    }
    return Object.assign({}, rebuildObj);
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