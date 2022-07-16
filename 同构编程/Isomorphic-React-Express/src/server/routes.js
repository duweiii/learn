import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {StaticRouter as Router,matchPath} from 'react-router';
import App from 'isomorphic/App.jsx';
import reducers from 'isomorphic/store/reducer';
import routes from 'isomorphic/routes';

const router = express.Router();

router.get('/*', async (req, res) => {
  const store = createStore(reducers, {},applyMiddleware(thunk));
  let params = null;
  // 匹配路由并获取参数
  const route = routes.find(({path,exact}) => {
    const match = matchPath(req.url,{path,exact,strict: false});
    if(match){
      params = match.params;
    }
    return match;
  })||{};
  const {path,component} = route;
  // 存在prefetch的组件获取接口数据
  if(component&&component.prefetch){
    await component.prefetch({ store, params});
  }
  // 用于客户端store恢复
  const hydrationState = store.getState();
  res.render('index.pug', {
    content: `${ReactDOMServer.renderToString(
      <Provider store={store}>
        <Router location={req.url}>
          <App/>
        </Router>
      </Provider>
    )}
    <script>
      window.__HYDRATION_STATE__ = ${JSON.stringify(hydrationState)}
    </script>`,
    assets
  });
});

export default router;