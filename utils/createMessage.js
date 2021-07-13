const createMessage = (type, payload, message = 'ok') => {
    return {
        'status': type,
        message,
        payload
    }
};


module.exports = createMessage;

