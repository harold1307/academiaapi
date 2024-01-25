import { app } from "@azure/functions";
import { ModeloNivelacionController } from "../../Core/ModeloNivelacion/Application/Controller";

const controller = new ModeloNivelacionController();

app.get("modelosNivelacionGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.modelosNivelacionGetAll(req, ctx),
	route: "modelos-nivelacion",
});

app.get("modelosNivelacionGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.modelosNivelacionGetById(req, ctx),
	route: "modelos-nivelacion/{modeloNivelacionId}",
});

app.post("modelosNivelacionCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.modelosNivelacionCreate(req, ctx),
	route: "modelos-nivelacion",
});

app.deleteRequest("modelosNivelacionDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.modelosNivelacionDeleteById(req, ctx),
	route: "modelos-nivelacion/{modeloNivelacionId}",
});

app.patch("modelosNivelacionUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.modelosNivelacionUpdateById(req, ctx),
	route: "modelos-nivelacion/{modeloNivelacionId}",
});
