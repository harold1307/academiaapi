import { app } from "@azure/functions";

import { AsignaturaEnNivelMallaController } from "../../Core/AsignaturaEnNivelMalla/Application/Controller";

const controller = new AsignaturaEnNivelMallaController();

// app.get("asignaturasEnNivelesMallaGetAll", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.asignaturasEnNivelesMallaGetAll(req, ctx),
// 	route: "asignaturas-niveles-malla",
// });

app.get("asignaturasEnNivelesMallaGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asignaturasEnNivelesMallaGetById(req, ctx),
	route: "asignaturas-niveles-malla/{asignaturaEnNivelMallaId}",
});

// app.post("asignaturasEnNivelesMallaCreate", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.asignaturasEnNivelesMallaCreate(req, ctx),
// 	route: "asignaturas-niveles-malla",
// });

app.deleteRequest("asignaturasEnNivelesMallaDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.asignaturasEnNivelesMallaDeleteById(req, ctx),
	route: "asignaturas-niveles-malla/{asignaturaEnNivelMallaId}",
});

app.patch("asignaturasEnNivelesMallaUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.asignaturasEnNivelesMallaUpdateById(req, ctx),
	route: "asignaturas-niveles-malla/{asignaturaEnNivelMallaId}",
});
