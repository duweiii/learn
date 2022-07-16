import request from 'axios';

export const UPDATE_HEADLINES_COUNTRY = 'UPDATE_HEADLINES_COUNTRY';

export function getHeadlines(country) {
  return async (dispatch, getState) => {
    const {data} = await getHeadlinesFromNewsApi(country);
    dispatch({
      type: UPDATE_HEADLINES_COUNTRY,
      payload: {
        country,
        list: data.articles||[]
      }
    });
  };
}

function getHeadlinesFromNewsApi(country) {
  return request.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=555047788f6a44be915897a401119a5d`);
}