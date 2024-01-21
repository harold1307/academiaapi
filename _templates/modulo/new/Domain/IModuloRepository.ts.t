---
to: src/Core/<%= name %>/Domain/I<%= name %>Repository.ts
---
import type { I<%= name %> } from "./I<%= name %>"
import type { ICreate<%= name %> } from "./ICreate<%= name %>"

export type IUpdate<%= name %>Params = {
	id: string;
	data: {};
}

export type I<%= name %>Repository = {
  create(data: ICreate<%= name %>): Promise<I<%= name %>>;
	getAll(): Promise<I<%= name %>[]>;
	getById(id: string): Promise<I<%= name %> | null>;
	// update(params: IUpdate<%= name %>Params): Promise<I<%= name %>>;
	deleteById(id: string): Promise<I<%= name %>>;
}