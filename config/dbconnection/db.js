const mongoose = require('mongoose');

const databaseUrl = process.env.DATABASE_URL;
const connectToMongo = ()=>{
  
    mongoose.connect(databaseUrl).then(()=>{
            console.log('Connected to MongoDB');

        }).catch((error)=>{
            console.error('Error connecting to MongoDB:', error);
         })

}

module.exports = connectToMongo;


//only purpose for checking
// const { MongoClient } = require('mongodb');

// const mongoURI = "mongodb://127.0.0.1:27017";
// const client = new MongoClient(mongoURI, { useUnifiedTopology: true });

// client.connect().then(() => {
//     // If the connection is successful, log a message indicating the successful connection
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     // If there's an error during the connection, log an error message
//     console.error('Error connecting to MongoDB:', error);
//   }).finally(() => {
//     // Close the connection when done
//     client.close();
//   });








  
