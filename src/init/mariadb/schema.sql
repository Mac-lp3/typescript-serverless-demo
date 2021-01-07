USE slapi;

CREATE TABLE IF NOT EXISTS drugs (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ndc VARCHAR(15),
    rxcui VARCHAR(15),
    brand_name VARCHAR(25),
    label_name VARCHAR(25),
    dosage_form VARCHAR(25),
    dosage_units VARCHAR(10),
    dosage_amount VARCHAR(10)
);

INSERT INTO drugs (
    ndc,
    rxcui,
    brand_name,
    label_name,
    dosage_form,
    dosage_units,
    dosage_amount 
) VALUES (
    "123456789",
    "cui-12345",
    "Advil",
    "Cold and Flu",
    "Tablet",
    "MG",
    "25"
);