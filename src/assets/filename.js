const fs = require('fs');

const changeName = function (name) {
  name = name.replaceAll(/[-&,<>:"\/\\|?*]+/g, "");
  name = name.replaceAll(/[\s]+/g, "_");

  return name;
};

let files = [];

fs.readdirSync('./exams/').forEach((file) => {
  files.push({type: 'exams', name: file});
});
fs.readdirSync('./lessons/').forEach((file) => {
  files.push({type: 'lessons', name: file});
});

console.log(files);

fs.writeFileSync('./trainingContent.json', JSON.stringify(files));

