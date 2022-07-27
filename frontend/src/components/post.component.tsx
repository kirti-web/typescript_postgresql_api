import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';
import PostDataService from "../services/post.service";
import IPostData from "../types/post.type";
interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}
type Props = RouteComponentProps<RouterProps>;
type State = {
  currentPost: IPostData;
  message: string;
}
export default class Post extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getPost = this.getPost.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.state = {
      currentPost: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }
  componentDidMount() {
    this.getPost(this.props.match.params.id);
  }
  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    this.setState(function (prevState) {
      return {
        currentPost: {
          ...prevState.currentPost,
          title: title,
        },
      };
    });
  }
  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;
    this.setState((prevState) => ({
      currentPost: {
        ...prevState.currentPost,
        description: description,
      },
    }));
  }
  getPostid: string) {
    PostDataService.get(id)
      .then((response: any) => {
        this.setState({
          currentPost: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  updatePublished(status: boolean) {
    const data: IPostData = {
      id: this.state.currentPost.id,
      title: this.state.currentPost.title,
      description: this.state.currentPost.description,
      published: status,
    };
    PostDataService.update(data, this.state.currentPost.id)
      .then((response: any) => {
        this.setState((prevState) => ({
          currentPost: {
            ...prevState.currentPost,
            published: status,
          },
          message: "The status was updated successfully!"
        }));
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  updatePost() {
    PostDataService.update(
      this.state.currentPost,
      this.state.currentPost.id
    )
      .then((response: any) => {
        console.log(response.data);
        this.setState({
          message: "The post was updated successfully!",
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  deletePost() {
    PostDataService.delete(this.state.currentPost.id)
      .then((response: any) => {
        console.log(response.data);
        this.props.history.push("/posts");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  render() {
    const { currentPost } = this.state;
    return (
      <div>
        {currentPost ? (
          <div className="edit-form">
            <h4>Post</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentPost.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentPost.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentPost.published ? "Published" : "Pending"}
              </div>
            </form>
            {currentPost.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}
            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePost}
            >
              Delete
            </button>
            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatePost}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Post...</p>
          </div>
        )}
      </div>
    );
  }
  }
}