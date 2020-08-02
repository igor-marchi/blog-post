import React, { Component, Children } from 'react';
import firebase from '../../firebase';

import './home.css';

class Home extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    firebase.app.ref('posts').once('value', (snapshot) => {
      let state = this.state;
      state.post = [];
      snapshot.forEach((childrenItem) => {
        state.posts.push({
          key: childrenItem.key,
          title: childrenItem.val().title,
          image: childrenItem.val().image,
          description: childrenItem.val().description,
          author: childrenItem.val().author,
        });
      });
      state.posts.reverse();
      this.setState(state);
    });
  }

  render() {
    return (
      <section id='post'>
        {this.state.posts.map((post) => {
          return (
            <article key={post.key}>
              <header>
                <div className='title'>
                  <strong>{post.title}</strong>
                  <span>Autor: {post.author}</span>
                </div>
              </header>
              <img src={post.image} alt='Capa do Post' />
              <footer>
                <p>{post.description} </p>
              </footer>
            </article>
          );
        })}
      </section>
    );
  }
}

export default Home;
