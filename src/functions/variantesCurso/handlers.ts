import { app } from "@azure/functions";

import { VarianteCursoController } from "../../Core/VarianteCurso/Application/Controller";

const controller = new VarianteCursoController();

app.get("byIdGetAsignaturas", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.variantesCursoByIdGetAsignaturas(req, ctx),
	route: "variantes-curso/{varianteCursoId}/asignaturas",
});

app.patch("variantesCursoUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.variantesCursoUpdateById(req, ctx),
	route: "variantes-curso/{varianteCursoId}",
});

app.deleteRequest("variantesCursoDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.variantesCursoDeleteById(req, ctx),
	route: "variantes-curso/{varianteCursoId}",
});

app.post("createAsignaturaEnVarianteCurso", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.variantesCursoByIdCreateAsignatura(req, ctx),
	route: "variantes-curso/{varianteCursoId}/asignaturas/{asignaturaId}",
});

// curso escuelas
app.post("variantesCursoByIdCreateCursoEscuela", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.variantesCursoByIdCreateCursoEscuela(req, ctx),
	route: "variantes-curso/{varianteCursoId}/curso-escuelas",
});
