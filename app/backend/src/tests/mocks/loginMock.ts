
const loginWithoutPassword = {
  "email": "any-email",
  "password": ""
}

const loginWithoutEmail = {
  "email": "",
  "password": "any-password"
}


const loginWithoutCredentials = {
  "email": "",
  "password": ""
}

const unauthorizedLogin =  {
  "email": "any-email",
  "password": "any-password"
}

const authorizedLogin =  {
  "email": "any-email",
  "password": "any-password"
}

export {
  loginWithoutEmail,
  loginWithoutPassword,
  loginWithoutCredentials,
  unauthorizedLogin,
  authorizedLogin,
}