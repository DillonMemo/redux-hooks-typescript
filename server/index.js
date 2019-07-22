const express = require('express');
const next = require('next');
const axios = require('axios');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();

const PORT = 3000;

const { aboutPageRoute } = require('./routes/about');

app.prepare()
.then(() => {
    const server = express();

    // server.get('/board/:title', (req, res) => {
    //     const page = '/boardView';
    //     const params = {title: req.params.title}
    //     console.log("url : ", req.url, "params : " , req.params);
    //     app.render(req, res, page, params)
    // })

    //server.use('/api/about', aboutRouter);
    server.get('/about', (req, res) => {
        console.log("about server");
        aboutPageRoute(app, req, res);
        //app.render(req, res, '/about');
    });

    server.get('*', (req, res) => {
        return handle(req,res);
    });

    server.listen(PORT, (err) => {
        if(err) throw err;
        console.log(`> Ready on Server Port: ${PORT}`);
    })
}).catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
})