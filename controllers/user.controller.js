import { v4 as uuid } from "uuid";
import { readDataFromFile, writeDataToFile } from "../utils/helpers.js";
import path from "path";
import jwt from "jsonwebtoken";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbFilePath = path.join(__dirname, "db.json");

const tokenKey = "1234MMSS@md";

let users = readDataFromFile(dbFilePath);

export const getAllUsers = (req, res) => {
  const { query } = req;
  console.log(req.user);
  if (Object.keys(query).length > 0) {
    const filterdUsers = users.filter((item) => item.age == query.age);
    res.status(200).json({ filterdUsers });
  }
  res.status(200).json({ users });
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  res.status(200).json({ payload: user });
};

export const register = (req, res) => {
  const { body } = req;
  if (Object.keys(body).length === 0) {
    return res.status(404).json({ message: "data required" });
  }
  const id = uuid();
  users.push({ id, ...body });
  writeDataToFile(dbFilePath, users);
  res.status(201).json({ users });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(403).json({ message: "Invalid email" });
  }
  if (password !== user.password) {
    return res.status(403).json({ message: "Invalid password" });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, tokenKey);

  res.status(200).json({ token });
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const index = users.findIndex((item) => item.id === id);
  if (index === -1) {
    res.status(404).json({ message: "no user found" });
  }
  users[index] = {
    ...users[index],
    ...body,
  };
  res.status(200).json({ user: users[index] });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((item) => item.id === id);
  users.splice(index, 1);
  res.status(200).json({ user: users });
};

export const updateMyProfile = (req, res) => {
  const id = req.user.id;
  const index = users.findIndex((item) => item.id === id);
  users[index] = {
    ...users[index],
    ...req.body,
  };

  writeDataToFile(dbFilePath, users);
  res.status(201).json({ user: users[index] });
};
