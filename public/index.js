window.addEventListener('DOMContentLoaded', () => {
  let req = new XMLHttpRequest();

  req.open('GET', 'http://localhost:3000/');
  req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  req.send();
  console.log(req.status);
});

document.getElementById('btn').addEventListener('click', () => {
  let req = new XMLHttpRequest();

  req.open('GET', 'http://localhost:3000/api/test');
  req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  req.send();

  req.addEventListener('load', () => {
    let res = JSON.parse(req.response);


    console.log(req.status);
    console.log(res.message);
  })

})