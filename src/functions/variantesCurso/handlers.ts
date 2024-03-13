import { app } from "@azure/functions";

import { VarianteCursoController } from "../../Core/VarianteCurso/Application/Controller";

const controller = new VarianteCursoController();

app.get("byIdGetAsignaturas", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.variantesCursoByIdGetAsignaturas(req, ctx),
	route: "variantes-curso/{varianteCursoId}/asignaturas",
});

app.get("variantesCursoGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.variantesCursoGetAll(req, ctx),
	route: "variantes-curso",
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

// curso escuelas
app.post("variantesCursoByIdCreateCursoEscuela", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.variantesCursoByIdCreateCursoEscuela(req, ctx),
	route: "variantes-curso/{varianteCursoId}/curso-escuelas",
});

// programas
app.get("variantesCursoByIdGetProgramas", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.variantesCursoByIdGetProgramas(req, ctx),
	route: "variantes-curso/{varianteCursoId}/programas",
});
app.post("variantesCursoByIdCreateProgramaEnVariante", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.variantesCursoByIdCreateProgramaEnVariante(req, ctx),
	route: "variantes-curso/{varianteCursoId}/programas",
});
