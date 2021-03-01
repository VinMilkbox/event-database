const mysql = require("mysql2");
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : process.env.DB_HOSTNAME,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWD,
        database : process.env.DB_DATABASE
    }
});

const transactionsTable = 'transactions';
const transactionDetails = 'transaction_details';

exports.parseData = (data) =>
{
    let parse = JSON.parse(JSON.stringify(data));
    let rebuildObj = [];
    for (const [key, value] of Object.entries(parse)) {
        if(typeof value == "object"){
            for (const [key1, value1] of Object.entries(value)) {
                rebuildObj[key] = value1;
            }
        }else{
            rebuildObj[key] = value;
        }
    }
    return Object.assign({}, rebuildObj);
}

exports.createTransaction = (objetStream) => {
    const fieldRows = {
        type: objetStream.type,
        status: objetStream.status,
        amount: objetStream.amount,
        currency: objetStream.currency,
        converted_amount: null,
        converted_currency: null,
        auth_amount: true,
        sale_amount: true,
        void_amount: true,
        refund_amount: true,
        created_at: new Date(),
        card_id: true,
        account_id: true,
        domain_name: true,
        customer_id: objetStream.customerId,
        province: true,
        zip_code: true,
        credit_card_last_4_digits: true,
        credit_card_first_6_digits: true,
        credit_card_number_masked: true,
        version: true,
        source_reference_customer_id: true,
        client_id: true,
    };
    return knex(transactionsTable).insert(fieldRows).toSQL().toNative();
}



exports.findTransaction = (transactionId) => {
    return knex(transactionsTable).where({
        id: transactionId,
    }).select('id');
}