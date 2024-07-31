import jwt from "jsonwebtoken";
import { readDataFromFile } from "../utils/helpers.js";
const db = "./controllers/db.json";

const tokenKey = "1234MMSS@md";

export const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    const err = new Error("unauthorized");
    err.statusCode = 401;
    next(err);
  }

  //   try {
  //     const decode = jwt.verify(token, tokenKey);
  //   } catch (err) {
  //     next(err);
  //   }
  
  const decode = jwt.verify(token, tokenKey, (err, decode) => {
    if (err) {
      next(err);
    }
    return decode;
  });

  const { id } = decode;
  if (!id) {
    const err = new Error("access denied");
    err.statusCode = 403;
    next(err);
  }

  const users = readDataFromFile(db);
  const user = users.find((user) => user.id === id);
  if (!user) {
    const err = new Error("access denied");
    err.statusCode = 403;
    next(err);
  }
  req.user = user;
  next();
};
