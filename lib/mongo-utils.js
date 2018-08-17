const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URL, NODE_ENV, MONGO_DB_DEV, MONGO_DB_TEST } = process.env;

// set database
const dbName = NODE_ENV == "development" ? MONGO_DB_DEV : MONGO_DB_TEST;

// takes Pocket API get response and syncs with mongodb
exports.syncPocketList = async items => {
  try {
    // connect to mongodb
    const client = await MongoClient.connect(
      MONGO_URL,
      { useNewUrlParser: true }
    );
    const collection = client.db(dbName).collection("pocket_list");

    // operations
    const operations = items.map(item => ({
      updateOne: {
        filter: { url: item.given_url },
        update: { $set: { ...item } },
        upsert: true
      }
    }));
    // bulk writes
    const res = await collection.bulkWrite(operations);

    client.close();
    return res;
  } catch (error) {
    client.close();
    return error;
  }
};
