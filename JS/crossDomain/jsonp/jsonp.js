function jsonp({ url, params = {}, cb }) {
    return new Promise((resolve, reject) => {
        try {
            let scriptDom = document.createElement("script");
            let callBack = function (data) {
                resolve(data);
                document.body.removeChild(scriptDom);
                delete window[cb];
            }
            let arr = [];
            let paramsObj = { ...params, cb };
            for (let key in paramsObj) {
                arr.push(`${key}=${paramsObj[key]}`);
            }
            window[cb] = callBack;
            scriptDom.src = `${url}?${arr.join('&')}`;
            document.body.appendChild(scriptDom);
        } catch (e) {
            reject(e)
        }
    });
}
if (typeof module !== "undefined") {
    module.exports = {
        jsonp
    }
}
