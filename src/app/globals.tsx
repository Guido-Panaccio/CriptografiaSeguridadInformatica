
const codigosAutenticacion = new Map<string,string>();

function setCodigoAutenticacion(key:string, value:string) {
  codigosAutenticacion.set(key, value);
}

function getCodigoAutenticacion(key:string) {
  return codigosAutenticacion.get(key);
}

module.exports = {
    setCodigoAutenticacion,
  getCodigoAutenticacion
};