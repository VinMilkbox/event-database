require('dotenv').config()
const mysql = require("mysql2");
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASSWD,
        database : process.env.DB_DATABASE
    }
});
exports.dbClient = knex;

const transactionsTable = 'transactions';
const transactionDetails = 'transaction_details';

exports.printDotEnv = () => {
    console.log(process.env);
}
exports.parseData = async (data) => {
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

exports.createTransaction = async (objectStream) => {
    /// NULL are field without date from objectStream
    const fieldRows = {
        transactionId: objectStream.transactionId, // This must be implemented on database.
        type: objectStream.type,
        status: objectStream.status,
        amount: objectStream.amount,
        currency: objectStream.currency, // this currency is customer currency?
        converted_amount: null, // related to currency conversion?
        converted_currency: null, // reference of the currency converted
        auth_amount: null, //  may is related to the type field? (auth, sale, capture)?
        sale_amount: null, //  may is related to the type field? (auth, sale, capture)?
        void_amount: null, //  may is related to the type field? (auth, sale, capture)?
        refund_amount: null, //  may is related to the type field? (auth, sale, capture)?
        created_at: new Date(),
        card_id: objectStream.cardId,
        account_id: null,// missing on sample data
        domain_name: null,// missing on sample data
        customer_id: objectStream.customerId,
        province: null,// missing on sample data
        zip_code: null,// missing on sample data
        credit_card_last_4_digits: null, // missing on sample data
        credit_card_first_6_digits: null, // missing on sample data
        credit_card_number_masked: null, // missing on sample data
        version: objectStream.aggregateVersion, // not sure of this
        source_reference_customer_id: null, // missing on sample data
        client_id: null, // missing on sample data
    };
    return knex(transactionsTable).insert(fieldRows).toSQL().toNative();
}

exports.updateTransaction = async (transactionId, objectStream) => {
    knex(transactionsTable)
        .where({
            transactionId: transactionId
        })
        .update({
            status: objectStream.status,
        }).then((result) => {
            return result.id;
        }).catch((err) => {
            throw err;
        });
}

exports.findTransaction = async (transactionId) => {
    return knex(transactionsTable).select().where({
        id: transactionId
    }).then((transaction) => {
        return transaction.length > 0;
    }).catch((err) => {
        throw err;
    });
}