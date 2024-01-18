---
to: src/Core/<%= name %>/Domain/I<%= name %>Service.ts
---
import type { I<%= name %> } from "./I<%= name %>.ts"

export type I<%= name %>Service = {
  // create<%= name %>(data: ICreate<%= name %>): Promise<I<%= name %>>;
	getAll<%= name %>s(): Promise<I<%= name %>[]>;
	get<%= name %>ById(id: string): Promise<I<%= name %> | null>;
	// update<%= name %>ById(params: IUpdate<%= name %>Params): Promise<I<%= name %>>;
	delete<%= name %>ById(id: string): Promise<I<%= name %>>;
}