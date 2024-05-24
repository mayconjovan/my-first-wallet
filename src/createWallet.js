
//importar as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')


//definir rede
//bitcoint - rede principal - mainnet
//testnet - rede de teste - testnet
const network = bitcoin.networks.testnet

//derivacao de carteira HD
const path = `m/49'/1'/0'/0`

//criando o minemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da carteira hd
let root = bip32.fromSeed(seed, network)

//criando uma conta - par - pvt-pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAdress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address


console.log("carteira gerada")
console.log("Endereco: ", btcAdress)
console.log("chave privada: ", node.toWIF())
console.log("Seed", mnemonic)
