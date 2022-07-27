import { Component, ChangeEvent } from "react";
import PostDataService from "../services/post.service";
import { Link } from "react-router-dom";
import IPostData from '../types/post.type';
type Props = {};
type State = {
  posts: Array<IPostData>,
  currentPost: IPostData | null,
  currentIndex: number,
  searchTitle: string
};
export default class PostsList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrievePosts = this.retrievePosts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePost = this.setActivePost.bind(this);
    this.removeAllPosts = this.removeAllPosts.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.state = {
      posts: [],
      currentPost: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }
  componentDidMount() {
    this.retrievePosts();
  }
  onChangeSearchTitle(e: ChangeEvent<HTMLInputElement>) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle
    });
  }
  retrievePosts() {
    PostDataService.getAll()
      .then((response: any) => {
        this.setState({
          posts: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  refreshList() {
    this.retrievePosts();
    this.setState({
      currentPost: null,
      currentIndex: -1
    });
  }
  setActivePost(post: IPostData, index: number) {
    this.setState({
      currentPost: post,
      currentIndex: index
    });
  }
  removeAllPosts() {
    PostDataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  searchTitle() {
    this.setState({
      currentPost: null,
      currentIndex: -1
    });
    PostDataService.findByTitle(this.state.searchTitle)
      .then((response: any) => {
        this.setState({
          posts: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  render() {
    const { searchTitle, posts, currentPost, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Posts List</h4>
          <ul className="list-group">
            {posts &&
              posts.map((post: IPostData, index: number) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivePost(post, index)}
                  key={index}
                >
                  {post.title}
                </li>
              ))}
          </ul>
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllPosts}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentPost ? (
            <div>
              <h4>Post</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentPost.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentPost.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentPost.published ? "Published" : "Pending"}
              </div>
              <Link
                to={"/posts/" + currentPost.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Post</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  }
}