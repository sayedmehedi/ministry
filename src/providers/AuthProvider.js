import {View, Text} from 'react-native';
import React from 'react';
import axios, {AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext({});

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error('AuthProvider is not used.');
  }

  return context;
};

const AuthProvider = ({children}) => {
  const initialLoadDone = React.useRef(false);
  const [token, setToken] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const isAuthenticated = React.useMemo(() => !!token, [token]);

  React.useEffect(() => {
    if (!!token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      axios.defaults.headers.common['Authorization'] = ``;
    }
  }, [token]);

  React.useEffect(() => {
    const interceptorId = axios.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },

      /** @param {AxiosError} error*/
      function (error) {
        if (error.response) {
          const {status} = error.response;

          if (status === 401 || status === 419) {
            setToken(null);
          }
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(interceptorId);
    };
  }, []);

  React.useEffect(() => {
    (async () => {
      const tkn = await AsyncStorage.getItem('token');
      setToken(tkn);
      setIsLoading(false);
      initialLoadDone.current = true;
    })();
  }, []);

  React.useEffect(() => {
    if (initialLoadDone.current) {
      console.log(
        "This is not first render cycle so setting the token on it's change",
      );

      if (!token) {
        AsyncStorage.removeItem('token');
      } else {
        AsyncStorage.setItem('token', token);
      }
    }
  }, [token]);

  const login = async (email, password) => {
    const api = 'https://minister-app.com/api/user/login';

    const response = await axios.post(api, {email, password});

    setToken(response.data.token);
  };

  const logout = async () => {
    const api = 'https://minister-app.com/api/user/logout';

    await axios.get(api);

    setToken(null);
  };

  return (
    <AuthContext.Provider value={{login, logout, isAuthenticated}}>
      {isLoading ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
