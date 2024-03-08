import { app } from "@azure/functions";

import { AsesorEstudianteController } from "../../Core/AsesorEstudiante/Application/Controller";

const controller = new AsesorEstudianteController();

app.get("asesoresEstudianteGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asesoresEstudianteGetAll(req, ctx),
	route: "asesores-estudiante",
});

app.get("asesoresEstudianteGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asesoresEstudianteGetById(req, ctx),
	route: "asesores-estudiante/{asesorEstudianteId}",
});

// app.post("asesoresEstudianteCreate", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.asesoresEstudianteCreate(req, ctx),
// 	route: "asesores-estudiante",
// });

app.deleteRequest("asesoresEstudianteDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asesoresEstudianteDeleteById(req, ctx),
	route: "asesores-estudiante/{asesorEstudianteId}",
});

app.patch("asesoresEstudianteUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asesoresEstudianteUpdateById(req, ctx),
	route: "asesores-estudiante/{asesorEstudianteId}",
});
