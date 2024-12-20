const dotenv = require("dotenv");
dotenv.config();

const swaggerAutogen = require("swagger-autogen")({ language: "ko" });

const doc = {
  info: {
    title: "devpost backend API",
    description: "devpost backend API",
  },
  host: process.env.BACK_END_DOMAIN,
  schemes: ["http", "https"],
};

const outputFile = "./swagger-output.json"; // 같은 위치에 swagger-output.json을 만든다.
const endpointsFiles = [
  "./app.js", // 라우터가 명시된 곳을 지정해준다.
];

swaggerAutogen(outputFile, endpointsFiles, doc);
