import { app } from "@azure/functions";

import { CursoEscuelaController } from "../../Core/CursoEscuela/Application/Controller";

const controller = new CursoEscuelaController();

app.get("cursoEscuelasGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cursoEscuelasGetAll(req, ctx),
	route: "curso-escuelas",
});

app.get("cursoEscuelasGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cursoEscuelasGetById(req, ctx),
	route: "curso-escuelas/{cursoEscuelaId}",
});

app.post("cursoEscuelasCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cursoEscuelasCreate(req, ctx),
	route: "curso-escuelas",
});

app.deleteRequest("cursoEscuelasDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cursoEscuelasDeleteById(req, ctx),
	route: "curso-escuelas/{cursoEscuelaId}",
});

// app.patch("cursoEscuelasUpdateById", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.cursoEscuelasUpdateById(req, ctx),
// 	route: "curso-escuelas/{cursoEscuelaId}",
// });

// asignaturas
app.post("cursoEscuelasCreateAsignatura", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cursoEscuelasCreateAsignatura(req, ctx),
	route: "curso-escuelas/{cursoEscuelaId}/asignaturas/{asignaturaId}",
});

// programas
app.post("cursoEscuelasCreateProgramaEnCurso", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.cursoEscuelasCreateProgramaEnCurso(req, ctx),
	route: "curso-escuelas/{cursoEscuelaId}/programas",
});
app.get("cursoEscuelasGetByIdWithProgramas", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cursoEscuelasGetByIdWithProgramas(req, ctx),
	route: "curso-escuelas/{cursoEscuelaId}/programas",
});
