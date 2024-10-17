import './polyfills.server.mjs';
import {
  CookieService
} from "./chunk-X5USKXOP.mjs";
import {
  environment
} from "./chunk-BVVXM5P4.mjs";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-5I3IBUKT.mjs";

// src/app/common/services/user-image-api.service.ts
var UserImageApiService = class _UserImageApiService {
  constructor(http, cookieService) {
    this.http = http;
    this.cookieService = cookieService;
    this.apiUrl = environment.MasterApi + "/user-img";
  }
  // Create a new folder for a specific user
  createFolder(userid, folderName) {
    const token = this.cookieService.get("token");
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    const body = { folderName, userid };
    return this.http.post(`${this.apiUrl}/folders`, body, { headers });
  }
  // Get folders for a specific user with pagination, search, and sorting
  getFolders(userid, page = 1, limit = 10, search = "", sortBy = "created_at", order = "asc") {
    const params = new HttpParams().set("userid", userid).set("page", page).set("limit", limit).set("search", search).set("sortBy", sortBy).set("order", order);
    return this.http.get(`${this.apiUrl}/folders`, { params });
  }
  // Upload an image to a specific user's folder
  uploadImage(userid, folderId, imageFile, metadata) {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("metadata", JSON.stringify(metadata));
    formData.append("userid", userid);
    formData.append("folderId", folderId.toString());
    const token = this.cookieService.get("token");
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}/folders/${folderId}/images`, formData, { headers });
  }
  // Get images within a specific user's folder with pagination, search, and sorting
  getImagesInFolder(userid, folderId, page = 1, limit = 10, search = "", sort = "asc") {
    const params = new HttpParams().set("userid", userid).set("page", page).set("limit", limit).set("search", search).set("sort", sort);
    return this.http.get(`${this.apiUrl}/folders/${folderId}/images`, { params });
  }
  deleteImage(userid, folderId, imageId) {
    const token = this.cookieService.get("token");
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/folders/${folderId}/images/${imageId}`, {
      headers,
      params: { userid }
      // Pass userid as query parameter
    });
  }
  // Get the total count of folders for a user
  getTotalFolderCount(userid, search = "") {
    const params = new HttpParams().set("userid", userid).set("search", search);
    return this.http.get(`${this.apiUrl}/folders/count`, { params });
  }
  // Get the total image count in a specific folder for a user
  getTotalImageCount(folderId, search = "") {
    const params = new HttpParams().set("search", search);
    return this.http.get(`${this.apiUrl}/folders/${folderId}/images/count`, { params });
  }
  // Refresh an image for a specific user
  refreshImage(userid, folderId, imageId, formData) {
    formData.append("userid", userid);
    return this.http.post(`${this.apiUrl}/folders/${folderId}/images/${imageId}/refresh`, formData);
  }
  // Get image data
  getImage(imageId, quality, format, thumb) {
    let params = {};
    if (quality)
      params.quality = quality.toString();
    if (format)
      params.format = format;
    if (thumb)
      params.thumb = "true";
    return this.http.get(`${this.apiUrl}/uploads/${imageId}`, { params, responseType: "blob" });
  }
  // Delete a folder for a specific user
  deleteFolder(folderId) {
    const token = this.cookieService.get("token");
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
      // Pass the token in the Authorization header
    });
    return this.http.delete(`${this.apiUrl}/folders/${folderId}`, {
      headers
    });
  }
  // Rename a folder
  renameFolder(folderId, folderName) {
    const token = this.cookieService.get("token");
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
      // Optional header
    });
    const body = { folderName };
    return this.http.put(`${this.apiUrl}/folders/${folderId}/rename`, body, { headers });
  }
  static {
    this.\u0275fac = function UserImageApiService_Factory(t) {
      return new (t || _UserImageApiService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(CookieService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _UserImageApiService, factory: _UserImageApiService.\u0275fac, providedIn: "root" });
  }
};

export {
  UserImageApiService
};
//# sourceMappingURL=chunk-I3WG2NLV.mjs.map
