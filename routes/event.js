import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/connections.js"
import jwt from "jsonwebtoken"
import { jwtSecretKey } from "../index.js"

const router = express.Router();

router.get('/events', async function (req, res) {
    let collections = db.collection("events")
    let result = await collections.find().toArray();
    res.send(result).status(200);
});

router.post('/events', async function (req, res) {
    try {
        let newDocument = {
            name: req.body.name,
            date: req.body.date,
            description: req.body.description
        }
        let collection = await db.collection("events");
        let result = await collection.insertOne(newDocument);
        res.send(result).status(200);
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
});

router.delete('/events/:id', async function (req, res) {
    try {
        let collection = await db.collection("events");
        let result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        res.send(result).status(200);
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
});

router.patch("/events/:id", async function (req, res) {
    try {
        const query = {_id: new ObjectId(req.params.id)};
        const updates = {
            $set: {
                name: req.body.name,
                date: req.body.date,
                description: req.body.description
            }
        }
    let collection = await db.collection("events");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
    } catch (err) {
        console.error(err)
        res.status(500).send("error updating event")
    }
})

router.get("/auth", async function (req, res) {
    let collections = db.collection("auth")
    let result = await collections.find().toArray();
    res.send(result).status(200);
});

router.post("/auth", async function (req, res) {
    try {
    const query = {
        username: req.body.email,
        password: req.body.password
    }
    let collection = await db.collection("auth");
    let user = await collection.findOne(query);
    if (user) {
        const token = jwt.sign({username: user.username}, jwtSecretKey);
        res.send({token: token}).status(200);
    }
    else {
        console.log("naaaaah")
    }

    }
    catch (err) {
        console.error(err)
        res.status(500).send("error authenticating")
    }
})

//let collection = await db.collection("events");
//let result = await collection.insertOne(newDocument);
//res.send(result).status(200);

export default router;

