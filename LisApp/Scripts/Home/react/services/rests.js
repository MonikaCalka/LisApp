const getJson = (url, callback) => {
    fetch("http://localhost:2096/" + url, {
        method: 'GET'
    }).then(response => response.json())
        .then(callback);
};

const postJson = (url, data, callback) => {
    fetch("http://localhost:2096/" + url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-type': 'application/json' }
    }).then(response => response.json())
        .then(callback);
};

export { getJson, postJson };