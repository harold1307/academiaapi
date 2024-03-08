import { app } from "@azure/functions";

import { ProgramaEnVarianteCursoController } from "../../Core/ProgramaEnVarianteCurso/Application/Controller";

const controller = new ProgramaEnVarianteCursoController();

// app.get("programasEnVariantesCursoGetAll", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.programasEnVariantesCursoGetAll(req, ctx),
// 	route: "programas-variantes-curso",
// });

app.get("programasEnVariantesCursoGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.programasEnVariantesCursoGetById(req, ctx),
	route: "programas-variantes-curso/{programaEnVarianteCursoId}",
});

// app.post("programasEnVariantesCursoCreate", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.programasEnVariantesCursoCreate(req, ctx),
// 	route: "programas-variantes-curso",
// });

app.deleteRequest("programasEnVariantesCursoDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.programasEnVariantesCursoDeleteById(req, ctx),
	route: "programas-variantes-curso/{programaEnVarianteCursoId}",
});

app.patch("programasEnVariantesCursoUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.programasEnVariantesCursoUpdateById(req, ctx),
	route: "programas-variantes-curso/{programaEnVarianteCursoId}",
});
