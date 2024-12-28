// Gerekli modülleri dahil et
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swaggerOptions"); // Swagger ayarlarını aldığınız dosya

// Uygulama ayarları
dotenv.config();
const app = express();

// Route dosyalarını dahil et
const userRoutes = require("./routes/userRoutes");
const translationRoutes = require("./routes/translationRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const eventRoutes = require("./routes/eventRoutes");
const badgeRoutes = require("./routes/badgeRoutes");
const forumRoutes = require("./routes/forumRoutes");
const fileuploadRoutes = require("./routes/fileuploadRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

// Middleware'ler
const { verifyToken, isAdmin, validateUserRegistration} = require("./middleware/authMiddleware");


// CORS ayarları
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "http://192.168.1.163:5000",
  "http://192.168.1.145:5000",
  "http://192.168.1.145:3000",
  "http://176.96.131.145:3000",
  "http://176.96.131.145:5000",
  "https://hackathon24-two.vercel.app",
];

// Middleware'leri kullan
app.use(
  cors({
    origin: allowedOrigins, // Sadece belirtilen originlere izin verir
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // İzin verilen HTTP metodları
    credentials: true, // Cookie ve header bilgileri için izin
  })
);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

// Veritabanına bağlan
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB bağlantısı başarılı");
  })
  .catch((err) => {
    console.error("MongoDB bağlantısı başarısız:", err);
  });

// Ana endpoint
app.get("/", (req, res) => {
  res.send("API çalışıyor");
});

// Swagger UI için route ekleyin
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Route tanımlamaları

app.use("/users", userRoutes); // Kullanıcı işlemleri
app.use("/translations", translationRoutes); // Çeviri işlemleri
app.use("/announcements", announcementRoutes); // Duyuru İşlemleri
app.use("/events", eventRoutes); // Etkinlik İşlemleri
app.use("/badges", badgeRoutes); // Rozet İşlemleri
app.use("/forums", forumRoutes); // Forum İşlemleri
app.use("/fileupload", fileuploadRoutes);  // Dosya Yükleme İşlemleri
app.use("/complaints", complaintRoutes);  // Şikayet İşlemleri

// Hataları yakala
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor`);
});
