const {
  loggers
} = require('winston');
const {
  generateJWT,
  verifyJWT
} = require('../core/jwt');
const {
  getLogger
} = require('../core/logging');
const {
  hashPassword,
  verifyPassword
} = require('../core/password');
const Roles = require('../core/roles');
const userRepository = require('../repository/user');

const debugLog = (message, meta) => {
  getLogger().debug(message, meta);
};

const checkAndParseSession = async (authHeader) => {
  if (!authHeader) {
    throw new Error('You need to be signed in');
  }
  if (!authHeader.startsWith('Bearer ')) {
    throw new Error('Invalid authentication token');
  }

  const authToken = authHeader.substr(7);
  try {
    const {
      roles,
      userId
    } = await verifyJWT(authToken);

    return {
      userId,
      roles,
      authToken
    };

  } catch (error) {
    loggers.error(error.message, {
      error
    });
    throw new Error(error.message);
  }
};

const checkRole = (role, roles) => {
  const hasPermission = roles.includes(role);

  if (!hasPermission) {
    throw new Error('You are not allowed to view this part of the application');
  }
};

const makeExposedUser = ({
  password_hash,
  ...user
}) => user;

const makeLoginData = async (user) => {
  const token = await generateJWT(user);
  return {
    token,
    user: makeExposedUser(user),
  };
}

const login = async (email, password) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    throw new Error('The given email and password do not match');
  }

  const passwordValid = await verifyPassword(password, user.password_hash);

  if (!passwordValid) {
    throw new Error('The given email and password do not match');
  }

  return await makeLoginData(user);
};

/**
 * Register a new user
 *
 * @param {object} user - The user's data.
 * @param {string} user.name - The user's name.
 */
const register = async ({
  name,
  email,
  password
}) => {
  debugLog('Creating a new user', {
    name
  });
  const passwordHash = await hashPassword(password);
  const user = await userRepository.create({
    name,
    email,
    passwordHash,
    roles: [Roles.USER]
  });
  return await makeLoginData(user);
};

const getAll = async (limit = 100, offset = 0) => {
  debugLog('Fetching all users', {
    limit,
    offset
  });
  const data = await userRepository.findAll(limit, offset);
  const count = await userRepository.findCount();
  return {
    data,
    count,
    limit,
    offset
  };
};

const getById = async (id) => {
  debugLog(`Fetching user with id ${id}`);
  const user = await userRepository.findById(id);
  if (!user) {
    throw new Error(`No user with id ${id} exists`);
  }
  return user;
};

const updateById = async (id, {
  name
}) => {
  const user = await userRepository.findById(id);
  return (await userRepository.updateById(id, {
    name
  }));
};

const deleteById = async (id) => {
  const deleted = await userRepository.deleteById(id);
  if (!deleted) {
    throw new Error(`No user with id ${id} exists`);
  }
};

module.exports = {
  login,
  register,
  getAll,
  getById,
  updateById,
  deleteById
};