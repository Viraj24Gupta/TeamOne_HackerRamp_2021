CREATE DATABASE ma21;

CREATE TABLE earnings(
    user_id      VARCHAR(6)PRIMARY KEY,
    ref_earning  FLOAT,
    lm_earning   FLOAT,
    conc_earning FLOAT
);

CREATE TABLE location(
    user_id    VARCHAR(6)  PRIMARY KEY,
    latitude   float,
    longitude  float
);

CREATE TABLE score(
    user_id     VARCHAR(6) PRIMARY KEY,
    lm_count    int,
    returns_req int,
    returns_res int,
    ref_count   int,
    feedback    int
);

create table test(
    user_id VARCHAR(6) PRIMARY KEY,
    user_name VARCHAR(255)
);


drop table test;