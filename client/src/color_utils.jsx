var tinycolor = require("tinycolor2");

function colorPicker(type){
    switch(type) {
        case 'Normal': return "#F64C72"
        case 'Fire': return "#fc4a1a"
        case 'Water': return "#007cc7"
        case 'Grass': return "#afd275"
        case 'Electric': return "#ffdf6c"
        case 'Psychic': return "#4717f6"
        case 'Ice': return "#eefbfb"
        case 'Dark': return "#0e0b16"
        case 'Fairy': return "#d83f87"
        case 'Fighting': return "#ffc000"
        case 'Flying': return "#84ceeb"
        case 'Poison': return "#0c0032"
        case 'Ground': return "#d79922"
        case 'Rock': return "#6f2232"
        case 'Bug': return "#3aafa9"
        case 'Ghost': return "#4e4e50"
        case 'Steel': return "#a4b3b6"
        default : return "#ffffff"
    }
}

function colorPickerDarker(type) {
   return tinycolor(colorPicker(type)).darken(5).toString()
}

function getContrastColor(hex){
	var r = parseInt(hex.substr(1,2),16);
	var g = parseInt(hex.substr(3,2),16);
	var b = parseInt(hex.substr(5,2),16);
	var clr = ((r*299)+(g*587)+(b*114))/1000;
	return (clr >= 128) ? 'black' : 'white';
}

function getContrastType(type){
  let hex = colorPicker(type);
	return getContrastColor(hex);
}


function hex_to_RGB(hex) {
    var m = hex.match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
    return {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16)
    };
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

// this function takes an array of 3 RGB integer values and converts this array into a CSS color, like this: #AAAAA
function rgb_to_hex(rgb) {
  return "#" + componentToHex(rgb.r) + componentToHex(rgb.g) + componentToHex(rgb.b);
}



function colorMixer(types,moves) {
    const type_clrs = types.map((val) => hex_to_RGB(colorPicker(val)))
    const move_clrs = moves.map((val) => hex_to_RGB(colorPicker(val)))

    const type_tmp = type_clrs.reduce((acc,clr) => {
      acc['r'] = acc['r'] + clr.r || clr.r;
      acc['g'] = acc['g'] + clr.g || clr.g;
      acc['b'] = acc['b'] + clr.b || clr.b;
      return acc;
    },{});
    let type_clr = Object.fromEntries(Object.entries(type_tmp).map(([k, v]) => [k, Math.floor(v/type_clrs.length)]));

    const move_tmp = move_clrs.reduce((acc,clr) => {
      acc['r'] = acc['r'] + clr.r || clr.r;
      acc['g'] = acc['g'] + clr.g || clr.g;
      acc['b'] = acc['b'] + clr.b || clr.b;
      return acc;
    },{});
    let move_clr = Object.fromEntries(Object.entries(move_tmp).map(([k, v]) => [k, Math.floor(v/move_clrs.length)]));

    // console.log(type_clr)
    // console.log(move_clr)

    let clr={}
    for (let val in type_clr) {
      clr[val] = Math.floor(type_clr[val]*0.8 + move_clr[val]*0.2);
    };
    return tinycolor(rgb_to_hex(clr)).brighten(20).toString();

}

export { colorPicker, colorMixer, colorPickerDarker, getContrastColor, getContrastType };



