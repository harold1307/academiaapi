import { app } from "@azure/functions";

import { AsesorCrmController } from "../../Core/AsesorCrm/Application/Controller";

const controller = new AsesorCrmController();

app.get("asesoresCrmGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asesoresCrmGetAll(req, ctx),
	route: "asesores-crm",
});

// app.get("asesoresCrmGetById", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.asesoresCrmGetById(req, ctx),
// 	route: "asesores-crm/{asesorCrmId}",
// });

// app.post("asesoresCrmCreate", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.asesoresCrmCreate(req, ctx),
// 	route: "asesores-crm",
// });

app.deleteRequest("asesoresCrmDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asesoresCrmDeleteById(req, ctx),
	route: "asesores-crm/{asesorCrmId}",
});

app.patch("asesoresCrmUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asesoresCrmUpdateById(req, ctx),
	route: "asesores-crm/{asesorCrmId}",
});
