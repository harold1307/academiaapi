import { app } from "@azure/functions";
import { ModeloEvaluativoController } from "../../Core/ModeloEvaluativo/Application/Controller";

const controller = new ModeloEvaluativoController();

app.get("modelosEvaluativosGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.modelosEvaluativosGetAll(req, ctx),
	route: "modelos-evaluativos",
});

app.get("modelosEvaluativosGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.modelosEvaluativosGetById(req, ctx),
	route: "modelos-evaluativos/{modeloEvaluativoId}",
});

app.post("modelosEvaluativosCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.modelosEvaluativosCreate(req, ctx),
	route: "modelos-evaluativos",
});

app.deleteRequest("modelosEvaluativosDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.modelosEvaluativosDeleteById(req, ctx),
	route: "modelos-evaluativos/{modeloEvaluativoId}",
});

app.patch("modelosEvaluativosUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.modelosEvaluativosUpdateById(req, ctx),
	route: "modelos-evaluativos/{modeloEvaluativoId}",
});

// campos
app.post("modelosEvaluativosCreateCampo", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.modelosEvaluativosCreateCampo(req, ctx),
	route:
		"modelos-evaluativos/{modeloEvaluativoId}/alternativas-evaluacion/{alternativaEvaluacionId}",
});
