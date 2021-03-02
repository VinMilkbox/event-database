-- auto-generated definition
create table transactions
(
    id                           int auto_increment
        primary key,
    type                         varchar(45)    null,
    status                       varchar(45)    null,
    amount                       decimal(10, 2) null,
    currency                     varchar(3)     null,
    converted_amount             decimal(10, 2) null,
    converted_currency           varchar(3)     null,
    auth_amount                  decimal(10, 2) null,
    sale_amount                  decimal(10, 2) null,
    capture_amount               decimal(10, 2) null,
    void_amount                  decimal(10, 2) null,
    refund_amount                decimal(10, 2) null,
    created_at                   bigint(13)     null,
    card_id                      varchar(64)    null,
    account_id                   varchar(64)    null,
    domain_name                  varchar(64)    null,
    customer_id                  varchar(64)    null,
    customer_country             varchar(2)     null,
    province                     varchar(45)    null,
    zip_code                     varchar(10)    null,
    credit_card_last_4_digits    varchar(45)    null,
    credit_card_first_6_digits   varchar(45)    null,
    credit_card_number_masked    varchar(45)    null,
    version                      int            null,
    updated_at                   bigint(13)     null,
    source_reference_customer_id varchar(64)    null,
    client_id                    varchar(45)    null,
    transaction_id               varchar(50)    null
)
    collate = utf8_unicode_ci;

create index transactions_account_id_index
    on transactions (account_id);

create index transactions_created_at_index
    on transactions (created_at);

create index transactions_customer_id_index
    on transactions (customer_id);

create index transactions_id_version_index
    on transactions (id, version);

create index transactions_status_index
    on transactions (status);

create index transactions_updated_at_index1
    on transactions (account_id, updated_at);

create index transactions_version_index
    on transactions (version);

