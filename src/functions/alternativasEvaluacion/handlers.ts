import { app } from "@azure/functions";
import { AlternativaEvaluacionController } from "../../Core/AlternativaEvaluacion/Application/Controller";

const controller = new AlternativaEvaluacionController();

app.get("alternativasSolucionGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.alternativasEvaluacionGetAll(req, ctx),
	route: "alternativas-evaluacion",
});

app.get("alternativasSolucionGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.alternativasEvaluacionGetById(req, ctx),
	route: "alternativas-evaluacion/{alternativaEvaluacionId}",
});

app.post("alternativasSolucionCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.alternativasEvaluacionCreate(req, ctx),
	route: "alternativas-evaluacion",
});

app.deleteRequest("alternativasSolucionDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.alternativasEvaluacionDeleteById(req, ctx),
	route: "alternativas-evaluacion/{alternativaEvaluacionId}",
});

app.patch("alternativasSolucionUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.alternativasEvaluacionUpdateById(req, ctx),
	route: "alternativas-evaluacion/{alternativaEvaluacionId}",
});
