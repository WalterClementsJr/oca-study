const fs = require('fs');

const path = "./docs/index.html";
const html = fs.readFileSync(path, {encoding: 'utf-8'});
const valid = html.replaceAll(/type="module"/g, "type=\"text/javascript\"");

fs.writeFileSync(path, valid);
