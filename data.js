// ============================================
// DATOS DEL SELLOPRO Y MATRIZ DE RELACIÓN T-MAS
// Actualizado con datos reales de Emaresa
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
            'Plan de manejo de residuos',
            'Certificados de disposición',
            'Registros de reciclaje'
        ]
    },
    NHDS_OM5: {
        nombre: 'Control de Contaminación',
        descripcion: 'Tu empresa no contamina el aire, suelo ni agua de forma significativa. Cumples con las normas de emisión.',
        requisitos: [
            '✓ Cumples con las normas de emisión de tu zona.',
            '✓ Si estás en zona de contaminación, cumples el plan de descontaminación.',
            '✓ Tienes los permisos ambientales al día.'
        ],
        documentos: [
            'Permisos ambientales',
            'Mediciones de emisiones (si aplica)'
        ]
    },
    NHDS_OM6: {
        nombre: 'Protección de la Naturaleza',
        descripcion: 'Tu operación respeta los ecosistemas y la biodiversidad. No dañas áreas protegidas ni especies en peligro.',
        requisitos: [
            '✓ Conoces si hay áreas naturales importantes cerca de tu operación.',
            '✓ No dañas ecosistemas ni especies protegidas.',
            '✓ Cumples con la normativa de protección ambiental.'
        ],
        documentos: [
            'Permisos ambientales',
            'Identificación de áreas sensibles cercanas'
        ]
    }
};

