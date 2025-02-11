const admin = require("firebase-admin");
const database = admin.database();
const newsRef = database.ref("news"); // Reference to 'NEWS' collection

class NewsModel {
  constructor(
    id = null,
    content = null,
    createdAt = null,
    facility = null,
    urlList = [],
    userId = null,
    views = 0,
    goods = 0,
    comments = []
  ) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.facility = facility;
    this.urlList = urlList;
    this.userId = userId;
    this.views = views;
    this.goods = goods;
    this.comments = comments;
  }

  toJSON() {
    return {
      id: this.id,
      content: this.content,
      createdAt: this.createdAt || new Date().toISOString(),
      facility: this.facility,
      urlList: this.urlList,
      userId: this.userId,
      views: this.views,
      goods: this.goods,
      comments: this.comments,
    };
  }

  // Create a new news document
  async createNews(data) {
    try {
      // Ensure data is a plain object
      const newsData = data instanceof NewsModel ? data.toJSON() : data;

      newsData.createdAt = newsData.createdAt || new Date().toISOString();

      // Push to the database, generating a new unique ID
      const newNewsRef = await newsRef.push(newsData);

      // Extract the generated key as the ID
      const id = newNewsRef.key;

      // Return the success response with the generated ID and data
      return { success: true, id, ...newsData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Read a news document by ID
  async getNewsById(id) {
    try {
      const snapshot = await newsRef.child(id).once("value");
      if (snapshot.exists()) {
        return { success: true, data: snapshot.val() };
      } else {
        return { success: false, message: "News not found." };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update a news document by ID
  async updateNews(id, updates) {
    try {
      const snapshot = await newsRef.child(id).once("value");
      if (!snapshot.exists()) {
        return { success: false, message: "News not found." };
      }
      await newsRef.child(id).update(updates);
      return { success: true, message: "News updated successfully." };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Delete a news document by ID
  async deleteNews(id) {
    try {
      const snapshot = await newsRef.child(id).once("value");
      if (!snapshot.exists()) {
        return { success: false, message: "News not found." };
      }
      await newsRef.child(id).remove();
      return { success: true, message: "News deleted successfully." };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get all news documents
  async getAllNews() {
    try {
      const snapshot = await newsRef.once("value");
      if (snapshot.exists()) {
        return { success: true, data: snapshot.val() };
      } else {
        return { success: false, message: "No news found." };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = NewsModel;
