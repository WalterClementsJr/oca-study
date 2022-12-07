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
          if (ans.length > 0 && ans[0] === "\'") {
            q.answers[k] = ans.substring(1);
            console.log(q.trainingContent, q.id, k, q.answers[k]);
          }
        }
      }));

      // data.forEach((q) => q.answer = q.answer.replaceAll(/\s/g, ''));

      fs.writeFileSync(fileLocation, JSON.stringify(json));
    } else {
      console.log(err);
    }
  });

});


