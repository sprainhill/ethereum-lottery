// checks values against each other
const assert = require('assert');

// local ethereum testnet
const ganache = require('ganache-cli')

// uppercase as it is a constructor
// used to create instances of the web3 lib
const Web3 = require('web3')

const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    // get list of all accounts
    // web3 calls are asynchronous
    accounts = await web3.eth.getAccounts()

    // use one of those accounts
    // to deploy the contract
    // instance of contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ["Hello world."] })
    .send({ from: accounts[0], gas: '1000000' })
    inbox.setProvider(provider);
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call()
        assert.equal(message, 'Hello world.')
    });

    it('can set new message', async () => {
        await inbox.methods.setMessage('Hello test').send({ from: accounts[0] })

        const message = await inbox.methods.message().call();

        assert.equal(message, 'Hello test')
    });

});

