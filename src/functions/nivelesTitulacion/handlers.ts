import { app } from "@azure/functions";

import { NivelTitulacionController } from "../../Core/NivelTitulacion/Application/Controller";

const controller = new NivelTitulacionController();

app.get("nivelesTitulacionGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.nivelesTitulacionGetAll(req, ctx),
	route: "niveles-titulacion",
});

app.get("nivelesTitulacionGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.nivelesTitulacionGetById(req, ctx),
	route: "niveles-titulacion/{nivelTitulacionId}",
});

app.post("nivelesTitulacionCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.nivelesTitulacionCreate(req, ctx),
	route: "niveles-titulacion",
});

app.deleteRequest("nivelesTitulacionDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.nivelesTitulacionDeleteById(req, ctx),
	route: "niveles-titulacion/{nivelTitulacionId}",
});

app.patch("nivelesTitulacionUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.nivelesTitulacionUpdateById(req, ctx),
	route: "niveles-titulacion/{nivelTitulacionId}",
});

// detalles
app.post("nivelesTitulacionCreateDetalle", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.nivelesTitulacionCreateDetalle(req, ctx),
	route: "niveles-titulacion/{nivelTitulacionId}/detalles",
});
