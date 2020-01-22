import { HTTP, BASE_URL } from './HTTP';

export default {
  async getRoverList() {
    return HTTP.get('/api/v1/rovers');
  },

  async getDateList() {
    return HTTP.get('/api/v1/dates');
  },

  async getPhotoList(roverName, date) {
    return HTTP.get(`/api/v1/rovers/${roverName}/photos?earth_date=${date}`);
  },

  async getPhotoUrl(photo) {
    return `${BASE_URL}/api/v1/rovers/${photo.rover.name}/photos/${photo.id}?img_src=${photo.img_src}`;
  }
}
