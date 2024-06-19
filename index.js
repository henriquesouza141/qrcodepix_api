const express = require('express');
const bodyParser = require('body-parser');
const QrCodePix = require('./src');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT; // Porta que a API irá escutar

// Configura o body-parser para lidar com dados de formulário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota para receber os valores via POST
app.post('/pix', async (req, res) => {
    // Extrai os valores do corpo da requisição
    const {  valor, message, txtId } = req.body;

    const chavePix = process.env.CHAVE_PIX;
    const recebedor = process.env.RECEBEDOR;
    const cidade = process.env.CIDADE;
    const cep = process.env.CEP;
try {

    const payloadInstance = {  valor, message,  txtId};
    console.log(payloadInstance);
    
    const qrCodePix = QrCodePix({
        version: '01',
        key: chavePix, //or any PIX key
        name: recebedor,
        city: cidade,
        transactionId: txtId,
        message: message,
        cep: cep,
        value: valor,
    });
    

    const copirColar =  qrCodePix.payload();
    console.log(copirColar);
    
    qrCodePix.base64().then((resultadoBase64) => {
       
        res.json({ 
            "ChavePix": copirColar,
            "qrCode": resultadoBase64,
            
        });
    });


} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocorreu um erro ao gerar o payload e o QR Code." });
}
});


// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});