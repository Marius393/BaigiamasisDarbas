require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongodb');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static("public"));

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.DB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.listen(process.env.PORT, () => {
  console.log('Serveris paleistas. Laukia užklausų');
});

app.post('/users', (request, response) => {
  client.connect(async () => {
    const database = client.db('GrupinisProjektas');
    const serviceCollection = database.collection('Users');
    const result = await serviceCollection.insertOne({
      name: request.body.usersName,
      surname: request.body.usersSurname,
      email: request.body.usersEmail,
      age: request.body.usersAge,
    });
    response.json(result);

    client.close();
  });
});



// get users
app.get('/users', (request, response) => {
  client.connect(async () => {
    const database = client.db('GrupinisProjektas');
    const collection = database.collection('Users');
    const users = await collection.find({}).toArray();
    // const collectionMemberships = database.collection('Services');
    // const resultMemberships = await collectionMemberships.find({}).toArray();
    // const usersWhitMemberships = users.map(function (user) {
    //   const newUser = { ...user }
    //   const userMembership = resultMemberships.find(function (membership) {
    //     return membership._id.equals(user.membershipId)
    //   })
    //   newUser.membership = userMembership
    //   return newUser
    // })

    response.json(users);
    client.close();
  });
});

app.delete('/users/:id', (request, response) => {
  client.connect(async () => {
    const database = client.db('GrupinisProjektas');
    const collection = database.collection('Users');
    const result = await collection.deleteOne({
      _id: ObjectId(request.params.id),
    });
    response.json(result);
    client.close();
  });
});

app.put('/users', (req, res) => {
  client.connect(async (err, clientDb) => {
    if (err) {
      res.send('Something went wrong!!');
      client.close();
    } else {
      const database = client.db('GrupinisProjektas');
      const collection = database.collection('Users');
      const {
        _id, name, surname, email, age,
      } = req.body;
      const filter = { _id: ObjectId(_id) };
      const newValues = {
        name, surname, email, age,
      };
      try {
        const result = await collection.replaceOne(filter, newValues);
        res.send(result);
        clientDb.close();
      } catch (error) {
        res.send('Something went wrong!!');
        clientDb.close();
      }
    }
  });

});