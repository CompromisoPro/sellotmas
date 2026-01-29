// ============================================
// DATOS DEL SELLOPRO Y MATRIZ DE RELACIÓN T-MAS
// Actualizado con datos reales de Emaresa
// Corregido según Excel "base suministro.xlsx"
// ============================================

// Información de los Objetivos Medioambientales T-MAS
const INFO_TMAS = {
    SMS: {
        nombre: 'Compromiso Social y Ético',
        descripcion: '¡Tu empresa demuestra que opera de forma ética y responsable! Esto significa que cuidas a tus trabajadores, cumples las leyes y tienes canales para que cualquier persona pueda reportar problemas.',
        requisitos: [
            '✓ Tienes procedimientos para cumplir con las leyes laborales, ambientales y tributarias.',
            '✓ Cuentas con un canal de denuncias donde los trabajadores pueden reportar problemas de forma segura.',
            '✓ Tu empresa respeta los derechos de los trabajadores (horarios, sueldos, seguridad).',
            '✓ No tienes multas o sanciones graves en los últimos 5 años.'
        ],
        documentos: [
            'Código de ética de la empresa',
            'Reglamento interno',
            'Canal de denuncias funcionando',
            'Política de derechos humanos'
        ]
    },
    CS_OM1: {
        nombre: 'Reducción de Emisiones',
        descripcion: '¡Estás ayudando a combatir el cambio climático! Tu empresa toma acciones concretas para reducir su huella de carbono y consumir menos energía.',
        requisitos: [
            '✓ Mides cuánta energía consume tu empresa.',
            '✓ Implementas medidas para reducir el consumo (equipos eficientes, energías limpias).',
            '✓ Conoces tu huella de carbono.',
            '✓ Tienes un plan para seguir reduciendo emisiones.'
        ],
        documentos: [
            'Medición de huella de carbono',
            'Plan de eficiencia energética',
            'Facturas de energía y combustibles'
        ]
    },
    CS_OM2: {
        nombre: 'Preparación ante el Clima',
        descripcion: '¡Tu empresa está preparada para los efectos del cambio climático! Has identificado los riesgos (sequías, inundaciones, olas de calor) y tienes planes para enfrentarlos.',
        requisitos: [
            '✓ Identificas qué riesgos climáticos pueden afectar tu negocio.',
            '✓ Evalúas qué tan vulnerable es tu operación.',
            '✓ Tienes medidas para adaptarte (ej: respaldos de agua, protección de instalaciones).',
            '✓ Tu plan no perjudica a vecinos ni al medio ambiente.'
        ],
        documentos: [
            'Análisis de riesgos climáticos',
            'Plan de contingencia',
            'Medidas de adaptación implementadas'
        ]
    },
    NHDS_OM1: {
        nombre: 'Sin Daño al Clima',
        descripcion: 'Tu operación no genera un impacto negativo significativo en el clima. Cumples con la normativa ambiental y controlas tus emisiones.',
        requisitos: [
            '✓ Cumples con los permisos ambientales de tu actividad.',
            '✓ Conoces y controlas las emisiones de tu operación.',
            '✓ No generas contaminación excesiva.'
        ],
        documentos: [
            'Permisos ambientales al día',
            'Registro de emisiones'
        ]
    },
    NHDS_OM2: {
        nombre: 'Sin Daño a la Adaptación',
        descripcion: 'Tu actividad no impide que otros se adapten al cambio climático. No bloqueas cursos de agua, no aumentas riesgos de inundación, etc.',
        requisitos: [
            '✓ Tu operación no aumenta la vulnerabilidad de la zona.',
            '✓ Cumples con la normativa ambiental.',
            '✓ No afectas negativamente a vecinos o ecosistemas cercanos.'
        ],
        documentos: [
            'Permisos de construcción/operación',
            'Cumplimiento normativo'
        ]
    },
    NHDS_OM3: {
        nombre: 'Cuidado del Agua',
        descripcion: '¡Usas el agua de forma responsable! Mides tu consumo y tomas acciones para no desperdiciarla ni contaminarla.',
        requisitos: [
            '✓ Mides cuánta agua consume tu empresa.',
            '✓ Tienes medidas para reducir el consumo.',
            '✓ No contaminas fuentes de agua.'
        ],
        documentos: [
            'Registro de consumo de agua',
            'Plan de uso eficiente del agua'
        ]
    },
    NHDS_OM4: {
        nombre: 'Gestión de Residuos',
        descripcion: '¡Manejas bien tus residuos! Separas, reciclas y te aseguras de que se dispongan correctamente.',
        requisitos: [
            '✓ Separas los residuos en tu empresa.',
            '✓ Reciclas lo que se puede reciclar.',
            '✓ Los residuos peligrosos van a lugares autorizados.',
            '✓ Cumples con la Ley REP si te aplica.'
        ],
        documentos: [
            'Plan de gestión de residuos',
            'Certificados de disposición',
            'Registros de reciclaje'
        ]
    },
    NHDS_OM5: {
        nombre: 'Control de Contaminación',
        descripcion: 'Tu empresa controla sus emisiones al aire, ruidos y otros contaminantes para no afectar la salud de las personas ni el medio ambiente.',
        requisitos: [
            '✓ Cumples con los límites de emisión establecidos.',
            '✓ Monitoreas tus emisiones regularmente.',
            '✓ Tienes medidas para reducir la contaminación.'
        ],
        documentos: [
            'Mediciones de emisiones',
            'Permisos ambientales',
            'Plan de control de contaminación'
        ]
    },
    NHDS_OM6: {
        nombre: 'Protección de la Naturaleza',
        descripcion: 'Tu operación respeta los ecosistemas y la biodiversidad. No dañas áreas protegidas ni especies en peligro.',
        requisitos: [
            '✓ No operas en áreas protegidas sin autorización.',
            '✓ Identificas si hay especies protegidas en tu zona.',
            '✓ Tomas medidas para minimizar tu impacto en la naturaleza.'
        ],
        documentos: [
            'Evaluación de impacto ambiental',
            'Permisos de operación',
            'Plan de manejo ambiental'
        ]
    }
};

