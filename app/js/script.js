function readFile() {

  let acaoSelecionada = document.querySelector('input[name="tipoAcao"]:checked').value;
  
  if (acaoSelecionada === 'resumoAudioVideo') {
    console.log(acaoSelecionada)
  };

  const fileInput = document.getElementById('fileInput');
  let valorSelecionado = document.querySelector('input[name="tipoResumo"]:checked').value;
  let selectedOption = valorSelecionado;

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

      const API_KEY = // COLOCAR CHAVE DA API AQUI

      

      async function fazerRequisicao(mensagem) {
        try {

          let roleContent;

          // Escolhe o endpoint e a mensagem com base na opção selecionada
          if (selectedOption === "topicos") {
            roleContent = `Olá Chat! Resuma esse texto para mim em tópicos: ${mensagem}`;
            console.log(roleContent);
          } else if (selectedOption === "texto") {
            roleContent = `Olá Chat! Resuma para mim este texto em no máximo 10 linhas: ${mensagem}`;
          } else if (selectedOption === "palavras") {
            roleContent = `Resuma para mim em palavras-chave: ${mensagem}`;
          }

          console.log(roleContent)
          
          const resposta = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "user",
                  content: roleContent
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
