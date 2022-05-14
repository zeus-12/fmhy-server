var fs = require('fs');
let num = 0;
fs.readdir('./json', (err, files) => {
  files.forEach((fileName) => {
    if (fileName == '.DS_Store') return;
    let rawdata = fs.readFileSync('./json/' + fileName);
    const result = JSON.parse(rawdata);
    let resources = [];
    result.messages.map((item) => {
      let resource = item.content;
      let title = resource.split('**')[1];
      let link = resource
        .split('*')
        .slice(-1)[0]
        .replaceAll('\n', '')
        .replaceAll('None', '')
        .trim()
        .replaceAll('+', ',');

      //   if (link.slice(0, 1) == '/n') link = link.slice(1);
      let description = resource.split('*').slice(-2, -1)[0];
      // .replaceAll('&amp', '&');
      if (!link || !title) return;
      resources.push({title, link, description, type: result.channel.name});
      fs.appendFileSync('./links.txt', link + '\n');
    });
    // console.log(resources);
  });
});
// let rawdata = fs.readFileSync('./data.json');
// // console.log(rawdata);
// const result = JSON.parse(rawdata);
// // console.log(result);
// let resources = [];

// result.messages.map((item) => {
//   let resource = item.content;
//   let title = resource.split('**')[1];
//   let link = resource.split('*').slice(-1)[0].trim();
//   if (link.slice(0, 1) == '/n') link = link.slice(1);

//   let description = resource.split('*').slice(-2, -1)[0];
//   if (!link || !title) return;
//   resources.push({title, link, description, type: result.channel.name});
// });
// console.log(resources);

//add resources to db
