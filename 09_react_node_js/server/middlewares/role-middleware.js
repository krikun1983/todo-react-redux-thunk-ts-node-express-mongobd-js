import { ApiError } from '../exceptions/index.js';
import { tokenService } from '../controllers/services/index.js';

const roleMiddleware = (roles) => {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }

    try {
      const authorizationHeader = req.headers.authorization;
      if (!authorizationHeader) {
        return next(ApiError.UnauthorizedError());
      }

      const accessToken = req.headers.authorization.split(' ')[1];
      if (!accessToken) {
        return next(ApiError.UnauthorizedError());
      }

      const { roles: userRoles } = tokenService.validateAccessToken(accessToken);

      let hasRole = false;

      userRoles.forEach(role => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      })

      if (!hasRole) {
        return next(ApiError.BadRequest(`You don't have access`));
      }

      next();
    } catch (e) {
      return next(ApiError.UnauthorizedError());
    }
  }
};

export default roleMiddleware;