// Dimensiones del SelloPRO
const DIMENSIONES = {
    GOBERNANZA: {
        id: 'GOBERNANZA',
        nombre: 'Gobernanza',
        icon: '🏛️',
        color: '#6366F1'
    },
    TRABAJADORES: {
        id: 'TRABAJADORES',
        nombre: 'Trabajadores',
        icon: '👥',
        color: '#EC4899'
    },
    SST: {
        id: 'SST',
        nombre: 'SST',
        icon: '🦺',
        color: '#F59E0B'
    },
    CADENA_VALOR: {
        id: 'CADENA_VALOR',
        nombre: 'Cadena de Valor',
        icon: '🔗',
        color: '#06B6D4'
    },
    COMUNIDAD: {
        id: 'COMUNIDAD',
        nombre: 'Comunidad',
        icon: '🏘️',
        color: '#8B5CF6'
    },
    MEDIOAMBIENTE: {
        id: 'MEDIOAMBIENTE',
        nombre: 'Medioambiente',
        icon: '🌱',
        color: '#22C55E'
    },
    INNOVACION: {
        id: 'INNOVACION',
        nombre: 'Innovación y Productividad',
        icon: '💡',
        color: '#3B82F6'
    }
};

// ============================================
// CRITERIOS SELLOPRO CON RELACIÓN T-MAS
// Datos corregidos según Excel original
// Solo criterios con vínculo (Directo o Indirecto)
// ============================================
const CRITERIOS_SELLOPRO = [
    // ============ GOBERNANZA ============
    {
        id: 1,
        dimension: 'GOBERNANZA',
        criterio: 'Estrategia de sostenibilidad',
        estrellaVinculo: 2,
        tipoVinculo: 'Directo',
        SMS: 1,
        CS_OM1: 1,
        CS_OM2: 1,
        NHDS_OM1: 1,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'Tu estrategia de sostenibilidad considera los mismos temas que pide la Taxonomía: cuidar el medio ambiente, medir emisiones y operar de forma responsable.',
        comoDemuestra: 'Mostrando en tu estrategia cómo abordas las Salvaguardas Sociales, la medición de gases de efecto invernadero y cómo te alineas con la normativa ambiental.',
        descripcionEstrellas: {
            1: 'No cuenta con iniciativas ni prácticas en sostenibilidad',
            2: 'Existe un Plan con prácticas o iniciativas recurrentes en materia de sostenibilidad',
            3: 'La sostenibilidad es liderada por un encargado, área o comité de sostenibilidad',
            4: 'La empresa cuenta con una estrategia de sostenibilidad integrada en su estrategia de negocio',
            5: 'La estrategia de sostenibilidad se construyó en base a resultados de un estudio de materialidad'
        }
    },
    {
        id: 2,
        dimension: 'GOBERNANZA',
        criterio: 'Gobierno corporativo',
        estrellaVinculo: 1,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 1,
        CS_OM2: 1,
        NHDS_OM1: 1,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'Los conocimientos normativos, financieros y de sostenibilidad de tu directorio pueden considerar los requisitos de la Taxonomía, pero no los cubre directamente.',
        comoDemuestra: 'Respaldando que los asesores o miembros del directorio tienen conocimientos sobre la Ley Marco de Cambio Climático y requisitos del SEIA.',
        queNecesitaParaDirecto: 'Para que sea DIRECTO: El directorio debe capacitarse específicamente en los Criterios Técnicos de Selección (CTS) de la T-MAS y documentar cómo los incorporan en sus decisiones estratégicas.',
        descripcionEstrellas: {
            1: 'La empresa cuenta con un Comité de Gestión interna que se reúne periódicamente',
            2: 'Cuenta con un asesor externo o grupo de asesores que los guía en temas normativos y financieros',
            3: 'Cuenta con un directorio que vela por el cumplimiento de los objetivos estratégicos',
            4: 'El directorio está compuesto por un grupo diverso de miembros',
            5: 'El directorio se capacita en temas de sostenibilidad'
        }
    },
    {
        id: 3,
        dimension: 'GOBERNANZA',
        criterio: 'Gestión de la ética e integridad',
        estrellaVinculo: 3,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'Cumple con una parte de las Salvaguardas Sociales (SMS1) desde las 3 estrellas, pero no cubre todos los requisitos.',
        comoDemuestra: 'Demostrando que cuentas con un canal de denuncias y un código de ética.',
        queNecesitaParaDirecto: 'Para que sea DIRECTO: Además del canal de denuncias, necesitas demostrar procedimientos para identificar y gestionar riesgos de corrupción, y evidencia de que el código de ética se aplica a toda la cadena de valor.',
        descripcionEstrellas: {
            1: 'Existe un reglamento interno con misión, visión y valores corporativos',
            2: 'La empresa difunde su misión, visión y valores con los miembros de la organización',
            3: 'La empresa cuenta con un Código de Ética y capacita a los miembros de la organización',
            4: 'La empresa cuenta con un canal de denuncias que permite confidencialidad',
            5: 'El canal de denuncias es gestionado por un comité de ética con roles asignados'
        }
    },

    // ============ TRABAJADORES ============
    {
        id: 4,
        dimension: 'TRABAJADORES',
        criterio: 'Conozco a mis trabajadores',
        estrellaVinculo: 3,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'Cumple con una parte de las Salvaguardas Sociales (SMS1) al conocer y gestionar información de tus trabajadores.',
        comoDemuestra: 'Demostrando que cuentas con un canal de denuncias y un código de ética para asegurar los derechos humanos.',
        queNecesitaParaDirecto: 'Para que sea DIRECTO: Necesitas demostrar que la información de trabajadores se usa activamente para garantizar sus derechos según la Carta Internacional de DDHH y principios de la OIT.'
    },
    {
        id: 5,
        dimension: 'TRABAJADORES',
        criterio: 'Diseño de plan de desarrollo y bienestar',
        estrellaVinculo: 3,
        tipoVinculo: 'Directo',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'Se vincula directamente con las Salvaguardas Sociales (SMS2) de la T-MAS al establecer iniciativas de bienestar para los trabajadores.',
        comoDemuestra: 'Demostrando que tu Plan de desarrollo y bienestar incluye iniciativas para apoyar a los trabajadores y prevenir delitos o transgresión de derechos.'
    },
    {
        id: 6,
        dimension: 'TRABAJADORES',
        criterio: 'Formación continua',
        estrellaVinculo: 5,
        tipoVinculo: 'Indirecto',
        SMS: 0,
        CS_OM1: 1,
        CS_OM2: 1,
        NHDS_OM1: 1,
        NHDS_OM2: 1,
        NHDS_OM3: 1,
        NHDS_OM4: 1,
        NHDS_OM5: 1,
        NHDS_OM6: 1,
        justificacionTMAS: 'Se vincula indirectamente con los 6 Objetivos Medioambientales si las capacitaciones incluyen temáticas relacionadas con los criterios de la Taxonomía.',
        comoDemuestra: 'Respaldo de certificados de capacitación que indiquen temáticas ambientales, cambio climático o sostenibilidad.',
        queNecesitaParaDirecto: 'Para que sea DIRECTO: Las capacitaciones deben incluir específicamente los Criterios Técnicos de Selección de la T-MAS y contar con certificaciones reconocidas en temas ambientales.'
    },
    {
        id: 7,
        dimension: 'TRABAJADORES',
        criterio: 'Diversidad e inclusión laboral',
        estrellaVinculo: 1,
        tipoVinculo: 'Directo',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'Permite garantizar el respeto a los Derechos Humanos de cada persona, alineándose con las Salvaguardas Sociales.',
        comoDemuestra: 'Respaldando el conocimiento de la diversidad de la empresa, las medidas tomadas para evitar discriminación y los canales de denuncias disponibles.'
    },
    {
        id: 8,
        dimension: 'TRABAJADORES',
        criterio: 'Participación de mujeres en la industria',
        estrellaVinculo: 1,
        tipoVinculo: 'Directo',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'Permite garantizar el respeto a los Derechos Humanos de cada mujer, alineándose con las Salvaguardas Sociales.',
        comoDemuestra: 'Respaldando el conocimiento de la participación femenina en la empresa y las medidas tomadas para fomentar la participación de las mujeres.'
    },
    {
        id: 9,
        dimension: 'TRABAJADORES',
        criterio: 'Inclusión de personas con discapacidad',
        estrellaVinculo: 1,
        tipoVinculo: 'Directo',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'Permite garantizar el respeto a los Derechos Humanos de cada persona, alineándose con las Salvaguardas Sociales.',
        comoDemuestra: 'Respaldando el conocimiento de la diversidad de la empresa, las medidas tomadas para evitar discriminación y los canales de denuncias disponibles.'
    },

    // ============ SST ============
    {
        id: 10,
        dimension: 'SST',
        criterio: 'Gestión de objetivos e indicadores de seguridad',
        estrellaVinculo: 1,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'Permite garantizar el respeto a los Derechos Humanos de cada persona en temas de salud y seguridad laboral.',
        comoDemuestra: 'Respaldo de las medidas tomadas para asegurar la salud laboral, en línea con los principios de la OIT.',
        queNecesitaParaDirecto: 'Para que sea DIRECTO: Los indicadores de seguridad deben estar alineados específicamente con los estándares de la OIT mencionados en las SMS de la T-MAS.'
    },
    {
        id: 11,
        dimension: 'SST',
        criterio: 'Gestión de desarrollo y capacitación de trabajadores',
        estrellaVinculo: 1,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'Permite garantizar el respeto a los Derechos Humanos de cada persona mediante capacitación en seguridad.',
        comoDemuestra: 'Respaldo de las medidas tomadas para asegurar la salud laboral, en línea con los principios de la OIT.',
        queNecesitaParaDirecto: 'Para que sea DIRECTO: Las capacitaciones deben incluir específicamente los riesgos ambientales y climáticos definidos en la T-MAS.'
    },

    // ============ CADENA DE VALOR ============
    {
        id: 12,
        dimension: 'CADENA_VALOR',
        criterio: 'Desarrollo de proveedores, contratistas y especialistas',
        estrellaVinculo: 1,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'Los proveedores y contratistas pueden efectuar denuncias a través de los canales oficiales de la empresa.',
        comoDemuestra: 'Abriendo los canales de denuncia a toda la cadena de valor, no solo a los empleados internos. También considerando las emisiones de GEI de proveedores.',
        queNecesitaParaDirecto: 'Para que sea DIRECTO: Debes evaluar a tus proveedores en criterios de sostenibilidad alineados con la T-MAS y exigirles reportes de emisiones de GEI.'
    },
    {
        id: 13,
        dimension: 'CADENA_VALOR',
        criterio: 'Gestión de la sostenibilidad con la cadena de valor',
        estrellaVinculo: 5,
        tipoVinculo: 'Directo',
        SMS: 0,
        CS_OM1: 1,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'Se alinea directamente con la Contribución Sustancial del OM1 al orientar los criterios de evaluación y contratación de proveedores a conceptos de emisiones de GEI.',
        comoDemuestra: 'Entregando certificados o cartas de experiencias acreditables, reporte de emisiones de proveedores, etc.'
    },

    // ============ COMUNIDAD ============
    {
        id: 14,
        dimension: 'COMUNIDAD',
        criterio: 'Estrategia de relacionamiento comunitario',
        estrellaVinculo: 1,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'La empresa puede contar con canales de denuncia de la comunidad para evitar delitos y disminuir impacto.',
        comoDemuestra: 'Habilitando canales de denuncia propios de la empresa para abordar las necesidades de la comunidad.',
        queNecesitaParaDirecto: 'Para que sea DIRECTO: Los canales de denuncia deben incluir específicamente temas ambientales y la empresa debe demostrar cómo gestiona los reclamos de la comunidad relacionados con impacto ambiental.'
    },

    // ============ MEDIOAMBIENTE ============
    {
        id: 15,
        dimension: 'MEDIOAMBIENTE',
        criterio: 'Gestión de acciones sostenibles del espacio de trabajo',
        estrellaVinculo: 1,
        tipoVinculo: 'Directo',
        SMS: 1,
        CS_OM1: 1,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 1,
        NHDS_OM4: 1,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'Las medidas tomadas permiten respaldar acciones respecto a residuos, energía y agua consideradas en las SMS, CS y NHDS.',
        comoDemuestra: 'Información de respaldo de las medidas tomadas para gestionar residuos, consumo hídrico, ahorro energético.'
    },
    {
        id: 16,
        dimension: 'MEDIOAMBIENTE',
        criterio: 'Gestión de residuos',
        estrellaVinculo: 1,
        tipoVinculo: 'Directo',
        SMS: 0,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 1,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'Las medidas tomadas permiten levantar información y gestionar residuos para estar alineado a los requisitos de NHDS.',
        comoDemuestra: 'Información de respaldo de las medidas tomadas para gestionar residuos.'
    },
    {
        id: 17,
        dimension: 'MEDIOAMBIENTE',
        criterio: 'Consumo de energía en las instalaciones',
        estrellaVinculo: 1,
        tipoVinculo: 'Directo',
        SMS: 0,
        CS_OM1: 1,
        CS_OM2: 0,
        NHDS_OM1: 1,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'Las medidas tomadas permiten reducir el consumo eléctrico, disminuyendo así las emisiones de GEI.',
        comoDemuestra: 'Información de respaldo del consumo energético que demuestre disminución.'
    },
    {
        id: 18,
        dimension: 'MEDIOAMBIENTE',
        criterio: 'Emisiones GEI corporativas',
        estrellaVinculo: 1,
        tipoVinculo: 'Directo',
        SMS: 0,
        CS_OM1: 1,
        CS_OM2: 0,
        NHDS_OM1: 1,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'La medición permite tener información para gestionar las emisiones de GEI. Está directamente relacionado con el OM1.',
        comoDemuestra: 'Medición de huella de carbono y verificación por terceros en caso de existir.'
    },
    {
        id: 19,
        dimension: 'MEDIOAMBIENTE',
        criterio: 'Emisiones: Huella de carbono de productos',
        estrellaVinculo: 1,
        tipoVinculo: 'Directo',
        SMS: 0,
        CS_OM1: 1,
        CS_OM2: 0,
        NHDS_OM1: 1,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'La medición permite tener información para gestionar las emisiones de GEI. Está directamente relacionado con el OM1.',
        comoDemuestra: 'Medición de huella de carbono de productos y verificación por terceros en caso de existir.'
    },
    {
        id: 20,
        dimension: 'MEDIOAMBIENTE',
        criterio: 'Oferta de productos con atributos de sustentabilidad',
        estrellaVinculo: 2,
        tipoVinculo: 'Directo',
        SMS: 0,
        CS_OM1: 1,
        CS_OM2: 0,
        NHDS_OM1: 1,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 1,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'Desde la Estrella 2 en adelante se alinea directamente con los CTS de CS del OM1 para la fabricación de productos de madera, papel y productos derivados.',
        comoDemuestra: 'Adjuntando documentos que respalden sistemas de gestión energética en manufactura, fichas técnicas, DAP o certificaciones de producto.'
    },
    {
        id: 21,
        dimension: 'MEDIOAMBIENTE',
        criterio: 'Adaptación al cambio climático',
        estrellaVinculo: 2,
        tipoVinculo: 'Directo',
        SMS: 0,
        CS_OM1: 0,
        CS_OM2: 1,
        NHDS_OM1: 0,
        NHDS_OM2: 1,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'Desde la estrella 2 se cumple directamente con NHDS de Adaptación y desde la estrella 4 se cumple directamente con CS a la adaptación.',
        comoDemuestra: 'Entregando la evaluación y priorización de riesgos climáticos.'
    },

    // ============ INNOVACIÓN Y PRODUCTIVIDAD ============
    {
        id: 22,
        dimension: 'INNOVACION',
        criterio: 'Innovación',
        estrellaVinculo: 1,
        tipoVinculo: 'Directo',
        SMS: 0,
        CS_OM1: 1,
        CS_OM2: 1,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 1,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'La innovación en procesos y productos puede contribuir a la reducción de emisiones y mejora de la economía circular.',
        comoDemuestra: 'Documentación de proyectos de innovación con impacto ambiental positivo.'
    },
    {
        id: 23,
        dimension: 'INNOVACION',
        criterio: 'Transformación digital',
        estrellaVinculo: 1,
        tipoVinculo: 'Indirecto',
        SMS: 0,
        CS_OM1: 1,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0,
        justificacionTMAS: 'La transformación digital puede contribuir indirectamente a la eficiencia energética y reducción de emisiones.',
        comoDemuestra: 'Documentación de proyectos digitales que demuestren reducción de consumo de recursos.',
        queNecesitaParaDirecto: 'Para que sea DIRECTO: Debes demostrar que la transformación digital ha resultado en una reducción medible de emisiones de GEI o consumo energético.'
    }
];

