import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

async function uploadImage(key: string, body: any) {
  const client = new S3Client({ region: process.env.AWS_REGION });
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: key,
    Body: body,
  };

  try {
    const command = new PutObjectCommand(params);
    const response = await client.send(command);
    return command;
  } catch (error) {
    console.error(error);
  }
}

const ImageUpload = () => {
  return <></>;
};

export default ImageUpload;
