---
to: src/Core/<%= name %>/Infrastructure/Repositories/<%= name %>Repository.ts
---
import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { I<%= name %> } from "../../Domain/I<%= name %>";
import type { I<%= name %>Repository, Update<%= name %>Params } from "../../Domain/I<%= name %>Repository"
import type { ICreate<%= name %> } from "../../Domain/ICreate<%= name %>"

@injectable()
export class <%= name %>Repository implements I<%= name %>Repository {
  constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient){}

  getAll(): Promise<I<%= name %>[]> {
    
  }
  getById(id: string): Promise<I<%= name %> | null>{

  }
  deleteById(id: string): Promise<I<%= name %>>{

  }

  create(data: ICreate<%= name %>): Promise<I<%= name %>> {

  }
  update(params: Update<%= name %>Params): Promise<I<%= name %>> {

  }
}