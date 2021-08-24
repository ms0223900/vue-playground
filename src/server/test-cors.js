/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch');

const CORS_HOST = 'http://localhost:8080';

fetch(`${CORS_HOST}/${'https://citybus.taichung.gov.tw/cms/api/route-group'}`)
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((res) => console.log(res));
