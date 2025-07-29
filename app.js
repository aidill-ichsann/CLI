const contact = require("./contact");

// yargs
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

yargs(hideBin(process.argv))
  .command({
    command: "add",
    describe: "Menambahkan kontak baru",
    builder: {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
      noHP: {
        describe: "Nomor Handphone",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: false,
        type: "string",
      },
    },
    handler(argv) {
      contact.simpanData(argv.nama, argv.noHP, argv.email);
    },
  }).demandCommand(1, "Anda harus memberikan perintah")
  .command({
    command: "list",
    describe: "Menampilkan daftar kontak",
    handler() {
      const daftarContact = contact.listContact();
    },
  })
  .command({
    command: "detail",
    describe: "Menampilkan detail kontak berdasarkan nama",
    builder: {
      nama: {
        describe: "Nama lengkap",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      contact.detailContact(argv.nama);
    },
  })

  .parse();

// Memanggil fungsi main dari contact.js
// main = async () => {
//   const nama = await contact.question("masukkan nama : ");
//   const noHP = await contact.question("masukkan noHP : ");
//   const email = await contact.question("masukkan email : ");

//   contact.simpanData(nama, noHP, email);

// };
// main();
