var express = require("express");
var path = require("path");

var app = express();

// env
require("dotenv").config();

var cors = require("cors");
app.use(cors());

// Firebase Admin SDK
var admin = require("firebase-admin");

// var serviceAccount = require("./serviceAccountKey.json");
// Construct the credentials object using environment variables
const serviceAccount = {
  projectId: process.env.GOOGLE_PROJECT_ID,
  privateKey: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://carejoa-motionbit-default-rtdb.firebaseio.com/",
  storageBucket: "carejoa-motionbit.appspot.com",
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

var hospitalRouter = require("./routes/hospital");
var facilityRouter = require("./routes/facility");

const swaggerDefinition = {
  openapi: "3.0.0", // 버전 설정
  info: {
    title: "케어조아 API", // API 문서 제목
    version: "1.0.0", // API 버전
    description: "API documentation using Swagger",
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // API 문서화할 파일 경로
};

const swaggerSpec = swaggerJSDoc(options);

// Swagger UI 초기화 시 requestInterceptor 설정 추가
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      docExpansion: "none", // 기본적으로 모든 API를 축소
      filter: true,
    },
  })
);

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/hospital", hospitalRouter);
app.use("/facility", facilityRouter);

// Firebase Storage에 파일 업로드하는 엔드포인트
app.post("/upload", async (req, res) => {
  try {
    const { fileName, fileBase64 } = req.body;

    if (!fileName || !fileBase64) {
      return res
        .status(400)
        .json({ error: "fileName과 fileBase64가 필요합니다." });
    }

    // 파일 저장 경로 설정
    const filePath = `uploads/${Date.now()}-${fileName}`;
    const file = bucket.file(filePath);
    const buffer = Buffer.from(fileBase64, "base64");

    // Storage에 파일 업로드
    await file.save(buffer, { contentType: "image/png" });

    // 다운로드 가능한 URL 가져오기
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: "03-01-2030",
    });

    // Firestore에 저장
    const fileData = {
      fileName,
      url,
      createdAt: admin.firestore.Timestamp.now(),
    };

    const docRef = await db.collection("uploads").add(fileData);

    return res.status(200).json({ id: docRef.id, ...fileData });
  } catch (error) {
    console.error("Upload Error:", error);
    return res.status(500).json({ error: "파일 업로드 실패" });
  }
});

app.listen(8088, function () {
  console.log("Example app listening on port 8088!");
});

module.exports = app;
