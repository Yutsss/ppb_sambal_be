import "./config/env";
import express from "express";
import cors from "cors";
import { predictRouter } from "./router/PredictRouter";
import { authRouter } from "./router/AuthRouter";
import { userRouter } from "./router/UserRouter";
import { sambalRouter } from "./router/SambalRouter";
import { historyRouter } from "./router/HistoryRouter";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://fe-next-xi.vercel.app", 
    ],
  })
);

app.use(express.json());


app.use("/sambal", express.static("sambal"));

app.use("/api", predictRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/sambals", sambalRouter);
app.use("/api/history", historyRouter);

const port = Number(process.env.PORT_SERVER) || 5000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
