'use strict';


window.addEventListener('DOMContentLoaded', () => {
  let req = new XMLHttpRequest();
  
  req.open('GET', 'http://localhost:3000/');
  req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  req.send();
  req.addEventListener('load', () => {
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
      elem.innerHTML = `<a href=' ${data.childNodes[1].childNodes[0].nodeValue} '><h2> ${data.childNodes[0].childNodes[0].nodeValue} </h2></a>`;
      container.append(elem);
    };    
  });
});