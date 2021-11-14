var AWS = require("aws-sdk");
// Create DynamoDB document client
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context) => {
  console.log("--eventCopy-->", event);
  let eventCopy = {};
  let imageKey = "";

  event.Records.forEach((record) => {
    const { Sns } = record;
    eventCopy = Object.assign({}, Sns);
    const message = JSON.parse(eventCopy.Message);
    imageKey = message["Records"][0]["s3"]["object"]["key"];
    console.log("--eventCopy-->", imageKey);
  });

  var params = {
    TableName: "Files",
    Item: {
      type: Date.parse(new Date()),
      name: imageKey,
    },
  };
  console.log("--Params-->", params);

  console.log("Adding a new item...");
  docClient.put(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to add item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
    }
  });
};
