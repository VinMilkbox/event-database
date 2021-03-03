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

const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
const transactionsTable = 'transactions_events';
const transactionDetails = 'transaction_details';

exports.printDotEnv = () => {
    console.log(process.env);
}
exports.parseData = (data) => {
    let parse = JSON.parse(JSON.stringify(data));
    let rebuildObj = [];
    for (const [key, value] of Object.entries(parse)) {
        let convertKey = camelToSnakeCase(key);
        if(typeof value == "object"){
            for (const [key1, value1] of Object.entries(value)) {
                rebuildObj[convertKey] = value1;
            }
        }else{
            rebuildObj[convertKey] = value;
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
    return knex(transactionsTable).insert(objectStream);
}

/**
 *
 * @param objectStream Object
 * @returns {Promise<Knex.QueryBuilder<TRecord, number>>}
 */
exports.updateTransaction = async (objectStream) => {
    return knex(transactionsTable)
        .where({
            transaction_id: objectStream.transaction_id
        }).andWhere({
            sub_transaction_id: objectStream.sub_transaction_id,
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