// Dimensiones del SelloPRO (reales)
const DIMENSIONES = {
    GOBERNANZA: {
        id: 'GOBERNANZA',
        nombre: 'Gobernanza',
        icon: '🏛️',
        color: '#343434'
    },
    TRABAJADORES: {
        id: 'TRABAJADORES',
        nombre: 'Trabajadores',
        icon: '👷',
        color: '#35d38b'
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

// Criterios SelloPRO con relación a T-MAS
// La relación se basa en el Excel "base suministro.xlsx"
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
        justificacionTMAS: 'Al tener una estrategia de sostenibilidad, tu empresa ya está pensando en los mismos temas que pide la Taxonomía: cuidar el medio ambiente, tratar bien a los trabajadores y operar de forma ética.',
        comoDemuestra: 'Con tu documento de estrategia de sostenibilidad que incluye metas ambientales, sociales y de gobernanza.',
        descripcionEstrellas: {
            1: 'No cuenta con iniciativas ni prácticas en sostenibilidad',
            2: 'Existe un Plan con prácticas o iniciativas recurrentes en materia de sostenibilidad (acciones sociales, ambientales o de gobernanza)',
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
        justificacionTMAS: 'Tener un buen gobierno corporativo significa que hay personas capacitadas tomando decisiones, incluyendo temas de sostenibilidad y cumplimiento de leyes ambientales.',
        comoDemuestra: 'Con actas de directorio, capacitaciones en sostenibilidad, y evidencia de que el equipo directivo conoce las leyes ambientales.',
        descripcionEstrellas: {
            1: 'La empresa cuenta con un Comité de Gestión interna que se reúne periódicamente',
            2: 'Cuenta con un asesor externo o grupo de asesores que los guía en temas normativos y financieros',
            3: 'Cuenta con un directorio que vela por el cumplimiento de los objetivos estratégicos',
            4: 'El directorio está compuesto por un grupo diverso de miembros (géneros, nacionalidad, edades, sectores)',
            5: 'El directorio se capacita en temas de sostenibilidad'
        }
    },
    {
        id: 3,
        dimension: 'GOBERNANZA',
        criterio: 'Gestión de la ética e integridad',
        estrellaVinculo: 2,
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
        justificacionTMAS: 'Tener un código de ética y canal de denuncias es exactamente lo que pide la Taxonomía en sus "Salvaguardas Sociales" - que la empresa opere de forma transparente y ética.',
        comoDemuestra: 'Con tu código de ética publicado, el canal de denuncias funcionando, y evidencia de capacitaciones al equipo.',
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
        estrellaVinculo: 2,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0
    },
    {
        id: 5,
        dimension: 'TRABAJADORES',
        criterio: 'Diseño de plan de desarrollo y bienestar',
        estrellaVinculo: 2,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0
    },
    {
        id: 6,
        dimension: 'TRABAJADORES',
        criterio: 'Herramientas de difusión y comunicación',
        estrellaVinculo: 2,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0
    },
    {
        id: 7,
        dimension: 'TRABAJADORES',
        criterio: 'Formación continua',
        estrellaVinculo: 2,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0
    },
    {
        id: 8,
        dimension: 'TRABAJADORES',
        criterio: 'Capacitación continua',
        estrellaVinculo: 2,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0
    },
    {
        id: 9,
        dimension: 'TRABAJADORES',
        criterio: 'Diversidad e inclusión laboral',
        estrellaVinculo: 2,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0
    },
    {
        id: 10,
        dimension: 'TRABAJADORES',
        criterio: 'Participación de mujeres en la industria',
        estrellaVinculo: 2,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0
    },
    {
        id: 11,
        dimension: 'TRABAJADORES',
        criterio: 'Inclusión de personas con discapacidad',
        estrellaVinculo: 2,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0
    },
    {
        id: 12,
        dimension: 'TRABAJADORES',
        criterio: 'Actividades extralaborales',
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
        NHDS_OM6: 0
    },
    {
        id: 13,
        dimension: 'TRABAJADORES',
        criterio: 'Infraestructura',
        estrellaVinculo: 2,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0
    },

    // ============ SST ============
    {
        id: 14,
        dimension: 'SST',
        criterio: 'Seguridad y salud laboral',
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
        NHDS_OM6: 0
    },

    // ============ CADENA DE VALOR ============
    {
        id: 15,
        dimension: 'CADENA_VALOR',
        criterio: 'Desarrollo de proveedores, contratistas y especialistas',
        estrellaVinculo: 3,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 1,
        CS_OM2: 0,
        NHDS_OM1: 1,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 1,
        NHDS_OM5: 0,
        NHDS_OM6: 0
    },
    {
        id: 16,
        dimension: 'CADENA_VALOR',
        criterio: 'Gestión de la sostenibilidad con la cadena de valor',
        estrellaVinculo: 3,
        tipoVinculo: 'Directo',
        SMS: 1,
        CS_OM1: 1,
        CS_OM2: 0,
        NHDS_OM1: 1,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 1,
        NHDS_OM5: 1,
        NHDS_OM6: 0
    },
    {
        id: 17,
        dimension: 'CADENA_VALOR',
        criterio: 'Política de pago oportuno',
        estrellaVinculo: 2,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0
    },
    {
        id: 18,
        dimension: 'CADENA_VALOR',
        criterio: 'Relación con cliente: venta',
        estrellaVinculo: 2,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0
    },
    {
        id: 19,
        dimension: 'CADENA_VALOR',
        criterio: 'Relación con cliente: postventa',
        estrellaVinculo: 2,
        tipoVinculo: 'Indirecto',
        SMS: 1,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0
    },

    // ============ COMUNIDAD ============
    {
        id: 20,
        dimension: 'COMUNIDAD',
        criterio: 'Estrategia de relacionamiento comunitario',
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
        NHDS_OM6: 0
    },
    {
        id: 21,
        dimension: 'COMUNIDAD',
        criterio: 'Gestión de la comunicación con la comunidad y partes interesadas',
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
        NHDS_OM6: 0
    },

    // ============ MEDIOAMBIENTE ============
    {
        id: 22,
        dimension: 'MEDIOAMBIENTE',
        criterio: 'Gestión de acciones sostenibles del espacio de trabajo',
        estrellaVinculo: 2,
        tipoVinculo: 'Directo',
        SMS: 0,
        CS_OM1: 1,
        CS_OM2: 0,
        NHDS_OM1: 1,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 1,
        NHDS_OM5: 1,
        NHDS_OM6: 0
    },
    {
        id: 23,
        dimension: 'MEDIOAMBIENTE',
        criterio: 'Gestión de residuos',
        estrellaVinculo: 2,
        tipoVinculo: 'Directo',
        SMS: 0,
        CS_OM1: 0,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 1,
        NHDS_OM5: 1,
        NHDS_OM6: 0
    },
    {
        id: 24,
        dimension: 'MEDIOAMBIENTE',
        criterio: 'Consumo de energía en las salas de venta y centros de distribución',
        estrellaVinculo: 2,
        tipoVinculo: 'Directo',
        SMS: 0,
        CS_OM1: 1,
        CS_OM2: 0,
        NHDS_OM1: 1,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0
    },
    {
        id: 25,
        dimension: 'MEDIOAMBIENTE',
        criterio: 'Emisiones GEI corporativas',
        estrellaVinculo: 2,
        tipoVinculo: 'Directo',
        SMS: 0,
        CS_OM1: 1,
        CS_OM2: 0,
        NHDS_OM1: 1,
        NHDS_OM2: 1,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 1,
        NHDS_OM6: 0
    },
    {
        id: 26,
        dimension: 'MEDIOAMBIENTE',
        criterio: 'Desarrollo/oferta de productos con atributos de sustentabilidad',
        estrellaVinculo: 3,
        tipoVinculo: 'Directo',
        SMS: 0,
        CS_OM1: 1,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 1,
        NHDS_OM5: 0,
        NHDS_OM6: 1
    },
    {
        id: 27,
        dimension: 'MEDIOAMBIENTE',
        criterio: 'Identificar, prevenir y gestionar efectos ambientales de sus instalaciones',
        estrellaVinculo: 2,
        tipoVinculo: 'Directo',
        SMS: 0,
        CS_OM1: 0,
        CS_OM2: 1,
        NHDS_OM1: 1,
        NHDS_OM2: 1,
        NHDS_OM3: 1,
        NHDS_OM4: 0,
        NHDS_OM5: 1,
        NHDS_OM6: 1
    },
    {
        id: 28,
        dimension: 'MEDIOAMBIENTE',
        criterio: 'Eficiencia energética y energía renovable',
        estrellaVinculo: 3,
        tipoVinculo: 'Directo',
        SMS: 0,
        CS_OM1: 1,
        CS_OM2: 0,
        NHDS_OM1: 1,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 1,
        NHDS_OM6: 0
    },
    {
        id: 29,
        dimension: 'MEDIOAMBIENTE',
        criterio: 'Emisiones: Huella de carbono de productos',
        estrellaVinculo: 3,
        tipoVinculo: 'Directo',
        SMS: 0,
        CS_OM1: 1,
        CS_OM2: 0,
        NHDS_OM1: 1,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0
    },

    // ============ INNOVACIÓN Y PRODUCTIVIDAD ============
    {
        id: 30,
        dimension: 'INNOVACION',
        criterio: 'Innovación',
        estrellaVinculo: 3,
        tipoVinculo: 'Indirecto',
        SMS: 0,
        CS_OM1: 1,
        CS_OM2: 1,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 1,
        NHDS_OM5: 0,
        NHDS_OM6: 0
    },
    {
        id: 31,
        dimension: 'INNOVACION',
        criterio: 'Transformación digital',
        estrellaVinculo: 3,
        tipoVinculo: 'Indirecto',
        SMS: 0,
        CS_OM1: 1,
        CS_OM2: 0,
        NHDS_OM1: 0,
        NHDS_OM2: 0,
        NHDS_OM3: 0,
        NHDS_OM4: 0,
        NHDS_OM5: 0,
        NHDS_OM6: 0
    }
];

// ============================================
// DATOS REALES - EMARESA
// Notas del Plan de Desarrollo (Nota Proceso)
// ============================================
const EMPRESA_DEMO = {
    nombre: 'Emaresa Ingenieros y Representaciones S.A.',
    rut: '96.806.980-2',
    sector: 'Manufactura - Suministro',
    fechaEvaluacion: 'Enero 2026',
    notaGlobal: 4.0,
    
    // Notas por criterio (Nota Proceso del Excel)
    notas: {
        1: 5,   // Estrategia de sostenibilidad
        2: 4,   // Gobierno corporativo
        3: 5,   // Gestión de la ética e integridad
        4: 4,   // Conozco a mis trabajadores
        5: 4,   // Diseño de plan de desarrollo y bienestar
        6: 5,   // Herramientas de difusión y comunicación
        7: 3,   // Formación continua
        8: 5,   // Capacitación continua
        9: 4,   // Diversidad e inclusión laboral
        10: 1,  // Participación de mujeres en la industria
        11: 5,  // Inclusión de personas con discapacidad
        12: 5,  // Actividades extralaborales
        13: 4,  // Infraestructura
        14: 4,  // Seguridad y salud laboral
        15: 2,  // Desarrollo de proveedores, contratistas y especialistas
        16: 1,  // Gestión de la sostenibilidad con la cadena de valor
        17: 4,  // Política de pago oportuno
        18: 5,  // Relación con cliente: venta
        19: 5,  // Relación con cliente: postventa
        20: 5,  // Estrategia de relacionamiento comunitario
        21: 4,  // Gestión de la comunicación con la comunidad
        22: 4,  // Gestión de acciones sostenibles del espacio de trabajo
        23: 4,  // Gestión de residuos
        24: 3,  // Consumo de energía
        25: 3,  // Emisiones GEI corporativas
        26: 4,  // Desarrollo/oferta de productos con atributos de sustentabilidad
        27: 3,  // Identificar, prevenir y gestionar efectos ambientales
        28: 4,  // Eficiencia energética y energía renovable
        29: 1,  // Emisiones: Huella de carbono de productos
        30: 5,  // Innovación
        31: 5   // Transformación digital
    }
};

// Exportar para uso global
window.INFO_TMAS = INFO_TMAS;
window.DIMENSIONES = DIMENSIONES;
window.CRITERIOS_SELLOPRO = CRITERIOS_SELLOPRO;
window.EMPRESA_DEMO = EMPRESA_DEMO;
