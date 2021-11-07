CREATE DATABASE ma21;

CREATE TABLE earnings(
    user_id      VARCHAR(6)PRIMARY KEY,
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
    concierge int,
    ref_count   int,
    feedback    float,
    feedback_count int
);

CREATE TABLE client(
    client_id   VARCHAR(6) PRIMARY KEY,
    client_name text,
    referee_id  VARCHAR(6)
);

CREATE TABLE last_mile(
    client_id   VARCHAR(6) PRIMARY KEY,
    client_name text,
    ambassador_id   VARCHAR(6)
);

CREATE TABLE return_request(
    client_id   VARCHAR(6) PRIMARY KEY,
    client_name text,
    ambassador_id   VARCHAR(6)
);

CREATE TABLE final(
    user_id VARCHAR(6) PRIMARY KEY,
    final  float
);

-- drop table earnings,location,score,client,last_mile,return_request,final;