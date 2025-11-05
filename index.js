/**
 * @param {string} selector
 */
function clickBtn(selector) {
    const btns = document.querySelectorAll(selector);

    if (!btns || btns.length < 1) {
        throw `button ${selector} not found`;
    }

    btns[0].click();
}

/**
 * @param {string} text
 */
function getElementWithText(text, cssSelector = "*") {
    text = text.toLowerCase();
    const btns = [...document.querySelectorAll(cssSelector)].filter(e => e.innerText.toLowerCase().indexOf(text) != -1);
    if (btns.length != 1) {
        throw new Error(`element with text ${text} was not found (or found multiple times)`);
    }
    return btns[0];
}

/**
 * @param {string} selector
 */
function clickElement(selector, errorMsg = null) {
    const element = document.querySelector(selector);

    if (!element) {
        console.error(errorMsg || 'Element not found');
        return false;
    }

    element.click();

    return true;
}

/**
 * @param {string} dropdownSelector
 * @param {string} value
 */
function setDropdownValue(dropdownSelector, value) {
    const dropdown = document.querySelector(dropdownSelector);

    // Set the value
    dropdown.value = value;

    // Dispatch change event
    const changeEvent = new Event('change', {
        bubbles: true,
        cancelable: true
    });
    dropdown.dispatchEvent(changeEvent);

    // Dispatch input event (for real-time form validation)
    const inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true
    });
    dropdown.dispatchEvent(inputEvent);

    // Optional: Focus and blur to simulate user interaction
    dropdown.focus();
    setTimeout(() => dropdown.blur(), 100);
}

/**
 * @param {string} selector
 */
function isElementVisible(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const style = window.getComputedStyle(element);
        return style && style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    }
    return false;
}