const HOST = '52.215.151.195';
const HOST_ = 'localhost:3000';
const TIMEOUT = 1000;

const copyCookie = () => {
    chrome?.tabs ?
        chrome.tabs.query(
            {
                status: 'complete',
                windowId: chrome.windows.WINDOW_ID_CURRENT,
                active: true,
            },
            tab => {
                const url = Array.isArray(tab) && tab.length ? new URL(tab[0].url).host : '';
                if (url === HOST) {
                    chrome.cookies.getAll({ url: tab[0].url }, cookie => {
                        localStorage.copyCookieData = JSON.stringify(cookie);
                        setTimeout(() => sendCookie(), 300);
                    });
                } else {
                    chrome.tabs.update(tab.id, { url: `http://${HOST}/login` });
                    setTimeout(() => {
                        const container = document.getElementById('container');
                        const loader = document.getElementById('loader');
                        container.setAttribute('style', 'display: flex');
                        loader.setAttribute('style', 'display: none');
                    }, TIMEOUT);
                }
            },
        ) : 0;
};

const checkCookie = () => {
    let JSESSIONID = '';
    let copyCookieData = localStorage.copyCookieData
        ? JSON.parse(localStorage.copyCookieData)
        : null;
    if (copyCookieData && Array.isArray(copyCookieData) && Object.hasOwn(copyCookieData[0], 'value')) {
        JSESSIONID = copyCookieData[0].value;
    }
    return JSESSIONID;
};

const sendCookie = () => {
    try {
        const JSESSIONID = checkCookie();
        if (JSESSIONID) {
            chrome.tabs.create({ 'url': `http://${HOST_}?JSESSIONID=${JSESSIONID}` }, function (tab) {
            });
        }
        // TODO
    } catch (e) {
        return alert('Error parsing cookies. Please try again.');
    }
};

async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

window.addEventListener('load', function () {
    copyCookie();
    document
        .getElementById('login')
        .addEventListener('click', copyCookie);
});

// chrome.runtime.sendMessage({ type: 'login', options: {} }, function (response) {
//     chrome.cookies.getAll({ url: response.url }, cookie => {
//         localStorage.copyCookieData = JSON.stringify(cookie);
//         setTimeout(() => sendCookie(), 100);
//     });
// });
// });