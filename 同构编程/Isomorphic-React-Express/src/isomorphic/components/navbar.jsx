import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {
  render() {
    return (
      <div className="navbar">
        <ul className="navbar__list">
            <li className="navbar__item">
              <Link to='/' className="navbar__link">首页</Link>
            </li>
            <li className="navbar__item">
              <Link to='/headlines/us' className="navbar__link">美国头条</Link>
            </li>
            <li className="navbar__item">
              <Link to='/headlines/jp' className="navbar__link">日本头条</Link>
            </li>
        </ul>
      </div>
    );
  }
};