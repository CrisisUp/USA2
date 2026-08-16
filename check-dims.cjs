const fs = require('fs');
const path = require('path');

function readPng(file) {
  const buf = fs.readFileSync(file);
  if (buf[0]!==0x89||buf[1]!==0x50||buf[2]!==0x4E||buf[3]!==0x47) return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

function readJpeg(file) {
  const buf = fs.readFileSync(file);
  if (buf[0]!==0xFF||buf[1]!==0xD8) return null;
  let o=2;
  while(o<buf.length){
    if(buf[o]!==0xFF)break;
    const m=buf[o+1];
    if(m>=0xC0&&m<=0xCF&&m!==0xC4&&m!==0xC8&&m!==0xCC){
      return {w:buf.readUInt16BE(o+7),h:buf.readUInt16BE(o+5)};
    }
    o+=2+buf.readUInt16BE(o+2);
  }
  return null;
}

function readSvg(file){
  const c=fs.readFileSync(file,'utf8');
  let m=c.match(/width\s*=\s*["'](\d+)/);
  let n=c.match(/height\s*=\s*["'](\d+)/);
  if(m&&n)return{w:+m[1],h:+n[1]};
  const v=c.match(/viewBox\s*=\s*["']\d+\s+\d+\s+(\d+)\s+(\d+)/);
  if(v)return{w:+v[1],h:+v[2]};
  return null;
}

const data=require('./usa/js/data.js');
for(const s in data.stateData){
  for(const m of data.stateData[s].media){
    if(!m.cover)continue;
    const f=require('path').resolve('usa',m.cover);
    if(!require('fs').existsSync(f))continue;
    const e=require('path').extname(f).toLowerCase();
    let d=null;
    if(e==='.png'){
      const b=require('fs').readFileSync(f);
      if(b[0]===0x89&&b[1]===0x50&&b[2]===0x4E&&b[3]===0x47){
        console.log(s+' | '+m.title+' | '+b.readUInt32BE(16)+'x'+b.readUInt32BE(20)+' | png | '+(b.readUInt32BE(16)/b.readUInt32BE(20)).toFixed(2)+':1');
      }
    }else if(f.endsWith('.jpg')||f.endsWith('.jpeg')){
      const buf=require('fs').readFileSync(f);
      if(buf[0]===0xFF&&buf[1]===0xD8){
        let o=2;
        while(o<buf.length){
          if(buf[o]!==0xFF)break;
          const m=buf[o+1];
          if(m>=0xC0&&m<=0xCF&&m!==0xC4&&m!==0xC8&&m!==0xCC){
            console.log(s+' | '+m.title+' | '+buf.readUInt16BE(o+7)+'x'+buf.readUInt16BE(o+5)+' | jpeg | '+(buf.readUInt16BE(o+7)/buf.readUInt16BE(o+5)).toFixed(2)+':1');
            break;
          }
          o+=2+buf.readUInt16BE(o+2);
        }
      }else if(f.endsWith('.svg')){
        const c=require('fs').readFileSync(f,'utf8');
        const m=c.match(/width\s*=\s*["'](\d+)/);
        const n=c.match(/height\s*=\s*["'](\d+)/);
        if(m&&n){
          console.log(s+' | '+m.title+' | '+m[1]+'x'+n[1]+' | svg | '+(m[1]/n[1]).toFixed(2)+':1');
        }
      }
    }
  }
}