const Router = require("@koa/router");
const userService = require('../service/user');
const {
  requireAuthentication,
  makeRequireRole
} = require('../core/auth');
const Role = require('../core/roles');

const getAllUsers = async (ctx) => {
  const limit = ctx.query.limit && Number(ctx.query.limit);
  const offset = ctx.query.offset && Number(ctx.query.offset);
  const response = await userService.getAll(limit, offset);
  ctx.body = response;
};

const getUserById = async (ctx) => {
  const response = await userService.getById(ctx.params.id);
  ctx.body = response;
};

const updateUserById = async (ctx) => {
  const response = await userService.updateById(
    ctx.params.id,
    ctx.request.body
  );
  ctx.body = response;

};

const deleteUserById = async (ctx) => {
  await userService.deleteById(ctx.params.id);
  ctx.status = 204;
}

const login = async (ctx) => {
  const {
    email,
    password
  } = ctx.request.body;
  const response = await userService.login(email, password);
  ctx.body = response;
}

const register = async (ctx) => {
  const response = await userService.register(ctx.request.body);
  ctx.body = response;
}

module.exports = function installUsersRoutes(app) {
  const router = new Router({
    prefix: '/users'
  });

  // Public routes
  router.post('/login', login);
  router.post('/register', register);

  const requireAdmin = makeRequireRole(Role.ADMIN);

  // Routes with authentication/autorisation
  router.get('/', requireAuthentication, requireAdmin, getAllUsers);
  router.get('/:id', requireAuthentication, getUserById);
  router.put('/:id', requireAuthentication, updateUserById);
  router.delete('/:id', requireAuthentication, deleteUserById);


  app.use(router.routes()).use(router.allowedMethods());
};