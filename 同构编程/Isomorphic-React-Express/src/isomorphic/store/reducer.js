import {UPDATE_HEADLINES_COUNTRY} from './action';

const initialState = {
  country: null,
  list: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_HEADLINES_COUNTRY:
      return {
        ...state,
        country: action.payload.country,
        list: action.payload.list
      };
    default:
      return state;
  }
}