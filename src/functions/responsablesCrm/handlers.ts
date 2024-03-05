import { app } from "@azure/functions";

import { ResponsableCrmController } from "../../Core/ResponsableCrm/Application/Controller";

const controller = new ResponsableCrmController();

app.get("responsablesCrmGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.responsablesCrmGetAll(req, ctx),
	route: "responsables-crm",
});

app.get("responsablesCrmGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.responsablesCrmGetById(req, ctx),
	route: "responsables-crm/{responsableCrmId}",
});

// app.post("responsablesCrmCreate", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.responsablesCrmCreate(req, ctx),
// 	route: "responsables-crm",
// });

app.deleteRequest("responsablesCrmDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.responsablesCrmDeleteById(req, ctx),
	route: "responsables-crm/{responsableCrmId}",
});

app.patch("responsablesCrmUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.responsablesCrmUpdateById(req, ctx),
	route: "responsables-crm/{responsableCrmId}",
});
