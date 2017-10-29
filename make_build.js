const fsExtra = require('fs-extra');
const execSync = require('child_process').execSync;


try {
  if (fsExtra.existsSync('dist')) {
    fsExtra.removeSync('dist');
  }
  execSync('node_modules/.bin/tsc');
  execSync('')
  fsExtra.copySync('src/views', 'dist/src/views');
  fsExtra.copySync('public', 'dist/public');
  fsExtra.mkdir('dist/uploads');
} catch (error) {
  console.log(error);
}

