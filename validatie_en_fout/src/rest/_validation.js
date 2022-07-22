const Joi = require('joi');
const {
  error
} = require('winston');

const JOI_OPTIONS = {
  abortEarly: true, //breek vanaf eerste fout
  allowUnknown: false, // ongekende keys in objecten
  context: true, // om gebruik te maken van joi.ref
  convert: true, // als validatie slaagt, dan num naar num omzetten enz..
  presence: 'required'

};

const cleanupJoiError = (error) => error.details.reduce((resultObj, {
  message,
  path,
  type
}) => {
  const joinedPath = path.join('.') || 'value';
  if (!resultObj[joinedPath]) {
    resultObj[joinedPath] = [];
  }
  resultObj[joinedPath].push({
    type,
    message,
  });
  return resultObj;
}, {});

const validate = (schema) => {
  if (!schema) {
    schema = {
      query: {},
      body: {},
      params: {},
    };
  }

  return (ctx, next) => {
    const errors = {};

    // ToDo: error if query params when no schema

    if (!Joi.isSchema(schema.query)) {
      schema.query = Joi.object(schema.query || {});
    }

    const {
      error: queryError,
      value: querValue
    } = schema.query.validate(ctx.query, JOI_OPTIONS);

    if (queryError) {
      errors.query = cleanupJoiError(queryError);
    } else {
      ctx.query = querValue;
    }



    if (!Joi.isSchema(schema.body)) {
      schema.body = Joi.object(schema.body || {});
    }

    const {
      error: bodyError,
      value: bodyValue
    } = schema.body.validate(ctx.response.body, JOI_OPTIONS);

    if (bodyError) {
      errors.body = cleanupJoiError(bodyError);
    } else {
      ctx.response.body = bodyValue;
    }


    if (!Joi.isSchema(schema.params)) {
      schema.params = Joi.object(schema.params || {});
    }

    const {
      error: paramsError,
      value: paramsValue
    } = schema.params.validate(ctx.params, JOI_OPTIONS);

    if (paramsError) {
      errors.params = cleanupJoiError(paramsError);
    } else {
      ctx.params = paramsValue;
    }






    // const schemaArray = [...schema];
    // schemaArray.map((schemaItem) => {

    // });

    // if (!Joi.isSchema(schema.params)) {
    //   schema.params = Joi.object(schema.params || {});
    // }

    // const {
    //   error: paramsError,
    //   value: paramsValue
    // } = schema.params.validate(ctx.params, JOI_OPTIONS);

    // if (paramsError) {
    //   errors.params = cleanupJoiError(paramsError);
    // } else {
    //   ctx.params = paramsValue;
    // }




    console.dir(errors, {
      depth: 6
    });

    if (Object.keys(errors).length > 0) {
      // status, message, code ,details
      ctx.throw(400, 'Validation failed, check detail for more information', {
        code: 'VALIDATION_FAILED',
        details: errors,
      });
    }

    return next();
  };
};

module.exports = validate;