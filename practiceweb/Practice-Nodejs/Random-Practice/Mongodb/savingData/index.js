const mongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://jerryg2212:Baseball22@cluster0.cirov.mongodb.net/tester?retryWrites=true&w=majority";

mongoClient.connect(url, (err, client) => {

    const db = client.db('tester');
    const practiceM = db.collection('practiceM');
    /*let cursor = practiceM.find({
    $or: [{age: {$lt: 40}}, {"hobbies": "Bowling"}]
    });
    c
    cursor.forEach(addOne, showError);*/
    /*practiceM.deleteMany({
        jerry : {$lt : 40}}
    ).then((result) => {console.log(result.modifiedCount)})*/
    practiceM.aggregate([
        {$project: {University: "School of Arts"}}
    ], (err, cursor) => {
        cursor.forEach(addOne, showError);
    })
    client.close();
})

function addOne(doc){
    console.log('fuck you');
    console.log(JSON.stringify(doc, null, 4));
}
function showError(err){
    if(err){
        console.log(err);
        console.log('error has been logged');
    }
    console.log('ended with no errors');
}