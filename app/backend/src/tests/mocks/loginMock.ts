
const loginWithoutPassword = {
  "email": "admin@admin.com",
  "password": ""
}

const loginWithoutEmail = {
  "email": "",
  "password": "secret_admin"
}


const loginWithoutCredentials = {
  "email": "",
  "password": ""
}

const unauthorizedLogin =  {
  "email": "admin@admin.com",
  "password": "secret_4dmin"
}

export {
  loginWithoutEmail,
  loginWithoutPassword,
  loginWithoutCredentials,
  unauthorizedLogin,
}