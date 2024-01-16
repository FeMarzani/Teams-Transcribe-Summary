// Arquivo .js para criação de uma API do tipo POST que receba o input de um objeto do tipo (mp4, mp3, ogg (whats)), faça upload no s3 e realize o transcribe utilizando express e localstack

const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');