const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const dboper = require('./operations')

const url = 'mongodb://localhost:27017/';
const dbname ='conFusion'


MongoClient.connect(url,(err,client)=>{

    assert.equal(err,null);
    console.log('connected correctly to server ');

    const db= client.db(dbname);

    dboper.insertDocument(db,{name:"vadonut",description:"test"},'dishes',(result)=>{
        console.log("insert document :\n",result.ops)

        dboper.findDocuments(db,'dishes',(docs)=>{
            console.log("fond documents:\n",docs)

            dboper.updateDocument(db,{name:'vadonut'},{description:"updatedd test"},'dishes',(result)=>{
                console.log("UPADATEDDOCUMENT \n",result.result);
                
                dboper.findDocuments(db,'dishes',(docs)=>{
                    console.log("fond documents:\n",docs)
                    db.dropCollection('dishes',(result)=>{
                        console.log("Dropped collection");
                        client.close();
                    })
                })
            })
        })
    })







    // MongoClient.connect(url).then((client) => {

    //     console.log('Connected correctly to server');
    //     const db = client.db(dbname);
    
    //     dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
    //         "dishes")
    //         .then((result) => {
    //             console.log("Insert Document:\n", result.ops);
    
    //             return dboper.findDocuments(db, "dishes");
    //         })
    //         .then((docs) => {
    //             console.log("Found Documents:\n", docs);
    
    //             return dboper.updateDocument(db, { name: "Vadonut" },
    //                     { description: "Updated Test" }, "dishes");
    
    //         })
    //         .then((result) => {
    //             console.log("Updated Document:\n", result.result);
    
    //             return dboper.findDocuments(db, "dishes");
    //         })
    //         .then((docs) => {
    //             console.log("Found Updated Documents:\n", docs);
                                
    //             return db.dropCollection("dishes");
    //         })
    //         .then((result) => {
    //             console.log("Dropped Collection: ", result);
    
    //             return client.close();
    //         })
    //         .catch((err) => console.log(err));
    
    // })
    // .catch((err) => console.log(err));


// ______WITHOUT USING CALLBACK PROMISE_______
// MongoClient.connect(url,(err,client)=>{

//     assert.equal(err,null);
//     console.log('connected correctly to server ');

//     const db= client.db(dbname);

//     dboper.insertDocument(db,{name:"vadonut",description:"test"},'dishes',(result)=>{
//         console.log("insert document :\n",result.ops)

//         dboper.findDocuments(db,'dishes',(docs)=>{
//             console.log("fond documents:\n",docs)

//             dboper.updateDocument(db,{name:'vadonut'},{description:"updatedd test"},'dishes',(result)=>{
//                 console.log("UPADATEDDOCUMENT \n",result.result);
                
//                 dboper.findDocuments(db,'dishes',(docs)=>{
//                     console.log("fond documents:\n",docs)
//                     db.dropCollection('dishes',(result)=>{
//                         console.log("Dropped collection");
//                         client.close();
//                     })
//                 })
//             })
//         })
//     })


    // const collection=db.collection('dishes');

    // collection.insertOne({"name":"uptaminnsbd","description":"bvdhgvdvhvbdhbvjh"},(err,result)=>{
    //     assert.equal(err,null);
    //     console.log('after insert \n');
    //     console.log(result.ops)

    //     collection.find({}).toArray((err,result)=>{
    //         assert.equal(err,null);
    //         console.log('found\n');
    //         console.log(result);

    //         db.dropCollection('dishes',(err,result)=>{
    //             assert.equal(err,null);
    //             client.close();
    //         })
    //     })
    // })
    

})