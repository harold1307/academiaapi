# PeriodoLectivo

## Campos complejos

#### Si se especifica que el periodo usa _fechas en matricula_ los siguientes son requeridos, de lo contrario todos deben ser NULL.

- `limiteMatriculaOrdinaria`
- `limiteMatriculaExtraordinaria`
- `limiteMatriculaEspecial`
- `automatriculaAlumnosFechaExtraordinaria`

#### Si la _estructura de los paralelos esta agrupados por nivel_, entonces el siguiente campo es requerido, de lo contrario NULL.

- `estudianteSeleccionaParaleloAutomatricula`

#### Si la _planificacion de profesores es obligatoria_, entonces los siguientes son requeridos, de lo contrario NULL.

- `planificacionProfesoresFormaTotal`
- `aprobacionPlanificacionProfesores`

#### Si se quiere _legalizar matriculas_, entonces los siguientes son requeridos, de lo contrario NULL.

- `legalizacionAutomaticaContraPagos`

#### Si se quiere una _secuencia desde numero especifico_, entonces los siguientes son requeridos, de lo contrario NULL.

- `numeroSecuencia`

#### Si se quiere un _numero de matricula_, entonces los siguientes son requeridos, de lo contrario NULL.

- `numeroMatriculaAutomatico`
- `numeroMatricularAlLegalizar`

## Notas

- Despues de la creacion, no se podra actualizar si se quiere _fechas en matriculas_ o no.

- Si el periodo lectivo esta en uso:

  - Lo relacionado a _numero de matricula_ no podra actualizarse.
  - No se podra cerrar/abrir el periodo.
  - No se podra actualizar el _formato de costos_/_calculo de costo_.
  - No se podra activar/desactivar el periodo.
  - No se podran actualizar los campos: _actividades de docencia_, _actividades de investigacion_ y _actividades de gestion_.
  - No se podra eliminar ni actualizar los subperiodos.

- Si el periodo lectivo esta activo:
  - No se podra actualizar los campos: _cronogramaNotasCoordinacion_, _legalizacionAutomaticaContraPagos_, _numeroMatriculaAutomatico_ y _numeroMatricularAlLegalizar_

## TODO

- [] Implementar en uso

## Frontend

### Tabla

- Inscritos 👉 Cantidad de inscritos en el periodo lectivo [_Aun no implementado_]

- Materias 👉 Desconocido
- Matriculas 👉 Desconocido
- Fecha matriculacion 👉 Campo `fechasEnMatricula` desde la respuesta del API.
- Matriculacion 👉 Campo _matriculas_ desde la respuesta del API
- Estructura por nivel 👉 Campo `estructuraParalelosAgrupadosPorNivel` desde la respuesta del API.
- Nivelacion 👉 Campo `seImpartioNivelacion` desde la respuesta del API.
- Legalizar matriculas 👉 Campo `legalizarMatriculas` desde la respuesta del API.
- Legalizacion por pago 👉 Campo `legalizacionAutomaticaContraPagos` desde la respuesta del API.
- Cerrado 👉 Negacion del campo `abierto` desde la respuesta del API.
- Vigente 👉 Fecha actual es menor que campo `fin` y mayor que campo `inicio`
- Planif. carga horaria/Planif. distributivos 👉 Campo `planificacionCargaHoraria` desde la respuesta del API.
- Notas por coordinacion 👉 Campo `cronogramaNotasCoordinacion` desde la respuesta del API.
- Automat. extraordinaria 👉 Campo `automatriculaAlumnosFechaExtraordinaria` desde la respuesta del API.
- Automat. con arrastre 👉 Campo `puedenMatricularseArrastre` desde la respuesta del API.
- Automat. 2das matriculas 👉 Campo `puedenAutomatricularseSegundasOMasMatriculas` desde la respuesta del API.
- '#' Matricula 👉 Campo `numeroMatricula` desde la respuesta del API.
- Evaluacion docente 👉 Desconocido
- Activo 👉 Campo `estado` desde la respuesta del API.
- Costos por sesion y Plan de costos 👉 Campos dentro de `calculoCosto`
