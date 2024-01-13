import express from "express";

const app = express();

// set the static folder
app.use(express.static('public'));

// Parse URL encode bodies as sent by HTML forms
app.use(express.urlencoded({extended: true}));

// Parse JSON bodies ( as sent by API clients)
app.use(express.json());

// Handle GET request to fetch users
app.get('/users', async (request, res )=>{
    // const users = [
    //     { id:1, name: 'John Doe' },
    //     { id:2, name: 'Jane Doe' },
    //     { id:3, name: 'Jonathan Doe' },
    //     { id:4, name: 'Joseph Doe' },

    // ];

    const limit = request.query.limit || 10
    const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);

    const users = await response.json();
    res.send(`
        <h1 class="text-2xl font-bold my-4">Users</h1>
        <ul>
            ${users.map ((user)=>`<li>${user.name}</li>`).join('')}
        <ul>
    `)
})

// Handle the post request for temp conversion
app.post('/convert', (req, res) => {
    setTimeout(()=>{
        const fahrenheit = parseFloat(req.body.fahrenheit);

        const celsius = ( fahrenheit - 32) * (5/9);

        res.send(`
            <p>
                ${fahrenheit} degrees Fahrenheit is equal to ${celsius.toFixed(2)} degrees celsius
            </p>
        `);
    }, 2000)
}) 

let counter = 0;
// Handle get request for polling example
app.get("/poll", (req, res)=>{
    counter++;

    const data = { value: counter};

    res.json(data);
});

let currentTemperature = 20;
// Handle GET request for weather
app.get("/get-temperature", (req, res)=>{
    currentTemperature += Math.random() * 2 - 1 // Random temp change;

    res.send(currentTemperature.toFixed(1) + 'C');
});


const contacts = [
    {name: 'John Doe', email:'john@example.com'},
    {name: 'Bright Ngoxy', email:'bright@example.com'},
    {name: 'Kelvin Kapuya', email:'kelz@example.com'},
    {name: 'Richard Malombe', email:'richard@example.com'},
    {name: 'Mungo Kimu', email:'mungo@example.com'},
    {name: 'Chimwemwe Vin', email:'chimze@example.com'},
    {name: 'Chinsisi Mollen', email:'chinsi@example.com'},
];
// Handle POSt request for user search
app.post("/search", (req, res)=>{
    const searchTerm = req.body.search.toLowerCase();

    if(!searchTerm){
        return res.send('<tr></tr>');
    }

    const searchResults = contacts.filter(contact => {
        const name = contact.name.toLowerCase();
        const email = contact.email.toLowerCase();

        return name.includes(searchTerm) || email.includes(searchTerm);
    
    })

    setTimeout(() => {
        const searchResultHtml = searchResults.map( contact => `
            <tr>
                <td>
                    <div className="my-4 p-2">${contact.name}</div>
                    <div className="my-4 p-2">${contact.email}</div>
                </td>
            </tr>
        `).join('')

        res.send(searchResultHtml);
    }, 1000);
});


//Start the server
app.listen(3000, ()=>{
    console.log('Server listening on port 3000');
});