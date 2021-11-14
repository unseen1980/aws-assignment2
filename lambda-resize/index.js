"use strict";

const AWS = require("aws-sdk");
const S3 = new AWS.S3({
  signatureVersion: "v4",
});
const Jimp = require("jimp");

const BUCKET = "s3-u-767fc203-2701-48fa-ae48";
const SMALL_IMAGES_BUCKET = "small-images-gallery";

exports.handler = async (event) => {
  let eventCopy = {};
  event.Records.forEach((record) => {
    const { body } = record;
    eventCopy = Object.assign({}, JSON.parse(body));
    console.log("--eventCopy-->", eventCopy);
    console.log("--Key-->", eventCopy.Records[0].s3.object.key);
  });
  if (
    eventCopy.Records[0].s3.object &&
    eventCopy.Records[0].s3.object.key.indexOf(".png") > 0
  ) {
    const width = 250;
    const height = 250;
    const originalKey = eventCopy.Records[0].s3.object.key;

    const _image = await Jimp.read(
      `https://${BUCKET}.s3.eu-west-1.amazonaws.com/${originalKey}`
    );
    const _operatedImage = _image.resize(width, height);
    const jimpBuffer = await _operatedImage.getBufferAsync(Jimp.MIME_PNG);
    console.log("Image Buffer:", jimpBuffer);

    const params = {
      Bucket: SMALL_IMAGES_BUCKET,
      Key: `small_${originalKey}`,
      ContentType: Jimp.MIME_PNG,
      Body: jimpBuffer,
    };

    try {
      const response = await S3.upload(params).promise();
      console.log("Response: ", response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
};
