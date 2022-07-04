import { useState } from 'react';

export default function useToken(storage) {
  const getToken = () => {
    const tokenString = storage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };
  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    storage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }

}