import express from "express"
import events from "./routes/event.js"
import cors from "cors"
import jwt from "jsonwebtoken"
import herokuSSLRedirect from "heroku-ssl-redirect"

const sslRedirect = herokuSSLRedirect.default;
const app = express();
const PORT = process.env.PORT || 3000;

export const jwtSecretKey = "dsahbcdisa7gdcqw0bde+&/sdc";

app.use(sslRedirect());
app.use(cors());
app.use(express.json());
app.use(events);
 
app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});