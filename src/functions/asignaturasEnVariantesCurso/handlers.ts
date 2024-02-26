import { app } from "@azure/functions";

import { AsignaturaEnVarianteCursoController } from "../../Core/AsignaturaEnVarianteCurso/Application/Controller";

const controller = new AsignaturaEnVarianteCursoController();

// app.get("asignaturasEnVariantesCursoGetAll", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.asignaturasEnVariantesCursoGetAll(req, ctx),
// 	route: "asignaturas-variantes-curso",
// });

// app.get("asignaturasEnVariantesCursoGetById", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.asignaturasEnVariantesCursoGetById(req, ctx),
// 	route: "asignaturas-variantes-curso/{asignaturaEnVarianteCursoId}",
// });

// app.post("asignaturasEnVariantesCursoCreate", {
// 	authLevel: "anonymous",
// 	handler: (req, ctx) => controller.asignaturasEnVariantesCursoCreate(req, ctx),
// 	route: "asignaturas-variantes-curso",
// });

app.deleteRequest("asignaturasEnVariantesCursoDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.asignaturasEnVariantesCursoDeleteById(req, ctx),
	route: "asignaturas-variantes-curso/{asignaturaEnVarianteCursoId}",
});

app.patch("asignaturasEnVariantesCursoUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.asignaturasEnVariantesCursoUpdateById(req, ctx),
	route: "asignaturas-variantes-curso/{asignaturaEnVarianteCursoId}",
});
