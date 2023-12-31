function readFile() {
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
}