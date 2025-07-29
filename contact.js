const { rejects } = require("assert");
const { log } = require("console");
const fs = require("fs");
const readline = require("readline");
const { compileFunction } = require("vm");
const validator = require("validator");
const path = "data/contact.json";
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// jika ga ada folder maka buat
if (!fs.existsSync("data")) {
  fs.mkdirSync("data");
}
// jika ga ada file maka buat
if (!fs.existsSync("data/contact.json")) {
  fs.writeFileSync("data/contact.json", "[]", "utf-8");
}

// membaca file data json contact
const loadData = () => {
  const fileBuffer = fs.readFileSync(path);
  const contact = JSON.parse(fileBuffer);
  return contact;
};

// const question = (pertanyaan) => {
//   return new Promise((resolve, rejects) => {
//     rl.question(pertanyaan, (nilai) => {
//       resolve(nilai);
//     });
//   });
// };
// untuk menambahkan data ke file JSON
const simpanData = (nama, noHP, email) => {
  const data = { nama, noHP, email };

  // const path = "data/contact.json";
  const contact = loadData();

  // cek duplikat nama
  const duplikat = contact.find((item) => item.nama === nama);
  if (duplikat) {
    log("Nama sudah terdaftar, silahkan gunakan nama lain");
    return false;
  }
  // valid email
  if (email) {
    if (!validator.isEmail(email)) {
      log("email tidak valid");
      return false;
    }
  }
  // valid noHP
  if (!validator.isMobilePhone(noHP, "id-ID")) {
    log("nomor handphone tidak valid");
    return false;
  }
  contact.push(data);

  fs.writeFileSync(path, JSON.stringify(contact, null, 2));
  console.log("data berhasil ditambahkan");
};

// bikin fungsi untuk menampilkan daftar kontak
const listContact = () => {
  const contact = loadData();
  log("daftar kontak : ");
  contact.forEach((item, i) => {
    log(`${i + 1}. ${item.nama} - ${item.email} `);
  });
};

// fungsi untuk detail kontak berdasarkan nama
const detailContact = (nama) => {
  const contact = loadData();
  const duplikat = contact.find(
    (item) => item.nama.toLowerCase() === nama.toLowerCase()
  );
  if (duplikat) {
    log("daftar detail kontak : ")
    log(`Nama: ${duplikat.nama}`);
    log(`No HP: ${duplikat.noHP}`);
    log(`Email: ${duplikat.email ? duplikat.email : "Tidak ada email"}`);
  } else {
    log(`Kontak dengan nama ${nama} tidak ditemukan.`);
  }
};

// fungsi untuk menghapus kontak berdasarkan nama
const deleteContact = (nama) => {
  const contact = loadData();
  const newContact = contact.filter(item =>
    item.nama.toLowerCase() !== nama.toLowerCase());
  // jika nama tidak ditemukan
  if (newContact.length == contact.length) {
    log("nama tidak ditemukan");
    return false;
  }
  fs.writeFileSync(path, JSON.stringify(newContact, null, 2));
  console.log("data berhasil dihapus");
};

module.exports = { simpanData, listContact, detailContact, deleteContact };
