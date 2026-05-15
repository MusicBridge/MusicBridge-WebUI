// noinspection JSUnresolvedReference

let providers = {};

function loadDefaultProviders() {
    return fetch("/default.json")
        .then(response => response.json())
        .then(data => data.providers)
        .catch(error => {
            console.error(error);
            return {};
        });
}

async function loadProviders() {
    accountsList.innerHTML = "";
    for (const [key, value] of Object.entries(saveData.providers)) {
        providers[key] = value;

        let state = "";
        if (!saveData.auth[key]) {
            state = "account-inactive";
        } else {
            const data = await fetchFromProvider(MBVersion, false, key);

            if (data?.[0]?.premium) {
                state = "account-premium";
            } else {
                state = "account-active";
            }
        }
        
        accountsList.innerHTML += `<li>
                <a class="account ${state}" href="#"><img
                        src="${(await fetchFromProvider("", false, key))[0].logo}" alt=""
                        title="${key}"></a>
            </li>`
    }
}

async function fetchFromProvider(url, needBlob, provider) {
    const selectedProviders =
        provider !== undefined
            ? {[provider]: providers[provider]}
            : providers;

    const results = [];
    const responses = [];

    for (const prov in selectedProviders) {
        addTask(prov);
    }

    for (const prov in selectedProviders) {
        try {
            const response = await fetch(providers[prov] + url, {
                method: 'GET',
                headers: {
                    "Authorization": saveData.auth[prov],
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            let data;
            if (needBlob){
                data = await response.blob();
            } else {
                data = await response.json();
            }

            results.push(data);
            responses.push(response);
        } finally {
            removeTask(prov);
        }
    }

    return provider !== undefined
        ? [results[0], responses[0]]
        : [results, responses];
}