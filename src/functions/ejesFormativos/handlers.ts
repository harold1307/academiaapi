import { app } from "@azure/functions";

import { EjeFormativoController } from "../../Core/EjeFormativo/Application/Controller";

const controller = new EjeFormativoController();

app.get("ejesFormativosGetAll", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.ejesFormativosGetAll(req, ctx),
	route: "ejes-formativos",
});

app.get("ejesFormativosGetById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.ejesFormativosGetById(req, ctx),
	route: "ejes-formativos/{ejeFormativoId}",
});

app.post("ejesFormativosCreate", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.ejesFormativosCreate(req, ctx),
	route: "ejes-formativos",
});

app.deleteRequest("ejesFormativosDeleteById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.ejesFormativosDeleteById(req, ctx),
	route: "ejes-formativos/{ejeFormativoId}",
});

app.patch("ejesFormativosUpdateById", {
	authLevel: "anonymous",
	handler: (req, ctx) => controller.ejesFormativosUpdateById(req, ctx),
	route: "ejes-formativos/{ejeFormativoId}",
});