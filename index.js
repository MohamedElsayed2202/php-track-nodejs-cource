import express from "express";
import { userRoute } from "./routes/user.route.js";
import { error } from "./middlewares/error.middlerware.js";
// import { cors } from "./middlewares/cors.middleware.js";
import cors from "cors";
const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://localhost:3020",
      "https://bookstore.com",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);
app.use("/user", userRoute);

app.use("*", (req, res) => {
  res.status(404).json({ message: "not found" });
});

app.use(error);

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
// cors: {
//   [];
// }

// front end application host a server my.app.com ==> my.backserver.com/user/list

// backend application host a server my.backserver.com
