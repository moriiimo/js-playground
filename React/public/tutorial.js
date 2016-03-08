/**
 * tutorial.js
 * Created by amorimoto on 16/03/06.
 */
var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

var CommentBox = React.createClass({
  getInitialState: function () { // getInitialStateはコンポーネントのライフサイクルの中で1度だけ利用されるメソッド. コンポーネントのstateの初期値を設定する
    return {data: []};
  },

  componentDidMount: function () { // componentDidMountはコンポーネントがレンダリングされたときにReactが自動で呼び出すメソッド
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  handleCommentSubmit: function (comment) { // 子供のコンポーネントからのデータ受け取りをする
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, e) {
        this.setState({data: comments});
        console.error(this.props.url, status, e.toString());
      }.bind(this)
    });
  },

  loadCommentsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: 'false',
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, e) {
        console.error(this.props.url, status, e.toString());
      }.bind(this)
    })
  },

  render: function () { // renderではHTMLへレンダリングされるReactコンポーネントのツリーを返すようにする
    return (
      <div className="commentBox"> {/* Reactのdivコンポーネントのインスタンス ※JSX内ではコメントアウトはこう */}
        <h1>comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} /> {/* イベントハンドラはcamelCaseで登録すること. 子供のコンポーネントに対してコールバックを渡すことでonCommentSubmitとのひも付けを行う */}
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function () {
    var commentNodes = this.props.data.map(function (comment) {
        return (
          <Comment author={comment.author}> {/* Commentに対して変数を渡している */}
          {comment.text}
          </Comment>
        );
      }
    );
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function () {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>　{/* イベントハンドラはcamelCaseで登録すること */}
        <input type="text" placeholder="Your Name" ref="author"/> {/* ref属性で名前付け */}
        <input type="text" placeholder="something" ref="text"/>
        <input type="submit" value="Post"/>
      </form>
    )
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var author = ReactDOM.findDOMNode(this.refs.author).value.trim(); // this.refでref属性で設定された値参照
    var text = ReactDOM.findDOMNode(this.refs.text).value.trim(); // ReactDOM.findDOMNode(component)でブラウザの実際のDOMNodeを取得できる
    if (!text || !author) {
      return;
    }
    // サーバにリクエスト
    this.props.onCommentSubmit({author: author, text: text});
    // フォームを空に
    ReactDOM.findDOMNode(this.refs.author).value = '';
    ReactDOM.findDOMNode(this.refs.text).value = '';
  }
});

var Comment = React.createClass({
  render: function () {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author} {/* 親から渡されたデータをprops経由で利用できる */}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}></span>
        {/* JSX の内側でJavaScriptの式を波括弧で囲むと、テキストやReactコンポーネントをツリーに加えることができる */}
      </div>
    )
  },
  rawMarkup: function () {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    {/* ReactはXSS対策をしてくれているので適宜解除して使う必要あり */}
    return {__html: rawMarkup};
  }
});

ReactDOM.render(
  <CommentBox url="comments.json" pollInterval={2000}/>,
  document.getElementById('content') // ReactDOM.renderは第2引数のDOM要素にCommentBoxを挿入する
);
