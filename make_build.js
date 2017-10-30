const fsExtra = require('fs-extra');
const execSync = require('child_process').execSync;


try {
  if (fsExtra.existsSync('dist')) {
    fsExtra.removeSync('dist');
  }
  execSync('node_modules/.bin/tsc');
  fsExtra.copySync('src/views', 'dist/src/views');
  fsExtra.copySync('public', 'dist/public');
} catch (error) {
  console.log(error.stdout.toString('utf8'));
}

