LOAD DATA LOCAL INFILE @DATA_FILE
INTO TABLE drugs FIELDS TERMINATED BY ","
(ndc, rxcui, name_brand, name_label, dosage_amount, dosage_units, delivery_method);
