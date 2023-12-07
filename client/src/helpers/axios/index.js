import request from './init'

/**
 * Request for GET
 *
 * @param url
 * @param data
 * @returns {*}
 */
export function get (url, data = {}) {
    return request({
        url: url,
        method: 'GET',
        data,
    });
}

/**
 * Request for POST
 *
 * @param url
 * @param data
 * @param headers
 * @returns {*}
 */
export function post(url, data = {}, headers = {}) {
    return request({
        url: url,
        method: 'POST',
        data,
        headers,
    });
}