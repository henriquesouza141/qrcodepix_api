const qrcode = require('qrcode');
const { crc16ccitt } = require('crc');
const { string, number } = require('yup');

/**
 * Função para gerar o QR Code PIX
 */
function QrCodePix(params) {
    let {
        version,
        key,
        city,
        name,
        value,
        cep,
        message,
        transactionId = '***',
        currency = 986,
        countryCode = 'BR',
    } = params;

    string().equals(['01'], 'Versão não suportada').validateSync(version);

    string()
        .min(2, 'countryCode: 2 caracteres')
        .max(2, 'countryCode: 2 caracteres')
        .nullable()
        .validateSync(countryCode);

    string().min(8, 'cep: 8 caracteres').max(8, 'cep: 8 caracteres').nullable().validateSync(cep);

    if (String(value) === '0') {
        value = undefined;
    }

    number().nullable().positive('O valor deve ser um número positivo').validateSync(value);

    string().max(25, 'transactionId: máximo de 25 caracteres').nullable().validateSync(transactionId);

    const payloadKeyString = generateKey(key, message);

    const payload = [
        genEMV('00', version),
        genEMV('26', payloadKeyString),
        genEMV('52', '0000'),
        genEMV('53', String(currency)),
    ];

    if (value) {
        payload.push(genEMV('54', value.toFixed(2)));
    }

    name = String(name)
        .substring(0, 25)
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    city = String(city)
        .substring(0, 15)
        .toUpperCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

    payload.push(genEMV('58', countryCode.toUpperCase()));
    payload.push(genEMV('59', name));
    payload.push(genEMV('60', city));

    if (cep) {
        payload.push(genEMV('61', cep));
    }

    payload.push(genEMV('62', genEMV('05', transactionId)));

    payload.push('6304');

    const stringPayload = payload.join('');
    const crcResult = crc16ccitt(stringPayload).toString(16).toUpperCase().padStart(4, '0');

    const payloadPIX = `${stringPayload}${crcResult}`;

    return {
        payload: () => payloadPIX,
        base64: (options) => qrcode.toDataURL(payloadPIX, options),
    };
}

/**
 * Função para gerar a chave de payload
 */
function generateKey(key, message) {
    const payload = [genEMV('00', 'BR.GOV.BCB.PIX'), genEMV('01', key)];
    if (message) {
        payload.push(genEMV('02', message));
    }
    return payload.join('');
}

/**
 * Função para gerar o formato EMV
 */
function genEMV(id, parameter) {
    const len = parameter.length.toString().padStart(2, '0');
    return `${id}${len}${parameter}`;
}

module.exports =  QrCodePix ;
