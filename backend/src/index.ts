import express from "express";
import router from "./routes";

const app = express();
const port = 4000;

app.use(express.json());
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Server is up and running 🚀");
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`🚀  Server ready at ${port}`);
  });
}

export default app;
