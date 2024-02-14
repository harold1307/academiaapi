import { app } from "@azure/functions";

import { CronogramaMatriculacionController } from "../../Core/CronogramaMatriculacion/Application/Controller";

const controller = new CronogramaMatriculacionController();

// app.get("cronogramasMatriculacionGetAll", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.cronogramasMatriculacionGetAll(req, ctx),
// 	route: "cronogramas-matriculacion",
// });

app.get("cronogramasMatriculacionGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cronogramasMatriculacionGetById(req, ctx),
	route: "cronogramas-matriculacion/{cronogramaMatriculacionId}",
});

// app.post("cronogramasMatriculacionCreate", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.cronogramasMatriculacionCreate(req, ctx),
// 	route: "cronogramas-matriculacion",
// });

app.deleteRequest("cronogramasMatriculacionDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.cronogramasMatriculacionDeleteById(req, ctx),
	route: "cronogramas-matriculacion/{cronogramaMatriculacionId}",
});

app.patch("cronogramasMatriculacionUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.cronogramasMatriculacionUpdateById(req, ctx),
	route: "cronogramas-matriculacion/{cronogramaMatriculacionId}",
});
