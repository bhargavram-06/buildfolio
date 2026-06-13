import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;

// 🛡️ ACCESSIBILITY AUDIT: Enforce strict 10-second server connection timeouts
const options = {
  connectTimeoutMS: 10000,
  socketTimeoutMS: 10000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

export async function connectToDatabase(dbName = "buildfolio") {
  try {
    const mongoClient = await clientPromise;
    return mongoClient.db(dbName);
  } catch (error) {
    throw new Error("Database link failed to establish within safe runtime boundaries.");
  }
}