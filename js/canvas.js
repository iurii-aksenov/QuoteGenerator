function generateQuote() {
    loadImageUrl();
    let quote = document.getElementById('quote');
    quote.style.display="none";
}

function loadImageUrl() {
    console.log("loadImageUrl")
    let XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
    let xhr = new XHR();
    xhr.open('GET', 'https://loremflickr.com/640/480', true);
    xhr.onload = function () {
        console.log("loadImageUrl: responseURL "+this.responseURL);
        insertImageIntoCanvas(this.responseURL);
    }
    xhr.onerror = function () {
        alert('Ошибка ' + this.status);
    }
    xhr.send();

    
}

function loadQuoteUrl() {
    console.log("loadQuoteUrl")
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.responseText) {
                console.log("loadQuoteUrl: responseText "+this.responseText)
                insertTextIntoCanvas(this.responseText);
            }
        }
    }
    xhr.open('GET', 'http://z9111854.beget.tech/server.php', true);
    xhr.send();
}

function insertImageIntoCanvas(imageUrl) {
    console.log("insertImage: " + imageUrl);

    let canvas = document.getElementById("image-canvas");
    let context = canvas.getContext("2d");
    let img = new Image();
    img.src = imageUrl;
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        context.drawImage(img, 0, 0);
        loadQuoteUrl();
    };
}

function insertTextIntoCanvas(text) {
    console.log("insertText: " + text);
    let canvas = document.getElementById("image-canvas");
    let context = canvas.getContext("2d");
    let marginLeft = 20;
    let marginTop = 215;
    context.font = "23pt Roboto";
    context.fillStyle = "white";

    wrapText(context, text, marginLeft, marginTop, 600, 35);
}



function wrapText(context, text, marginLeft, marginTop, maxWidth, lineHeight) {
    let words = text.split(" ");
    let countWords = words.length;
    let line = "";
    for (let n = 0; n < countWords; n++) {
        let testLine = line + words[n] + " ";
        let testWidth = context.measureText(testLine).width;
        if (testWidth > maxWidth) {
            context.fillText(line, marginLeft, marginTop);
            line = words[n] + " ";
            marginTop += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, marginLeft, marginTop);
}

function downloadQuote() {
    console.log("downloadQuote");
    let canvas = document.getElementById('image-canvas');
    let data = canvas.toDataURL();

    let quote = document.getElementById('quote');
    quote.style.display="block";
    let req = new XMLHttpRequest();
    
    req.onreadystatechange = function () {
        if (req.readyState == 4 && req.status == 200) {
            quote.innerHTML = req.responseText;
            console.log("downloadQuote: "+req.responseText);
        }
    };
    req.onerror = function () {
        quote.innerHTML = "Ошибка. Ссылка не сделана";
    };

    req.open("POST", "server2.php", true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.send("img=" + data);
}

generateQuote();