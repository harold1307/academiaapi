import { app } from "@azure/functions";

import { UbicacionController } from "../../Core/Ubicacion/Application/Controller";

const controller = new UbicacionController();

app.get("ubicacionesGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.ubicacionesGetAll(req, ctx),
	route: "ubicaciones",
});

app.get("ubicacionesGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.ubicacionesGetById(req, ctx),
	route: "ubicaciones/{ubicacionId}",
});

app.deleteRequest("ubicacionesDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.ubicacionesDeleteById(req, ctx),
	route: "ubicaciones/{ubicacionId}",
});

app.patch("ubicacionesUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.ubicacionesUpdateById(req, ctx),
	route: "ubicaciones/{ubicacionId}",
});
