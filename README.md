## Calendar - Resolution Tracker

### React, Semantic UI, Express, MongoDB, date-nfs

**npm install**

**npm run dev** --> this is to run both React Client and Express Server (refer package.json).

### Note:

Some of work is incomplete. Calendar is generated based on 35 days per each screen. Tracking is also based on the days on the screen, not based on the month.

**config/dev.js** is not in the repo. "dev.js" is to store MongDB URL. You need to create your own **dev.js** and specify your own mongodb path.

**"dev.js"** format should look like following:

```javascript
module.exports = {
  mongoURI: 'mongodb://your_username:Your_password@your_own_url_here'
};
```

**Seeding DB** seeding to DB is not necessary. Calendar format is self-rendered. DB stores only tracking info. Document is create for days with tracking info.

### For Heroku Deployment

In **package.json**

```javascript
  "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
```

In **index.js** , this tells Express server the location of client's build packages(HTML,CSS,JS). "app.get" is the next layer of protection in case for any failures from "app.use(...)".

```javascript
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
```

### For Development : Proxy between Server and Client

In development, React server uses Port 3000 and Express uses Port 5000. We need a proxy setting in Client side. Basically, we need to tell the client that the client must send out API to Port 5000 (otherwise, client just uses the same port number for the server bound traffic) We need the following to allow the client to use proxy to reach out the server at PORT 5000. "proxy setting" in "package.json" won't work any loner with new CRA2.0 (CreateReactAPP). The following middleware setup tells CRA to use the given proxy configuration. No other action needed but drop the following code in the given path and filename as below. CRA20 will just pick it up to use it as Client side proxy setting.

React(client) : 3000 ---> Proxy (use 5000) ---> Express(Server) : 5000

Note that you don't need Proxy for the opposite diretion as Express sees React (Client) as public side.

In **client/src/setupProxy.js**

```javascript
const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/api/*', { target: 'http://localhost:5000' }));
  /* you may have more lines of app.use for additional proxy setting */
};
```

**Screenshot**
![alt text](misc/screenshot.png 'screenshot')

By C. Ahn
