"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api_urls = void 0;
var ip = 'http://13.234.114.73';
var api_urls = {
  createUser: "".concat(ip, "/lmsapi/v1/user/createUser"),
  login: "".concat(ip, "/lmsapi/v1/user/login"),
  sendEmailForPasswordChange: "".concat(ip, "/lmsapi/v1/user/sendEmailForPasswordChange"),
  changePassword: "".concat(ip, "/lmsapi/v1/user/changePassword"),
  listOfAllBatches: "".concat(ip, "/lmsapi/v1/batch/getAllBatches"),
  getTrainerDetails: "".concat(ip, "/lmsapi/v1/user/getTrainer"),
  getInfoOfOneBatch: "".concat(ip, "/lmsapi/v1/batch/getBatch/"),
  createNewSession: "".concat(ip, "/lmsapi/v1/session/createSession"),
  getUserDetails: "".concat(ip, "/lmsapi/v1/user/getLearnerBatch"),
  deleteSession: "".concat(ip, "/lmsapi/v1/session/deleteSession"),
  updateSession: "".concat(ip, "/lmsapi/v1/session/updateSession"),
  getSession: "".concat(ip, "/lmsapi/v1/session/getSession")
};
exports.api_urls = api_urls;