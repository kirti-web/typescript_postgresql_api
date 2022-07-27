import http from "../http-common";
import IPostData from "../types/post.type"
class PostDataService {
  getAll() {
    return http.get<Array<IPostData>>("/posts");
  }
  get(id: string) {
    return http.get<IPostData>(`/posts/${id}`);
  }
  create(data: IPostData) {
    return http.post<IPostData>("/posts", data);
  }
  update(data: IPostData, id: any) {
    return http.put<any>(`/posts/${id}`, data);
  }
  delete(id: any) {
    return http.delete<any>(`/posts/${id}`);
  }
  deleteAll() {
    return http.delete<any>(`/posts`);
  }
  findByTitle(title: string) {
    return http.get<Array<IPostData>>(`/posts?title=${title}`);
  }
}
export default new PostDataService();