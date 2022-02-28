function clickBtn(cssSel) {
    const btns = document.querySelectorAll(cssSel);

    if (!btns || btns.length < 1) {
        throw `button ${cssSel} not found`;
    }

    btns[0].click();
}