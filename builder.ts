import { JSONSchemaType } from "ajv";
import { PropertiesSchema } from "ajv/dist/types/json-schema";
import { asArray, isStorySchema, StorySchema, toAjvSchema } from "./schema";

interface PropertyOptions {
  // By default properties are required.
  isOptional?: boolean;
}

export class JSONSchemaBuilder {
  private schema: JSONSchemaType<any> = {
    type: "object",
    required: [],
  };

  constructor() {}

  property(
    name: string,
    schema: StorySchema | JSONSchemaType<any>,
    options?: PropertyOptions
  ): this {
    this.schema.properties = {
      ...this.schema.properties,
      [name]: isStorySchema(schema)
        ? toAjvSchema(schema)
        : (schema as PropertiesSchema<any>),
    };
    if (!options?.isOptional) {
      this.schema.required = [...this.schema.required, name];
    }
    return this;
  }

  optionalProperty(
    name: string,
    schema: StorySchema | JSONSchemaType<any>,
    options?: PropertyOptions
  ): this {
    return this.property(name, schema, { ...options, isOptional: true });
  }

  arrayProperty(
    name: string,
    schema: StorySchema | JSONSchemaType<any>,
    options?: PropertyOptions
  ): this {
    return this.property(name, asArray(schema), options);
  }

  build(): JSONSchemaType<any> {
    return this.schema;
  }
}
