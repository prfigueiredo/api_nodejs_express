# API de CRUD simples em Express

Esta é uma API simples em Express que implementa operações CRUD (Create, Read, Update, Delete) para manipulação de dados. O objetivo desta API é fornecer um ponto de extremidade para gerenciar recursos usando os métodos HTTP.

## Instalação

1. Clone o repositório ou faça o download dos arquivos.
2. Certifique-se de ter o Node.js instalado em sua máquina.
3. Abra um terminal e navegue até o diretório raiz do projeto.
4. Execute o seguinte comando para instalar as dependências necessárias:

npm install

## Uso

1. No diretório raiz do projeto, execute o seguinte comando para iniciar o servidor:

npm start


2. O servidor estará em execução no seguinte endereço: `http://localhost:3000`.

3. A API oferece os seguintes endpoints:

| Método | Endpoint          | Descrição                          |
| ------ | ----------------- | ---------------------------------- |
| GET    | /api/resources    | Obtém todos os recursos            |
| GET    | /api/resources/:id| Obtém um recurso específico pelo ID|
| POST   | /api/resources    | Cria um novo recurso               |
| PUT    | /api/resources/:id| Atualiza um recurso existente pelo ID |
| DELETE | /api/resources/:id| Exclui um recurso pelo ID           |

4. Você pode testar a API usando ferramentas como o Postman ou o cURL.

## Exemplo de uso

Suponha que desejamos criar um novo recurso usando o método POST. Podemos fazer uma solicitação POST para `http://localhost:3000/api/resources` com um corpo JSON contendo os dados do recurso a ser criado. A resposta conterá o novo recurso criado com um ID único atribuído pelo servidor.

## Vídeo explicativo

Aqui está um vídeo que explica como usar essa API para realizar operações CRUD:

[![Vídeo explicativo](https://img.youtube.com/vi/nq_-GvE_YcM/0.jpg)](https://youtu.be/nq_-GvE_YcM)

Clique na imagem acima para assistir ao vídeo.

## Contribuição

Sinta-se à vontade para contribuir com melhorias para esta API. Basta enviar um pull request com suas alterações.

