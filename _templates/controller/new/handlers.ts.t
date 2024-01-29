---
to: src/functions/<%= h.inflection.camelize(pluralName, true) %>/handlers.ts
---
import { app } from "@azure/functions";

import { <%= name %>Controller } from "../../Core/<%= name %>/Application/Controller";

const controller = new <%= name %>Controller();

app.get("<%=h.inflection.camelize(pluralName, true) %>GetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.<%=h.inflection.camelize(pluralName, true) %>GetAll(req, ctx),
	route: "<%= path %>",
});

app.get("<%=h.inflection.camelize(pluralName, true) %>GetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.<%=h.inflection.camelize(pluralName, true) %>GetById(req, ctx),
	route: "<%= path %>/{<%= h.inflection.camelize(name, true) %>Id}",
});

app.post("<%=h.inflection.camelize(pluralName, true) %>Create", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.<%=h.inflection.camelize(pluralName, true) %>Create(req, ctx),
	route: "<%= path %>",
});

app.deleteRequest("<%=h.inflection.camelize(pluralName, true) %>DeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.<%=h.inflection.camelize(pluralName, true) %>DeleteById(req, ctx),
	route: "<%= path %>/{<%= h.inflection.camelize(name, true) %>Id}",
});

app.patch("<%=h.inflection.camelize(pluralName, true) %>UpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.<%=h.inflection.camelize(pluralName, true) %>UpdateById(req, ctx),
	route: "<%= path %>/{<%= h.inflection.camelize(name, true) %>Id}",
});