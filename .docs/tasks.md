# Fase 1
# Plano de Implementação - Projeto Clima

Este documento detalha as tarefas para a implementação do **Projeto Clima**, conforme definido no [PRD.md](./prd.md).

## Tarefas

### 1. Configuração Inicial e Estilos Globais
- [x] Configurar a estrutura base do projeto (Vite + TypeScript).
- [x] Definir variáveis de cores e estilos globais no CSS (fundo cinza escuro, fontes).
- [x] **Critério de Aprovação:** O projeto deve rodar sem erros e exibir um fundo cinza escuro conforme o PRD.

### 2. Serviço de API (OpenMeteo)
- [x] Criar `src/services/weatherService.ts` para encapsular as chamadas de API.
- [x] Implementar busca de coordenadas via Geocoding API (ver seção 4.2 do PRD).
- [x] Implementar busca de clima via Forecast API (ver seção 4.2 do PRD).
- [x] **Critério de Aprovação:** Uma chamada de teste deve retornar os dados de latitude, longitude e meteorologia corretamente no console.

### 3. Utilitário de Mapeamento de Clima (WMO)
- [x] Criar `src/utils/weatherMapper.ts` para traduzir códigos WMO para descrições em português.
- [x] Implementar a lógica baseada na lista do PRD (seção 4.3).
- [x] **Critério de Aprovação:** A função deve retornar "Céu limpo" para o código `0` e "Chuva" para o código `61`.

### 4. Layout Base (HTML/CSS)
- [x] Estruturar o `index.html` com o container central (máx 800px).
- [x] Criar a estrutura da Sidebar e da Área Principal.
- [x] Aplicar CSS Mobile First (empilhamento no mobile, lado a lado no desktop).
- [x] **Critério de Aprovação:** O layout deve ser visualmente consistente com a descrição do PRD em resoluções mobile e desktop.

### 5. Integração da Busca e Renderização de Dados
- [x] Conectar o campo de busca ao serviço de API.
- [x] Renderizar os dados da Sidebar (Temperatura, Cidade, Data, Descrição).
- [x] Renderizar os dados da Área Principal (Umidade, Vento, Precipitação).
- [x] **Critério de Aprovação:** Ao buscar uma cidade, as informações meteorológicas corretas devem ser exibidas na tela.

### 6. Estados de UX (Loading, Empty, Erro)
- [x] Implementar feedback visual de carregamento durante as requisições.
- [x] Implementar o "Empty State" para quando não houver busca inicial.
- [x] Implementar tratamento de erro/cidade não encontrada.
- [x] **Critério de Aprovação:** O usuário deve ver um spinner/texto ao buscar e uma mensagem clara se a cidade não for encontrada.
