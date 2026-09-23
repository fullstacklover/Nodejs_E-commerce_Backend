import express from "express";

const app = express();


app.get("/", (req, res) => {
    return res.status(200).json(
         {
            success : true,
            message : "Hello from backend!"
         }
    )
});

app.listen(4000)