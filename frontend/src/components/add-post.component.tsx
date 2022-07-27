import { Component, ChangeEvent } from "react";
import PostDataService from "../services/post.service";
import IPostData from '../types/post.type';
type Props = {};
type State = IPostData & {
  submitted: boolean
};
export default class AddPost extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.savePost = this.savePost.bind(this);
    this.newPost = this.newPost.bind(this);
    this.state = {
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false
    };
  }
  onChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      title: e.target.value
    });
  }
  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value
    });
  }
  savePost() {
    const data: IPostData = {
      title: this.state.title,
      description: this.state.description
    };
    PostDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,
          submitted: true
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  newPost() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,
      submitted: false
    });
  }
  render() {
    const { submitted, title, description } = this.state;
    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newPost}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>
            <button onClick={this.savePost} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
  }
}