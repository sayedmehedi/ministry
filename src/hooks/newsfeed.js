import React from 'react';
import axios from 'axios';
import {baseURL} from '../../baseURL.json';

export const useGetBlogs = () => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const getBlogs = React.useCallback(() => {
    const controller = new AbortController();
    setIsLoading(true);
    axios
      .get(`${baseURL}/user/blogs`, {
        signal: controller.signal,
      })
      .then(response => {
        const blogs = response.data;

        setError(null);
        setData(blogs);
        setIsError(false);
        setIsSuccess(true);
      })
      .catch(error => {
        console.log('error on getting blogs', error);

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
    console.log('refetching blog list');
    return getBlogs();
  }, [getBlogs]);

  React.useEffect(() => {
    const unsubscribe = getBlogs();

    return () => {
      unsubscribe();
    };
  }, [getBlogs]);

  return {
    data,
    error,
    refetch,
    isError,
    isSuccess,
    isLoading,
  };
};

export const useGetBlogDetails = id => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const getBlogDetails = React.useCallback(
    id => {
      const controller = new AbortController();

      if (!!id) {
        setIsLoading(true);

        axios
          .get(`${baseURL}/user/blogs/${id}`, {
            signal: controller.signal,
          })
          .then(response => {
            const blog = response.data;

            setData(blog);
            setError(null);
            setIsError(false);
            setIsSuccess(true);
          })
          .catch(error => {
            console.log('error on getting blog by id', error);
            setError(error.response?.message ?? error.message);
            setIsError(true);
            setIsSuccess(false);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }

      return () => {
        controller.abort();
      };
    },
    [id],
  );

  const refetch = React.useCallback(() => {
    console.log('refetching blog details');
    return getBlogDetails(id);
  }, [getBlogDetails]);

  React.useEffect(() => {
    const unsubscribe = getBlogDetails(id);

    return () => {
      unsubscribe();
    };
  }, [getBlogDetails]);

  return {data, isLoading, refetch, error, isError, isSuccess};
};

export const useCreateComment = ({onCreated} = {onCreated: undefined}) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const mutate = React.useCallback(
    async data => {
      try {
        setIsLoading(true);
        const response = await axios.post(`${baseURL}/user/comments`, data);
        const comment = response.data;

        console.log('comment created', comment);

        setError(null);
        setData(comment);
        setIsError(false);
        setIsSuccess(true);
        onCreated?.(comment);
      } catch (error) {
        console.log('error on creating comment by id', error);
        setError(error.response?.message ?? error.message);
        setIsError(true);
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    },
    [onCreated],
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

export const useDeleteComment = ({onDeleted} = {onDeleted: undefined}) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const mutate = React.useCallback(
    async id => {
      try {
        setIsLoading(true);
        const response = await axios.delete(`${baseURL}/user/comments/${id}`);
        const comment = response.data;

        console.log('comment deleted', comment);
        setError(null);
        setData(comment);
        setIsSuccess(true);
        setIsError(false);
        onDeleted?.(comment);
      } catch (error) {
        console.log('error on deleting comment by id', error);
        setError(error.response?.message ?? error.message);
        setIsError(true);
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    },
    [onDeleted],
  );

  return {
    data,
    error,
    mutate,
    isError,
    isSuccess,
    isLoading,
  };
};

export const useToggleBlogReaction = ({onReacted} = {onReacted: undefined}) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const mutate = React.useCallback(
    async blogId => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${baseURL}/user/blogs/${blogId}/toggle-react`,
        );
        const reactionCount = response.data;

        console.log('blog reacted', reactionCount);
        setError(null);
        setData(reactionCount);
        setIsSuccess(true);
        setIsError(false);
        onReacted?.(reactionCount);
      } catch (error) {
        console.log('error on blog reacted by id', error);
        setError(error.response?.message ?? error.message);
        setIsError(true);
        setIsSuccess(false);
      } finally {
        setIsLoading(false);
      }
    },
    [onReacted],
  );

  return {
    data,
    error,
    mutate,
    isError,
    isSuccess,
    isLoading,
  };
};
