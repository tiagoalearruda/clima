# Product Requirements Document (PRD) - Projeto Clima

## 1. Visão Geral do Produto
O **Projeto Clima** é uma aplicação web que permite aos usuários pesquisar o clima de qualquer cidade do mundo. A aplicação utiliza a API OpenMeteo para obter coordenadas geográficas e, em seguida, recuperar dados meteorológicos detalhados em tempo real.

## 2. Objetivos do Produto
- Fornecer informações meteorológicas precisas e rápidas.
- Oferecer uma interface intuitiva, moderna e focada em dispositivos móveis.
- Garantir uma experiência de usuário fluida com estados de carregamento e tratamento de erros.

## 3. Requisitos Funcionais

### 3.1 Busca de Cidade
- O usuário deve poder digitar o nome de uma cidade em um campo de busca centralizado.
- A aplicação deve converter o nome da cidade em coordenadas (Latitude, Longitude) e Timezone.

### 3.2 Exibição de Dados Meteorológicos
- Após a busca, o sistema deve exibir:
    - **Sidebar (Esquerda/Topo no Mobile):**
        - Temperatura atual.
        - Nome da cidade e código do país.
        - Data atual.
        - Indicador de Dia/Noite (ícone ou texto).
        - Descrição do clima baseada no Weather Code (WMO).
    - **Área Principal:**
        - Umidade Relativa (%).
        - Temperatura Aparente (°C).
        - Probabilidade de Precipitação (%).
        - Velocidade e Direção do Vento.

### 3.3 Fluxo de Dados e Estados
- **Loading:** Exibir um estado de carregamento enquanto as requisições à API estão em curso.
- **Empty State:** Exibir uma mensagem amigável quando nenhuma busca foi realizada ou quando uma cidade não for encontrada.
- **Erro:** Se a API falhar (geocodificação ou clima), o sistema deve se comportar como se não tivesse encontrado resultados.

## 4. Detalhes Técnicos

### 4.1 Stack Tecnológica
- **Ferramenta de Build:** Vite
- **Linguagem:** TypeScript
- **Framework:** Vanilla JS (JS Puro)
- **Estilização:** CSS Moderno (Mobile First)

### 4.2 Integração de API (OpenMeteo)
As requisições devem ser encapsuladas em um arquivo de serviço dedicado.

#### Geocoding API
- **Endpoint:** `https://geocoding-api.open-meteo.com/v1/search`
- **Parâmetros:** `name`, `count=1`, `language=pt`, `format=json`
- **Dados Necessários:** `name`, `country`, `latitude`, `longitude`, `timezone`.

#### Forecast API
- **Endpoint:** `https://api.open-meteo.com/v1/forecast`
- **Parâmetros:** `latitude`, `longitude`, `timezone`, `current` (precipitation_probability, weather_code, wind_speed_10m, apparent_temperature, temperature_2m, relative_humidity_2m, is_day, wind_direction_10m), `daily=showers_sum`.

### 4.3 Mapeamento de Weather Code (WMO)
A aplicação deve traduzir os códigos numéricos para descrições legíveis:
- `0`: Céu limpo
- `1, 2, 3`: Parcialmente nublado / Encoberto
- `45, 48`: Nevoeiro
- `51, 53, 55`: Chuvisco
- `61, 63, 65`: Chuva
- `71, 73, 75`: Neve
- `80, 81, 82`: Pancadas de chuva
- `95, 96, 99`: Tempestade
*(Lista completa conforme brain-dump.md)*

## 5. Instruções Visuais e UX

### 5.1 Design
- **Paleta de Cores:** Fundo da página em cinza escuro. Container principal em branco.
- **Layout:**
    - Máximo de 800px de largura para o container central.
    - Bordas arredondadas pronunciadas no container.
    - Área superior (Busca) sem background, integrada ao fundo cinza.
- **Responsividade:** Estratégia Mobile First. No mobile, o sidebar deve ser empilhado acima da área principal ou adaptado para o topo do card.

### 5.2 Comportamento
- A busca envolve duas requisições encadeadas, mas deve aparecer para o usuário como um único processo com feedback visual de carregamento.
