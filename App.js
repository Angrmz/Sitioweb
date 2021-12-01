const http = require('http');
const fs = require('fs');

http.createServer((request, responde)=>{
  console.log(request.url);
  const file = request.url == '/'? "./WWW/index.html" : `./WWW${request.url}`;
  if (request.url == '/form') {
    let data = [];
    request.on("data", value =>{
      data.push(value);
    }).on("end", () =>{
      let param = Buffer.concat(data).toString();
      param += '/n';
      fs.appendFile("data.txt", param, (error) => {
        if(error){
          response.writeHead(500,{"Content-Type":"text/plain"});
          response.write("- El servidor no funciona -");
          response.end();
        }
      });
      console.log(param);
    });

    fs.readFile(file, (err, data)=> {
      if (err) {
        response.writeHead(404, {"Content-Type":"text/plain"});
        response.write("- No encontrado -");
        responde.end();
      }else {
        const extension = file.split('.').pop();
        switch (extension) {
          case 'txt':
            response.writeHead(200,{"Content-Type":"text/plain"});
            break;
          case 'html':
            response.writeHead(200,{"Content-Type":"text/html"});
            break;
          case 'css':
            response.writeHead(200,{"Content-Type":"text/css"});
            break;
          default:
            response.writeHead(200,{"Content-Type":"text/plain"});
        }
        response.write(data);
        response.end;
      }
    });
  }
}).listen(8888);
