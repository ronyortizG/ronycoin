const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Tu clave privada
const myKey = ec.keyFromPrivate('7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf');

// A partir de eso podemos calcular su clave pública (que se duplica como su dirección de billetera)
const myWalletAddress = myKey.getPublic('hex');

// Crear nueva instancia de la clase Blockchain
const ronycoin = new Blockchain();

// Crea una transacción y firma con la llave
const tx1 = new Transaction(myWalletAddress, 'address2', 100);
tx1.signTransaction(myKey);
ronycoin.addTransaction(tx1);

// mina bloque
ronycoin.minePendingTransactions(myWalletAddress);

// Crea una transacción y firma con la llave
const tx2 = new Transaction(myWalletAddress, 'address1', 50);
tx2.signTransaction(myKey);
ronycoin.addTransaction(tx2);

// mina bloque
ronycoin.minePendingTransactions(myWalletAddress);

console.log();
console.log(`Balance of xavier is ${ronycoin.getBalanceOfAddress(myWalletAddress)}`);

console.log();
console.log('Blockchain valid?', ronycoin.isChainValid() ? 'Yes' : 'No');
