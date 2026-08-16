var fs = require('fs');
var path = require('path');
var sharp = require('sharp');

function checkDimensions() {
  var USA_DIR = 'usa';
  var data = require('./usa/js/data.js');

  var results = [];

  for (var stateKey in data.stateData) {
    var info = data.stateData[stateKey];
    for (var i = 0; i < info.media.length; i++) {
      var m = info.media[i];
      if (m.cover) {
        var file = path.resolve('usa', m.cover);
        if (fs.existsSync(file)) {
          try {
            var metadata = sharp(file).metadataSync();
            results.push({
              state: stateKey,
              title: m.title,
              file: m.cover,
              width: metadata.width,
              height: metadata.height,
              format: metadata.format,
              aspectRatio: (metadata.width / metadata.height).toFixed(2)
            });
          } catch (e) {
            results.push({
              state: stateKey,
              title: m.title,
              file: m.cover,
              error: e.message
            });
          }
        }
      }
    }
  }

  results.sort(function(a, b) {
    return a.state.localeCompare(b.state) || a.title.localeCompare(b.title);
  });

  console.log('Estado | Titulo | Largura x Altura | Formato | Proporcao');
  console.log('--- | --- | --- | --- | ---');
  results.forEach(function(r) {
    if (r.error) {
      console.log(r.state + ' | ' + r.title + ' | ERRO: ' + r.error);
    } else {
      console.log(r.state + ' | ' + r.title + ' | ' + r.width + 'x' + r.height + ' | ' + r.format + ' | ' + r.aspectRatio + ':1');
    }
  }

  var valid = results.filter(function(r) { return !r.error; });
  var widths = valid.map(function(r) { return r.width; });
  var heights = valid.map(function(r) { return r.height; });
  console.log('');
  console.log('=== RESUMO ===');
  console.log('Total: ' + valid.length + ' posters');
  console.log('Largura: min=' + Math.min.apply(null, widths) + ', max=' + Math.max.apply(null, widths) + ', media=' + Math.round(widths.reduce(function(a,b){return a+b;},0)/widths.length));
  console.log('Altura: min=' + Math.min.apply(null, heights) + ', max=' + Math.max.apply(null, heights) + ', media=' + Math.round(heights.reduce(function(a,b){return a+b;},0)/heights.length));
}

checkDimensions();