import express from "express";

const app = express();

// set the static folder
app.use(express.static('public'));

// Parse URL encode bodies as sent by HTML forms
app.use(express.urlencoded({extended: true}));

// Parse JSON bodies ( as sent by API clients)
app.use(express.json());

// Handle GET request to fetch users
app.get('/users', (request, response )=>{
    const users = [
        { id:1, name: 'John Doe' },
        { id:2, name: 'Jane Doe' },
        { id:3, name: 'Jonathan Doe' },
        { id:4, name: 'Joseph Doe' },

    ];

    response.send(`
        <h1 class="text-2xl font-bold my-4">Users</h1>
        <ul>
            ${users.map ((user)=>`<li>${user.name}</li>`).join('')}
        <ul>
    `)
})

//Start the server
app.listen(3000, ()=>{
    console.log('Server listening on port 3000');
});