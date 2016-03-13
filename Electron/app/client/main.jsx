import React from 'react'
import ReactDOM from 'react-dom'
import fs from 'fs'
import request from 'request'
import ipc from 'ipc'

class Foo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: __dirname + '../../../noimage.png'

    };
    this.handleClick = this.handleClick.bind(this);

    ipc.on('asynchronous-cache-request-reply', (filepath) => {
      console.log(filepath);
      if (filepath === '') {
        // 空だったら画像をリクエストして保存
        this.dlFile();
      } else {
        this.setState({imgSrc: filepath});
      }
    });
  }

  render() {
    return (
      <div>
        <input type="button" value="download" onClick={this.handleClick}/>
        <ImageView imgSrc={this.state.imgSrc}/>
      </div>
    )
  }

  handleClick(e) {
    e.preventDefault();
    // 読み込んだ画像にアクセス
    this.readFile();
  }

  /**
   * ファイルの非同期読み込み
   */
  readFile() {
    ipc.send('async-cache-request', 'a.png');
  }

  /**
   * 画像ファイルのDL
   */
  dlFile() {
    request(
      {
        method: 'GET',
        url: 'http://nekogazou.com/wp-content/uploads/2015/08/55270573c8c1630b9b2901f4da9989c7.jpg',
        encoding: null
      }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          // 画像のキャッシュをメインプロセスにリクエスト
          ipc.send('async-cache-save-request', 'a.png', body);
        }
      }
    );
  }
}

class ImageView extends React.Component {
  render() {
    return (
      <div id="image">
        <img src={this.props.imgSrc}/>
      </div>
    )
  }
}

ReactDOM.render(<Foo />, document.getElementById('container'));