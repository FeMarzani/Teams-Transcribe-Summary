// Arquivo .js para criação de uma API do tipo POST que receba o input de um objeto do tipo (mp4, mp3, ogg (whats)), faça upload no s3 e realize o transcribe utilizando express e localstack

const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');

const app = express();
const port = 3000;

const s3 = new AWS.S3({
    region: 'us-east-1',
    endpoint: 'http://localhost:4566',
    s3ForcePathStyle: true,
});

const transcribe = new AWS.TranscribeService({
    region: 'us-east-1',
    endpoint: 'http://localhost:4566',
});
  
const bucketName = 'upload';
const outputBucket = 'output-transcribe';
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
  
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });