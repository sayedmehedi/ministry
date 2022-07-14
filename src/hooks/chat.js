import React from 'react';
import axios from 'axios';
import {baseURL} from '../../baseURL.json';

export const useGetInfiniteMessages = () => {
  /** @type {(import("../typedefs").Message)[]} data - a foo */
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [messagesRecord, setMessagesRecord] = React.useState({});
  const [isFetchingNextPage, setIsFetchingNextPage] = React.useState(false);

  React.useEffect(() => {
    setData(
      Object.values(messagesRecord).sort(
        (a, b) => -a.created_at.localeCompare(b.created_at),
      ),
    );
  }, [messagesRecord]);

  const getMessages = React.useCallback((pageNumber = 1) => {
    const controller = new AbortController();

    setIsLoading(true);
    axios
      .get(`${baseURL}/user/inbox?page=${pageNumber}`, {
        signal: controller.signal,
      })

      .then(response => {
        const messages = response.data.data.reduce((acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        }, {});

        setMessagesRecord(prev => ({
          ...prev,
          ...messages,
        }));
        setError(null);
        setIsError(false);
        setIsSuccess(true);

        if (!!response.data.next_page_url) {
          setPage(prev => prev + 1);
        }
        console.log('next page url is', response.data.next_page_url);
        setHasNextPage(response.data.next_page_url !== null);
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

  const fetchNextPage = () => {
    console.log('fetching next page messages', page);
    if (hasNextPage) {
      const controller = new AbortController();

      setIsFetchingNextPage(true);
      axios
        .get(`${baseURL}/user/inbox?page=${page}`, {
          signal: controller.signal,
        })

        .then(response => {
          const messages = response.data.data.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
          }, {});

          setMessagesRecord(prev => ({
            ...prev,
            ...messages,
          }));
          setError(null);
          setIsError(false);
          setIsSuccess(true);

          if (!!response.data.next_page_url) {
            setPage(prev => prev + 1);
          }
          console.log('next page url is', response.data.next_page_url);
          setHasNextPage(response.data.next_page_url !== null);
        })
        .catch(error => {
          console.log('error on getting messages', error);

          setError(error.response?.message ?? error.message);
          setIsError(true);
          setIsSuccess(false);
        })
        .finally(() => {
          setIsFetchingNextPage(false);
        });

      return () => {
        controller.abort();
      };
    }
  };

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
    fetchNextPage,
    isFetchingNextPage,
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

        if (!!data.text) {
          formData.append('text', data.text);
        }
        if (!!data.file) {
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
