import { app } from "@azure/functions";

import { CampoFormacionController } from "../../Core/CampoFormacion/Application/Controller";

const controller = new CampoFormacionController();

app.get("camposFormacionGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.camposFormacionGetAll(req, ctx),
	route: "campos-formacion",
});

app.get("camposFormacionGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.camposFormacionGetById(req, ctx),
	route: "campos-formacion/{campoFormacionId}",
});

app.post("camposFormacionCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.camposFormacionCreate(req, ctx),
	route: "campos-formacion",
});

app.deleteRequest("camposFormacionDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.camposFormacionDeleteById(req, ctx),
	route: "campos-formacion/{campoFormacionId}",
});

app.patch("camposFormacionUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.camposFormacionUpdateById(req, ctx),
	route: "campos-formacion/{campoFormacionId}",
});
