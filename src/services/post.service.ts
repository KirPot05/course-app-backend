import { PostModel } from "../models";
import { v4 as uuidv4 } from "uuid";

class PostService {
  async createPost(content: string, userId: string, threadId: string) {
    return await PostModel.create({ content, userId, threadId, id: uuidv4() });
  }

  async getPostsByThread(threadId: string) {
    return await PostModel.findAll({ where: { threadId } });
  }
}

export default new PostService();
