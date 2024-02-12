import { app } from "@azure/functions";

import { AsignaturaModuloEnMallaController } from "../../Core/AsignaturaModuloEnMalla/Application/Controller";

const controller = new AsignaturaModuloEnMallaController();

app.get("asignaturasModulosEnMallasGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asignaturasModulosEnMallasGetAll(req, ctx),
	route: "modulos-malla",
});

app.get("asignaturasModulosEnMallasGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asignaturasModulosEnMallasGetById(req, ctx),
	route: "modulos-malla/{asignaturaModuloEnMallaId}",
});

// app.post("asignaturasModulosEnMallasCreate", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.asignaturasModulosEnMallasCreate(req, ctx),
// 	route: "modulos-malla",
// });

app.deleteRequest("asignaturasModulosEnMallasDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.asignaturasModulosEnMallasDeleteById(req, ctx),
	route: "modulos-malla/{asignaturaModuloEnMallaId}",
});

app.patch("asignaturasModulosEnMallasUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.asignaturasModulosEnMallasUpdateById(req, ctx),
	route: "modulos-malla/{asignaturaModuloEnMallaId}",
});
