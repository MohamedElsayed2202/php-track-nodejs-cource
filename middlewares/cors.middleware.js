export const cors = (req, res, next) => {
  const origins = [
    "http://localhost:3000",
    "https://localhost:3020",
    "https://bookstore.com",
  ];
  const origin = req.headers.origin;
  if (origins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
};

// http only
