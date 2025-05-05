const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

// Import data dari data.js
const { mahasiswa, dosenWali } = require("./data/data.js");

// Pemetaan tipe konten
const contentTypeMap = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Default ke halaman beranda
  if (pathname === "/" || pathname === "") {
    pathname = "/beranda";
  }

  // Menangani permintaan API
  if (pathname.startsWith("/api")) {
    handleApiRequest(pathname, req, res);
    return;
  }

  // Menangani file statis (CSS, JS, gambar)
  const extname = path.extname(pathname);
  if (extname && contentTypeMap[extname]) {
    serveStaticFile(pathname, res);
    return;
  }

  // Menangani rute halaman
  switch (pathname) {
    case "/beranda":
      serveFile("pages/beranda.html", res);
      break;
    case "/mahasiswa":
      serveFile("pages/mahasiswa.html", res);
      break;
    case "/dosen-wali":
      serveFile("pages/dosen-wali.html", res);
      break;
    case "/detail-mahasiswa":
      serveFile("pages/detail-mahasiswa.html", res);
      break;
    case "/detail-dosen":
      serveFile("pages/detail-dosen.html", res);
      break;
    case "/tentang":
      serveFile("pages/tentang.html", res);
      break;
    default:
      serve404(res);
  }
});

function handleApiRequest(pathname, req, res) {
  res.setHeader("Content-Type", "application/json");

  if (pathname === "/api/mahasiswa") {
    res.end(JSON.stringify(mahasiswa));
  } else if (pathname.startsWith("/api/mahasiswa/")) {
    const id = parseInt(pathname.split("/").pop());
    const mhs = mahasiswa.find((s) => s.id === id);

    if (mhs) {
      res.end(JSON.stringify(mhs));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Mahasiswa tidak ditemukan" }));
    }
  } else if (pathname === "/api/dosen-wali") {
    res.end(JSON.stringify(dosenWali));
  } else if (pathname.startsWith("/api/dosen-wali/")) {
    const id = parseInt(pathname.split("/").pop());
    const dosen = dosenWali.find((d) => d.id === id);

    if (dosen) {
      const mahasiswaBimbingan = mahasiswa.filter(
        (m) => m.dosenWaliId === dosen.id
      );
      const result = {
        ...dosen,
        daftarMahasiswa: mahasiswaBimbingan,
      };
      res.end(JSON.stringify(result));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Dosen wali tidak ditemukan" }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "API endpoint tidak ditemukan" }));
  }
}

function serveStaticFile(pathname, res) {
  const filePath = path.join(__dirname, pathname);
  const extname = path.extname(pathname);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      serve404(res);
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentTypeMap[extname] || "text/plain",
    });
    res.end(data);
  });
}

function serveFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      serve404(res);
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

function serve404(res) {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end(`
    <!DOCTYPE html>
    <html lang="id">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 - Halaman Tidak Ditemukan</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
        </style>
      </head>
      <body class="bg-gray-100 flex items-center justify-center h-screen">
        <div class="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <h1 class="text-3xl font-bold text-red-600 mb-4">404</h1>
          <p class="text-xl mb-6">Halaman yang Anda cari tidak ditemukan</p>
          <a href="/beranda" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300">
            Kembali ke Beranda
          </a>
        </div>
      </body>
    </html>
  `);
}

// Memulai server pada port 8000
server.listen(8000, () => {
  console.log("Server berjalan di http://localhost:8000");
});
