require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });

const app = express();

app.use(express.json());


const donorSchema = new mongoose.Schema({
    donorId: String,
    name: String,
    age: Number,
    bloodGroup: String,
    phone: String,
    city: String
});

const Donor = mongoose.model("Donor", donorSchema);


app.get("/donor/:donorId", async (req, res) => {

    const donor = await Donor.findOne({
        donorId: req.params.donorId
    });

    if (!donor) {
        return res.status(404).send("Donor not found");
    }

    res.json(donor);
});


app.delete("/donor/:donorId", async (req, res) => {

    const donor = await Donor.findOneAndDelete({
        donorId: req.params.donorId
    });

    if (!donor) {
        return res.status(404).send("Donor not found");
    }

    res.send("Donor deleted successfully");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});