// need to read contents of file off hard drive
const path = require('path') // cross-platform compatibility
const fs = require('fs')
const solc = require('solc')


const inboxPath = path.resolve(__dirname, 'contracts', 'Lottery.sol')
const source = fs.readFileSync(inboxPath, 'utf8');

const compileContract = solc.compile(source, 1);


module.exports = compileContract.contracts[':Lottery'];