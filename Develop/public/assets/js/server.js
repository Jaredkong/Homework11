const express = require('express');
const path = require('path');
const fs = require('fs');


var emptyString = '';
fs.readFile('../../../db/db.json',(err, jsonString)=> {
    console.log(jsonString)
    emptyString = jsonString
});

const app = express();
const PORT = 4300;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('../../../public'));

app.get('/api/notes', (req, res) => res.json(JSON.parse(emptyString)));
app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    // fs.appendFile('../../../db/db.json', JSON.stringify(newNote), (err) => {});
    fs.readFile('../../../db/db.json',(err, jsonString)=>{

        let object = JSON.parse(jsonString);
        object.push(newNote);

        fs.writeFile('../../../db/db.json', JSON.stringify(object),(err)=>{});



    });

    res.redirect

});




app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, '../../notes.html')));

// app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '../../notes.html')));



app.listen(PORT, () => console.log('App listening on PORT ' + PORT));
