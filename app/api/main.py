# Biblioteca Importada
import requests
from pathlib import Path
from openai import OpenAI
from flask import Flask, request, jsonify, send_file

# Cliente OpenAI
client = OpenAI(api_key="COLOCAR A CHAVE DA API AQUI.")

audio_file= open("teste.mp4", "rb")
transcript = client.audio.transcriptions.create(
  model="whisper-1", 
  file=audio_file,
  response_format="text"
)

type_of_generation = f'Do que este texto se trata: {transcript}'

geracao = client.completions.create(
  model="gpt-3.5-turbo-instruct",
  prompt=type_of_generation
)

print(type_of_generation)

geracao = geracao.choices[0].text

print(geracao)
