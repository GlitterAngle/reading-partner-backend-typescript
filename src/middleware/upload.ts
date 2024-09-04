import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { fromEnv } from '@aws-sdk/credential-providers';
import path from 'path';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: fromEnv(),
});
//added for type script 
const bucketName = process.env.AWS_S3_BUCKET_NAME;
//added for type script 
if(!bucketName){
    throw new Error('S3_BUCKET_NAME environment not set')
}

const upload = multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    //call back function to create the unique name for the file when storing in S3
    key: function (req, file, cb) {
      cb(null, `${Date.now().toString()}_${path.basename(file.originalname)}`);
    },
  }),
  // 10 MB file size limit
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter: function (req, file, cb) {
    const filetypes = /mp3|wav/;
    const validMimeTypes = ['audio/mpeg', 'audio/wav'];
    //determing the type of file uploaded
    const mimetype = validMimeTypes.includes(file.mimetype);
    //pulls the files extention so .mp3 or .wav
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    console.log('file.mimetype:', file.mimetype);
    console.log('file.originalname:', file.originalname);
    console.log('extname:', extname);
    console.log('mimetype:', mimetype);

    if (mimetype && extname) {
      //cb here if mimetype and extname pass checks then the file can be uploaded
      return cb(null, true);
    } else {
      //cb here if mimetype and extname dont pass checks then the file can not be uploaded
      cb(new Error('Error: Audio files only!'));
    }
  },
});

export default upload;
