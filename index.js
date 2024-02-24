import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost:27017/moneyTrackerWebApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const moneytrackerSchema = new mongoose.Schema({
    name: String,
    price: String,
    date: { type: Date, default: Date.now }
});

const MoneyData = mongoose.model("MoneyData", moneytrackerSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
        res.render("index");
});

app.post('/transaction', async (req, res) => {
    try {
        const { name, price } = req.body;
        console.log(name);
        console.log(price);
        const newData = new MoneyData({ name, price });
        await newData.save();
        res.redirect("/");
    } catch (error) {
        res.status(500).send("Error inserting data.");
    }
});

app.get('/delete', async(req, res) => {
    try {
        const transactions = await MoneyData.find();
        res.render("delete",{ transactions });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data.");
    }
});

app.post("/remove",async(req,res)=>{
    try{
        const { transactionId } = req.body;
        if (!transactionId) {
            return res.status(400).json({ error: 'Transaction ID is required' });
        }

        const result = await MoneyData.deleteOne({ _id: transactionId });

        if (result.deletedCount === 1) {
            const transactions = await MoneyData.find();
            res.render("delete",{ transactions });
        } else {
            res.status(404).json({ error: 'Expense not found' });
        }
    } catch (error) {
        console.error('Error removing expense:', error);
        res.status(500).json({ error: 'Failed to remove expense' });
    }
    
});
app.get('/modify', async(req, res) => {
    try {
        const transactions = await MoneyData.find();
        res.render("modify",{ transactions });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data.");
    }
});

app.post("/update",async(req,res)=>{
    try {
        const transactions = await MoneyData.find();
        res.render("modify",{ transactions });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data.");
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
