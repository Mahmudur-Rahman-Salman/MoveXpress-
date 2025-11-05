// // MoveXpress  AfpMSTS6LVOiGbQ9

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import Stripe from "stripe";
import fs from "fs"; // ✅ Add this line

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
// const admin = require("firebase-admin");

import admin from "firebase-admin";

// ✅ Load Firebase service account JSON safely
const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("./firebase-admin-key.json", import.meta.url))
);

// middleware
app.use(cors());
app.use(express.json());

const stripe = new Stripe(process.env.PAYMENT_GATEWAY_KEY);

// Firebase admin server connected

// const serviceAccount = require("./firebase-admin-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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
    const usersCollection = db.collection("users");
    const parcelCollection = db.collection("parcels");
    const paymentsCollection = db.collection("payments");
    const ridersCollection = db.collection("riders");
    console.log("✅ Connected to MongoDB Database: MoveXpress");

    // middleware for verifying JWT can be added here
    const verifyFirebaseToken = async (req, res, next) => {
      // console.log("Header in middlewares: ", req.headers);
      const authHeader = req.headers.authorization || req.headers.Authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({ message: "unauthorized access" });
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return res.status(401).send({ message: "unauthorized access" });
      }

      // verify the token
      try {
        const decoded = await admin.auth().verifyIdToken(token);
        req.decoded = decoded;
        next();
      } catch (error) {
        return res.status(403).send({ message: "forbidden access" });
      }
    };

    // Root route
    app.get("/", (req, res) => {
      res.send("🚚 MoveXpress API is running...");
    });

    app.post("/users", async (req, res) => {
      const email = req.body.email;
      const userExists = await usersCollection.findOne({ email });
      if (userExists) {
        // update last log in
        return res
          .status(200)
          .send({ message: "User already exists", inserted: false });
      }
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    // Get all parcels
    // app.get("/parcels", async (req, res) => {
    //   try {
    //     const parcels = await parcelCollection.find().toArray();
    //     res.send(parcels);
    //   } catch (error) {
    //     console.error("Error fetching parcels:", error);
    //     res.status(500).send({ message: "Failed to fetch parcels" });
    //   }
    // });

    app.get("/parcels", verifyFirebaseToken, async (req, res) => {
      try {
        const userEmail = req.query.email;

        // Match your database field name correctly
        const query = userEmail ? { userEmail } : {};

        // Sort newest first
        const options = {
          sort: { creation_date: -1 },
        };

        const parcels = await parcelCollection.find(query, options).toArray();
        res.status(200).send(parcels);
      } catch (error) {
        console.error("Error fetching parcels:", error);
        res.status(500).send({ message: "Failed to get parcels" });
      }
    });

    // GET: Get a specific parcel by ID
    app.get("/parcels/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const parcel = await parcelCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!parcel) {
          return res.status(404).send({ message: "Parcel not found" });
        }

        res.send(parcel);
      } catch (error) {
        console.error("Error fetching parcel:", error);
        res.status(500).send({ message: "Failed to fetch parcel" });
      }
    });

    // GET: Get all parcels
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

    // DELETE a parcel by ID
    app.delete("/parcels/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const userEmail = req.query.email; // Example: /parcels/:id?email=user@gmail.com

        const query = { _id: new ObjectId(id), created_by: userEmail };
        const result = await parcelCollection.deleteOne(query);

        if (result.deletedCount === 0) {
          return res
            .status(404)
            .send({ message: "Parcel not found or not authorized" });
        }

        res.send({
          message: "Parcel deleted successfully",
          deletedCount: result.deletedCount,
        });
      } catch (error) {
        console.error("Error deleting parcel:", error);
        res.status(500).send({ message: "Failed to delete parcel" });
      }
    });

    // riders apis

    app.post("/riders", async (req, res) => {
      const rider = req.body;
      const result = await ridersCollection.insertOne(rider);
      res.send(result);
    });

    app.get("/riders/pending", async (req, res) => {
      try {
        const pendingRiders = await ridersCollection
          .find({ status: "pending" })
          .toArray();

        res.send(pendingRiders);
      } catch (error) {
        console.error("Failed to load pending riders:", error);
        res.status(500).send({ message: "Failed to load pending riders" });
      }
    });

    app.get("/riders/active", async (req, res) => {
      const result = await ridersCollection
        .find({ status: "active" })
        .toArray();
      res.send(result);
    });

    app.patch("/riders/:id/status", async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status,
        },
      };

      try {
        const result = await ridersCollection.updateOne(query, updateDoc);
        res.send(result);
      } catch (err) {
        res.status(500).send({ message: "Failed to update rider status" });
      }
    });

    app.post("/tracking", async (req, res) => {
      const {
        tracking_id,
        parcel_id,
        status,
        message,
        updated_by = "",
      } = req.body;

      const log = {
        tracking_id,
        parcel_id: parcel_id ? new ObjectId(parcel_id) : undefined,
        status,
        message,
        time: new Date(),
        updated_by,
      };

      const result = await trackingCollection.insertOne(log);
      res.send({ success: true, insertedId: result.insertedId });
    });

    app.get("/payments", verifyFirebaseToken, async (req, res) => {
      try {
        const userEmail = req.query.email;

        if (req.decoded.email !== userEmail) {
          return res.status(403).send({ message: "forbidden access" });
        }

        const query = userEmail ? { email: userEmail } : {};
        const options = { sort: { paid_at: -1 } }; // Latest first

        const payments = await paymentsCollection
          .find(query, options)
          .toArray();
        res.send(payments);
      } catch (error) {
        console.error("Error fetching payment history:", error);
        res.status(500).send({ message: "Failed to get payments" });
      }
    });

    // POST: Record payment and update parcel status
    app.post("/payments", async (req, res) => {
      try {
        const { parcelId, email, amount, paymentMethod, transactionId } =
          req.body;

        // 1. Update parcel's payment_status
        const updateResult = await parcelCollection.updateOne(
          { _id: new ObjectId(parcelId) },
          {
            $set: {
              payment_status: "paid",
            },
          }
        );

        if (updateResult.modifiedCount === 0) {
          return res
            .status(404)
            .send({ message: "Parcel not found or already paid" });
        }

        // 2. Insert payment record
        const paymentDoc = {
          parcelId,
          email,
          amount,
          paymentMethod,
          transactionId,
          paid_at_string: new Date().toISOString(),
          paid_at: new Date(),
        };

        const paymentResult = await paymentsCollection.insertOne(paymentDoc);

        res.status(201).send({
          message: "Payment recorded and parcel marked as paid",
          insertedId: paymentResult.insertedId,
        });
      } catch (error) {
        console.error("Payment processing failed:", error);
        res.status(500).send({ message: "Failed to record payment" });
      }
    });

    app.post("/create-payment-intent", async (req, res) => {
      const amountInCents = req.body.amountInCents;
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amountInCents, // Amount in cents
          currency: "usd",
          payment_method_types: ["card"],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        res.status(500).json({ error: error.message });
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
