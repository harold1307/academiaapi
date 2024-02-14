import { app } from "@azure/functions";

import { CorteController } from "../../Core/Corte/Application/Controller";

const controller = new CorteController();

app.get("cortesGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cortesGetAll(req, ctx),
	route: "cortes",
});

app.get("cortesGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cortesGetById(req, ctx),
	route: "cortes/{corteId}",
});

app.post("cortesCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cortesCreate(req, ctx),
	route: "cortes",
});

app.deleteRequest("cortesDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cortesDeleteById(req, ctx),
	route: "cortes/{corteId}",
});

app.patch("cortesUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cortesUpdateById(req, ctx),
	route: "cortes/{corteId}",
});
