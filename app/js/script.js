function readFile() {
  const fileInput = document.getElementById('fileInput');
  let radioButtons = document.getElementsByName("tipoResumo");
  let selectedOption = "";

  // Verifica se foi selecionado um arquivo
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    let mensagem; // Declara a variável mensagem no escopo global

    // Função chamada quando a leitura do arquivo estiver concluída
    reader.onload = function (e) {
      erro.innerText = '';
      // Exibe o conteúdo do arquivo no console do navegador
      mensagem = e.target.result;
      console.log("CONTEUDO A SER ENVIADO PARA A API:", mensagem);
      console.log("--------");

      const API_KEY = "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";

      

      async function fazerRequisicao(mensagem) {
        try {

          let endpoint;
          let roleContent;

          // Escolhe o endpoint e a mensagem com base na opção selecionada
          if (selectedOption === "topicos") {
            endpoint = 'https://api.openai.com/v1/chat/completions';
            roleContent = `Olá Chat! Resuma esse texto para mim em tópicos: ${mensagem}`;
            console.log(roleContent);
          } else if (selectedOption === "texto") {
            endpoint = 'https://api.openai.com/v1/chat/completions';
            roleContent = `Olá Chat! Resuma para mim este texto em no máximo 10 linhas: ${mensagem}`;
          } else if (selectedOption === "palavras") {
            endpoint = 'https://api.openai.com/v1/summarization';
            roleContent = `Resuma para mim em palavras-chave: ${mensagem}`;
          }

          
          
          const resposta = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "user",
                  content: `Resuma para mim em palavras-chave: ${mensagem}`
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

          
          console.log(resposta.data.choices[0]['message']['content']);

          mensagem = resposta.data.choices[0]['message']['content'];

          document.getElementById('mensagem').innerHTML = mensagem;


        } catch (erro) {
          console.error('Erro ao fazer requisição:', erro);
        }
      }

      fazerRequisicao(mensagem);
    };

    // Lê o conteúdo do arquivo como texto
    reader.readAsText(file);
  } else {
    erro.innerText = 'Por favor, selecione um arquivo.';
    console.log("Nenhum arquivo selecionado.");
    
  }
}
