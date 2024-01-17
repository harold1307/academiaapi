import { app } from "@azure/functions";
import { CursoController } from "../../Core/Curso/Application/Controller";

const controller = new CursoController();

app.get("cursosGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cursosGetAll(req, ctx),
	route: "cursos",
});

app.get("cursosGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cursosGetById(req, ctx),
	route: "cursos/{cursoId}",
});

app.post("cursosCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cursosCreate(req, ctx),
	route: "cursos",
});

app.patch("cursosUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cursosUpdateById(req, ctx),
	route: "cursos/{cursoId}",
});

app.deleteRequest("cursosDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cursosDeleteById(req, ctx),
	route: "cursos/{cursoId}",
});

app.post("createVarianteCurso", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cursosCreateVarianteCurso(req, ctx),
	route: "cursos/{cursoId}/variantes",
});

app.get("byIdGetVariantesCursos", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.cursosByIdGetVarianteCurso(req, ctx),
	route: "cursos/{cursoId}/variantes",
});
