# Projeto qrcodepix_api

Configuração

## Javascript

Essa mini api foi criada para gerar a Paylod do Pix com valores de pagamento e mensagem de descricao de pagamento e com qrcode base64.

## O que é Pix?

Pix é um meio de pagamento eletrônico instantâneo e gratuito oferecido pelo [Banco Central do Brasil](https://www.bcb.gov.br/estabilidadefinanceira/pix) a pessoas físicas e jurídicas, sendo o mais recente meio de pagamento do Sistema de Pagamentos Brasileiro.

## O que é Pix Payload?

A Payload do Pix nada mais é que um conjunto de informações necessárias para pagamentos e transferências bancárias que necessita seguir as regras e estar bem formatada para ter sucesso no pagamento ou transferência.

Nesta [API](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/II_ManualdePadroesparaIniciacaodoPix.pdf), do próprio [Banco Centra do Brasil](https://www.bcb.gov.br/), você poderá olhar com mais detalhes como funciona uma Payload Pix.

## Para configurar e iniciar este projeto, siga os passos abaixo:

### 1 - Instalação das Dependências

npm install

### 2 - Configuração das Variáveis de Ambiente

Renomeie o arquivo .env_exemplo para .env.
Edite o arquivo .env e configure os dados necessários, como chaves de API, senhas etc.

### 3 - Iniciar o Servidor

npm start

### 5 - Copia colection na pasta postman e exporta para postman

Fazer um post com os valores json
{

    "valor":99,
    "txtId":"Loja01",
    "message":"compra de ps5"

}
