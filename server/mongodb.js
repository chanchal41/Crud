const {MongoClient} = require('mongodb')
const url= 'mongodb://localhost:27017';
const databaseName='products'
const client= new MongoClient(url);
app.use('/upload', express.static('uploads'))

async function dbConnect()
{
    let result = await client.connect();
    db= result.db(databaseName);
    return db.collection('categories');
  
}
module.exports= dbConnect;