import express from "express";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("index", { message: "hello world" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
