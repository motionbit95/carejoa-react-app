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

app.listen(8088, function () {
  console.log("Example app listening on port 8088!");
});

module.exports = app;
