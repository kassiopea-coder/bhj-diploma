/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const f = function () {},
        {
            url = '',
            method = 'GET',
            callback = f,
            responseType = 'json',
            async = true,
            data = {}
        } = options,

    xhr = new XMLHttpRequest;

    let formData = new FormData;
    let params = '';

    if (method === 'GET') {
        for (param in data) {
            params += param + '=' + data[param] + '&';
        }
        params = '/?' + params.slice(0, -1);
    } else {
        for (param in data) {
            formData.append(param, data[param]);
        }
    }

    try {
        xhr.open(method, url + params);
        xhr.responseType = responseType;
        xhr.withCredentials = true;
        xhr.send(formData);
    } catch (err) {
        callback(err);
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
           if (xhr.status === 200) {
              options.callback(null, xhr.response);
           } else {
              options.callback(xhr.status, null)
           }
        }
     }
};
