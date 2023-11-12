import yup from 'yup'

const registerSchema = yup.object({
  name: yup.string()
    .min(3)
    .max(30)
    .required(),
  lastname: yup.string()
    .min(3)
    .max(30)
    .required(),
  email: yup.string().email().required(),
  password: yup.string().matches('^[a-zA-Z0-9]{6,30}$').required()
});

export default registerSchema;