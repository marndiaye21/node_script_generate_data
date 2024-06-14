const fs = require("fs");
const { createObjectCsvWriter } = require("csv-writer");
const { faker } = require("@faker-js/faker");

const filename = "data.csv";

// Configure le générateur CSV
const csvWriter = createObjectCsvWriter({
  path: filename,
  header: [
    { id: "phone", title: "phone" },
    { id: "amount", title: "amount" },
    { id: "wallet", title: "wallet" },
    { id: "firstname", title: "firstname" },
    { id: "lastname", title: "lastname" },
  ],
});

// Génère un numéro de téléphone unique
const generateUniquePhoneNumbers = (count) => {
  const prefixes = ["70", "75", "76", "77", "78"];
  const phoneNumbers = new Set();

  while (phoneNumbers.size < count) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const number =
      prefix + Math.floor(1000000 + Math.random() * 9000000).toString();
    phoneNumbers.add(number);
  }

  return Array.from(phoneNumbers);
};

// Génère les données aléatoires
const generateData = (count) => {
  const phoneNumbers = generateUniquePhoneNumbers(count);
  const data = phoneNumbers.map((phone) => ({
    phone,
    amount: Math.floor(Math.random() * (2000000 - 1000 + 1)) + 1000,
    wallet: Math.random() < 0.5 ? "om" : "wv",
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
  }));

  return data;
};

// Génère les données et les écrit dans le fichier CSV
const data = generateData(100000);

csvWriter
  .writeRecords(data)
  .then(() => {
    console.log("Les données ont été écrites dans " + filename);
  })
  .catch((err) => {
    console.error("Erreur lors de l'écriture des données", err);
  });
