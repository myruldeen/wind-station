const express = require('express');
const jsonfile = require('jsonfile');
const router = express.Router();

router.post('/device', function (req, res) {
    var { name, macAddress } = req.body;
    var option = { flag: 'a' }
    var filePath = './images/db.json';
    jsonfile.writeFile(filePath, req.body, option, function (err) {
        if (err) throw err;
        console.log('data write');
    })
    // console.log(name, macAddress);
    res.json({ msg: 'success' });
});

router.get('/device', function (req, res) {
    var dataList = [
        {
            name: 'esp8266',
            macAddress: '45:65:67:56:45'
        },
        {
            name: 'esp32',
            macAddress: '45:65:67:56:45'
        },
        {
            name: 'esp8266',
            macAddress: '45:65:67:56:45'
        },
        {
            name: 'esp32',
            macAddress: '45:65:67:56:45'
        },
        {
            name: 'esp8266',
            macAddress: '45:65:67:56:45'
        },
        {
            name: 'esp32',
            macAddress: '45:65:67:56:45'
        },
        {
            name: 'esp8266',
            macAddress: '45:65:67:56:45'
        },
        {
            name: 'esp32',
            macAddress: '45:65:67:56:45'
        },
        {
            name: 'esp8266',
            macAddress: '45:65:67:56:45'
        },
        {
            name: 'esp32',
            macAddress: '45:65:67:56:45'
        },
        {
            name: 'esp8266',
            macAddress: '45:65:67:56:45'
        },
        {
            name: 'esp32',
            macAddress: '45:65:67:56:45'
        },
        {
            name: 'esp8266',
            macAddress: '45:65:67:56:45'
        },
        {
            name: 'esp32',
            macAddress: '45:65:67:56:45'
        }
    ];

    res.json({data: dataList});
});

module.exports = router;