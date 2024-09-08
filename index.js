import express from "express"
import events from "./routes/event.js"
import cors from "cors"
import jwt from "jsonwebtoken"

const app = express();
const PORT = 3000;

export const jwtSecretKey = "dsahbcdisa7gdcqw0bde+&/sdc";

app.use(cors());
app.use(express.json());
app.use(events);
 
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});