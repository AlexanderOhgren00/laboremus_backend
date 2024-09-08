import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb+srv://alexanderneurasite:laboremus@cluster0.syystbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log(
   "Pinged your deployment. You successfully connected to MongoDB!"
  );
} catch(err) {
  console.error(err);
}

let db = client.db("Cluster0");

export default db;