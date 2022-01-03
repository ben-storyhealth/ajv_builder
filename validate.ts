import Ajv, { ErrorObject, ValidateFunction } from "ajv";
import { toAjvSchema, isStorySchema, CustomSchema } from "./schema";

const ajv = new Ajv();

type ValidationResults = { isValid: boolean; errors?: ErrorObject[] | null };

export function validateSchema(
  data: any,
  schema: CustomSchema
): ValidationResults {
  const validate = createValidationFunction(schema);
  const isValid = validate(data);
  return { isValid, errors: validate.errors };
}

function createValidationFunction(
  schema: CustomSchema
): ValidateFunction<unknown> {
  if (isStorySchema(schema)) {
    return ajv.compile(toAjvSchema(schema));
  } else {
    return ajv.compile(schema);
  }
}
