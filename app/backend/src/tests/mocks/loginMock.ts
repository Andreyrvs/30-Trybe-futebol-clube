
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

interface CreateUserResponse {
  email: string,
  token: string
}
const createUserResponseMock: CreateUserResponse =  {
  email: 'any-email',
  token: 'any-token'
}

const createUserBodyMock ={
  email: 'any',
  password: 'any'
}

export {
  loginWithoutEmail,
  loginWithoutPassword,
  loginWithoutCredentials,
  unauthorizedLogin,
  createUserResponseMock,
  CreateUserResponse,
  createUserBodyMock
}