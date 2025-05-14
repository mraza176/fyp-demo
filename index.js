import express from "express";

const app = express();
const PORT = 5000

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
}
);

app.get("/error", (req, res) => {
  throw new Error("This is a test error");
}
);

// crash the server
app.get("/crash", (req, res) => {
  process.exit(1);
}
);

app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
}
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}
);