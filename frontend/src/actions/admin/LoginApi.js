import { callToServer } from '../../apiClients/Axios';

export default {
  login: async (data) => await callToServer('post', '/auth/admin/login', data),
};
