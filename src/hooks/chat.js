import React from 'react';
import axios from 'axios';
import {baseURL} from '../../baseURL.json';

export const useGetMessages = () => {
  /** @type {(import("../typedefs").Message)[]} data - a foo */
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const getMessages = React.useCallback(() => {
    const controller = new AbortController();
    setIsLoading(true);
    axios
      .get(`${baseURL}/user/inbox`, {
        signal: controller.signal,
      })

      .then(response => {
        const messages = response.data.data;

        setError(null);
        setData(messages);
        setIsError(false);
        setIsSuccess(true);
      })
      .catch(error => {
        console.log('error on getting messages', error);

        setError(error.response?.message ?? error.message);
        setIsError(true);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const refetch = React.useCallback(() => {
    console.log('refetching message list');
    return getMessages();
  }, [getMessages]);

  React.useEffect(() => {
    const unsubscribe = getMessages();

    return () => {
      unsubscribe();
    };
  }, [getMessages]);

  return {
    data,
    error,
    refetch,
    isError,
    isSuccess,
    isLoading,
  };
};

export const useSendMessage = ({onSent} = {onSent: undefined}) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const mutate = React.useCallback(
    async data => {
      try {
        setIsLoading(true);
        const formData = new FormData();
        
        if(!!data.text)
        {
          formData.append('text', data.text);

        }
        if(!!data.file)
        {
          formData.append('attachment', data.file);

        }
        

        const response = await axios.postForm(
          `${baseURL}/user/send-message`,
          formData,
        );
        const newMessage = response.data;

        console.log('message created', newMessage);

        setError(null);
        setData(newMessage);
        setIsError(false);
        setIsSuccess(true);
        onSent?.(newMessage);
      } catch (error) {
        console.log('error on sedning message', error);
        setError(error.response?.message ?? error.message);
        setIsError(true);
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    },
    [onSent],
  );

  return {
    data,
    mutate,
    error,
    isError,
    isSuccess,
    isLoading,
  };
};
