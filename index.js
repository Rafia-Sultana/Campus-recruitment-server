const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// require('dotenv').config()
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
        const personalCollection = client.db('campus-recruitment').collection('personal Details')
        const addressCollection = client.db('campus-recruitment').collection('Address Details')
        const careerCollection = client.db('campus-recruitment').collection('Career Details')
        const employmentCollection = client.db('campus-recruitment').collection('Employment History Details')
        const academicCollection = client.db('campus-recruitment').collection('Academic Details')
        const trainingCollection = client.db('campus-recruitment').collection('training Summary')
        const roleCollection = client.db('campus-recruitment').collection('Role')



        //GET user
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query)
            const users = await cursor.toArray()
            res.send(users)
        })

        //GET User sepecifiqly
        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const resutl = await userCollection.findOne(query)
            // console.log(cursor)
            // const studentInfo = await cursor.toArray()
            res.send(resutl)
        })


        //POST User: add a new user
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('adding new user', newUser)
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        });


        //POST==> personal
        app.post('/personal', async (req, res) => {
            const personal = req.body;
            console.log('adding personal', personal)
            const result = await personalCollection.insertOne(personal)
            res.send(result)
        })

        //GET==> personal
        app.get('/personal', async (req, res) => {
            const query = {}
            const cursor = personalCollection.find(query)
            const personal = await cursor.toArray()
            res.send(personal)
        })
        //GET Personal sepecifiqly
        /*    app.get('/personal/:id', async (req, res) => {
               const id = req.params.id;
               const query = { _id: ObjectId(id) };
               const result = await personalCollection.findOne(query)
               // console.log(cursor)
               // const studentInfo = await cursor.toArray()
               res.send(result)
           }) */




        //POST==> address
        app.post('/address', async (req, res) => {
            const address = req.body;
            console.log('adding address ', address)
            const result = await addressCollection.insertOne(address)
            res.send(result)
        })

        //GET==> address 
        app.get('/address', async (req, res) => {
            const query = {}
            const cursor = addressCollection.find(query)
            const address = await cursor.toArray()
            res.send(address)
        })


        //POST==> career
        app.post('/career', async (req, res) => {
            const career = req.body;
            console.log('adding career', career)
            const result = await careerCollection.insertOne(career)
            res.send(result)
        })

        //GET==> address 
        app.get('/career', async (req, res) => {
            const query = {}
            const cursor = careerCollection.find(query)
            const career = await cursor.toArray()
            res.send(career)
        })

        //POST==> Employment History
        app.post('/employmenthistory', async (req, res) => {
            const employment = req.body;
            console.log('adding employment', employment)
            const result = await employmentCollection.insertOne(employment)
            res.send(result)
        })

        //GET==> Employment History
        app.get('/employmenthistory', async (req, res) => {
            const query = {}
            const cursor = employmentCollection.find(query)
            const employment = await cursor.toArray()
            res.send(employment)
        })

        //POST==> Academic Details
        app.post('/academic', async (req, res) => {
            const academic = req.body;
            console.log('adding academic', academic)
            const result = await academicCollection.insertOne(academic)
            res.send(result)
        })
        //GET==>  Academic Details
        app.get('/academic', async (req, res) => {
            const query = {}
            const cursor = academicCollection.find(query)
            const academic = await cursor.toArray()
            res.send(academic)
        })

        //POST==> training Details
        app.post('/training', async (req, res) => {
            const training = req.body;
            console.log('adding training', training)
            const result = await trainingCollection.insertOne(training)
            res.send(result)
        })
        //GET==>  training Details
        app.get('/training', async (req, res) => {
            const query = {}
            const cursor = trainingCollection.find(query)
            const training = await cursor.toArray()
            res.send(training)
        })

        //CANDIDATE ROLE
        app.post('/candidates', async (req, res) => {
            const candidate = req.body
            const result = await roleCollection.insertOne(candidate)
            res.json(result)
        })
        app.get('/candidates/:user', async (req, res) => {
            const user = req.params.user
            const query = { email: user }
            const cursor = await roleCollection.find(query).toArray()

            let isAdmin = false;
            if (cursor.role === "admin") {
                isAdmin = true;
            } else {
                isAdmin = false
            }

            console.log(isAdmin)
            res.send([...cursor, isAdmin])
        })

















        //POST : add appply job
        /*       app.post('/apply', async (req, res) => {
                  const stuinfo = req.body;
                  console.log('adding applied job', stuinfo)
                  const result = await studentCollection.insertOne(stuinfo)
                  res.send(result)
              }) */

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