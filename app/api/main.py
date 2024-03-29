# Biblioteca Importada
import requests
import os
from pathlib import Path
from openai import OpenAI
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS


# Cliente OpenAI
client = OpenAI(api_key="COLOCAR CHAVE DA API AQUI")

app = Flask(__name__)

CORS(app)

# Definindo uma função para pegar o tamanho de um arquivo em MB.
def tamanho(file_path):
    return os.path.getsize(file_path) / (1024 * 1024)

@app.route('/resumo', methods=['POST'])
def resumo():

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

    
    # Obtendo o tipo de resumo selecionado pelo usuário:
    selected_type = request.form.get('tipoResumo')

    if selected_type == 'topicos':
        type_of_generation = 'Olá Chat! Resuma esse texto para mim em tópicos: '
        print("SELECIONADO: "+type_of_generation)
    elif selected_type == 'texto':
        type_of_generation = 'Olá Chat! Resuma para mim este texto em no máximo 10 linhas: '
        print("SELECIONADO: "+type_of_generation)
    elif selected_type == 'palavras':
        type_of_generation = 'Resuma para mim em palavras-chave: '
        print("SELECIONADO: "+type_of_generation)

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
        type_of_generation = type_of_generation + transcript
        print(type_of_generation)

        geracao = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": type_of_generation}
            ]
        )

        # Retorna o resumo gerado
        print(geracao.choices[0].message.content)
        geracao = geracao.choices[0].message.content
        return jsonify({'resumo': geracao}), 200

    except Exception as e:
        return jsonify({'error': f'Erro ao processar o arquivo de vídeo: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)