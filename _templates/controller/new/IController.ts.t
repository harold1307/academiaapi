---
to: src/Core/<%= name %>/Domain/I<%= name %>Controller.ts
---
<%
 pluralName = h.inflection.camelize(pluralName, true)
%>

import type {
	HttpRequest,
	HttpResponseInit,
	InvocationContext,
} from "@azure/functions";

export type I<%= name %>Controller = {
  <%= pluralName %>Create(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	<%= pluralName %>DeleteById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	<%= pluralName %>GetAll(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	<%= pluralName %>GetById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
	<%= pluralName %>UpdateById(
		req: HttpRequest,
		ctx: InvocationContext,
	): Promise<HttpResponseInit>;
}