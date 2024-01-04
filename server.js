import express from "express";
import xss from 'xss';

const app = express();

// set the static folder
app.use(express.static('public'));

// Parse URL encode bodies as sent by HTML forms
app.use(express.urlencoded({extended: true}));

// Parse JSON bodies ( as sent by API clients)
app.use(express.json());

//Start the server
app.listen(3000, ()=>{
    console.log('Server listening on port 3000');
});