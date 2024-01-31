import { app } from "@azure/functions";

import { DetalleNivelTitulacionController } from "../../Core/DetalleNivelTitulacion/Application/Controller";

const controller = new DetalleNivelTitulacionController();

app.get("detallesNivelTitulacionGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.detallesNivelTitulacionGetAll(req, ctx),
	route: "detalles-nivel-titulacion",
});

app.get("detallesNivelTitulacionGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.detallesNivelTitulacionGetById(req, ctx),
	route: "detalles-nivel-titulacion/{detalleNivelTitulacionId}",
});

app.deleteRequest("detallesNivelTitulacionDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.detallesNivelTitulacionDeleteById(req, ctx),
	route: "detalles-nivel-titulacion/{detalleNivelTitulacionId}",
});

app.patch("detallesNivelTitulacionUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.detallesNivelTitulacionUpdateById(req, ctx),
	route: "detalles-nivel-titulacion/{detalleNivelTitulacionId}",
});
