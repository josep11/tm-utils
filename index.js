function clickBtn(cssSel) {
    const btns = document.querySelectorAll(cssSel);

    if (!btns || btns.length < 1) {
        throw `button ${cssSel} not found`;
    }

    btns[0].click();
}


function getElementWithText(text, cssSelector = "*"){
    text = text.toLowerCase();
    const btns = [...document.querySelectorAll(cssSelector)].filter(e => e.innerText.toLowerCase().indexOf(text) != -1);
    if (btns.length != 1) {
        throw new Error(`element with text ${text} was not found (or found multiple times)`);
    }
    return btns[0];
}
