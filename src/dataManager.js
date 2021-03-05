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

exports.getTransactionsTable = () => { return 'transactions'};
exports.getTransactionDetailsTable = () => { return 'transaction_details'};
exports.getCardsTable = () => { return 'cards_event'};
exports.printDotEnv = () => {
    console.log(process.env);
}

/**
 * annotation
 * @param objectStream
 * @returns {{created_at: *, type: *, zip_code: null, client_id: null, auth_amount: *, void_amount: null, domain_name: null, province: null, source_reference_customer_id: null, refund_amount: null, currency: *, transaction_id: string, amount: *, credit_card_first_6_digits: null, exchange_rate: null, version: *, card_id: *, converted_to_usd_amount: null, credit_card_number_masked: null, entity_type: *, account_id: null, credit_card_last_4_digits: null, customer_id: *, status, sale_amount: null}}
 */
exports.transactionsFields = (objectStream) => {
    return {
        transaction_id: objectStream.transactionId, // This must be implemented on database.
        type: objectStream.entityType,
        status: objectStream.status,
        amount: objectStream.amount,
        currency: objectStream.currency, // this currency is customer currency?
        entity_type: objectStream.entityType,
        created_at: toTimestamp(objectStream.createdDate),
        card_id: objectStream.cardId,
        customer_id: objectStream.customerId,
        version: objectStream.aggregateVersion, // not sure of this
        converted_to_usd_amount: null, // changed from converted_amount to converted_to_usd_amount
        exchange_rate: null, // new field need to be implemented on event
        auth_amount: objectStream.amount, //  may is related to the type field? (auth, sale, capture)?
        sale_amount: null, //  may is related to the type field? (auth, sale, capture)?
        void_amount: null, //  may is related to the type field? (auth, sale, capture)?
        refund_amount: null, //  may is related to the type field? (auth, sale, capture)?
        account_id: null,// missing on sample data
        domain_name: null,// missing on sample data
        province: null,// missing on sample data
        zip_code: null,// missing on sample data
        credit_card_last_4_digits: null, // missing on sample data
        credit_card_first_6_digits: null, // missing on sample data
        credit_card_number_masked: null, // missing on sample data
        source_reference_customer_id: null, // missing on sample data
        client_id: null, // missing on sample data
    };
}

function toTimestamp(strDate){
    let dataInt = Date.parse(strDate);
    return dataInt/1000;
}

exports.cardsFields = (objectStream) => {
    return {
        pk: objectStream.pk,
        sk: objectStream.sk,
        entity_type: objectStream.entityType,
        partition_text: objectStream.partitionText,
        timestamp: objectStream.timestamp,
        created_date: objectStream.createdDate
    }
};
/**
 *
 * @param objectStream
 * @returns {{processor_status_code: *, master_id: null, processor_transaction_meta: *, source_reference_meta: null, customer_country: null, gsi1pk: *, created_at: *, type, client_id: null, sub_transaction_id: *, domain_name: null, updated_at: number, source_reference_customer_id: null, processor_id: null, currency: *, source_reference_trans_id: null, transaction_id: string, amount: *, credit_card_first_6_digits: null, gsi1sk: *, processor_cvv_result: *, exchange_rate: null, version: *, card_id: *, converted_to_usd_amount: null, processor_message: *, credit_card_number_masked: null, processor_transaction_id: *, entity_type: *, account_id: null, credit_card_last_4_digits: null, customer_id: *, processor_auth_code: *, status}}
 */
