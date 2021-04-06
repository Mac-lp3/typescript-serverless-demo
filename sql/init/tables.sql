CREATE TABLE drugs (
    id INT NOT NULL AUTO_INCREMENT,
    ndc VARCHAR(15),
    rxcui VARCHAR(15),
    name_brand VARCHAR(30),
    name_label VARCHAR(30),
    dosage_amount SMALLINT,
    dosage_units VARCHAR(5),
    delivery_method VARCHAR(15),
);