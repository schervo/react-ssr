// Api
import blogApi from './api';

// Action Types
import { FETCH_POSTS } from './actionTypes';

export const fetchPosts = (fetchingFrom, query) => dispatch => {
  const requestPosts = () => ({
    type: FETCH_POSTS.request(),
  });

  const receivedPosts = posts => ({
    type: FETCH_POSTS.success(),
    payload: posts,
  });

  const errorPosts = posts => ({
    type: FETCH_POSTS.error(),
    payload: posts,
  });

  dispatch(requestPosts());

  return blogApi.getAllPosts(query, fetchingFrom)
    .then(posts => {
      dispatch(receivedPosts(posts));
    })
    .catch((error)=> {
      dispatch(errorPosts);
    });
};
