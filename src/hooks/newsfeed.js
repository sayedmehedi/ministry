import React from 'react';
import {baseURL} from '../../baseURL.json';
import axios from 'axios';

export const useGetBlogs = () => {
  const [blogs, setBlogs] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const getBlogs = async () => {
    try {
      const response = await axios.get(`${baseURL}/user/blogs`);
      const blogs = response.data;

      setBlogs(blogs);
    } catch (error) {
      console.log('error on getting blogs', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getBlogs();
  }, []);

  /**
   * @type {{data: {id: number; subject: string; reacted: boolean; photo: string; created_at: string}[], isLoading: boolean}} data
   */
  const data = {
    data: blogs,
    isLoading,
  };

  return data;
};

export const useGetBlogDetails = id => {
  const [blog, setBlog] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const getBlogDetails = React.useCallback(async id => {
    if (!!id) {
      try {
        const response = await axios.get(`${baseURL}/user/blogs/${id}`);
        const blog = response.data;

        setBlog(blog);
      } catch (error) {
        console.log('error on getting blog by id', error);
      } finally {
        setIsLoading(false);
      }
    }
  });

  const refetch = React.useCallback(() => {
    console.log('refetching blog details');
    getBlogDetails(id);
  }, [getBlogDetails]);

  React.useEffect(() => {
    getBlogDetails(id);
  }, [id]);

  return {data: blog, isLoading, refetch};
};

export const useCreateComment = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const mutate = React.useCallback(async data => {
    setData(null);
    setError(null);
    setIsError(false);
    setIsSuccess(false);

    try {
      setIsLoading(true);
      const response = await axios.post(`${baseURL}/user/comments`, data);
      const comment = response.data;

      console.log('comment created', comment);
      setData(comment);
      setIsSuccess(true);
    } catch (error) {
      console.log('error on creating comment by id', error);
      setIsError(true);
      setIsSuccess(false);
      setError(error);
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
    setData(null);
    setError(null);
    setIsError(false);
    setIsSuccess(false);

    try {
      setIsLoading(true);
      const response = await axios.delete(`${baseURL}/user/comments/${id}`);
      const comment = response.data;

      console.log('comment deleted', comment);
      setData(comment);
      setIsSuccess(true);
    } catch (error) {
      console.log('error on deleting comment by id', error);
      setIsError(true);
      setIsSuccess(false);
      setError(error);
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
