const getJson = (url, callback) => {
    fetch("http://localhost:2096/" + url, {
        method: 'GET'
    }).then(response => response.json())
        .then(callback);
};

const postJson = (url, callback) => {
    fetch("http://localhost:2096/" + url, {
        method: 'POST'
    }).then(response => response.json())
        .then(callback);
};

export { getJson, postJson };