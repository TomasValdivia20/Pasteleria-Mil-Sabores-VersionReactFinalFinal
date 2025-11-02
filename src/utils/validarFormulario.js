// src/utils/validarFormulario.js

export const validarFormulario = (formData) => {
  const errores = {};

  if (!formData.rut || !/^[0-9]{7,8}-[0-9Kk]$/.test(formData.rut)) {
    errores.rut = "El RUT no es válido. Ej: 12345678-9";
  }

  if (!formData.nombre.trim()) errores.nombre = "El nombre es obligatorio";
  if (!formData.apellido.trim()) errores.apellido = "El apellido es obligatorio";

  if (!formData.correo || !/\S+@\S+\.\S+/.test(formData.correo)) {
  errores.correo = "Correo inválido";
}

  if (!formData.region.trim()) errores.region = "Debe ingresar una región";
  if (!formData.direccion.trim()) errores.direccion = "Debe ingresar una dirección";

  if (!formData.contrasena || formData.contrasena.length < 6) {
    errores.contrasena = "La contraseña debe tener al menos 6 caracteres";
  }

  return errores;
};
