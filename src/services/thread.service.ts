import { ThreadModel } from "../models";
import { v4 as uuidv4 } from "uuid";

class ThreadService {
  async createThread(title: string, content: string, userId: string) {
    return await ThreadModel.create({ title, content, userId, id: uuidv4() });
  }

  async getThreads() {
    return await ThreadModel.findAll();
  }
}

export default new ThreadService();
