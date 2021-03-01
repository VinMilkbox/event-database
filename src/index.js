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
    /// NULL are field without date from objectStram
    const fieldRows = {
        transactionId: objetStream.transactionId, // This must be implemented on database.
        type: objetStream.type,
        status: objetStream.status,
        amount: objetStream.amount,
        currency: objetStream.currency, // this currency is customer currency?
        converted_amount: null, // related to currency conversion?
        converted_currency: null, // reference of the currency
        auth_amount: null, //  may is related to the type field? (auth, sale, capture)?
        sale_amount: null, //  may is related to the type field? (auth, sale, capture)?
        void_amount: null, //  may is related to the type field? (auth, sale, capture)?
        refund_amount: null, //  may is related to the type field? (auth, sale, capture)?
        created_at: new Date(),
        card_id: objetStream.cardId,
        account_id: null,
        domain_name: null,
        customer_id: objetStream.customerId,
        province: null,
        zip_code: null,
        credit_card_last_4_digits: null, // missing on sample data
        credit_card_first_6_digits: null, // missing on sample data
        credit_card_number_masked: null, // missing on sample data
        version: objetStream.aggregateVersion, // not sure of this
        source_reference_customer_id: null, // missing on sample data
        client_id: null, // missing on sample data
    };
    return knex(transactionsTable).insert(fieldRows).toSQL().toNative();
}



exports.findTransaction = (transactionId) => {
    return knex(transactionsTable).where({
        transactionId: transactionId,
    }).select();
}