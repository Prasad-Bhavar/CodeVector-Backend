import express from "express";
import routes from "./routes";
import cors from "cors";
const app = express();

app.use(cors({
    origin: "https://codevector-products-gr5e.onrender.com",
    credentials: true,
}));
app.use(express.json());

app.use("/api", routes);

export default app;