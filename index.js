import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render("index");
});

app.post('/transaction',(req,res)=>{
    res.redirect('/');
});

app.get('/delete',(req,res)=>{
    res.render("delete");
});

app.get('/modify',(req,res)=>{
    res.render("modify");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
