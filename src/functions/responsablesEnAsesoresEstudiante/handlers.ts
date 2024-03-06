import { app } from "@azure/functions";

import { ResponsableEnAsesorEstudianteController } from "../../Core/ResponsableEnAsesorEstudiante/Application/Controller";

const controller = new ResponsableEnAsesorEstudianteController();

// app.get("responsablesEnAsesoresEstudianteGetAll", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.responsablesEnAsesoresEstudianteGetAll(req, ctx),
// 	route: "responsables-en-asesores-estudiantes",
// });

// app.get("responsablesEnAsesoresEstudianteGetById", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.responsablesEnAsesoresEstudianteGetById(req, ctx),
// 	route: "responsables-en-asesores-estudiantes/{responsableEnAsesorEstudianteId}",
// });

// app.post("responsablesEnAsesoresEstudianteCreate", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.responsablesEnAsesoresEstudianteCreate(req, ctx),
// 	route: "responsables-en-asesores-estudiantes",
// });

app.deleteRequest("responsablesEnAsesoresEstudianteDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.responsablesEnAsesoresEstudianteDeleteById(req, ctx),
	route:
		"responsables-en-asesores-estudiantes/{responsableEnAsesorEstudianteId}",
});

// app.patch("responsablesEnAsesoresEstudianteUpdateById", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.responsablesEnAsesoresEstudianteUpdateById(req, ctx),
// 	route: "responsables-en-asesores-estudiantes/{responsableEnAsesorEstudianteId}",
// });
