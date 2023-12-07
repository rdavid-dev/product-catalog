const request = require('./init')

/**
 * Request for GET
 *
 * @param url
 * @param data
 * @returns {*}
 */
const get = (url, data = {}) => {
    return request({
        url: url,
        method: 'GET',
        data,
    });
}

module.exports = {
    get
}