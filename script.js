const decryptButton = document.querySelector('.decrypt');
const encryptButton = document.querySelector('.encrypt');
const inputKey = document.querySelector('.keyText').getAttribute('value');
let encryptMessage = document.querySelector('.message').innerHTML;
let poppedup = false;
const charLibrary = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',' ',',','.'];

encryptButton.addEventListener('click', event => {
    //encrypts the message and makes the encrypted message box popup
    messageEncrypter(encryptMessage, inputKey)
    decryptButton.removeAttribute('disabled');
    encryptButton.setAttribute('disabled', true);
})
decryptButton.addEventListener('click', event => {
    //decrypts the message and refills the main message text box
    console.log('clicked');
    encryptButton.removeAttribute('disabled');
    decryptButton.setAttribute('disabled', true);
})

function messageEncrypter(message, key) {
  //Create variable to hold encrypted message
  //loop through message(string) and key(string) inputs one char at a time
	  //compare character at message and key and plug into function to  create the encrypted character
  if(message === null || key === null) {
    return;
  }
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
  if(!poppedup) {
    createPopup(newMessage, 'Encrypted');
  } else {

  }
}

function messageDecrypter(cipher, key) {
  //Create variable to hold decrypted message
  //loop through cipher(string) and key(string) inputs one char at a time
	  //compare character at message and key and plug into function to  create the encrypted character
  if(cipher === null || key === null) {
    return;
  }
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
  createPopup(newMessage, 'Decrypted');
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

function createPopup(message, crypt) {
  let notifyText = crypt;
  let p = document.createElement("p");
  let pText = document.createTextNode(message);
  let header = document.createElement("h2");
  let headerText = document.createTextNode('Your ' + notifyText + ' Message');
  p.className = "popupBox";
  header.className = "messageHeader";
  p.appendChild(header);
  p.appendChild(pText);
  header.appendChild(headerText);
  
  document.querySelector(".wrapper").appendChild(p);

  poppedup = true;
}