// ============================================
// DATOS REALES - EMARESA
// Notas del Plan de Desarrollo (Nota Proceso)
// Mapeadas a los nuevos IDs de criterios
// ============================================
const EMPRESA_DEMO = {
    nombre: 'Emaresa Ingenieros y Representaciones S.A.',
    rut: '96.806.980-2',
    sector: 'Manufactura - Suministro',
    fechaEvaluacion: 'Enero 2026',
    notaGlobal: 4.0,
    
    // Notas por criterio (mapeadas a nuevos IDs)
    notas: {
        1: 5,   // Estrategia de sostenibilidad
        2: 4,   // Gobierno corporativo
        3: 5,   // Gestión de la ética e integridad
        4: 4,   // Conozco a mis trabajadores
        5: 4,   // Diseño de plan de desarrollo y bienestar
        6: 3,   // Formación continua
        7: 4,   // Diversidad e inclusión laboral
        8: 1,   // Participación de mujeres en la industria
        9: 5,   // Inclusión de personas con discapacidad
        10: 4,  // Gestión de objetivos e indicadores de seguridad
        11: 4,  // Gestión de desarrollo y capacitación de trabajadores
        12: 2,  // Desarrollo de proveedores, contratistas y especialistas
        13: 1,  // Gestión de la sostenibilidad con la cadena de valor
        14: 5,  // Estrategia de relacionamiento comunitario
        15: 4,  // Gestión de acciones sostenibles del espacio de trabajo
        16: 4,  // Gestión de residuos
        17: 3,  // Consumo de energía en las instalaciones
        18: 3,  // Emisiones GEI corporativas
        19: 1,  // Emisiones: Huella de carbono de productos
        20: 4,  // Oferta de productos con atributos de sustentabilidad
        21: 4,  // Adaptación al cambio climático
        22: 5,  // Innovación
        23: 5   // Transformación digital
    }
};

// Exportar para uso global
window.INFO_TMAS = INFO_TMAS;
window.DIMENSIONES = DIMENSIONES;
window.CRITERIOS_SELLOPRO = CRITERIOS_SELLOPRO;
window.EMPRESA_DEMO = EMPRESA_DEMO;
