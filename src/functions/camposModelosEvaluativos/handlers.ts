import { app } from "@azure/functions";
import { CampoModeloEvaluativoController } from "../../Core/CampoModeloEvaluativo/Application/Controller";

const controller = new CampoModeloEvaluativoController();

app.get("camposModelosEvaluativosGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.camposModelosEvaluativosGetAll(req, ctx),
	route: "campos-modelos-evaluativos",
});

app.get("camposModelosEvaluativosGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.camposModelosEvaluativosGetById(req, ctx),
	route: "campos-modelos-evaluativos/{campoModeloEvaluativoId}",
});

app.deleteRequest("camposModelosEvaluativosDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.camposModelosEvaluativosDeleteById(req, ctx),
	route: "campos-modelos-evaluativos/{campoModeloEvaluativoId}",
});

app.patch("camposModelosEvaluativosUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.camposModelosEvaluativosUpdateById(req, ctx),
	route: "campos-modelos-evaluativos/{campoModeloEvaluativoId}",
});
