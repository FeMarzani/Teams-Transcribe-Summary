<div align="center">
    <img align="center" alt="Teams-Logo" height="200" width="200" src="https://logodownload.org/wp-content/uploads/2021/08/microsoft-teams-logo-0.png">
    <h2>Teams Transcriber Summary</h2>
</div>

<div align="center">
    <h3>Desenvolvedores</h3>
    <table>
        <tr>
            <td align="center">
                <a href="https://www.linkedin.com/in/aarrieche/">
                <img src="https://media.licdn.com/dms/image/C5603AQFpS81l6XnKXw/profile-displayphoto-shrink_800_800/0/1643167284310?e=1712793600&v=beta&t=sSYAsjX-gFTf-eFtO1e9DAlf4DifkKKCNt3MkmqBCJE" width="100px;" alt="Foto de Alex Arrieche"/><br>
                <sub><b>Alex Arrieche</b></sub>
                </a>
            </td>
            <td align="center">
                <a href="https://www.linkedin.com/in/felipemarzani/">
                <img src="https://media.licdn.com/dms/image/C4E03AQHw-QrUI1AVBQ/profile-displayphoto-shrink_400_400/0/1648855859356?e=1712793600&v=beta&t=7QKdA73D490b51d5D73zwlonVL4_7OQ5rUV5NrhJyxU" width="100px;" alt="Foto de Felipe Marzani"/><br>
                <sub><b>Felipe Marzani</b></sub>
                </a>
            </td>
        </tr>
    </table>
</div>

---

### Ferramentas Utilizadas 📚
<div style="display: inline-block">
  <img align="center" alt="Html" height="33" width="44" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg">
  <img align="center" alt="Css" height="33" width="44" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg">
  <img align="center" alt="bootstrap" height="35" width="52" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-plain-wordmark.svg">
  <img align="center" alt="Javascript" height="28" width="42" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
  <img align="center" alt="Git" height="28" width="42" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg">
  <img align="center" alt="Python" height="32" width="42" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg">
  <img align="center" alt="Flask" height="44" width="60" src="https://raw.githubusercontent.com/devicons/devicon/v2.15.1/icons/flask/flask-original-wordmark.svg">
</div>

---

### 1️⃣ Descrição
O Teams Transcriber Summary é um sistema integrado a partir de uma API feita com Flask. Sua funcionalidade é a de ser um "resumidor" de conteúdo de áudio/vídeo.
- É permitido envio de arquivos de áudio ou de vídeo (mp3/mp4). O sistema irá transcrever o conteúdo deste arquivo e posteriormente irá resumir o conteúdo, retornando por sua vez para o usuário. 
- Para estas funcionalidades se utilizou as APIs da OpenAI de Speech to Text e a de Chat Completions. Juntou-se as duas em Python e se construiu uma API com Flask para a realização de um POST de arquivo de vídeo/áudio e tipo de resumo requisitado.

### 📺 Preview
![preview](https://github.com/FeMarzani/Teams-Transcribe-Summary/assets/107329291/d75d9212-a587-45a9-8adb-affb531b60ae)

---

### 2️⃣ Estrutura de Pastas
- **app**
    - **api**
        - `main.py`
    - **css**
        - `buttons.css`
        - `footer.css`
        - `header.css`
        - `messages.css`
        - `radios.css`
        - `reset.css`
        - `style.css`
    - **js**
        - `script.js`

### 3️⃣ Como utilizar?
1. Clone este repositório,

2. É necessário ter Python instalado para o restante das ações, portanto se não possuir, instale. 

3. Instale as seguintes bibliotecas abaixo:

    ```bash
    pip3 install requests openai flask flask-cors
    ```

4. Cadastre sua chave de API da OpenAI e coloque ela na respectiva posição da linha 11 do arquivo ```app/api/main.py```.

5. Por fim, abra o terminal dentro da pasta api. Verifique se quando abrir o terminal, está no caminho da pasta corretamente. Do contrário use o comando para ir da raiz até a pasta:

    ```bash
    cd app/api
    ```

6. Execute o arquivo ```main.py```:

    ```bash
    python3 main.py
    ```

7. Agora a API Flask estará pronta para uso. Portanto, abra o ```index.html``` no seu navegador e teste o envio do formulário utilizando algum arquivo de vídeo ou áudio. 

OBS: No momento, o sistema está aceitando apenas arquivos de no máximo 25MB. 