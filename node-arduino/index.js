var SerialPort = require('serialport');
var Readline = require('@serialport/parser-readline');
var port = new SerialPort('/dev/ttyUSB0', { baudRate: 115200, autoOpen: true }, function(err) {
	if (err) return console.log('Error: ', err.message);
});
var parser = port.pipe(new Readline({ delimiter: '\n' }));
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var sensors = {
    temp: {current: 0 , high:0, low:100 },
    humidity: {current: 0, high:0, low: 100},
    light: {current: 0, high:0, low: 10},
    soil1: {current: 0, high:0, low: 10},
    soil2: {current: 0, high:0, low: 10},
    temp1: {current: 0 , high:0, low:100 },
    temp2: {current: 0 , high:0, low:100 }
}
app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/lcd', function (req, res) {
    res.render('lcd');
});

port.on('open', function () {
    console.log('serial port opened');
});
port.on('error', function (err) {
    console.log('Error: ', err.message);
});

io.on('connection', function (socket) {
    console.log('socket.io connection');
    socket.emit("initial-data", sensors);
    parser.on('data', function (data) {
        data = data.replace(/(\r\n|\n|\r)/gm, "");
        var dataArray = data.split(',');
        var hasChanged = updateValues(dataArray);
        if (hasChanged > 0) {
            socket.emit("data", sensors);
        }
    });
    socket.on('disconnect', function () {
        console.log('disconnected');
        socket.removeAllListeners();
    });
    /*socket.on('red', function (data) {
        port.write(data + 'T', function(err) {
		if (err) {
	 	   return console.log('Error on write: ', err.message);
                }
        });
	console.log(data);
    });
    socket.on('green', function (data) {
        port.write(data + 'T', function(err) {
		if (err) {
	 	   return console.log('Error on write: ', err.message);
                }
        });
	console.log(data);
    });
    socket.on('disconnect', function () {
        console.log('disconnected');
    });
    parser.on('data', function(data) {
        console.log(data);
    });*/
});
function updateValues(data) {
    var changed = 0;
    var keyArray = ["temp", "humidity", "light", "soil1", "soil2", "temp1", "temp2"];
    keyArray.forEach(function (key, index) {
        var tempSensor = sensors[key];
        var newData = data[index];
        if (tempSensor.current !== newData) {
            sensors[key].current = data[index];
            changed = 1;
        }
        if (tempSensor.high < newData) {
            sensors[key].high = data[index];
            changed = 1;
        }
        if (tempSensor.low > newData) {
            sensors[key].low = data[index];
        }
    });
    return changed;
}
server.listen(3000, function () {
    console.log('listening on port 3000...');
});