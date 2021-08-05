import Joi from "joi";

const createSchema = Joi.object({
  name: Joi.string().required(),
}).required();

const createValidate = (data: any) => {
  return createSchema.validate(data);
};

export default {
  createValidate,
};
