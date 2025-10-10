// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// dotenv.config();
// const app = express();
// // Load port from .env
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cf70q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// const clientOptions = {
//   serverApi: { version: "1", strict: true, deprecationErrors: true },
// };

// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);

//     // api creation
//     const db = client.db("MoveXpress");
//     const parcelsCollection = db.collection("parcels");

//     // get api

//     app.get("/parcels", async (_, res) => {
//       const parcels = parcelsCollection.find().toArray();
//       res.send(parcels);
//     });

//     // POST: Create a new parcel
//     app.post("/parcels", async (req, res) => {
//       try {
//         const newParcel = req.body;
//         newParcel.createdAt = new Date();
//         const result = await parcelsCollection.insertOne(newParcel);
//         res.status(201).send(result);
//       } catch (error) {
//         console.error("Error inserting parcel:", error);
//         res.status(500).send({ message: "Failed to create parcel" });
//       }
//     });

//     // Send a ping to confirm a successful connection');

//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB Database!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);

// // Basic route
// app.get("/", (req, res) => {
//   res.send("Parcel server is running...");
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Parcel Server is running on port ${PORT}`);
// });

// // MoveXpress  AfpMSTS6LVOiGbQ9

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cf70q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Define the database and collection


async function run() {
  try {
    await client.connect();
    const db = client.db("MoveXpress");
    const parcelCollection = db.collection("parcels");
    console.log("✅ Connected to MongoDB Database: MoveXpress");

    // Root route
    app.get("/", (req, res) => {
      res.send("🚚 MoveXpress API is running...");
    });

    // Get all parcels
    app.get("/parcels", async (req, res) => {
      try {
        const parcels = await parcelCollection.find().toArray();
        res.send(parcels);
      } catch (error) {
        console.error("Error fetching parcels:", error);
        res.status(500).send({ message: "Failed to fetch parcels" });
      }
    });

    // Save parcel info
    app.post("/parcels", async (req, res) => {
      try {
        const parcelData = req.body;
        parcelData.creation_date = new Date().toISOString();
        parcelData.trackingId = `TRK-${Date.now()}-${Math.floor(
          Math.random() * 1000
        )}`;
        parcelData.status = "Pending Pickup";

        const result = await parcelCollection.insertOne(parcelData);
        res.status(201).send({
          message: "Parcel saved successfully",
          insertedId: result.insertedId,
        });
      } catch (error) {
        console.error("Error saving parcel:", error);
        res.status(500).send({ message: "Failed to save parcel" });
      }
    });

    // Start server after DB connection
    app.listen(port, () => {
      console.log(`🚀 Parcel Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

run();
