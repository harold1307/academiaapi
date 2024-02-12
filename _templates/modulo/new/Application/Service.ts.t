---
to: src/Core/<%= name %>/Application/Service.ts
---
import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { I<%= name %> } from "../Domain/I<%= name %>"
import type { I<%= name %>Repository, Update<%= name %>Params } from "../Domain/I<%= name %>Repository"
import type { I<%= name %>Service } from "../Domain/I<%= name %>Service"
import type { ICreate<%= name %> } from "../Domain/ICreate<%= name %>"

@injectable()
export class <%= name %>Service implements I<%= name %>Service {
  constructor(@inject(TYPES.<%= name %>Repository) private _<%= name.charAt(0).toLowerCase() + name.slice(1) %>Repository: I<%= name %>Repository){}

	getAll<%= name %>s(): Promise<I<%= name %>[]> {
    return this._<%= name.charAt(0).toLowerCase() + name.slice(1) %>Repository.getAll()
  }

	get<%= name %>ById(id: string): Promise<I<%= name %> | null> {
    return this._<%= name.charAt(0).toLowerCase() + name.slice(1) %>Repository.getById()
  }

	delete<%= name %>ById(id: string): Promise<I<%= name %>> {
    
  }

  create<%= name %>(data: ICreate<%= name %>): Promise<I<%= name %>> {}
	update<%= name %>ById(params: Update<%= name %>Params): Promise<I<%= name %>> {}
}

class <%= name %>ServiceError extends Error {
  constructor(message: string){
    super();
    this.message = message;
    this.name = "<%= name %>ServiceError"
  }
}