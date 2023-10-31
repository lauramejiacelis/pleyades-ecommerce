import bcrypt from 'bcryptjs'

const users= [
  {
    name: 'Admin',
    lastname: 'User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),//second parameter: salt
    isAdmin: true,
  },
  {
    name: 'Antares',
    lastname: 'Scorpio',
    email: 'antares@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Altair',
    lastname: 'Eagle',
    email: 'altair@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  }
];

export default users;