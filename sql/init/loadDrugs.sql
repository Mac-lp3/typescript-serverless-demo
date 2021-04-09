-- The file must exist on the db CLIENT.
LOAD DATA LOCAL INFILE "@DATA_DIR/drugs.csv"
INTO TABLE drugs FIELDS TERMINATED BY ","
(ndc, rxcui, name_brand, name_label, dosage_amount, dosage_units, delivery_method);
