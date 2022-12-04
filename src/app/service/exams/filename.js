const fs = require('fs');

const changeName = function (name) {
  name = name.replaceAll(/[-&,<>:"\/\\|?*]+/g, "");
  name = name.replaceAll(/[\s]+/g, "_");

  return name;
};

fs.readdirSync('./').forEach((files) => {
  // console.log(changeName(files))
  fs.rename('./' + files, './' + changeName(files), function (err) {
    if (err) console.log('ERROR: ' + err);
  });
});
fs.readdirSync('../lessons').forEach((files) => {
  // console.log(changeName(files))
  fs.rename('../lessons/' + files, '../lessons/' + changeName(files), function (err) {
    if (err) console.log('ERROR: ' + err);
  });
});
