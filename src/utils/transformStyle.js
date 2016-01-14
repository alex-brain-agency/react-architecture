/*
  This function takes a description of the transforms and returns a
  prefixed version suitable for use in a react style prop.
*/
export default function transformStyle(params){
  var {translate, rotate, skew} = params;

  var parts = [];

  var is3d = params.is3d
    || (translate && 'z' in translate)
    || (rotate && 'z' in rotate)
    || (skew && 'z' in skew);

  const makeStr = (name, x=0, y=0, z=0) => {
    var str = `${name}${is3d ? '3d' : ''}(`;
    str += `${x}, ${y}`;
    if (is3d) {
      str += `, ${z}`;
    }
    str += ')';
    return str;
  };

  if (translate) {
    parts.push(makeStr('translate', translate.x, translate.y, translate.z));
  }

  if (rotate) {
    const makeRotation = (n) => n != null ? n + 'deg' : '0';
    parts.push(makeStr('rotate',
      makeRotation(rotate.x),
      makeRotation(rotate.y),
      makeRotation(rotate.z)
    ));
  }

  var str = parts.join(' ');

  return {
    transform: str,
    WebkitTransform: str,
    MozTransform: str,
    MSTransform: str,
    OTransform: str,
  };
}
