const express = require("express");

const server = express();

server.use(express.json());

const list = [];

function verify(req,res,next) {

    const {title, content, date, hour} = req.body;

    if(!title){
        return res.json({
            error: "title is required"
        });      
    }else if (!content){
        return res.json({
            error: "content is required"
        });
    }else if (!date){
        return res.json({
            error: "date is required"
        });
    }else if (!hour){
        return res.json({
            error: "hour is required"
        });
    }

    next();
}

server.get("/", (req,res) =>{
    return res.json({
        result: "Welcome to Notepad"
    });
});

server.post("/list",verify, (req, res) =>{
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

server.put("/list/:id",verify, (req,res) =>{
    const {title, content, date, hour} = req.body;
    const {id} = req.params;
    const note = {title, content, date, hour};

    list[id] = note;

    return res.json({
        result: "update",
        list: note
    });
});

server.delete("/list/:id", (req,res)=>{

    const {id} = req.params;
    list.splice(id,1);

    return res.json({
        result: "deleted"  
    });
});

server.listen(3000);