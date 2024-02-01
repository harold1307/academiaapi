import { app } from "@azure/functions";

import { CoordinacionController } from "../../Core/Coordinacion/Application/Controller";

const controller = new CoordinacionController();

app.get("coordinacionesGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.coordinacionesGetAll(req, ctx),
	route: "coordinaciones",
});

app.get("coordinacionesGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.coordinacionesGetById(req, ctx),
	route: "coordinaciones/{coordinacionId}",
});

app.deleteRequest("coordinacionesDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.coordinacionesDeleteById(req, ctx),
	route: "coordinaciones/{coordinacionId}",
});

app.patch("coordinacionesUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.coordinacionesUpdateById(req, ctx),
	route: "coordinaciones/{coordinacionId}",
});

// programas
app.post("coordinacionesCreatePrograma", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.coordinacionesCreatePrograma(req, ctx),
	route: "coordinaciones/{coordinacionId}/programas",
});
