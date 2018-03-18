import React from 'react';
import './ArticleItem.css';

export const ArticleItem = props => <li className="article-item">
  <div className="card article-card">
    <div className="card-body">
      {props.children}
    </div>
  </div>
</li>;