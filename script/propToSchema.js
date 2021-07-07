const fs = require('fs');
const glob = require('glob');
const path = require('path');
const propToSchema = require('proptypes-to-json-schema');

glob(path.resolve(__dirname, '../src/*/index.jsx'), {}, (err, files) => {
  console.log('files', __dirname, err, files);
  if (!err && files.length > 0) {
    files.forEach((file) => {
      const apiInfo = propToSchema(file);
      fs.writeFileSync(
        path.resolve(file, '../schema.json'),
        JSON.stringify(apiInfo, null, 2),
      );
    });
  }
});

// 参数为目标文件地址
// const apiInfo = propToSchema(`${__dirname}/index.jsx`);
// fs.writeFileSync(
//   path.join(__dirname, 'schema.json'),
//   JSON.stringify(apiInfo, null, 2)
// );
