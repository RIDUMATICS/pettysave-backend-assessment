class ResponseGenerator {
  constructor() {
    this.response = {};
    this.status = null;
  }

  /**
   * @description API response for 200 & 201
   * @param{int} status
   * @param {object} data
   * @param{string} message
   */
  static sendSuccess(res, status, data, message) {
    this.status = status;
    this.response = {
      status,
      message,
      data,
    };
    res.status(this.status).json(this.response);
  }

  /**
   * @description API response for 400, 401, 403, 404, 503
   * @param{int} status
   * @param{string}  error
   */
  static sendError(res, status, error) {
    try {
      this.status = status;
      this.response = {
        status,
        error,
      };
      res.status(this.status).json(this.response);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  }
}

module.exports = ResponseGenerator;
