document.addEventListener('DOMContentLoaded', function() {
    const encryptButton = document.getElementById('encrypt');
    const decryptButton = document.getElementById('decrypt');
    const copyButton = document.getElementById('copy');
    const inputText = document.getElementById('input-text');
    const outputMessage = document.getElementById('output-message');

    const encryptionMap = {
        'a': 'ai', 'b': 'b', 'c': 'c', 'd': 'd', 'e': 'enter', 'f': 'f', 'g': 'g',
        'h': 'h', 'i': 'imes', 'j': 'j', 'k': 'k', 'l': 'l', 'm': 'm', 'n': 'n', 'ñ': 'ñ',
        'o': 'ober', 'p': 'p', 'q': 'q', 'r': 'r', 's': 's', 't': 't', 'u': 'ufat',
        'v': 'v', 'w': 'w', 'x': 'x', 'y': 'y', 'z': 'z'
    };

    const decryptionMap = Object.fromEntries(Object.entries(encryptionMap).map(([k, v]) => [v, k]));

    copyButton.addEventListener('click', function() {
        const text = outputMessage.textContent;
        if (text) {
            navigator.clipboard.writeText(text).then(() => {
                alert('Texto copiado al portapapeles');
            }).catch(err => {
                alert('Error al copiar el texto: ' + err);
            });
        }
    });
    
    encryptButton.addEventListener('click', function() {
        const text = inputText.value.toLowerCase();
        const encryptedText = encryptText(text);
        outputMessage.textContent = encryptedText;
    });

    decryptButton.addEventListener('click', function() {
        const text = inputText.value.toLowerCase();
        const decryptedText = decryptText(text);
        outputMessage.textContent = decryptedText;
    });

    function encryptText(text) {
        return text.split('').map(char => encryptionMap[char] || char).join('');
    }

    function decryptText(text) {
        // Ordenar las claves de decryptionMap por longitud descendente
        const sortedKeys = Object.keys(decryptionMap).sort((a, b) => b.length - a.length);
        let decryptedText = text;
        sortedKeys.forEach(key => {
            const regex = new RegExp(key, 'g');
            decryptedText = decryptedText.replace(regex, decryptionMap[key]);
        });
        return decryptedText;
    }
});





