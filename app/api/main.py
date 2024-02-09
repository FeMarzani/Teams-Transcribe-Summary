# Biblioteca Importada
import requests
import os
from pathlib import Path
from openai import OpenAI
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS


# Cliente OpenAI
client = OpenAI('CHAVE DA API')

app = Flask(__name__)

CORS(app)

# Definindo uma função para pegar o tamanho de um arquivo em MB.
def tamanho(file_path):
    return os.path.getsize(file_path) / (1024 * 1024)

@app.route('/resumo', methods=['POST'])
def resumo():
    

    print(request.files)

    # Verificando se foi enviado um video na requisição:
    if 'file' not in request.files:
        return jsonify({'error': 'Nenhum arquivo enviado'}), 400

    file = request.files['file']

    # Verificando o nome do video corretamente:
    if file.filename == '':
        return jsonify({'error': 'Nome de arquivo vazio'}), 400

    # Verificando o tamanho do arquivo:

    # Salvando temporariamente o arquivo em um file path
    file_path = 'temp_video.mp4'
    file.save(file_path)

    file_size_mb = tamanho(file_path)
    if file_size_mb > 25:
        return jsonify({'error': 'Arquivo é maior que 25 MB'}), 400


    try:

        audio_file = open(file_path, "rb")

        transcript = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file,
            response_format="text"
        )

        # Fechando o arquivo posterior a transcrição
        audio_file.close()

        # Gerando o resumo:
        type_of_generation = f'Do que este texto se trata: {transcript}'

        geracao = client.completions.create(
            model="gpt-3.5-turbo-instruct",
            prompt=type_of_generation
        )

        # Retorna o resumo gerado
        print(geracao.choices[0].text)
        return jsonify({'resumo': geracao.choices[0].text}), 200

    except Exception as e:
        return jsonify({'error': f'Erro ao processar o arquivo de vídeo: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)