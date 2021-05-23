/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

   let xhr = new XMLHttpRequest();
   let formData = new FormData();
   xhr.responseType = 'json';
   //xhr.responseType = options.responseType;
   xhr.withCredentials = true;

  

   xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
         if (xhr.status === 200) {
            options.callback(null, xhr.response);
         } else {
            options.callback(xhr.status, null)
         }
      }
   }

   if (options.method === "GET") {

      let url = options.url + "?";

      for (let key in options.data) {
         url += key + "=" + options.data[key] + "&";
      }
      url = url.substring(0, url.length - 1);
   } else {
      for (let key in options.data) {
         formData.append(key, options.data[key]);
         
      }


      try {
         xhr.open(options.method, options.url);
         xhr.send(formData);

      } catch (err) {
         options.callback(err);
      }
     
}
}