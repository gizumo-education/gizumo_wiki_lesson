import axios from 'axios';

export default (token = null) => {
  const headers = {};
  if (token) Object.assign(headers, { Authorization: `Bearer ${token}` });

  // インスタンスの作成（戻り値の関数を実行するとAPI通信できる）
  return axios.create({
    baseURL: API_BASE_URL,
    headers,
  });
};
