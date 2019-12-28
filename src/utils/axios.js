import axios from 'axios';

const CancelToken = axios.CancelToken;

class AxiosHelper {
  constructor() {
    this.headers = {};
  }

  nextRequest(uri, query, variables) {
    return axios({
      url: uri,
      method: 'post',
      responseType: 'json',
      data: { query, variables },
      headers: this.headers,
      onUploadProgress: (progressEvent) => {
        console.log(progressEvent);
      },
    });
  }
}

const axiosHelper = new AxiosHelper();

export default axiosHelper;

export const VALID_URI_QUERY = `
  query {
    posts(first: 1) {
      nodes {
        id
      }
    }
  }
`;
