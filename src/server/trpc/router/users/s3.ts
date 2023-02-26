import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomBytes } from "crypto";
/* import { env } from "../../../../env/server.mjs"; */

export async function uploadImage(body: Blob | MediaSource | File) {
  const rawBytes = randomBytes(16);
  const key = rawBytes.toString("hex");
  const client = new S3Client({ region: env.AWS_REGION });
  const params = {
    Bucket: env.AWS_BUCKET,
    Key: key,
    Body: body,
  };

  try {
    const command = new PutObjectCommand(params);
    const url = await getSignedUrl(client, command, { expiresIn: 3600 });
    console.log(url);
    return url;
  } catch (error) {
    console.error(error);
  }
}
