LOAD DATA LOCAL INFILE @DATA_FILE
INTO TABLE drugs FIELDS TERMINATED BY ","
(market_number, company_name, plan_name);
