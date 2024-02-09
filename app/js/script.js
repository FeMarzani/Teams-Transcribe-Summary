document.getElementById('submitBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const selectedOption = document.querySelector('input[name="tipoResumo"]:checked').value;
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('tipoResumo', selectedOption); // Adiciona o tipo de resumo selecionado

    // Envia os dados usando AJAX
    fetch('http://localhost:5000/resumo', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Manipula a resposta da API e atualiza a página com a resposta
        document.getElementById('mensagem').textContent = data.resumo;
    })
    .catch(error => {
        console.error('Erro ao enviar dados:', error);
    });
});