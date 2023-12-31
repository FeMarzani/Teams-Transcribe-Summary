const axios = require('axios');

const API_KEY = // COLAR A CHAVE DA API DA CONTA DO OPENAI

async function fazerRequisicao() {
    try {
      const resposta = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: "Quanto é 10 + 10?"
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
          }
        }
      );
  
      console.log(resposta.data.choices[0]);
    } catch (erro) {
      console.error('Erro ao fazer requisição:', erro);
    }
  }
  
  fazerRequisicao();

/* function readFile() {
    const fileInput = document.getElementById('fileInput');
    
    // Verifica se foi selecionado um arquivo
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        // Função chamada quando a leitura do arquivo estiver concluída
        reader.onload = function(e) {

            // AQUI É ONDE FAREMOS UM POST NA API DO OPENAI PARA REALIZAR O RESUMO DA NOSSA TRANSCRIÇÃO DO TEAMS.

            console.log("Conteúdo do arquivo:", e.target.result);
        };

        // Lê o conteúdo do arquivo como texto
        reader.readAsText(file);
    } else {
        console.log("Nenhum arquivo selecionado.");
    }
} */