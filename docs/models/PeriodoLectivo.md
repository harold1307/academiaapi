# PeriodoLectivo

<!-- - nombre String -->
<!-- - inicio DateTime -->
<!-- - fin    DateTime -->

#### Si se especifica que el periodo _usa fechas en matricula_ los siguientes son requeridos, de lo contrario todos deben ser NULL.

- `limiteMatriculaOrdinaria`
- `limiteMatriculaExtraordinaria`
- `limiteMatriculaEspecial`

<!-- - tipo                                      TipoPeriodo -->

#### Si la _estructura de los paralelos esta agrupados por nivel_, entonces el siguiente campo es requerido, de lo contrario NULL.

- `estudianteSeleccionaParaleloAutomatricula`

<!-- - seImpartioNivelacion                      Boolean -->

<!-- - planificacionCargaHoraria Boolean -->

#### Si la _planificacion de profesores es obligatoria_, entonces los siguientes son requeridos, de lo contrario NULL.

- `planificacionProfesoresFormaTotal`
- `aprobacionPlanificacionProfesores`

<!-- - cronogramaNotasCoordinacion Boolean -->

#### Si se quiere _legalizar matriculas_, entonces los siguientes son requeridos, de lo contrario NULL.

- `legalizacionAutomaticaContraPagos`

<!-- - puedenMatricularseArrastre Boolean -->
<!-- - puedenAutomatricularseSegundasOMasMatriculas Boolean -->

#### Si se quiere una _secuencia desde numero especifico_, entonces los siguientes son requeridos, de lo contrario NULL.

- `numeroSecuencia`

#### Si se quiere un _numero de matricula_, entonces los siguientes son requeridos, de lo contrario NULL.

- `numeroMatriculaAutomatico`
- `numeroMatricularAlLegalizar`
