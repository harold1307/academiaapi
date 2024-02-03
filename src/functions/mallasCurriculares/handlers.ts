import { app } from "@azure/functions";

import { MallaCurricularController } from "../../Core/MallaCurricular/Application/Controller";

const controller = new MallaCurricularController();

app.get("mallasCurricularesGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.mallasCurricularesGetAll(req, ctx),
	route: "mallas-curriculares",
});

app.get("mallasCurricularesGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.mallasCurricularesGetById(req, ctx),
	route: "mallas-curriculares/{mallaCurricularId}",
});

app.patch("mallasCurricularesUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.mallasCurricularesUpdateById(req, ctx),
	route: "mallas-curriculares/{mallaCurricularId}",
});

app.deleteRequest("mallasCurricularesDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.mallasCurricularesDeleteById(req, ctx),
	route: "mallas-curriculares/{mallaCurricularId}",
});

// lugares de ejecucion
app.post("mallasCurricularesCreateLugarEjecucion", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.mallasCurricularesCreateLugarEjecucion(req, ctx),
	route: "mallas-curriculares/{mallaCurricularId}/lugares-ejecucion",
});
app.get("mallasCurricularesGetByIdWithLugaresEjecucion", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.mallasCurricularesGetByIdWithLugaresEjecucion(req, ctx),
	route: "mallas-curriculares/{mallaCurricularId}/lugares-ejecucion",
});

// asignaturas en niveles de la malla
app.post("mallasCurricularesCreateAsignaturaEnNivelMalla", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.mallasCurricularesCreateAsignaturaEnNivelMalla(req, ctx),
	route: "mallas-curriculares/{mallaCurricularId}/niveles/{nivelMallaId}",
});
app.get("mallasCurricularesGetByIdWithAsignaturas", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.mallasCurricularesGetByIdWithAsignaturas(req, ctx),
	route: "mallas-curriculares/{mallaCurricularId}/asignaturas",
});
