import { app } from "@azure/functions";
import { AsignaturaEnCursoEscuelaController } from "../../Core/AsignaturaEnCursoEscuela/Application/Controller";

const controller = new AsignaturaEnCursoEscuelaController();

app.get("asignaturasEnCursoEscuelasGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asignaturasEnCursoEscuelasGetAll(req, ctx),
	route: "asignaturas-en-curso-escuelas",
});

app.get("asignaturasEnCursoEscuelasGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.asignaturasEnCursoEscuelasGetById(req, ctx),
	route: "asignaturas-en-curso-escuelas/{asignaturaEnCursoEscuelaId}",
});

app.patch("asignaturasEnCursoEscuelasUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.asignaturasEnCursoEscuelasUpdateById(req, ctx),
	route: "asignaturas-en-curso-escuelas/{asignaturaEnCursoEscuelaId}",
});

app.deleteRequest("asignaturasEnCursoEscuelasDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.asignaturasEnCursoEscuelasDeleteById(req, ctx),
	route: "asignaturas-en-curso-escuelas/{asignaturaEnCursoEscuelaId}",
});
