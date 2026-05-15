let saveData;

async function init() {
    saveData = createCookieObject("saveData", {
        "volume": 70,
        "providers": await loadDefaultProviders(),
        "auth": {}
    });
}



function getCookie(name) {
    return document.cookie
        .split("; ")
        .find(row => row.startsWith(name + "="))
        ?.split("=")[1];
}

function setCookie(name, value, options = {}) {
    const settings = {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        ...options
    };

    const json = encodeURIComponent(JSON.stringify(value));

    document.cookie =
        `${name}=${json}; ` +
        `path=${settings.path}; ` +
        `max-age=${settings.maxAge}`;
}

function createCookieObject(name, defaultValue = {}, options = {}) {
    let data;

    const raw = getCookie(name);

    if (raw) {
        try {
            data = JSON.parse(decodeURIComponent(raw));
        } catch {
            data = defaultValue;
        }
    } else {
        data = defaultValue;
        setCookie(name, data, options);
    }

    function save() {
        setCookie(name, data, options);
    }

    function proxify(target) {
        for (const key in target) {
            if (typeof target[key] === "object" && target[key] !== null) {
                target[key] = proxify(target[key]);
            }
        }

        return new Proxy(target, {
            set(obj, prop, value) {
                if (typeof value === "object" && value !== null) {
                    value = proxify(value);
                }

                console.log(`New SaveData: ${prop} - ${value}`);
                
                obj[prop] = value;
                save();
                return true;
            },

            deleteProperty(obj, prop) {
                delete obj[prop];
                save();
                return true;
            }
        });
    }

    return proxify(data);
}