var http = require('http');
var fs = require('fs');

const PORT =  8080
var server = http.createServer((req,res) => {
    // res.write('Hello World')
    
    switch(req.url){
        case '/' : doDefault(req,res)
        break;
        case '/message' : formHandle(req,res)
        break;
        default : doDefault(req,res);
    }
})

server.listen(PORT,() =>{
    console.log(`listening in ${PORT}`)
})

var formHandle = function(req,res) {
    var body = ''
    if (req.method === 'POST'){
        req.on('data',(chunk) => {
            body += chunk;
        })
        res.writeHead(200,{'Content-Type' : 'text/html'})
    req.on('end', () => {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        var newBody = body.split(/[=\+]+/);
        var message = newBody.join(' ')
        fs.appendFile('message.txt','\n' + message,(err) => {
            console.log(err)
        })
        // console.log(newBody)
        res.write('<h1>Done!</h1>', () => {
            res.end();
        });
    });
    }

}

var doDefault = function(req,res){
    console.log('default is executed')
    
    console.log(req.url)
    fs.readFile('./index.html',function (err,data){
        if (err){
            res.writeHead(404,{'content-type' : 'text/plain'})
            res.write('File not found')
            console.log(err)
        }
        else{
            res.writeHead(200,{'Content-Type' : 'text/html'})
            res.write(data)
            console.log('writing file')
        }
        res.end();
    })
}