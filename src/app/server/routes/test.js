import glob from 'glob';
import path from 'path';
//../../../../static/images/header/*.jpg
glob('images/header/*.jpg', {cwd: path.join(__dirname,'../../../../static/')}, function (er, files) {
  console.log(er);
  console.log(files);
});