import React from 'react'
import ReactDOM from 'react-dom'
import fs from 'fs'
import request from 'request'

class Foo extends React.Component {

  render() {
    return (
      <input type="button" value="download" onClick={this.handleClick}/>
    )
  }

  handleClick(e) {
    e.preventDefault();
    request(
      {method: 'GET', url: 'http://nekogazou.com/wp-content/uploads/2015/08/55270573c8c1630b9b2901f4da9989c7.jpg', encoding: null}, (error, response, body) => {
        if(!error && response.statusCode === 200){
          fs.writeFileSync('a.png', body, 'binary');
        }
      }
    );
  }

  readFile() {
    // ファイルの非同期読み込み
    fs.readFile(__dirname + '/hoge.txt', 'utf8', (err, text) => {
      console.log('text file!');
      console.log(text);
      console.log('error!?');
      console.log(err);
    });
  }
}

ReactDOM.render(<Foo />, document.getElementById('container'));