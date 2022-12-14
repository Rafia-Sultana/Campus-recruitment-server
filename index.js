const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const nodemailer = require("nodemailer");
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
        const aaaCollection = client.db('campus-recruitment').collection('appliedJob')
        const shortListed = client.db('campus-recruitment').collection('ShortListed')
        const rejected = client.db('campus-recruitment').collection('rejected')



        //GET user
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query)
            const users = await cursor.toArray()
            res.send(users)
        })

        //GET User sepecifiqly
        app.get('/singleJob/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const resutl = await userCollection.findOne(query)

            res.send(resutl)
        })

        app.get('/user/:uid', async (req, res) => {
            const uid = req.params.uid
            const query = { uid: uid }
            const cursor = userCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)

        })
      /*   app.get('/singleuser/:apply_date', async (req, res) => {
            // const cursor2 = userCollection.find({ "apply_date": { $gte: new Date("2022-12-20"), $lte: new Date("2022-12-01") } })
            const cursor2 = userCollection.find()
            const result2 = await cursor2.toArray()
            res.send(result2)
        }) */

        /*         db.collection.find({"apply_date":{$gte:new ISODate("2017-04-14T23:59:59Z"),$lte:new ISODate("2017-04-15T23:59:59Z")}}).count(); */



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
        app.get('/personal/:uid', async (req, res) => {
            const uid = req.params.uid
            const query = { uid: uid }
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
        app.get('/address/:uid', async (req, res) => {
            const uid = req.params.uid
            const query = { uid: uid }
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
        app.get('/career/:uid', async (req, res) => {
            const uid = req.params.uid
            const query = { uid: uid }
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
        app.get('/employmenthistory/:uid', async (req, res) => {
            const uid = req.params.uid
            const query = { uid: uid }
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
        app.get('/academic/:uid', async (req, res) => {
            const uid = req.params.uid
            const query = { uid: uid }
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
        app.get('/training/:uid', async (req, res) => {
            const uid = req.params.uid
            const query = { uid: uid }
            const cursor = trainingCollection.find(query)
            const training = await cursor.toArray()
            res.send(training)
        })

        //CANDIDATE ROLE
        app.post('/candidates', async (req, res) => {
            const candidate = req.body
            console.log(candidate)
            const result = await roleCollection.insertOne(candidate)
            res.json(result)
        })

        app.get('/candidates', async (req, res) => {
            const query = {};
            const cursor = roleCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/role-user/:role', async (req, res) => {
            const role = req.params.role
            const query = { role: role }
            const cursor = await roleCollection.find(query).toArray()
            res.send(cursor)
        })

        //delete user
        app.delete('/role-user/delete/:id', async (req, res) => {
            const delteUser = req.params.id;
            const result = await roleCollection.deleteOne({ _id: ObjectId(delteUser) });
            console.log((delteUser))
            res.send('success')

        })


        app.get('/candidates/:user', async (req, res) => {
            const user = req.params.user
            const query = { email: user }
            const cursor = await roleCollection.find(query).toArray()

            res.send(cursor)
        })

        app.get("/allCvs", async (req, res) => {
            const personal = await personalCollection.find({}).toArray()
            const address = await addressCollection.find({}).toArray()
            const career = await careerCollection.find({}).toArray()
            const employment = await employmentCollection.find({}).toArray()
            const academic = await academicCollection.find({}).toArray()
            const training = await trainingCollection.find({}).toArray()
            const info = [personal, address, career, employment, academic, training]

            res.send(info)
        })
        /*       app.get("/allCvs/:id", async (req, res) => {
      
                  const id = req.params.id
                  console.log(id);
                  const query = { designation: id }
                  console.log(query)
                  const cursor = employmentCollection.find(query)
                  const result = await cursor.toArray()
                  res.send(result)
              }) */

        app.post('/percv', async (req, res) => {
            const percv = req.body;
            console.log(percv);
            const percv2 = await aaaCollection.insertOne(percv)
            res.json(percv2)

        })
        app.get('/percv', async (req, res) => {
            const query = {};
            const cursor = aaaCollection.find(query)
            const percv2 = await cursor.toArray()
            res.send(percv2)
        })
        app.get('/percv/:email', async (req, res) => {
            const email = req.params.email
            const query = { email: email }
            const cursor = await aaaCollection.find(query).toArray()

            res.send(cursor)
        })
    




        app.post('/short-list', async (req, res) => {
            const perShortListed = req.body;
            console.log(perShortListed);
            const result = await shortListed.insertOne(perShortListed)
            res.json(result)
        })
        app.get('/short-list/:uid', async (req, res) => {
            const uid = req.params.uid
            const query = { companyUid: uid }
            const cursor = shortListed.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/shortlist-candidates/:user', async (req, res) => {
            const user = req.params.user
            const query = { email: user }
            const cursor = await shortListed.find(query).toArray()

            res.send(cursor)
        })





        app.post('/rejected', async (req, res) => {
            const perRejected = req.body;
            console.log(perRejected);
            const result = await rejected.insertOne(perRejected)
            res.json(result)
        })
        app.get('/rejected/:uid', async (req, res) => {
            const uid = req.params.uid
            const query = { companyUid: uid }
            const cursor = rejected.find(query)
            const result = await cursor.toArray()
            res.send(result)

        })

        /*    app.post("/sendEmail", async (req, res) => {
   
               const { toEmail, fromEmail } = req.body;
   
               let testAccount = await nodemailer.createTestAccount();
   
               let transporter = nodemailer.createTransport({
                   host: "smtp.ethereal.email",
                   port: 587,
                   secure: false, // true for 465, false for other ports
                   auth: {
                       user: testAccount.user, // generated ethereal user
                       pass: testAccount.pass, // generated ethereal password
                   },
               });
   
   
               let info = await transporter.sendMail({
   
                   from: fromEmail, // sender address
                   to: toEmail, // list of receivers
                   subject: "Short Listed", // Subject line
                   text: "simpletext", // plain text body
                   html: "<b>Hello world?</b>", // html body
               });
   
               console.log("Message sent: %s", info.messageId);
               console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
           })
    */




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