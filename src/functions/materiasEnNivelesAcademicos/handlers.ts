import { app } from "@azure/functions";

import { MateriaEnNivelAcademicoController } from "../../Core/MateriaEnNivelAcademico/Application/Controller";

const controller = new MateriaEnNivelAcademicoController();

app.get("materiasEnNivelesAcademicosGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.materiasEnNivelesAcademicosGetAll(req, ctx),
	route: "materias-niveles-academicos",
});

app.get("materiasEnNivelesAcademicosGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.materiasEnNivelesAcademicosGetById(req, ctx),
	route: "materias-niveles-academicos/{materiaEnNivelAcademicoId}",
});

app.deleteRequest("materiasEnNivelesAcademicosDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.materiasEnNivelesAcademicosDeleteById(req, ctx),
	route: "materias-niveles-academicos/{materiaEnNivelAcademicoId}",
});

app.patch("materiasEnNivelesAcademicosUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) =>
		controller.materiasEnNivelesAcademicosUpdateById(req, ctx),
	route: "materias-niveles-academicos/{materiaEnNivelAcademicoId}",
});
