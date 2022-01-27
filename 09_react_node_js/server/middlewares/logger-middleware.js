import fs from 'fs';

class LoggerMiddleware {
  log(req, res, next) {
    try {
      fs.open('./log/log.txt', 'r+', () => { });
      let data;
      const headers = {
        host: req.headers.host,
        method: req.method,
        reqUrl: req.originalUrl,
        connection: req.headers.connection,
        "content-type": req.headers["content-type"],
        "user-agent": req.headers["user-agent"],
        "accept-language": req.headers["accept-language"],
        ip: req.ip,
        ipClient: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      }
      if (req.originalUrl === '/api/login') {
        data = JSON.stringify(
          {
            headers: headers, data: new Date()
          }, null, "\t"
        );
      } else {
        data = JSON.stringify(
          {
            headers: headers, data: new Date(), body: req.body
          }, null, "\t"
        );
      }
      fs.appendFile('./log/log.txt', data, () => { });
      next();
    } catch (error) {
      console.log(error);
      next();
    }
  }

  errorLog(errorType, errorMessage) {
    fs.open('./log/log.txt', 'r+', () => { });
    const error = {
      'errorType': errorType,
      'errorMessage': errorMessage,
    }

    const data = JSON.stringify(
      {
        error: error, data: new Date()
      }, null, "\t"
    );
    fs.appendFile('./log/log.txt', data, () => { });
  }
}

export default new LoggerMiddleware();