const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const fs = require('fs');
const http = require('http');
let data;
module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    disableHostCheck: true,
    contentBase: path.join(__dirname, "public/"),
    port: 3001,
    publicPath: "http://localhost:3001/",
    hotOnly: true,
    before: function(app, server, compiler) {
      app.get('/ajax/routes', function (req, res) {
        data = data || JSON.parse(fs.readFileSync('./data.json').toString());
        res.send(data.routes);
      });
    }
  },
});