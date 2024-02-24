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

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.gry3mib.mongodb.net/moneyTrackerWebData`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const moneytrackermodel = new mongoose.Schema({
    name: String,
    price : Number,
    date : Date
});

const model_creation = mongoose.model("model_creation", moneytrackermodel);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.get('/', (req, res) => {
    res.render("index",{message : "hello"});
});

app.post('/transaction',async (req,res)=>{
    try{
        const {name, price} = req.body;
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();

        const date = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
        const MoneyData = new model_creation({
            name,
            price,
            date
        });
        await MoneyData.save();
        res.render("index", {message : "able to insert data"});
    }
    catch(error){
        console.log("Data  not able to insert");
        res.render("index", {message : "doesn't able to insert data"});
    }
});

app.get('/delete',(req,res)=>{
    
});

app.get('/modify',(req,res)=>{
    res.render("modify");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