exports.transactionDetailsFields = (objectStream) => {
    return {
        transaction_id: objectStream.transactionId, // This must be implemented on database.
        sub_transaction_id: objectStream.subTransactionId, // This must be create on database.
        type: objectStream.type,
        status: objectStream.status,
        amount: objectStream.amount,
        currency: objectStream.currency, // this currency is customer currency?
        created_at: toTimestamp(objectStream.createdDate),
        card_id: objectStream.cardId,
        customer_id: objectStream.customerId,
        version: objectStream.aggregateVersion, // not sure of this
        //partition: objectStream.partition,
        gsi1pk: objectStream.gsi1pk,
        gsi1sk: objectStream.gsi1sk,
        processor_transaction_id: objectStream.processorTransactionId,// missing on sample data
        processor_auth_code: objectStream.processorAuthCode,// missing on sample data
        processor_transaction_meta: objectStream.processorTransactionMeta, // missing on sample data
        processor_message: objectStream.processorMessage, // missing on sample data
        processor_status_code: objectStream.processorStatusCode, // missing on sample data
        processor_cvv_result: objectStream.processorCvvResult, // missing on sample data
        updated_at: new Date().getTime(),
        entity_type: objectStream.entityType, // ADD TO TABLE
        converted_to_usd_amount: null, // changed from converted_amount to converted_to_usd_amount
        exchange_rate: null, // new field need to be implemented on event
        source_reference_trans_id: null, //  may is related to the type field? (auth, sale, capture)?
        source_reference_meta: null, //  may is related to the type field? (auth, sale, capture)?
        processor_id: null, //  may is related to the type field? (auth, sale, capture)?
        account_id: null, //  may is related to the type field? (auth, sale, capture)?
        domain_name: null,// missing on sample data
        client_id: null,// missing on sample data
        credit_card_number_masked: null, // missing on sample data
        customer_country: null, // missing on sample data
        credit_card_last_4_digits: null, // missing on sample data
        credit_card_first_6_digits: null, // missing on sample data
        master_id: null, // missing on sample data
        source_reference_customer_id: null, // missing on sample data
    };
}

exports.parseData = (data) => {
    let parse = JSON.parse(JSON.stringify(data));
    let rebuildObj = [];
    for (const [key, value] of Object.entries(parse)) {
        //let convertKey = camelToSnakeCase(key);
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
 * Create Transaction will receive a referTable as string and object structure {db_field: value}
 * @param referTable
 * @param fieldsRows
 * @returns {Knex.QueryBuilder<TRecord, number[]>}
 */
exports.createTransaction = (referTable, fieldsRows) => {
    return knex(referTable).insert(fieldsRows);
}

/**
 *
 * @param referTable
 * @param dataUpdate
 * @param where
 * @returns {Promise<Knex.QueryBuilder<TRecord, number>>}
 */
exports.updateTransaction = async (referTable, dataUpdate, where) => {
    return knex(referTable)
        .where(where)
        .update(dataUpdate);
}

/**
 *
 * @param referTable
 * @param dataUpdate
 * @param where
 * @param andWhere
 * @returns {Promise<Knex.QueryBuilder<TRecord, number>>}
 */
exports.updateSubTransaction = async (referTable, dataUpdate, where, andWhere) => {
    return knex(referTable)
        .where(where)
        .andWhere(andWhere)
        .update(dataUpdate);
}
/**
 * Find will receive a referTable as string and object structure {db_field: value}
 * @param referTable
 * @param whereFilter Object
 * @returns {Promise<boolean | void>}
 */
exports.findTransaction = (referTable, whereFilter) => {
    return knex(referTable).select()
        .where(whereFilter)
        .then((transaction) => {
            return transaction.length > 0;
        }).catch((err) => {
            throw err;
        });
}

exports.findCards = (whereFilter) => {
    return knex(this.getCardsTable()).select()
        .where(whereFilter)
        .then((card) => {
            return card.length > 0;
        }).catch((err) => {
            throw err;
        });
}

exports.findSubTransaction = (referTable, where, andWhere) => {
    return knex(referTable).select()
        .where(where)
        .andWhere(andWhere)
        .then((transaction) => {
            return transaction.length > 0;
        }).catch((err) => {
            throw err;
        });
}

exports.createCards = (referTable, fieldsRows) => {
    return knex(referTable).insert(fieldsRows);
};