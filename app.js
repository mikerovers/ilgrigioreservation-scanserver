let config = require('config'); 
let usbScanner = require('node-usb-barcode-scanner').usbScanner;
let getDevices = require('node-usb-barcode-scanner').getDevices;
const commandLineArgs = require('command-line-args')
const Pusher = require('pusher');
const lookup = require('./lookup');

const options = commandLineArgs({
    name: "lookup", 
    alias: "l", 
    type: Boolean, 
    defaultOption: false 
});

if(options.lookup) {
    lookup();
}

let pusher = new Pusher({
    appId: '464305',
    key: 'c08a48edcfcca1cbafea',
    secret: '08d7199560cde013b032',
    cluster: 'eu',
    encrypted: true
});

try {   
    let scanner = new usbScanner({
        vendorId: config.get('Common.vendor_id'),
        hidMap: {30: '1', 31: '2', 32: '3', 33: '4',34: '5',35: '6', 36: '7', 37: '8', 38: '9',39: '0',40: 'e'}
    });
    scanner.on("data", function(code){
        console.log("recieved code : " + code);
        pusher.trigger('my-channel', 'my-event', {
            'message': code
        });
    });
} catch(e) {
    console.log(`The scanner with vendorId ${config.get('Common.vendor_id')} could not be found.\nTry running the program as sudo.`);
}