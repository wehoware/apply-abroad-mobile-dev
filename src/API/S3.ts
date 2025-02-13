import AWS from 'aws-sdk';
import {ConfigRequestPayload} from '../redux/types';

export interface FileData {
  name: string;
  url: string;
  type: string;
}

export interface S3UploadResult {
  fileUrl: string;
  fileName: string;
}

export async function uploadToAWS(
  file: FileData,
  config: ConfigRequestPayload,
  fileData: Blob,
): Promise<S3UploadResult> {
  let folderPath = '';
  AWS.config.update({
    region: config.AWS_REGION,
    credentials: new AWS.Credentials(
      config.AWS_ACCESS_KEY,
      config.AWS_SECRET_KEY,
    ),
  });

  const s3 = new AWS.S3();

  // Generate a unique file name
  const fileName = folderPath
    ? `${folderPath}/${Date.now()}_${file.name}`
    : `${Date.now()}_${file.name}`;

  const params: AWS.S3.PutObjectRequest = {
    Bucket: config.AWS_BUCKET_NAME,
    Key: fileName,
    Body: fileData,
    ContentType: file.type,
  };

  try {
    const result = await s3.upload(params).promise();
    console.log('result', result);

    return {
      fileUrl: result.Location,
      fileName: params.Key,
    };
  } catch (error) {
    throw new Error(`File upload failed: ${error}`);
  }
}
