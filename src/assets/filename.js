const fs = require('fs');

const changeName = function (name) {
  name = name.replaceAll(/[-&,<>:"\/\\|?*]+/g, "");
  name = name.replaceAll(/[\s]+/g, "_");

  return name;
};

let files = [];

fs.readdirSync('./exams/').forEach((file) => {
  files.push({type: 'exams', name: file.split('.')[0]});
});
fs.readdirSync('./lessons/').forEach((file) => {
  files.push({type: 'lessons', name: file.split('.')[0]});
});

files.forEach((fileData) => {
  let fileLocation = `./${fileData.type}/${fileData.name}.json`;

  fs.readFile(fileLocation, {encoding: 'utf-8'}, function (err, data) {
    if (!err) {
      let json = JSON.parse(data);
      let mul = json.filter((q => {
        return q.type.includes('Multiple');
      }));
      mul.forEach((q) => q.answer = q.answer.replaceAll(/\s/g, ''));

      // console.log(`content ${json[0].trainingContent} has ${mul.length} multiple`);

      fs.writeFileSync(fileLocation, JSON.stringify(json));
    } else {
      console.log(err);
    }
  });

});
// console.log(files);

// fs.writeFileSync('./trainingContent.json', JSON.stringify(files));

