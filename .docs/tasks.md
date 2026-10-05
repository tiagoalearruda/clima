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

# Fase 2
## Tarefas de Refinamento e Validação Final

### 1. Validação de Entrada e Respostas da API
- [x] Validar cidade vazia, coordenadas inválidas e timezone ausente antes de realizar a consulta.
- [x] Garantir que a busca retorne `null` quando a cidade vier vazia ou inexistente.
- [x] **Critério de Aprovação:** a função `searchCity('')` deve retornar `null` e `getCityWeather` deve rejeitar valores inválidos em vez de disparar uma requisição quebrada.

### 2. Mapeamento Completo do WMO e Exibição do País
- [x] Completar os códigos do WMO com todos os cenários da lista do PRD/brain-dump.
- [x] Exibir o nome da cidade e o código do país (ex.: `BR`) ao invés de apenas o nome do país completo.
- [x] **Critério de Aprovação:** o código `56` deve retornar "Chuvisco gelado" e a UI deve mostrar a cidade com o código do país.

### 3. Verificação Final do Fluxo de Busca
- [x] Validar o fluxo completo em navegador: busca por cidade, loading, resposta com dados reais e erro para busca inválida.
- [x] Confirmar que o build final compila sem erros.
- [x] **Critério de Aprovação:** a aplicação deve reagir corretamente ao submit com cidade válida, exibir o clima e manter a mensagem de erro quando necessário.

### 4. Aprovação Final
- [x] Revisão final do comportamento da UI e da lógica de serviço.
- [x] Checklist de aprovação concluído.
- [x] **Critério de Aprovação:** todo o fluxo principal do projeto está validado e as tarefas da fase 2 estão marcadas como concluídas.

# Fase 3
## Tarefas de Polimento Final e Acessibilidade

### 1. Acessibilidade e feedback do formulário
- [x] Adicionar estados de carregamento com `aria-live` e desabilitar o botão de busca durante a requisição.
- [x] Manter o foco visual do campo e do botão com contraste adequado.
- [x] **Critério de Aprovação:** quando a busca estiver em andamento, o botão deve ficar desabilitado e o usuário deve receber feedback visível/semântico do carregamento.

### 2. Melhorias de UX na exibição do clima
- [x] Traduzir a direção do vento para uma legenda legível (`N`, `NE`, `SE`, etc.).
- [x] Ajustar a apresentação do país com código do país e manter a exibição consistente em todas as buscas.
- [x] **Critério de Aprovação:** a interface deve mostrar a direção do vento em formato legível e manter o card com dados bem formatados em todas as consultas.

### 3. Verificação final e release
- [x] Validar o fluxo completo em navegador para cidade válida e cidade inexistente.
- [x] Confirmar que o build final compila sem erros após as melhorias de fase 3.
- [x] **Critério de Aprovação:** a aplicação deve manter o comportamento estável, apresentar feedback correto e compilar sem regressões.

### 4. Aprovação Final da Fase 3
- [x] Revisão final da acessibilidade e do comportamento da UI.
- [x] Checklist da fase 3 concluído.
- [x] **Critério de Aprovação:** todas as melhorias finais foram implementadas, validadas e registradas no checklist.

# Fase 4
## Tarefas de Release Final e Validação de Produção

### 1. Verificação do contrato da API
- [x] Garantir que a requisição de clima inclua `daily=showers_sum` conforme o PRD.
- [x] Confirmar que o serviço continua validando cidade vazia, timezone ausente e coordenadas inválidas antes de chamar o endpoint.
- [x] **Critério de Aprovação:** a chamada à Forecast inclui os campos exigidos e a aplicação rejeita entradas inválidas sem disparar uma requisição quebrada.

### 2. Validação final da UX e do layout
- [x] Confirmar que os estados de empty, loading e erro continuam consistentes em todas as buscas.
- [x] Validar a apresentação do país, da direção do vento e da descrição do clima em mobile e desktop.
- [x] **Critério de Aprovação:** a interface apresenta feedback visual correto e os dados meteorológicos continuam formatados e legíveis sem regressões.

### 3. Aprovação Final da Fase 4
- [x] Revisão final da documentação, checklist e comportamento da aplicação.
- [x] Validação final do build para confirmar que o projeto está pronto para entrega.
- [x] **Critério de Aprovação:** as fases 1 a 4 estão concluídas, documentadas e com verificação final positiva.

# Fase 5
## Refinamento Final e Persistência de Estado

### 1. Persistência da última pesquisa
- [x] Salvar a última cidade pesquisada em `localStorage` após uma busca bem-sucedida.
- [x] Restaurar o valor salvo ao abrir a aplicação para oferecer continuidade de uso.
- [x] **Critério de Aprovação:** ao recarregar a página, a última cidade deve reaparecer no campo e o clima correspondente deve ser exibido sem exigir nova digitação.

### 2. Validação final do fluxo e build de produção
- [x] Confirmar que o carregamento, o erro e o empty state continuam consistentes durante a busca restaurada.
- [x] Verificar que o formulário continua acessível e funcional em teclado e mouse.
- [x] **Critério de Aprovação:** o fluxo completo deve ser estável, a aplicação deve manter o comportamento esperado e o build final deve compilar sem regressões.

### 3. Aprovação Final da Fase 5
- [x] Revisão final do UX, do armazenamento local e da consistência do comportamento da aplicação.
- [x] Checklist da fase 5 concluído.
- [x] **Critério de Aprovação:** a fase 5 foi entregue com validação positiva e o projeto está pronto para uso contínuo.

# Fase 6
## Reforço final de UX, acessibilidade e QA de release

### 1. Acessibilidade do formulário e interação por teclado
- [x] Garantir foco visível no campo e no botão com contraste adequado.
- [x] Validar que a busca funciona via mouse e via tecla Enter sem regressão.
- [x] **Critério de Aprovação:** o formulário continua acessível e funcional em teclado e mouse, com feedback visual do estado de carregamento e sem perda de usabilidade.

### 2. Robustez dos estados de busca e persistência
- [x] Manter a última cidade pesquisada em `localStorage` e restaurá-la ao abrir a aplicação.
- [x] Tratar entradas vazias e cidades inexistentes com mensagens claras, sem disparar requisições quebradas.
- [x] **Critério de Aprovação:** a interface continua consistente em empty, loading, erro e sucesso, mesmo após recarga ou busca inválida.

### 3. Validação final de release
- [x] Confirmar que o build final compila sem erros após a revisão de acessibilidade e UX.
- [x] Revalidar o fluxo completo em navegador para cidade válida, inválida e estado persistido.
- [x] **Critério de Aprovação:** a aplicação está estável, pronta para uso contínuo e com o checklist da fase 6 concluído.
