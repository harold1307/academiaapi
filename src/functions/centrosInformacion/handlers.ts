import { app } from "@azure/functions";

import { CentroInformacionController } from "../../Core/CentroInformacion/Application/Controller";

const controller = new CentroInformacionController();

app.get("centrosInformacionGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.centrosInformacionGetAll(req, ctx),
	route: "centros-informacion",
});

app.get("centrosInformacionGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.centrosInformacionGetById(req, ctx),
	route: "centros-informacion/{centroInformacionId}",
});

app.post("centrosInformacionCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.centrosInformacionCreate(req, ctx),
	route: "centros-informacion",
});

app.deleteRequest("centrosInformacionDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.centrosInformacionDeleteById(req, ctx),
	route: "centros-informacion/{centroInformacionId}",
});

app.patch("centrosInformacionUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.centrosInformacionUpdateById(req, ctx),
	route: "centros-informacion/{centroInformacionId}",
});