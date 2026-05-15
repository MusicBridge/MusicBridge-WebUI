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
                <a class="account ${state}" onclick="thinkAboutAuth('${state}', '${key}', '${value}')" href="#"><img
                        src="${(await fetchFromProvider("", false, key))[0].logo}" alt=""
                        title="${key}"></a>
            </li>`
    }
}

async function thinkAboutAuth(state, key, value) {
    state === "account-inactive" ? openAuth(key.toString(), value.toString()) : (await removeAuth(key.toString()))
}

async function removeAuth(provider) {
    saveData.auth[provider] = undefined;
    await loadProviders()
}

function openAuth(provider, url) {
    const popup = window.open(
        url + MBAuth,
        provider,
        "width=500,height=700"
    );
    const listener = async (event) => {
        if (event.data.task === "tokenAuth" && event.data.provider === provider) {
            saveData.auth[provider] = event.data.token;

            popup.close();

            window.removeEventListener("message", listener);

            await loadProviders();
        }
    };

    window.addEventListener("message", listener);
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
            
            let data;
            if (needBlob){
                data = await response.blob();
            } else {
                data = await response.json();
            }

            console.log(data);
            results.push(data);
            responses.push(response);
        }
        catch (error) {
            // Shut up
        }
        finally {
            removeTask(prov);
        }
    }

    return provider !== undefined
        ? [results[0], responses[0]]
        : [results, responses];
}