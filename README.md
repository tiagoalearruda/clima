# 🌤️ Clima

Aplicação web para consultar o clima de cidades em tempo real, com interface responsiva e fácil de usar.

## 🧭 Visão geral

O projeto foi desenvolvido com TypeScript + Vite e permite:

- buscar uma cidade
- consultar condições climáticas em tempo real
- visualizar temperatura, umidade, precipitação e vento
- salvar a última cidade pesquisada localmente no navegador
- publicar automaticamente no GitHub Pages via GitHub Actions

## ✨ Funcionalidades

- Busca por cidade
- Dados meteorológicos em tempo real
- Exibição da temperatura atual e sensação térmica
- Informação de umidade, precipitação e direção do vento
- Layout responsivo para desktop e mobile
- Persistência da última pesquisa com `localStorage`
- Deploy contínuo para produção

## 🛠️ Tecnologias utilizadas

- TypeScript
- Vite
- HTML5
- CSS3
- Fetch API para comunicação com a API de clima

## ▶️ Como executar localmente

### 1) Clone o projeto

```bash
git clone https://github.com/tiagoalearruda/clima.git
cd clima
```

### 2) Instale as dependências

```bash
npm install
```

### 3) Rode o projeto em desenvolvimento

```bash
npm run dev
```

### 4) Acesse a aplicação

Abra no navegador:

```bash
http://localhost:5173
```

## 🏗️ Build para produção

Para gerar os arquivos finais de produção:

```bash
npm run build
```

A saída será gerada na pasta:

```bash
dist/
```

## 🚀 Deploy no GitHub Pages

Este projeto já está preparado para deploy automatizado no GitHub Pages.

### Workflow configurado

O arquivo de automação está em:

```yaml
.github/workflows/deploy.yml
```

Ele realiza automaticamente:

- checkout do código
- instalação das dependências
- build da aplicação com Vite
- publicação da pasta `dist` no GitHub Pages

### GitHub Pages

- Repositório: https://github.com/tiagoalearruda/clima.git
- Página pública: https://tiagoalearruda.github.io/clima/

### Configuração necessária no GitHub

No repositório, siga o caminho:

- `Settings` → `Pages`
- em `Build and deployment`, selecione: `GitHub Actions`

Com isso, cada push na branch `main` dispara o deploy automaticamente.

## 📁 Estrutura do projeto

```text
clima/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
├── src/
│   ├── assets/
│   ├── services/
│   ├── utils/
│   ├── main.ts
│   └── style.css
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── README.md
├── dist/
└── .gitignore
```

## 📌 Observações importantes

- O arquivo [vite.config.ts](vite.config.ts) foi configurado com a base `/clima/` para funcionar corretamente no GitHub Pages.
- A aplicação usa `localStorage` para manter a última cidade consultada.
- O workflow de deploy está acionado pela branch `main`.

## 👤 Autor

Projeto desenvolvido por Tiago Alerruda.
