function readFile() {
    const fileInput = document.getElementById('fileInput');
    
    // Verifica se foi selecionado um arquivo
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        // Função chamada quando a leitura do arquivo estiver concluída
        reader.onload = function(e) {

            // AQUI É ONDE FAREMOS UM POST NA API DO OPENAI PARA REALIZAR O RESUMO DA NOSSA TRANSCRIÇÃO DO TEAMS.

            const axios = require('axios');

            const API_KEY = // COLOCAR CHAVE AQUI.

            mensagem = e.target.result;
            console.log("Conteúdo do arquivo:", e.target.result);
            console.log("Agora irá se tentar fazer o post para o chat GPT")
            console.log("--------------")

            async function fazerRequisicao(mensagem) {
                try {
                  const resposta = await axios.post(
                    'https://api.openai.com/v1/chat/completions',
                    {
                      model: "gpt-3.5-turbo",
                      messages: [
                        {
                          role: "user",
                          content: mensagem
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
              
                  console.log(resposta.data.choices[0]['message']['content']); // Aqui temos A resposta.
                } catch (erro) {
                  console.error('Erro ao fazer requisição:', erro);
                }
              }
              
              fazerRequisicao(mensagem);
        };

        // Lê o conteúdo do arquivo como texto
        reader.readAsText(file);
    } else {
        console.log("Nenhum arquivo selecionado.");
    }
}