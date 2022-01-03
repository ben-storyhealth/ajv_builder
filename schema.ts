import { JSONSchemaType } from "ajv";
import { PropertiesSchema } from "ajv/dist/types/json-schema";

export enum StorySchema {
  Integer,
  String,
}

export type CustomSchema = StorySchema | JSONSchemaType<any>;

export function asArray(schema: CustomSchema): JSONSchemaType<any[]> {
  return {
    type: "array",
    items: isStorySchema(schema) ? toAjvSchema(schema) : schema,
  };
}

export function toAjvSchema(schema: StorySchema): JSONSchemaType<any> {
  switch (schema) {
    case StorySchema.String:
      return {
        type: "string",
      };
    case StorySchema.Integer:
      return {
        type: "integer",
      };
  }
}

export function isStorySchema(schema: CustomSchema): schema is StorySchema {
  return Object.keys(schema).length === 0;
}
