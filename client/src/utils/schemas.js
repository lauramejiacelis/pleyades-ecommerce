import * as Yup from 'yup';

const isRequiredMessage = 'Este campo es requerido';
const tooShort = 'Muy corto!';
const tooLong = 'Muy largo!';

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, tooShort)
    .max(20, tooLong)
    .required(isRequiredMessage),
  lastname: Yup.string()
    .min(2, tooShort)
    .max(20, tooLong)
    .required(isRequiredMessage),
  email: Yup.string()
    .email('Debe ser un email válido')
    .required(isRequiredMessage),
  password: Yup.string()
    .min(6, tooShort)
    .max(20, tooLong)
    .required(isRequiredMessage),
  confirmPassword: Yup.string()
  .required(isRequiredMessage)
  .oneOf([Yup.ref('password')], "Las contraseñas no coinciden"),
});

export const loginSchema = Yup.object({
  email: Yup.string()
    .email()
    .required(isRequiredMessage),
  password: Yup.string()
    .matches('^[a-zA-Z0-9]{6,30}$')
    .min(6, tooShort)
    .max(20, tooLong)
    .required(isRequiredMessage),
});
