const fs = require('fs').promises;
const pdf = require("pdf-creator-node");
const moment = require('moment');

const templates = require('./templates');
const config = require('./config.json');
const createMessage = require('./utils/createMessage');

const document = (data, template) => {
    return {
        html: template,
        data: prepareDataToParse(data),
        path: "./output.pdf",
        type: "",
    }
};

const prepareDataToParse = (data) => {
    const newData = {
        ...data,
        Fullsalary: data.position ? config.salary[data.position] : 5000,
        paidSalary: data.position ? Math.floor(config.salary[data.position] - (config.salary[data.position] * 0.13)) : Math.floor(5000 - (5000 * 0.13)),
        salary: data.position ? Math.floor((config.salary[data.position] - (config.salary[data.position] * 0.13)) * 0.6) : Math.floor((5000 - (5000 * 0.13)) * 0.6),
        prepaidExpense: data.position ? Math.floor(( config.salary[data.position] - (config.salary[data.position] * 0.13)) * 0.4) : Math.floor((5000 - (5000 * 0.13)) * 0.4),
        ndfl: data.position ? Math.floor((config.salary[data.position] * 0.13)) : Math.floor((5000 * 0.13)),
        date: data.type === 'salaryList' &&  data.payload.requestDate,
    }
    return newData;
};

const generate = data => {
    if (!data?.type || !Object.keys(config.docsConfig).includes(data.type)) return new Promise(resolve => { resolve(createMessage('error', null, 'type is not provided or incorrect')) })
    return new Promise((resolve, reject) => {
        pdf
            .create(document(data, templates[data.type]), config.docsConfig[data.type])
            .then(res => fs.readFile(res.filename, { encoding: 'base64' }).then(encode => resolve(createMessage('success', encode))))
            .catch(error => resolve(createMessage('error', null, 'bad request')))
    })
}

module.exports = generate;