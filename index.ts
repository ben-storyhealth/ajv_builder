import { JSONSchemaBuilder } from "./builder";
import { withSchema } from "./mock_koa";
import { StorySchema, asArray } from "./schema";

// Knowing that the API body will have the following structure:
// patientId: "patient123",
// name: [
//   {
//       given: ["Ben"],
//       family: "Rooke",
//   }
// ]
//
// Assume that there is no prebuilt StorySchema, and build a dynamic schema.

withSchema(
  ajv()
    .property("patientId", StorySchema.String)
    .arrayProperty(
      "name",
      ajv()
        .arrayProperty("given", StorySchema.String)
        .property("family", StorySchema.String)
        .build()
    )
    .optionalProperty("mrn", StorySchema.String)
);

function ajv(): JSONSchemaBuilder {
  return new JSONSchemaBuilder();
}
