import bcrypt from 'bcryptjs'

const users= [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),//second parameter: salt
    isAdmin: true,
  },
  {
    name: 'Antares Scorpio',
    email: 'antares@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Altair Eagle',
    email: 'altair@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  }
];

export default users;