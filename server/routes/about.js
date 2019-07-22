
const axios = require('axios');
const {URLSearchParams} = require('url');

function getAboutFromAPI() {
    const formData = new URLSearchParams();
    formData.append('content', 'server 연결 성공');

    return axios({
        method: 'post',
        url: 'http://192.168.0.4:8008/api/demo.php',
        data: formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
}

function aboutPageRoute(app, req, res){
    getAboutFromAPI()
    .then(response => {
        res.locals.abouts = response.data;
        console.log("aboutPageRoute :", res.locals.abouts);
        app.render(req, res, '/about');
    }).catch(e => {
        console.log("aboutPageRoute Err: ", e)
    });
}
module.exports = {
    aboutPageRoute: aboutPageRoute
}