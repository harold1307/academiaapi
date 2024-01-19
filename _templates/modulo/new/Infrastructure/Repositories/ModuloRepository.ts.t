---
to: src/Core/<%= name %>/Infrastructure/Repositories/<%= name %>Repository.ts
---
import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { I<%= name %> } from "../../Domain/I<%= name %>";
import type { I<%= name %>Repository } from "../../Domain/I<%= name %>Repository"

@injectable()
export class <%= name %>Repository implements I<%= name %>Repository {
  constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient){}

  getAll(): Promise<I<%= name %>[]> {
    
  }
  getById(id: string): Promise<I<%= name %> | null>{

  }
  deleteById(id: string): Promise<I<%= name %>>{

  }

  // create(data: ICreate<%= name %>): Promise<I<%= name %>>; {

  // }
  // update(params: IUpdate<%= name %>Params): Promise<I<%= name %>> {

  // }
}