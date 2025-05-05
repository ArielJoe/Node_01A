// data.js

// Data contoh untuk mahasiswa
const mahasiswa = [
  {
    id: 1,
    nim: "12345",
    nama: "Budi Santoso",
    jurusan: "Informatika",
    semester: 3,
    dosenWaliId: 1,
  },
  {
    id: 2,
    nim: "12346",
    nama: "Ani Wijaya",
    jurusan: "Sistem Informasi",
    semester: 5,
    dosenWaliId: 2,
  },
  {
    id: 3,
    nim: "12347",
    nama: "Dewi Permata",
    jurusan: "Informatika",
    semester: 1,
    dosenWaliId: 1,
  },
  {
    id: 4,
    nim: "12348",
    nama: "Eko Prasetyo",
    jurusan: "Teknik Komputer",
    semester: 7,
    dosenWaliId: 3,
  },
  {
    id: 5,
    nim: "12349",
    nama: "Fitri Handayani",
    jurusan: "Sistem Informasi",
    semester: 3,
    dosenWaliId: 2,
  },
];

// Data contoh untuk dosen wali
const dosenWali = [
  {
    id: 1,
    nip: "987654",
    nama: "Dr. Siti Rahayu",
    departemen: "Informatika",
    mahasiswaIds: [1, 3],
  },
  {
    id: 2,
    nip: "987655",
    nama: "Prof. Joko Widodo",
    departemen: "Sistem Informasi",
    mahasiswaIds: [2, 5],
  },
  {
    id: 3,
    nip: "987656",
    nama: "Dr. Ahmad Dahlan",
    departemen: "Teknik Komputer",
    mahasiswaIds: [4],
  },
];

// Export the data
module.exports = {
  mahasiswa,
  dosenWali,
};
