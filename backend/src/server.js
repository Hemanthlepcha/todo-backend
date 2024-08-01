import express from "express";
import "dotenv/config";
import cors from "cors";
import routes from "./routes/index.js";

// console.log("JWT_SECRET:", process.env.JWT_SECRET);
const app = express();

// console.log(db);
app.use(
  cors({
    origin: true, // Replace with your frontend's URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable cookies to be sent with requests
  })
);
routes(app);

app.listen(process.env.PORT, () => {
  console.log("🚀 Server is running http://localhost:4000/api/graphql");
});
