---
to: src/Core/<%= name %>/Domain/I<%= name %>Repository.ts
---
import type { I<%= name %> } from "./I<%= name %>"
import type { ICreate<%= name %> } from "./ICreate<%= name %>"
import type { IUpdate<%= name %> } from "./IUpdate<%= name %>";

export type Update<%= name %>Params = {
	id: string;
	data: IUpdate<%= name %>;
}

export type I<%= name %>Repository = {
  create(data: ICreate<%= name %>): Promise<I<%= name %>>;
	getAll(): Promise<I<%= name %>[]>;
	getById(id: string): Promise<I<%= name %> | null>;
	update(params: Update<%= name %>Params): Promise<I<%= name %>>;
	deleteById(id: string): Promise<I<%= name %>>;
}