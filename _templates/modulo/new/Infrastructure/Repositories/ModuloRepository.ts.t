---
to: src/Core/<%= name %>/Infrastructure/Repositories/<%= name %>Repository.ts
---
import type { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";

import { TYPES } from "../../../../Main/Inversify/types";
import type { I<%= name %> } from "../../Domain/I<%= name %>";
import type { I<%= name %>Repository } from "../../Domain/I<%= name %>Repository.ts"

@injectable()
export class <%= name %>Repository implements I<%= name %>Repository {
  constructor(@inject(TYPES.PrismaClient) private _client: PrismaClient){}

  async getAll(): Promise<I<%= name %>[]> {
    
  }
  async getById(id: string): Promise<I<%= name %>>{

  }
  async deleteById(id: string): Promise<I<%= name %>>{

  }

  // async create(data: ICreate<%= name %>): Promise<I<%= name %>>; {

  // }
  // async update(params: IUpdate<%= name %>Params): Promise<I<%= name %>>; {

  // }
}