/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
   const xhr = new XMLHttpRequest();
   const formData = new FormData();

   xhr.responseType = options.responseType;
   xhr.withCredentials = true;

   if (options.headers) { //если есть заголовки
      for (let header in options.headers) {
         xhr.setRequestHeader(header, options.headers[header]);
      }
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

   try {
      if (options.method === "GET") {
         let url = options.url + "?";

         for (let key in options.data) {
            url += key + "=" + options.data[key] + "&";
      }
      url = url.substring(0, url.length - 1);
      xhr.open(options.method, url);
      xhr.send();

   } else {
      for (let key in options.data) {
         formData.append(key, options.data[key]);
      }
      xhr.open(options.method, options.url);
      xhr.send(formData);
   }
}
catch (err) {
   options.callback(err);
}
return xhr;
};