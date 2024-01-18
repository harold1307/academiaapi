---
to: src/Core/<%= name %>/Application/Service.ts
---
import { inject, injectable } from "inversify";

import { TYPES } from "../../../Main/Inversify/types";
import type { I<%= name %> } from "../Domain/I<%= name %>.ts"
import type { I<%= name %>Repository } from "../Domain/I<%= name %>Repository.ts"
import type { I<%= name %>Service } from "../Domain/I<%= name %>Service.ts"

@injectable()
export class <%= name %>Service implements I<%= name %>Service {
  constructor(@inject(TYPES.<%= name %>Repository) private _<%= name.charAt(0).toLowerCase() + name.slice(1) %>Repository: I<%= name %>Repository){}

	getAll<%= name %>s(): Promise<I<%= name %>[]> {

  }

	get<%= name %>ById(id: string): Promise<I<%= name %> | null> {

  }

	delete<%= name %>ById(id: string): Promise<I<%= name %>> {
    
  }

  // create<%= name %>(data: ICreate<%= name %>): Promise<I<%= name %>> {}
	// update<%= name %>ById(params: IUpdate<%= name %>Params): Promise<I<%= name %>> {}
}