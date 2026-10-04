# Projto : Clima

Este projeto vai pegar a cidade e baseado nisso consultar o clima daquela regiáo. Exibindo o clima da região, exibindo as principais informções de clima, temperatura, humidade e etc.


### Aspectos técnicos

O projeto será esse já modulado em: Vite + Vinalla(já baixado) e TypeScritp


### Informações da API que será utilizada no projeto.

Ele vai usa API OpenMeteo, com os seguntes endpoints:

#### Para pegar a latitude, longitude e timezone bazeado na cidade:
https://geocoding-api.open-meteo.com/v1/search?name={NOME_DA_CIDADE}&count=1&language=pt&format=json

{NOME_DA_CIDADE} = Nome da Cidade que o Usuário Digitou

Exemplo de resposta Json:
{
  "results": [
    {
      "id": 3465284,
      "name": "Cotia",
      "latitude": -23.60389,
      "longitude": -46.91917,
      "elevation": 801,
      "feature_code": "PPLA2",
      "country_code": "BR",
      "admin1_id": 3448433,
      "admin2_id": 6322204,
      "timezone": "America/Sao_Paulo",
      "population": 253608,
      "country_id": 3469034,
      "country": "Brasil",
      "admin1": "São Paulo",
      "admin2": "Cotia"
    }
  ],
  "generationtime_ms": 0.5887747
}

informações que precisamos:
- name: 
- country: 
- latitude:
- longitude:
- timezone:


#### Para pegar as informações do clima: 
https://api.open-meteo.com/v1/forecast?latitude={LATITUDE}&longitude={LONGITUDE}&daily=showers_sum&current=precipitation_probability,weather_code,wind_speed_10m,apparent_temperature,temperature_2m,relative_humidity_2m,is_day,wind_direction_10m&timezone={TIMEZONE}

{LATITUDE} = Latitude correspondete a {NOME_DA_CIDADE} = Nome da Cidade que o Usuário Digitou
{LOGITUDE} = Longitude correspondete a {NOME_DA_CIDADE} = Nome da Cidade que o Usuário Digitou
{TIMEZONE}  = Timezone correspondete a {NOME_DA_CIDADE} = Nome da Cidade que o Usuário Digitou

Exemplo de resposta json:
{
  "latitude": -23.585238,
  "longitude": -46.944153,
  "generationtime_ms": 0.288486480712891,
  "utc_offset_seconds": -10800,
  "timezone": "America/Sao_Paulo",
  "timezone_abbreviation": "GMT-3",
  "elevation": 789,
  "current_units": {
    "time": "iso8601",
    "interval": "seconds",
    "precipitation_probability": "%",
    "weather_code": "wmo code",
    "wind_speed_10m": "km/h",
    "apparent_temperature": "°C",
    "temperature_2m": "°C",
    "relative_humidity_2m": "%",
    "is_day": "",
    "wind_direction_10m": "°"
  },
  "current": {
    "time": "2026-10-02T16:15",
    "interval": 900,
    "precipitation_probability": 10,
    "weather_code": 3,
    "wind_speed_10m": 13.1,
    "apparent_temperature": 15.8,
    "temperature_2m": 16.4,
    "relative_humidity_2m": 85,
    "is_day": 1,
    "wind_direction_10m": 131
  },
  "daily_units": {
    "time": "iso8601",
    "showers_sum": "mm"
  },
  "daily": {
    "time": [
      "2026-10-02",
      "2026-10-03",
      "2026-10-04",
      "2026-10-05",
      "2026-10-06",
      "2026-10-07",
      "2026-10-08"
    ],
    "showers_sum": [0.1, 1.4, 0.6, 3.4, 12.1, 2.9, 0.6]
  }
}

informações que precisamos:
Na resposta eu tenho dois itens:  
- "current_units" tem as unidades de medida das propriedades e 
- "current" tem os valores das propriedades

Propriedades obrigatórias.
-    "temperature_2m"
-    "relative_humidity_2m"
-    "apparent_temperature"
-    "is_day"
-    "wind_speed_10m"
-    "wind_direction_10m"
-    "precipitation_probability"




Informação importante:
Teremos um aquivo com as informaçoes do OpenMeteo, para que o projeto não faça as requisicoes direta a API mas sim, use as funcoes desse arquivo.


Fluxo de pesquisa para receber o nome da cidade e pegar as informaçoes de clima:
- O usuário digita o nome da Cidade
- O projeto pega o nome e usa no OpenMeteo para pegar: Latitude, Longitude e Timezone dessa cidade.
- Ao pegar Latitude, Longitude e Timezone, o projeto usa essas informaçoes para fazer a requisicao e pegar as informacoes do clima de localizacao.
- Caso não ache as informacoes da cidade, se comportar como se nao tivesse achado nada.
- Caso ache as informacoes da cidade mas não de clima, se comportar como se não tivesse achado nada. 


A busca envolve as duas requisicoes ( buscar latitute/longitude/timezone + buscar clima) mas para o usuário é uma só com loading.


As funcoes do OpenMeteo devem verificar se os paremetros vieram, caso contrário, age como se nao tivesse vindo.

### Aspectos visuais  (desing e ux)


Tem que ter Empty State.

Sempre first Mobile

Teremos uma área SUPERIOR centralizada que tem apenas o campo de busca da Cidade

O projeto terá um sidebar a esquedar com as seguintes informações.
- Temperatura
- Nome da Cidade, codigo do pais
- O dia atual
- Se é dia ou noite (baseado no is_day)
- Weather Code

Na área principal: 
- Humidade relativa
- Temperatura aparente
- Probabilidade de precipitação
- Velocidade/Direçao do vento

Desing geral: 
- O projeto terá um fundo cinza escuro
- A parte superior não terá background, mas tanto o sidebar quanto a área principal ficarao dentro de uma div com borda bem arredondada, com fundo branco centralizada e largura máxima de 800px

Informações de interpretação sobre o Weather Code:
WMO Weather interpretation codes (WW)
Code	Description
0	Clear sky
1	Mainly clear
2	Partly cloudy
3	Overcast
45	Fog
48	Depositing rime fog
51	Light drizzle
53	Moderate drizzle
55	Dense drizzle
56	Light freezing drizzle
57	Dense freezing drizzle
61	Slight rain
63	Moderate rain
65	Heavy rain
66	Light freezing rain
67	Heavy freezing rain
71	Slight snowfall
73	Moderate snowfall
75	Heavy snowfall
77	Snow grains
80	Slight rain showers
81	Moderate rain showers
82	Violent rain showers
85	Slight snow showers
86	Heavy snow showers
95	Thunderstorm
96	Thunderstorm with slight hail *
97	Heavy thunderstorm
99	Thunderstorm with heavy hail *