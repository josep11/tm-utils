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

/**
 * @param {number} min
 * @param {number} max
 */
function getRandBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Function to select an element by its data-testid attribute
const selectElementByTestId = (/** @type {string} */ testId) => {
    const selector = `[data-testid="${testId}"]`;
    return document.querySelector(selector);
};

// --------------------------------------------------------
// -------------- BEGIN NOTIFICATION SECTION --------------
// --------------------------------------------------------
function createNotificationSystem() {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        background-color: #4CAF50;
        color: white;
        border-radius: 4px;
        font-size: 14px;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(notification);
    return notification;
}

// Funció per mostrar la notificació

/**
 * @param {string} message
 */
function showNotification(message, duration = 3000) {
    const notification = document.querySelector('.jas-notification-xyz') || (() => {
        const notif = createNotificationSystem();
        notif.classList.add('jas-notification-xyz');
        return notif;
    })();

    notification.textContent = message;
    notification.style.opacity = '1';

    setTimeout(() => {
        notification.style.opacity = '0';
    }, duration);
}

// --------------------------------------------------------
// -------------- END NOTIFICATION SECTION --------------
// --------------------------------------------------------

/**
 * @param {string} buttonText
 */
function createButton(buttonText) {
    const button = document.createElement('button');
    button.innerHTML = buttonText;
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        background-color: #0066cc;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        z-index: 9999;
    `;
    return button;
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showNotification('Text copiat amb èxit!');
    } catch (err) {
        console.error('Error al copiar:', err);
        showNotification('No s\'ha pogut copiar el text');
    }
}

function triggerFocus(element) {
    let eventType = "onfocusin" in element ? "focusin" : "focus";
    let bubbles = "onfocusin" in element;
    let event;

    if ("createEvent" in document) {
        event = document.createEvent("Event");
        event.initEvent(eventType, bubbles, true);
    }
    else if ("Event" in window) {
        event = new Event(eventType, { bubbles: bubbles, cancelable: true });
    }

    element.focus();
    element.dispatchEvent(event);
}

function focusOnElement(selector) {
    const el = document.querySelector(selector);

    if (!el) {
        console.error("element to focus not found");
        return;
    }

    triggerFocus(el);
}