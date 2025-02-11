const admin = require("firebase-admin");
const database = admin.database();
const reviewRef = database.ref("reviews"); // Reference to 'REVIEW' collection

class ReviewModel {
  constructor(
    id = null,
    content = null,
    createdAt = new Date().toISOString(),
    facility = null,
    urlList = [],
    userId = null
  ) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.facility = facility;
    this.urlList = urlList;
    this.userId = userId;
  }

  toJSON() {
    return {
      id: this.id,
      content: this.content,
      createdAt: this.createdAt,
      facility: this.facility,
      urlList: this.urlList,
      userId: this.userId,
    };
  }

  // Create a new review document
  async createReview(data) {
    try {
      const reviewData = data instanceof ReviewModel ? data.toJSON() : data;

      const newReviewRef = await reviewRef.push(reviewData);
      const id = newReviewRef.key;

      return { success: true, id, ...reviewData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Read a review document by ID
  async getReviewById(id) {
    try {
      const snapshot = await reviewRef.child(id).once("value");
      if (snapshot.exists()) {
        return { success: true, data: snapshot.val() };
      } else {
        return { success: false, message: "Review not found." };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update a review document by ID
  async updateReview(id, updates) {
    try {
      const snapshot = await reviewRef.child(id).once("value");
      if (!snapshot.exists()) {
        return { success: false, message: "Review not found." };
      }
      await reviewRef.child(id).update(updates);
      return { success: true, message: "Review updated successfully." };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Delete a review document by ID
  async deleteReview(id) {
    try {
      const snapshot = await reviewRef.child(id).once("value");
      if (!snapshot.exists()) {
        return { success: false, message: "Review not found." };
      }
      await reviewRef.child(id).remove();
      return { success: true, message: "Review deleted successfully." };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get all review documents
  async getAllReviews() {
    try {
      const snapshot = await reviewRef.once("value");
      if (snapshot.exists()) {
        return { success: true, data: snapshot.val() };
      } else {
        return { success: false, message: "No reviews found." };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = ReviewModel;
