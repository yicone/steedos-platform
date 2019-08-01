const rp = require('request-promise');
export async function Login(username, password){
    console.log(username, password)
    var options = {
        uri: 'http://127.0.0.1:5001/api/setup/login',
        json: true,
        method: 'POST',
        body: {
            username: username,
            password: password,
        }
    };
    let result = await rp(options).catch(function(reason){});
    return result;
}