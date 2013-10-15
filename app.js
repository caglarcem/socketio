
/**
 * Module dependencies.
 */

var express = require('express');
var socketio = require('socket.io');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/client/views');
app.engine('.html', require('ejs').__express);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/client')));
app.use(express.static(__dirname, '/client'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app);

var io = socketio.listen(server);

io.sockets.on('connection', function(socket){
    var counter = 0;
    setInterval(function(){
        ++counter;
        console.log('Emitted: ' + counter);
        socket.emit('timer', counter);
    }, 988);

    socket.on('submit', function(data){
        console.log('Submitted: ' + data);
    });
});

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});



