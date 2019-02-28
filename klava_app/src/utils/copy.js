let copy = (obj, howAdd) => howAdd ?
  Object.assign(JSON.parse(JSON.stringify(obj)), howAdd) :
  JSON.parse(JSON.stringify(obj))

export default copy
