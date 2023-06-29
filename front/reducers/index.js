import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user from './user';
import post from './post';
import modal from './modal';
import option from './option';
import posts from './posts';

export const LOADING = 'loading';
export const SUCCEEDED = 'succeeded';
export const REJECTED = 'rejected';

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
        posts,
        option,
        modal,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
