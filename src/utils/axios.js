import axios from 'axios';

class AxiosHelper {
  constructor() {
    this.headers = {};
  }

  addHeader(name, value) {
    this.headers[name] = value;
  }

  removeHeader(name) {
    delete this.headers[name];
  }

  nextRequest(uri, query, variables) {
    return axios({
      url: uri,
      method: 'post',
      responseType: 'json',
      data: { query, variables },
      headers: this.headers,
    });
  }

  nextBatchRequest(uri, data) {
    return axios({
      url: uri,
      method: 'post',
      responseType: 'json',
      data,
      headers: this.headers,
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
