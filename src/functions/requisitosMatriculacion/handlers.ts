import { app } from "@azure/functions";

import { RequisitoMatriculacionController } from "../../Core/RequisitoMatriculacion/Application/Controller";

const controller = new RequisitoMatriculacionController();

app.get("requisitosMatriculacionGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.requisitosMatriculacionGetAll(req, ctx),
	route: "requisitos-matriculacion",
});

app.get("requisitosMatriculacionGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.requisitosMatriculacionGetById(req, ctx),
	route: "requisitos-matriculacion/{requisitoMatriculacionId}",
});

// app.post("requisitosMatriculacionCreate", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.requisitosMatriculacionCreate(req, ctx),
// 	route: "requisitos-matriculacion",
// });

app.deleteRequest("requisitosMatriculacionDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.requisitosMatriculacionDeleteById(req, ctx),
	route: "requisitos-matriculacion/{requisitoMatriculacionId}",
});

app.patch("requisitosMatriculacionUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.requisitosMatriculacionUpdateById(req, ctx),
	route: "requisitos-matriculacion/{requisitoMatriculacionId}",
});