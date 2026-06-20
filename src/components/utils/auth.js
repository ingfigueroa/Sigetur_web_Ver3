export const getUser = () => {

/* actualizarsino: true
cliente:"ROMEO ODONTOLOGIA"
clienteid:1056
descripcion:"PROFESIONAL"
roles: "PROFESIONAL"
rolid:8
usuario:"aquariuscabanias@gmail.com"
usuarioid:1057 */
  return JSON.parse(localStorage.getItem("user"));
};

export const getClienteId = () => {
  return getUser()?.clienteid;
};

export const getUsuarioId = () => {
  return getUser()?.usuarioid;
};

export const getUsuarioEmail = () => {
  return getUser()?.usuario;
};

export const getRazonSocial = () => {
  return getUser()?.cliente;
};

