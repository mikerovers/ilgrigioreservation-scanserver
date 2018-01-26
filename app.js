let config = require('config');
const _ = require('lodash');
const Table = require('cli-table2');
let usbScanner = require('node-usb-barcode-scanner').usbScanner;
let getDevices = require('node-usb-barcode-scanner').getDevices;
const commandLineArgs = require('command-line-args')

const optionDefinitions = [
    { name: "lookup", alias: "l", type: Boolean, defaultOption: false }
]

const options = commandLineArgs(optionDefinitions);

if(options.lookup) {
    lookup();
}

function lookup() {
    let connectedDevices = getDevices();

    let table = new Table({
        head: ['Vendor ID', 'Productname'],
        wordWrap: true
    });

    _.map(getDevices(), (device) => {
        table.push([device.vendorId, device.product]);
    });

    console.log('Available HID devices:\n' + 
        table.toString()
    );

    process.exit();
}

console.log(config.get('Common.vendor_id'));

let scanner = new usbScanner({
    vendorId:1155,
    hidMap: {30: '1', 31: '2', 32: '3', 33: '4',34: '5',35: '6', 36: '7', 37: '8', 38: '9',39: '0',40: 'e'}
});
scanner.on("data", function(code){
    console.log("recieved code : " + code);
});