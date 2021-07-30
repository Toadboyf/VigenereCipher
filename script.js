const decryptButton = document.querySelector('.decrypt');
const encryptButton = document.querySelector('.encrypt');
let inputKey = '';
let encryptMessage = '';
let poppedup = false;
const charLibrary = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',' ',',','.','?','!'];

encryptButton.addEventListener('click', event => {
    //encrypts the message and makes the encrypted message box popup
    pushButton('Encrypted');
})
decryptButton.addEventListener('click', event => {
    //decrypts the message and replaces the popup text
    pushButton('Decrypted');
})

function messageScrambler(message, key, type) {
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
    //check whether its encrypting or decrypting text
    if(type === 'Encrypted') {
      newMessage += encrypter(message[mIndex],key[kIndex])
    } else {
      newMessage += decrypter(message[mIndex],key[kIndex])
    }
    mIndex++;
    kIndex++;
  }
  //Debug logs
  console.log('Original  Message: ' + message);
  console.log('Key              : ' + key);
  console.log('Encrypted Message: ' + newMessage);
  //check if the message is already popped up, if so, just replaces the text in the popup.
  if(!poppedup) {
    createPopup(newMessage, type);
  } else {
    replacePopup(newMessage, type);
  }
  
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
  //Creating elements that make up the popup message
  let div = document.createElement("div");
  let header = document.createElement("h2");
  let headerText = document.createTextNode('Your ' + crypt + ' Message');
  let p = document.createElement('p');
  let pText = document.createTextNode(message);
  div.className = "popupBox";
  p.className = "popupText";
  header.className = "popupHeader";
  //appending to parents, this is where different elements can be ordered.
  div.appendChild(header);
  div.appendChild(p);
  p.appendChild(pText);
  header.appendChild(headerText);
  document.querySelector(".wrapper").appendChild(div);
  //Set bool to true, so it does not create anymore elements
  poppedup = true;
}

function replacePopup(message, crypt) {
  //Replacing the popup text rather than deleting elements and creating new ones every time.
  document.querySelector('.popupHeader').innerText = 'Your ' + crypt + ' Message';
  document.querySelector('.popupText').innerText = message;
}

function pushButton(type) {
  //Triggers on button push
  encryptMessage = document.querySelector('.message').value;
  inputKey = document.querySelector('.keyText').value;
  messageScrambler(encryptMessage, inputKey, type);
}

