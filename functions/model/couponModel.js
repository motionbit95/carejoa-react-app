const express = require("express");
const admin = require("firebase-admin");
const database = admin.database();
const couponRef = database.ref("coupons");

class CouponModel {
  constructor(
    id = null,
    code = null,
    description = null,
    discount = null,
    division = null,
    expire = null,
    title = null,
    type = "할인율"
  ) {
    this.id = id;
    this.code = code;
    this.description = description;
    this.discount = discount;
    this.division = division;
    this.expire = expire;
    this.title = title;
    this.type = type;
  }

  toJSON() {
    return {
      id: this.id,
      code: this.code,
      description: this.description,
      discount: this.discount,
      division: this.division,
      expire: this.expire,
      title: this.title,
      type: this.type,
    };
  }

  async createCoupon(data) {
    try {
      const couponData = data instanceof CouponModel ? data.toJSON() : data;
      const newCouponRef = await couponRef.push(couponData);
      const id = newCouponRef.key;
      return { success: true, id, ...couponData };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getCouponById(id) {
    try {
      const snapshot = await couponRef.child(id).once("value");
      if (snapshot.exists()) {
        return { success: true, data: snapshot.val() };
      } else {
        return { success: false, message: "Coupon not found." };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async updateCoupon(id, updates) {
    try {
      const snapshot = await couponRef.child(id).once("value");
      if (!snapshot.exists()) {
        return { success: false, message: "Coupon not found." };
      }
      await couponRef.child(id).update(updates);
      return { success: true, message: "Coupon updated successfully." };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async deleteCoupon(id) {
    try {
      const snapshot = await couponRef.child(id).once("value");
      if (!snapshot.exists()) {
        return { success: false, message: "Coupon not found." };
      }
      await couponRef.child(id).remove();
      return { success: true, message: "Coupon deleted successfully." };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async getAllCoupons() {
    try {
      const snapshot = await couponRef.once("value");
      if (snapshot.exists()) {
        return { success: true, data: snapshot.val() };
      } else {
        return { success: false, message: "No coupons found." };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = CouponModel;
