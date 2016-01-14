import api, {setToken} from '../api';
import Joi from 'joi';
import UserActions from '@utils/actions/UserActions';

export const schema = {
  username: Joi.string().alphanum().min(3).max(30).required(),
  firstName: Joi.string().min(2).max(30).required(),
  lastName: Joi.string().min(2).max(30).required(),
  password: Joi.string().regex(/[ -~]{6,30}/),
  birthdate: Joi.string().regex(/\d+\/\d+\/\d+/),
  emailAddress: Joi.string().email(),
  gender: Joi.string(),
  bio: Joi.string().max(240),
};

export const validate = (data) => Joi.validate(data, schema, {abortEarly: false});

export async function getMyProfile(){
  var res = await api.get('user/current');
  if (res.ok) {
    UserActions.receivedProfile(res.body);
    return res.body;
  }
  else throw res.body;
}

export async function createUser(params){
  var data = {
    email: params.emailAddress,
    birthDate: params.birthdate,

    password: params.password,
    firstName: params.firstName,
    lastName: params.lastName,
    gender: params.gender,
  };

  var res = await api
    .post('user')
    .send(data);

  if (!res.ok) {
    throw res.body || res.text;
  }

  await loginWithEmail({email: data.email, password: data.password});
  return await updateUser(params);
}

export async function updateUser(params){
  var data = {
    local: {
      password: params.password,
      email: params.emailAddress,
    },
    birthDate: params.birthdate,
    firstName: params.firstName,
    lastName: params.lastName,
    gender: params.gender,
    profileComplete: true,
  };

  var res = await api
    .put('user/current')
    .send(params);

  if (!res.ok) throw res.body || res.text;

  return res.body;
}

export async function loginWithEmail({email, password}){
  var res = await api
    .post('auth')
    .send({email, password})

  if (!res.ok) {
    throw res.body || res.text;
  }

  var token = res.body.token;
  setToken(token);

  return token;
}
