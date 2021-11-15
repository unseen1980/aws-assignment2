const express = require("express");
const path = require("path");
const AWS = require("aws-sdk");
const PORT = process.env.PORT || 3001;
const app = express();
const cors = require("cors");
const logger = require("morgan");
const fs = require("fs");
const fileUpload = require("express-fileupload");
const { v4: uuidv4 } = require("uuid");

AWS.config.update({
  region: "eu-west-1",
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const BUCKETS = {
  NORMAL: "https://s3-u-767fc203-2701-48fa-ae48.s3.eu-west-1.amazonaws.com/",
  SMALL: "https://small-images-gallery.s3.eu-west-1.amazonaws.com/",
};

const docClient = new AWS.DynamoDB.DocumentClient();

const dbRead = async (params) => {
  let promise = docClient.scan(params).promise();
  let result = await promise;
  let data = result.Items;
  if (result.LastEvaluatedKey) {
    params.ExclusiveStartKey = result.LastEvaluatedKey;
    data = data.concat(await dbRead(params));
  }
  return data;
};

// Middlewares
app.use(cors());
app.use(fileUpload());
// app.use(require("morgan")("dev"));
app.use(
  logger(
    ":remote-addr - :remote-user [:date[clf]] :method :url HTTP/:http-version :status :res[content-length] :referrer :user-agent",
    {
      stream: fs.createWriteStream("./access.log", { flags: "a" }),
    }
  )
);
app.use(logger("dev"));

// Data comes from DynamoDB
app.get("/files", (req, res) => {
  let params = {
    TableName: "Files",
  };
  dbRead(params).then((data) => {
    const updateData = data.slice(-80).map((file) => {
      file.name = BUCKETS.SMALL + file.name;
      file.normal = file.name
        .replace("small_", "")
        .replace(BUCKETS.SMALL, BUCKETS.NORMAL);
      return file;
    });
    res.json(updateData);
  });
});

// file upload api
app.post("/upload", (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" });
  }
  // accessing the file
  const myFile = req.files.file;

  //  mv() method places the file inside public directory
  const randomFilename = uuidv4() + myFile.name;
  myFile.mv(
    `${__dirname}/../client/public/uploads/${randomFilename}`,
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).send({ msg: "Error occured" });
      }

      fs.readFile(
        `${__dirname}/../client/public/uploads/${randomFilename}`,
        (err, data) => {
          if (err) throw err;
          const params = {
            Bucket: "s3-u-767fc203-2701-48fa-ae48", // pass your bucket name
            Key: randomFilename, // file will be saved as testBucket/contacts.csv
            Body: data,
            ContentType: myFile.mimetype,
          };
          s3.upload(params, function (s3Err, data) {
            if (s3Err) throw s3Err;
            console.log(`File uploaded successfully at ${data.Location}`);
            fs.rmSync(
              `${__dirname}/../client/public/uploads/${randomFilename}`,
              {
                force: true,
              }
            );
          });
        }
      );

      // returing the response with file path and name
      return res.send({
        name: myFile.name,
        path: `https://s3-u-767fc203-2701-48fa-ae48.s3.eu-west-1.amazonaws.com/${randomFilename}`,
      });
    }
  );
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(express.static(path.resolve(__dirname, "../client/public/uploads")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
