import { IApiSchema } from "@foal/core";

export const MessageShema: IApiSchema = {
  properties: {
    message: { type: 'string' }
  }
};