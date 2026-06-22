import app from "./app";
import { AppDataSource } from "./config/data-source";

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
    .then(() => {
        console.log("Database Connected");

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });