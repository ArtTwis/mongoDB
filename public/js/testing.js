function xhrCall(method, url, headers, body) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      if (xhr.getResponseHeader('content-type').includes('application/json')) {
        let response = xhr.response ? JSON.parse(xhr.response) : xhr.response;
        resolve(response);
      } else {
        resolve(false);
      }
    };
    xhr.open(method.toUpperCase(), url, 'true');
    for (const key in headers) {
      const value = headers[key];
      xhr.setRequestHeader(key, value);
    }
    if (body) xhr.send(JSON.stringify(body));
    else xhr.send();
  });
}
