import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './newpost.css';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      image: null,
      url: '',
      description: '',
      progress: 0,
    };
    this.posting = this.posting.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  componentDidMount() {
    if (!firebase.getCurrent()) {
      this.props.history.replace('/');
      return null;
    }
  }

  posting = async (e) => {
    e.preventDefault();

    if (this.state.url !== '') {
      let posts = firebase.app.ref('posts');
      let keys = posts.push().key;

      await posts.child(keys).set({
        title: this.state.title,
        image: this.state.url,
        description: this.state.description,
        author: localStorage.name,
      });

      this.props.history.push('/');
    } else {
      alert('Envie uma imagem .PNG ou .JPEG');
    }
  };

  handleFile = async (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === 'image/png' || image.type === 'image/jpeg') {
        await this.setState({ image });
        this.handleUpload();
      } else {
        alert('Envie uma imagem do tipo .PNG ou .JPEG');
        this.setState({ image: null });
      }
    }
  };

  handleUpload = async () => {
    const { image } = this.state;
    const currentUid = firebase.getCurrentUid();
    const uploadTaks = firebase.storage
      .ref(`images/${currentUid}/${image.name}`)
      .put(image);

    await uploadTaks.on(
      'state_changed',
      (snapshot) => {
        //progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        this.setState({ progress });
      },
      (error) => {
        console.log('Error image: ' + error);
      },
      () => {
        //success
        firebase.storage
          .ref(`images/${currentUid}`)
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            this.setState({ url: url });
          });
      }
    );
  };

  render() {
    return (
      <div>
        <header id='new-post-header'>
          <Link to='/dashboard'>Voltar</Link>
        </header>
        <form onSubmit={this.posting} id='new-post-form'>
          <label>Titulo</label>
          <input
            type='text'
            placeholder='Nome do post'
            required
            autoFocus
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />

          <label>Descrição</label>
          <textarea
            type='text'
            placeholder='Descrição do post'
            required
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
          />

          <label>Imagem</label>
          <input type='file' required onChange={this.handleFile} />
          {this.state.url !== '' ? (
            <img src={this.state.url} alt='Post Image' width='200' />
          ) : (
            <progress value={this.state.progress} max='100' />
          )}

          <button type='submit'>Postar</button>
        </form>
      </div>
    );
  }
}

export default NewPost;
