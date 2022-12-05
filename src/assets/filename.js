const fs = require('fs');

const changeName = function (name) {
  name = name.replaceAll(/[-&,<>:"\/\\|?*]+/g, "");
  name = name.replaceAll(/[\s]+/g, "_");

  return name;
};

let files = [];

fs.readdirSync('./exams/').forEach((file) => {
  files.push('exams/' +file);
});
fs.readdirSync('./lessons/').forEach((file) => {
  files.push('lessons/'+file);
});

console.log(files);

