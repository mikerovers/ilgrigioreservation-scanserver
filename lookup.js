const Table = require('cli-table2');
const _ = require('lodash');
const getDevices = require('node-usb-barcode-scanner').getDevices;

module.exports = () => {
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
};