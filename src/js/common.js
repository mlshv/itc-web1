function load() {
    return new Promise(function(resolve, reject) {
        window.onload = resolve;
    });
}

function getQueryParams() {
    var qd = {};
    if (location.search)
        location.search.substr(1).split`&`.forEach(item => {
            let [k, v] = item.split`=`;
            v = v && decodeURIComponent(v);
            (qd[k] = qd[k] || []).push(v);
        });
    return qd;
}

function objectToQueryString(object) {
    return Object.keys(object)
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(object[k])}`)
        .join('&');
}

function fetchJSON(endpoint, params) {
    const paramsString = params ? objectToQueryString(params) : '';
    const paramsQuery = paramsString ? '?' + paramsString : '';
    return fetch('http://localhost:3001/' + endpoint + paramsQuery).then(
        response => response.json()
    );
}
