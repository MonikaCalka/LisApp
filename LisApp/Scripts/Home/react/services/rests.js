import i18n from '../i18n';

const getJson = (url, callback) => {
    fetch("http://localhost:2096/" + url, {
        method: 'GET',
        headers: {
            'Lang': i18n.language
        }
    }).then(response => response.json())
        .then(callback);
};

const postJson = (url, data, callback) => {
    fetch("http://localhost:2096/" + url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json',
            'Lang': i18n.language
        }
    }).then(response => response.json())
        .then(callback);
};

const getDic = (type, callback) => {
    switch (type) {
        case 'position':
            getJson("Dictionary/GetPositionDic", callback);
            break;
        case 'ward':
            getJson("Dictionary/GetWardDic", callback);
            break;
        case 'priority':
            getJson("Dictionary/GetPriorityDic", callback);
            break;
        case 'status':
            getJson("Dictionary/GetStatusDic", callback);
            break;
    }
};

export { getJson, postJson, getDic };