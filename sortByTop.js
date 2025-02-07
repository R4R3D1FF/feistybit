import { MongoClient } from 'mongodb';

async function sortedEls(criteria, n){
    const uri = "mongodb://127.0.0.1:27017"
    const client = new MongoClient(uri);

    const db = await client.db("reddit")
    const collection = await db.collection("redditSearchQueries")
    let randomDocs;
    if (criteria == "top"){
        randomDocs = await collection.find().sort({upvotes:-1}).aggregate([{ $sample: { size: n } }]).toArray();
    }
    else if (criteria == "new"){
        randomDocs = await collection.find().sort({date:-1}).aggregate([{ $sample: { size: n } }]).toArray();
    }
    else if (criteria == "controversial"){
        randomDocs = await collection.find().aggregate([
            {
                $addFields: {
                    ratio: { $cond: { if: { $eq: ["$votes", 0] }, then: null, else: {$abs: { $divide: ["$upvotes", "$votes"] } } } }
                }
            },
            { $sort: { ratio: 1 } },
            { $sample: { size: n } }
        ]).toArray();
    }
    return randomDocs;
}
