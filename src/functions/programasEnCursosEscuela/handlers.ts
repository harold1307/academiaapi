import { app } from "@azure/functions";

import { ProgramaEnCursoEscuelaController } from "../../Core/ProgramaEnCursoEscuela/Application/Controller";

const controller = new ProgramaEnCursoEscuelaController();

// app.get("programasEnCursosEscuelaGetAll", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.programasEnCursosEscuelaGetAll(req, ctx),
// 	route: "programas-cursos-escuela",
// });

app.get("programasEnCursosEscuelaGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.programasEnCursosEscuelaGetById(req, ctx),
	route: "programas-cursos-escuela/{programaEnCursoEscuelaId}",
});

// app.post("programasEnCursosEscuelaCreate", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.programasEnCursosEscuelaCreate(req, ctx),
// 	route: "programas-cursos-escuela",
// });

app.deleteRequest("programasEnCursosEscuelaDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.programasEnCursosEscuelaDeleteById(req, ctx),
	route: "programas-cursos-escuela/{programaEnCursoEscuelaId}",
});

app.patch("programasEnCursosEscuelaUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.programasEnCursosEscuelaUpdateById(req, ctx),
	route: "programas-cursos-escuela/{programaEnCursoEscuelaId}",
});
