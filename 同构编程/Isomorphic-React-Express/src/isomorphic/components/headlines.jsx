import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {getHeadlines} from 'isomorphic/store/action';

class Headlines extends Component {
  static prefetch({ store,params }) {
    if(params&&params.country){
      return store.dispatch(getHeadlines(params.country));
    }
    return new Promise(resolve=>resolve());
  }
  componentDidMount(){
    const country = this.props.match.params.country;
    // 路由城市参数与store不同则请求当前城市新闻列表
    if(country!==this.props.country){
      this.props.getHeadlines(this.props.match.params.country);
    }
  }
  componentDidUpdate(prevProps){
    // 城市改变后请求新列表
    if (this.props.location !== prevProps.location) {
      this.props.getHeadlines(this.props.match.params.country);
    }
  }
  render() {
    const list = this.props.headlines.map((item,index)=>{
      return <li className="headlines__item" key={index}>
        <h3 className="headlines__title">{item.title}</h3>
        <i className="headlines__author">{item.author}</i>
      </li>;
    });
    return (
      <div className="headlines">
        <ul className="headlines__list">
          {list}
        </ul>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    country: state.country||'',
    headlines: state.list||[]
  }
};
const mapDispatchToProps = dispatch => {
  return {
    getHeadlines: country => {
      dispatch(getHeadlines(country))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Headlines);