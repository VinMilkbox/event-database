exports.transactionDetailsFields = (objectStream) => {
    return {
        transaction_id: objectStream.transactionId, // This must be implemented on database.
        sub_transaction_id: objectStream.subTransactionId, // This must be create on database.
        type: objectStream.type,
        status: objectStream.status,
        amount: objectStream.amount,
        currency: objectStream.currency, // this currency is customer currency?
        created_at: objectStream.createdDate,
        card_id: objectStream.cardId,
        customer_id: objectStream.customerId,
        version: objectStream.aggregateVersion, // not sure of this
        partition: objectStream.partition,
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
        converted_amount: null, // related to currency conversion?
        converted_currency: null, // reference of the currency converted
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