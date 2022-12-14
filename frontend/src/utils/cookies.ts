
export const setCookie = (name: string, value: string, options: Record<string, unknown> = {}) => {
    options = {
        path: '/',
        ...options
    };

    if (options.expires === undefined) {
        // max date that can be represented in 32-bit unix time
        options.expires = new Date(2147483647000);
    }

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += '; ' + optionKey;

        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += '=' + optionValue;
        }
    }

    document.cookie = updatedCookie;
};

export const deleteCookie = (name: string) => setCookie(name, '', { 'max-age': -1 });
