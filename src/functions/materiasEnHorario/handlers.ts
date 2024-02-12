import { app } from "@azure/functions";

import { MateriaEnHorarioController } from "../../Core/MateriaEnHorario/Application/Controller";

const controller = new MateriaEnHorarioController();

app.get("materiasEnHorarioGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.materiasEnHorarioGetAll(req, ctx),
	route: "materias-horario",
});

app.get("materiasEnHorarioGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.materiasEnHorarioGetById(req, ctx),
	route: "materias-horario/{materiaEnHorarioId}",
});

app.deleteRequest("materiasEnHorarioDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.materiasEnHorarioDeleteById(req, ctx),
	route: "materias-horario/{materiaEnHorarioId}",
});

app.patch("materiasEnHorarioUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.materiasEnHorarioUpdateById(req, ctx),
	route: "materias-horario/{materiaEnHorarioId}",
});
