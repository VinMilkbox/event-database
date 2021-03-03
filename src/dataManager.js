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
exports.parseData = (data) => {
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

/**
 *
 * @param objectStream
 * @returns {Promise<Knex.QueryBuilder<{transaction_id: string|string|*, amount: string|PaymentCurrencyAmount|*, credit_card_first_6_digits: null, converted_currency: null, created_at: number, type: string, version: string, card_id: string, zip_code: null, client_id: null, credit_card_number_masked: null, auth_amount: null, void_amount: null, domain_name: null, account_id: null, credit_card_last_4_digits: null, province: null, source_reference_customer_id: null, converted_amount: null, refund_amount: null, currency: string|string|*, customer_id: string, status: *, sale_amount: null}, number[]>>}
 */
exports.createTransaction = (objectStream) => {
    /// NULL are field without date from objectStream
    const fieldsRows = {
        transaction_id: objectStream.transactionId, // This must be implemented on database.
        type: objectStream.entityType,
        status: objectStream.status,
        amount: objectStream.amount,
        currency: objectStream.currency, // this currency is customer currency?
        converted_amount: null, // related to currency conversion?
        converted_currency: null, // reference of the currency converted
        auth_amount: null, //  may is related to the type field? (auth, sale, capture)?
        sale_amount: null, //  may is related to the type field? (auth, sale, capture)?
        void_amount: null, //  may is related to the type field? (auth, sale, capture)?
        refund_amount: null, //  may is related to the type field? (auth, sale, capture)?
        created_at: new Date().getTime(),
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
    return knex(transactionsTable).insert(fieldsRows);
}

/**
 *
 * @param objectStream
 * @returns {Promise<Knex.QueryBuilder<TRecord, number>>}
 */
exports.updateTransaction = async (objectStream) => {
    return knex(transactionsTable)
        .where({
            transaction_id: objectStream.transactionId
        })
        .update({
            status: objectStream.status,
        });
}

/**
 *
 * @param whereFilter Object
 * @returns {Promise<boolean | void>}
 */
exports.findTransaction = (whereFilter) => {
    return knex(transactionsTable).select()
        .where(whereFilter)
        .then((transaction) => {
            return transaction.length > 0;
        }).catch((err) => {
            throw err;
        });
}