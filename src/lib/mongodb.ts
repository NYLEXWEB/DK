import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB_NAME || "dkdancecompany";

interface GlobalWithMongo {
  _mongoClient?: MongoClient;
  _mongoClientPromise?: Promise<MongoClient> | null;
}

const globalWithMongo = global as unknown as GlobalWithMongo;

export function resetDbClient() {
  try {
    if (globalWithMongo._mongoClient) {
      globalWithMongo._mongoClient.close().catch(() => {});
    }
  } catch {}
  globalWithMongo._mongoClient = undefined;
  globalWithMongo._mongoClientPromise = null;
}

async function getConnectedClient(): Promise<MongoClient | null> {
  if (!uri) {
    return null;
  }

  // If already connected client exists in global memory
  if (globalWithMongo._mongoClient) {
    return globalWithMongo._mongoClient;
  }

  if (!globalWithMongo._mongoClientPromise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      minPoolSize: 1,
      maxIdleTimeMS: 30000,
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      retryReads: true,
    });

    globalWithMongo._mongoClientPromise = client
      .connect()
      .then((c) => {
        globalWithMongo._mongoClient = c;
        // Listen to close / error events on topology to clean up stale references
        c.on("close", () => {
          resetDbClient();
        });
        c.on("error", () => {
          resetDbClient();
        });
        return c;
      })
      .catch((err) => {
        console.error("MongoDB connection failed:", err.message);
        resetDbClient();
        throw err;
      });
  }

  try {
    return await globalWithMongo._mongoClientPromise;
  } catch {
    return null;
  }
}

export async function getDb(): Promise<Db | null> {
  try {
    const client = await getConnectedClient();
    if (!client) {
      return null;
    }
    return client.db(dbName);
  } catch (error: any) {
    console.error("MongoDB getDb failed, resetting pool:", error?.message);
    resetDbClient();
    return null;
  }
}

export default getConnectedClient;
