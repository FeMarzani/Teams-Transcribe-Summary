function readFile() {
  const fileInput = document.getElementById('fileInput');

  // Verifica se foi selecionado um arquivo
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    let mensagem; // Declara a variável mensagem no escopo global

    // Função chamada quando a leitura do arquivo estiver concluída
    reader.onload = function (e) {
      // Exibe o conteúdo do arquivo no console do navegador
      mensagem = e.target.result;
      console.log("CONTEUDO A SER ENVIADO PARA A API:", mensagem);
      console.log("--------");

      const API_KEY = // NÃO COLOCAR AQUI A CHAVE EM HIPÓTESE NENHUMA

      async function fazerRequisicao(mensagem) {
        try {
          const resposta = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "user",
                  content: `Olá Chat! Resuma para mim este texto em no máximo 10 linhas por favor: ${mensagem}`
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
    console.log("Nenhum arquivo selecionado.");
  }
}
