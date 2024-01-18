// Arquivo .js para criação de uma API do tipo POST que receba o input de um objeto do tipo (mp4, mp3, ogg (whats)), faça upload no s3 e realize o transcribe utilizando express e localstack

const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');

const app = express();
const port = 3000;


// Setando as instâncias dos serviços utilizados no projeto
const s3 = new AWS.S3({
    region: 'us-east-1',
    endpoint: 'http://localhost:4566',
    s3ForcePathStyle: true,
});

const transcribe = new AWS.TranscribeService({
    region: 'us-east-1',
    endpoint: 'http://localhost:4566',
});


// Nome dos buckets de entrada e saída  
const bucketName = 'upload'; // Bucket de entrada, é o bucket que será feito inicialmente o upload do objeto que o usuário estará enviando.
const outputBucket = 'output-transcribe'; // Bucket de saida, é o bucket de saída do arquivo de transcrição. Quanto o transcribe transcreve para nós o objeto, este é feito em um arquivo.json e salvo no bucket. Este arquivo é retornado através do link s3...bucket...nome do objeto. 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
  
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Definindo a rota para upload do objeto
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const file = req.file;
  
      if (file) {
        const filename = file.originalname;
        const objectKey = `upload/${filename}`;
  
        // Upload para o S3
        await s3.putObject({
          Bucket: bucketName,
          Key: objectKey,
          Body: file.buffer,
        }).promise();
  
        console.log('File uploaded to S3');
  
        // Transcrição
        const jobName = `transcricao_${filename}`;
        const jobUri = `s3://${bucketName}/${objectKey}`;
        const outputKey = `transcriptions/${jobName}.json`;
        const outputUri = `s3://${outputBucket}/${outputKey}`;
  
        const transcriptionResponse = await transcribe.startTranscriptionJob({
          TranscriptionJobName: jobName,
          LanguageCode: 'pt-BR',
          MediaFormat: 'ogg',
          Media: {
            MediaFileUri: jobUri,
          },
          OutputBucketName: outputBucket,
          OutputKey: outputKey,
        }).promise();
  
        console.log('Transcription job started:', transcriptionResponse);
  
        res.json({
          success: true,
          message: 'File uploaded successfully',
          transcriptionResponse: transcriptionResponse,
        });
      } else {
        res.status(400).json({ error: 'No file part or file not provided' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});