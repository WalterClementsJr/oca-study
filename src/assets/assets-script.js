const fs = require('fs');

const changeName = function (name) {
  name = name.replaceAll(/[-&,<>:"\/\\|?*]+/g, "");
  name = name.replaceAll(/\s+/g, "_");

  return name;
};

function writeFile(fileName, jsonData) {
  fs.writeFileSync(fileName, JSON.stringify(jsonData));
}

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
      json.forEach((q => {
        let answer = q.answers;

        for (let k of Object.keys(q.answers)) {
          let ans = answer[k];
          q.answers[k] = ans.trim();
        }
      }));

      fs.writeFileSync(fileLocation, JSON.stringify(json));
      data = data.replaceAll(/com.udayankhattry.oca/g, "com.github.oca");
      data = data.replaceAll(/com\.udayan/g, "com.github");

      // console.log(data);
      fs.writeFileSync(fileLocation, data);
    } else {
      console.log(err);
    }
  });
});


