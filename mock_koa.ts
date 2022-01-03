import { JSONSchemaBuilder } from "./builder";
import { CustomSchema } from "./schema";
import { validateSchema } from "./validate";

const mock_data = {
  patientId: "patient123",
  name: [
    {
      given: ["Ben"],
      family: "Rooke",
    },
  ],
};

export function withSchema(schema: CustomSchema | JSONSchemaBuilder): void {
  const builtSchema =
    schema instanceof JSONSchemaBuilder ? schema.build() : schema;
  const results = validateSchema(mock_data, builtSchema);
  if (!results.isValid) {
    throw Error(
      `HTTP body has invalid schema: ${JSON.stringify(results.errors)}`
    );
  }
}
