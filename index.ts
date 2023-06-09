const express = require('express');

const app = express();


app.use(express.json());

global.frutas = null;
const fs = require('fs');



//Carregar JSON externo
app.get('/', (req, res) => {
    // Caminho para o arquivo JSON
    const filePath = 'itens.json';
  
    // Lê o conteúdo do arquivo JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao ler o arquivo JSON.' });
      }
  
      // Armazena os dados do JSON na variável global
      global.frutas = JSON.parse(data);
  
      // Retorna o conteúdo do arquivo JSON como resposta
      res.json(global.frutas);
    });
  });


// Retornar todos itens
app.get('/frutas', (req,res) => {
    // Caminho para o arquivo JSON
    const filePath = 'itens.json';
  
    // Lê o conteúdo do arquivo JSON
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao ler o arquivo JSON.' });
      }
  
      // Armazena os dados do JSON na variável global
      global.frutas = JSON.parse(data);    


    return res.json(global.frutas);
})});

//Retornar um item pela ID
app.get('/frutas/:index', (req, res) => {
  // Caminho para o arquivo JSON
  const filePath = 'itens.json';

  // Lê o conteúdo do arquivo JSON
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao ler o arquivo JSON.' });
    }

    // Armazena os dados do JSON na variável global
    global.frutas = JSON.parse(data);

    let { index } = req.params;

    // Converte o índice para um número inteiro
    index = parseInt(index);

    // Verifica se o índice está dentro do intervalo válido
    if (index < 1 || index > global.frutas.length) {
      return res.status(404).json({ error: 'Índice inválido.' });
    }

    const fruta = global.frutas[index - 1];
    const { id, nome, fornecedor } = fruta;

    return res.json({ id, nome, fornecedor });
  });
});

//Criar um novo item
app.post('/frutas', (req, res) => {
  // Caminho para o arquivo JSON
  const filePath = 'itens.json';

  // Lê o conteúdo do arquivo JSON
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao ler o arquivo JSON.' });
    }

    // Armazena os dados do JSON na variável global
    global.frutas = JSON.parse(data);

    const { id, nome, fornecedor } = req.body;

    // Cria um novo item de fruta com as propriedades especificadas
    const novaFruta = { id, nome, fornecedor };

    // Adiciona a nova fruta à lista global
    global.frutas.push(novaFruta);

    // Sobrescreve o arquivo JSON com os novos dados
    fs.writeFile(filePath, JSON.stringify(global.frutas), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao escrever o arquivo JSON.' });
      }

      return res.json(global.frutas);
    });
  });
});

//Editar um novo item
app.put('/frutas/:index', (req, res) => {
  const { index } = req.params;
  const { id, nome, fornecedor } = req.body;

  // Caminho para o arquivo JSON
  const filePath = 'itens.json';

  try {
    // Lê o conteúdo do arquivo JSON de forma síncrona
    const data = fs.readFileSync(filePath, 'utf8');

    // Armazena os dados do JSON na variável global
    global.frutas = JSON.parse(data);

    // Verifica se o índice está dentro do intervalo válido
    if (index < 1 || index > global.frutas.length) {
      return res.status(404).json({ error: 'Índice inválido.' });
    }

    // Atualiza as propriedades da fruta com base nos dados fornecidos
    global.frutas[index - 1] = { id, nome, fornecedor };

    // Sobrescreve o arquivo JSON com os novos dados de forma síncrona
    fs.writeFileSync(filePath, JSON.stringify(global.frutas), 'utf8');

    return res.json(global.frutas);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao ler ou escrever o arquivo JSON.' });
  }
});

//Excluir um item
app.delete('/frutas/:index', (req, res) => {
  let { index } = req.params;
  index = parseInt(index);

  const filePath = 'itens.json';

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao ler o arquivo JSON.' });
    }

    global.frutas = JSON.parse(data);

    if (index < 1 || index > global.frutas.length) {
      return res.status(400).json({ error: 'Índice inválido.' });
    }

    // Remove o item da lista global
    global.frutas.splice(index - 1, 1);

    // Sobrescreve o arquivo JSON com os novos dados
    fs.writeFile(filePath, JSON.stringify(global.frutas), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Erro ao escrever o arquivo JSON.' });
      }

      return res.json({ message: 'Item excluído com êxito.' });
    });
  });
});

app.listen(3000);