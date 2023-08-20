const arrayName  = ['_0x5b5ad9']
let code = [];
let keywords = ['_0x5b5ad9']; 

for (var i=0; i<keywords.length; i++) {
  if (keywords[i].match(/^[a-zA-Z][a-zA-Z0-9_]*$/)) { // Could be a standalone variable
     // Replace any instances the string is used in an array accessor ['x'] with a dot .x
     code = code.replace(new RegExp('\\['+arrayName+'\\['+i+'\\]\\]','g'),'.'+keywords[i]);
  }
  // Insert as strings throughout code, escaping anything necessary
  code = code.replace(new RegExp(arrayName+'\\['+i+'\\]','g'),'\''+
     keywords[i].replace(/\\/g,'\\\\').replace(/\r/g,'\\r').replace(/\n/g,'\\n').replace(/'/g,'\\\'')+
  '\'');
} console.log(code);