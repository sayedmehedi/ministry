import React from 'react';
import axios from 'axios';
import {baseURL} from '../../baseURL.json';

export const useGetBlogs = () => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isError, setIsError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const controllerRef = React.useRef(new AbortController());

  const getBlogs = React.useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`${baseURL}/user/blogs`, {
        signal: controllerRef.current.signal,
      });
      const blogs = response.data;

      setError(null);
      setData(blogs);
      setIsError(false);
      setIsSuccess(true);
    } catch (error) {
      console.log('error on getting blogs', error);

      setError(error);
      setIsError(true);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetch = React.useCallback(() => {
    console.log('refetching blog details');
    getBlogs();
  }, [getBlogs]);

  React.useEffect(() => {
    getBlogs();

    return () => {
      controllerRef.current.abort();
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
  const controllerRef = React.useRef(new AbortController());

  const getBlogDetails = React.useCallback(
    async id => {
      if (!!id) {
        try {
          setIsLoading(true);

          const response = await axios.get(`${baseURL}/user/blogs/${id}`, {
            signal: controllerRef.current.signal,
          });
          const blog = response.data;

          setData(blog);
          setError(null);
          setIsError(false);
          setIsSuccess(true);
        } catch (error) {
          console.log('error on getting blog by id', error);
          setError(error);
          setIsError(true);
          setIsSuccess(false);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [id],
  );

  const refetch = React.useCallback(() => {
    console.log('refetching blog details');
    getBlogDetails(id);
  }, [getBlogDetails]);

  React.useEffect(() => {
    getBlogDetails(id);

    return () => {
      controllerRef.current.abort();
    };
  }, [getBlogDetails]);

  return {data, isLoading, refetch, error, isError, isSuccess};
};

export const useCreateComment = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const mutate = React.useCallback(async data => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${baseURL}/user/comments`, data);
      const comment = response.data;

      console.log('comment created', comment);

      setError(null);
      setData(comment);
      setIsError(false);
      setIsSuccess(true);
    } catch (error) {
      console.log('error on creating comment by id', error);
      setError(error);
      setIsError(true);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    mutate,
    error,
    isError,
    isSuccess,
    isLoading,
  };
};

export const useDeleteComment = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const mutate = React.useCallback(async id => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`${baseURL}/user/comments/${id}`);
      const comment = response.data;

      console.log('comment deleted', comment);
      setError(null);
      setData(comment);
      setIsSuccess(true);
      setIsError(false);
    } catch (error) {
      console.log('error on deleting comment by id', error);
      setError(error);
      setIsError(true);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    error,
    mutate,
    isError,
    isSuccess,
    isLoading,
  };
};
