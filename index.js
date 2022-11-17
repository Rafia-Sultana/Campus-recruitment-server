const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
//making app by calling express
const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

/* user: db_user
password: rKm0oV65YCMq00eb */




const uri = "mongodb+srv://db_user:rKm0oV65YCMq00eb@cluster0.at92wq3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const userCollection = client.db('campus-recruitment').collection('users')


        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query)
            const users = await cursor.toArray()
            res.send(users)
        })



        //POST User: add a new user
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('adding new user', newUser)
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        });
    }
    finally {

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('running')
});
app.listen(port, () => {
    console.log('crud server is running');
})