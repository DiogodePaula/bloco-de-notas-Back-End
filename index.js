const express = require("express");

const server = express();

server.use(express.json());

const list = [];

server.get("/", (req,res) =>{
    return res.json({
        result: "Welcome to Notepad"
    });
});

server.post("/list", (req, res) =>{
    const {title, content, date, hour} = req.body;

    const note = {title, content, date, hour};

    list.push(note);

    return res.json({note});
});

server.get("/list", (req,res) =>{
    return res.json({list});
});

server.get("/list/:id", (req, res) =>{
    const {id} = req.params;
    return res.json({
        result: "Note find",
        note: list[id]
    });
});

server.put("/list/:id", (req,res) =>{
    const {title, content, date, hour} = req.body;
    const {id} = req.params;
    const note = {title, content, date, hour};

    list[id] = note;

    return res.json({
        result: "update",
        list: note
    });
});

server.delete("/list/:id",(req,res)=>{
    const {title, content, date, hour} = req.body;
    const {id} = req.params;
    const note = {title, content, date, hour};
    list[id] = note;

    return res.json({
        result: "deleted"
    })
})

server.listen(3000);