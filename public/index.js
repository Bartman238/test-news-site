'use strict';


window.addEventListener('DOMContentLoaded', async () => {
  let req = new XMLHttpRequest();
  
  await req.open('GET', 'http://localhost:3000/xml');
  await req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  await req.send();
  await req.addEventListener('readystatechange', () => {
    function httpReq() {
      return new Promise( (resolve, reject) => {
        if (req.readyState === 4 && req.status === 200) {
          resolve(req);   
        } else if (req.status != 200) {
          reject(req);
        }
      })
    };


    httpReq()
      .then( (req) => {
        let res = JSON.parse(req.response);
        console.log(`Status ${req.status}: ${res.message}`);
      
      
        let parser = new DOMParser(),
        xml = parser.parseFromString(res.body, 'text/xml');
        
        let p = xml.getElementsByTagName('item');
        
        let data;
        let container = document.getElementById('contentContainer');
        for (let i = 0; i < p.length; i++){
          data = p[i];
  
          let elem = document.createElement('p');
          elem.innerHTML = `<a href='${data.childNodes[1].childNodes[0].nodeValue}'> <h2>${data.childNodes[0].childNodes[0].nodeValue}</h2> </a>`;
          container.append(elem);
        } })
        .catch( (req) => {
          switch (req) {
            case req.status === 0:
              alert(`Something went wrong...\nStatus code: ${req.status} (Server is unavailable)`);
              break;
            case req.status === 404:
              alert(`Not found\nStatus code: 404`);
              break;
            default:
              alert(`Something went wrong\nStatus code: ${req.status}`);
              break;
          }  })
  });
});