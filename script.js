const decrypt = document.querySelector('.decrypt');
const encrypt = document.querySelector('.encrypt');
const charLibrary = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',' ',',','.'];

let inputMessage;
let inputKey;

decrypt.addEventListener('click', event => {
    console.log('clicked');
    encrypt.removeAttribute('disabled');
    decrypt.setAttribute('disabled', true);
})
encrypt.addEventListener('click', event => {
    console.log('clicked');
    decrypt.removeAttribute('disabled');
    encrypt.setAttribute('disabled', true);
})

/*
if(inputMessage !== null && inputKey !== null) {
  messageEncrypter(inputMessage, inputKey);
}
*/

function messageEncrypter(message, key) {
  //Create variable to hold encrypted message
  //loop through message(string) and key(string) inputs one char at a time
	  //compare character at message and key and plug into function to  create the encrypted character
  let newMessage = "";
  let mIndex = 0;
  let kIndex = 0;
  message = message.toUpperCase();
  key = key.toUpperCase();
  while(mIndex < message.length) {
    if(kIndex > key.length-1) {
      kIndex = 0;
    }
    newMessage += encrypter(message[mIndex],key[kIndex])
    mIndex++;
    kIndex++;
  }
  console.log('Original  Message: ' + message);
  console.log('Key              : ' + key);
  console.log('Encrypted Message: ' + newMessage);
}

function messageDecrypter(cipher, key) {
  //Create variable to hold decrypted message
  //loop through cipher(string) and key(string) inputs one char at a time
	  //compare character at message and key and plug into function to  create the encrypted character
  let newMessage = "";
  let cIndex = 0;
  let kIndex = 0;
  key = key.toUpperCase();
  while(cIndex < cipher.length) {
    if(kIndex > key.length-1) {
      kIndex = 0;
    }
    newMessage += decrypter(cipher[cIndex],key[kIndex])
    cIndex++;
    kIndex++;
  }
  console.log('Encrypted  Message: ' + cipher);
  console.log('Key               : ' + key);
  console.log('Decrypted  Message: ' + newMessage);
}

function encrypter(mChar, kChar) {
  //take in a message character and a key character and use vignere cipher function to encrypt the message char using the key char as a key.
  //Cipher Encryption function: (mCharIndex + kCharIndex) % 26
  const newIndex = (charLibrary.indexOf(mChar) + charLibrary.indexOf(kChar)) % charLibrary.length;
  const newChar = charLibrary[newIndex];
  return newChar;
}

function decrypter(cChar, kChar) {
  //take in a cipher character and the key character and use vignere cipher function to decrypt the message char using the key char as a key.
  //Cipher Decryption function: (cCharIndex - kCharIndex + 26) % 26
  const newIndex = (charLibrary.indexOf(cChar) - charLibrary.indexOf(kChar) + charLibrary.length) % charLibrary.length;
  const newChar = charLibrary[newIndex];
  return newChar;
}

