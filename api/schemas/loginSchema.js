import yup from 'yup'

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().matches('^[a-zA-Z0-9]{6,30}$').required()
});

export default loginSchema