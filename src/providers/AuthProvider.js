import React from 'react';
import {View, Text} from 'react-native';
import axios, {AxiosError} from 'axios';
import {baseURL} from '../../baseURL.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext({});

axios.defaults.baseURL = baseURL;
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
  const [profileData, setProfileData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isProfileDataLoading, setIsProfileDataLoading] = React.useState(false);

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
      const profileData = await AsyncStorage.getItem('profile');
      setToken(tkn);
      setProfileData(JSON.parse(profileData));
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

  React.useEffect(() => {
    if (initialLoadDone.current) {
      console.log(
        "This is not first render cycle so setting the profile on it's change",
      );

      if (!profileData) {
        AsyncStorage.removeItem('profile');
      } else {
        AsyncStorage.setItem('profile', JSON.stringify(profileData));
      }
    }
  }, [profileData]);

  const refreshAuthProfileData = React.useCallback(async () => {
    console.log('refreshing auth profile data');
    try {
      setIsProfileDataLoading(true);
      const res = await axios.get('user/profile');

      const userProfile = res.data;

      console.log('refreshed profile data', userProfile);

      setProfileData(userProfile);
    } catch (error) {
      console.log('user profile fetch error', error);
    } finally {
      setIsProfileDataLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const api = 'https://minister-app.com/api/user/login';

    const response = await axios.post(api, {email, password});

    setToken(response.data.token);
    setProfileData(response.data.user);
  };

  const logout = async () => {
    const api = 'https://minister-app.com/api/user/logout';

    await axios.get(api);

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        profileData,
        isAuthenticated,
        isProfileDataLoading,
        refreshAuthProfileData,
      }}>
      {isLoading ? (
        <View>
          <Text>Splash screen...</Text>
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
