import { app } from "@azure/functions";

import { ResponsableAsesorEstudianteController } from "../../Core/ResponsableAsesorEstudiante/Application/Controller";

const controller = new ResponsableAsesorEstudianteController();

app.get("responsablesAsesoresEstudianteGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.responsablesAsesoresEstudianteGetAll(req, ctx),
	route: "responsables-asesores-estudiante",
});

app.get("responsablesAsesoresEstudianteGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.responsablesAsesoresEstudianteGetById(req, ctx),
	route: "responsables-asesores-estudiante/{responsableAsesorEstudianteId}",
});

// app.post("responsablesAsesoresEstudianteCreate", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) =>
// 		controller.responsablesAsesoresEstudianteCreate(req, ctx),
// 	route: "responsables-asesores-estudiante",
// });

app.deleteRequest("responsablesAsesoresEstudianteDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.responsablesAsesoresEstudianteDeleteById(req, ctx),
	route: "responsables-asesores-estudiante/{responsableAsesorEstudianteId}",
});

// app.patch("responsablesAsesoresEstudianteUpdateById", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) =>
// 		controller.responsablesAsesoresEstudianteUpdateById(req, ctx),
// 	route: "responsables-asesores-estudiante/{responsableAsesorEstudianteId}",
// });
