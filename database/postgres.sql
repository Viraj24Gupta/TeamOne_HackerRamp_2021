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
    feedback    float
);

CREATE TABLE client(
    client_id   VARCHAR(6) PRIMARY KEY,
    client_name text,
    referee_id  VARCHAR(6)
);

INSERT INTO earnings VALUES ('usr101','121.01','151.01','201.01');
INSERT INTO earnings VALUES ('usr102','122.02','152.02','202.02');
INSERT INTO earnings VALUES ('usr103','123.03','153.03','203.03');
INSERT INTO earnings VALUES ('usr104','124.04','154.04','204.04');
INSERT INTO earnings VALUES ('usr105','125.05','155.05','205.05');

INSERT INTO location VALUES ('usr101','28.704060','77.102493');
INSERT INTO location VALUES ('usr102','28.669155','77.453758');
INSERT INTO location VALUES ('usr103','27.669155','76.453758');
INSERT INTO location VALUES ('usr104','22.669155','72.453758');
INSERT INTO location VALUES ('usr105','29.669155','78.453758');


INSERT INTO score VALUES ('usr101','12','11','14','15','4.2');
INSERT INTO score VALUES ('usr102','2','131','13','14','3');
INSERT INTO score VALUES ('usr103','122','111','23','35','4.7');
INSERT INTO score VALUES ('usr104','121','41','24','55','3.6');
INSERT INTO score VALUES ('usr105','1','14','11','75','1.2');


INSERT INTO client VALUES ('cli101','new user 1','usr101');
INSERT INTO client VALUES ('cli102','new user 2','usr102');
INSERT INTO client VALUES ('cli103','new user 3','usr103');
INSERT INTO client VALUES ('cli104','new user 4','usr104');
INSERT INTO client VALUES ('cli105','new user 5','usr105');
INSERT INTO client VALUES ('cli106','new user 6','fgwmrh');
INSERT INTO client VALUES ('cli107','new user 7','fgwmrh');


-- create table test(
--     user_id VARCHAR(6) PRIMARY KEY,
--     user_name VARCHAR(255)
-- );
--
--
-- drop table test;