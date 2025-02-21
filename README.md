# Spotify React App

## Descrição
Este é um aplicativo React que consome a API do Spotify que busca um artista e mostra as músicas mais tocadas, os albuns e suas respectivas músicas. O projeto utiliza React-Bootstrap e está configurado para obter um token de acesso à API do Spotify.

---

## Configuração e Execução

### 1. Clonar o Repositório
```sh
git clone https://github.com/andremorotti/spotify_search.git
cd spotify_search/
```

### 2. Instalar Dependências
```sh
npm install
```

### 3. Configurar as Credenciais do Spotify


Nota: Por questões de segurança, as credenciais CLIENT_ID e CLIENT_SECRET foram omitidas deste exemplo. Para utilizar o aplicativo, você precisará criar um aplicativo no Spotify Developer Dashboard e inserir suas próprias credenciais no código.

O aplicativo utiliza a API do Spotify e requer credenciais de desenvolvedor. Para configurar:
1. Acesse [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)
2. Crie um novo aplicativo e obtenha o `CLIENT_ID` e `CLIENT_SECRET`
3. Substitua as credenciais no arquivo `App.js`:
   ```js
   const CLIENT_ID = "SUA_CLIENT_ID";
   const CLIENT_SECRET = "SEU_CLIENT_SECRET";
   ```

### 4. Executar o Projeto
```sh
npm start
```
O frontend ficará disponível em: [http://localhost:3000](http://localhost:3000)

---

## Funcionalidades
- Busca por artistas
- Listagem de álbuns do artista
- Exibição de faixas de cada álbum
- Listagem das top tracks do artista

---

## Tecnologias Utilizadas
- React
- React-Bootstrap
- Spotify API
- JavaScript

---
