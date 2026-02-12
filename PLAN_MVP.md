# 🏗️ PLAN MVP — SelloPRO × T-MAS
## Plataforma de Visualización de Alineación Taxonómica

---

## 1. VISIÓN GENERAL

### ¿Qué es?
Una plataforma web interna que permite a los consultores del Compromiso PRO:
1. Gestionar las evaluaciones SelloPRO de cada empresa socia
2. Generar automáticamente la visualización de alineación con la T-MAS
3. Entregar a cada socio un link con su dashboard personalizado

### ¿Qué NO es (aún)?
- No es un CRM completo (eso es fase futura)
- No reemplaza Monday (aún), solo la parte de notas y taxonomía
- No es un portal de autogestión del socio (fase 2)

---

## 2. ARQUITECTURA

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                          │
│              (Next.js + React)                       │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │
│  │  Panel Admin  │  │  Dashboard   │  │  Landing   │ │
│  │  (Consultor)  │  │  (Empresa)   │  │  Page      │ │
│  └──────┬───────┘  └──────┬───────┘  └────────────┘ │
│         │                  │                         │
└─────────┼──────────────────┼─────────────────────────┘
          │                  │
          ▼                  ▼
┌─────────────────────────────────────────────────────┐
│                  SUPABASE                            │
│                                                      │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────┐  │
│  │   Auth   │  │ Database │  │  Storage (PDFs)   │  │
│  │  (Login) │  │ Postgres │  │  (Docs empresa)   │  │
│  └──────────┘  └──────────┘  └───────────────────┘  │
│                                                      │
│  ┌──────────────────────────────────────────────┐    │
│  │  Row Level Security (RLS)                    │    │
│  │  - Admin: ve todo                            │    │
│  │  - Consultor: ve sus empresas asignadas      │    │
│  │  - Empresa: ve solo su dashboard             │    │
│  └──────────────────────────────────────────────┘    │
│                                                      │
└─────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────┐
│              DEPLOYMENT (Vercel)                     │
│         URL: sellotmas.compromisopro.cl (o similar)  │
└─────────────────────────────────────────────────────┘
```

---

## 3. ESQUEMA DE BASE DE DATOS

### Tabla: `empresas`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid (PK) | Identificador único |
| rut | text | RUT de la empresa |
| nombre | text | Razón social |
| sector | text | Sector/Rubro (ej: "Manufactura - Suministro") |
| region | text | Región de Chile |
| consultor_asignado | uuid (FK → usuarios) | Consultor responsable |
| estado | enum | 'diagnostico', 'en_proceso', 'sellado', 'cerrado' |
| fecha_ingreso | timestamp | Fecha de inicio del proceso |
| created_at | timestamp | Fecha de creación del registro |
| updated_at | timestamp | Última modificación |

### Tabla: `usuarios`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid (PK) | Identificador único |
| email | text | Correo electrónico |
| nombre | text | Nombre completo |
| rol | enum | 'admin', 'consultor' |
| activo | boolean | Si está habilitado |
| created_at | timestamp | Fecha de creación |

### Tabla: `evaluaciones`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid (PK) | Identificador único |
| empresa_id | uuid (FK → empresas) | Empresa evaluada |
| tipo | enum | 'diagnostico', 'cierre' |
| fecha_evaluacion | date | Fecha de la evaluación |
| evaluador | uuid (FK → usuarios) | Quien realizó la evaluación |
| estado | enum | 'borrador', 'finalizada', 'publicada' |
| nota_global | decimal | Promedio general |
| token_publico | text (unique) | Token para URL pública del dashboard |
| observaciones | text | Notas del evaluador |
| created_at | timestamp | Fecha de creación |

### Tabla: `notas_criterio`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | uuid (PK) | Identificador único |
| evaluacion_id | uuid (FK → evaluaciones) | Evaluación a la que pertenece |
| criterio_id | integer (FK → criterios_sellopro) | Criterio evaluado |
| nota | integer (1-5) | Nota/estrellas obtenidas |
| observacion | text | Comentario del evaluador |
| evidencia_url | text | Link a documento de respaldo (opcional) |

### Tabla: `criterios_sellopro` (datos maestros, los carga el admin)
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | integer (PK) | Número del criterio |
| dimension | text | 'GOBERNANZA', 'TRABAJADORES', etc. |
| nombre | text | Nombre del criterio |
| descripcion_estrellas | jsonb | {"1": "desc", "2": "desc", ...} |
| activo | boolean | Si está vigente |
| orden | integer | Orden de visualización |

### Tabla: `vinculos_tmas` (datos maestros, provienen de consultores)
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | serial (PK) | Identificador |
| criterio_id | integer (FK → criterios_sellopro) | Criterio SelloPRO |
| tipo_vinculo | enum | 'directo', 'indirecto' |
| estrella_minima | integer (1-5) | Umbral mínimo de estrellas |
| sms | boolean | Impacta Salvaguardas Mínimas Sociales |
| cs_om1 | boolean | Impacta CS Objetivo 1 |
| cs_om2 | boolean | Impacta CS Objetivo 2 |
| nhds_om1 | boolean | Impacta NHDS Objetivo 1 |
| nhds_om2 | boolean | Impacta NHDS Objetivo 2 |
| nhds_om3 | boolean | Impacta NHDS Objetivo 3 |
| nhds_om4 | boolean | Impacta NHDS Objetivo 4 |
| nhds_om5 | boolean | Impacta NHDS Objetivo 5 |
| nhds_om6 | boolean | Impacta NHDS Objetivo 6 |
| justificacion | text | Por qué se relaciona |
| como_demuestra | text | Cómo se evidencia |
| que_necesita_para_directo | text | (Solo indirectos) Qué falta |
| fuente | text | Quién definió este vínculo |
| fecha_revision | date | Última vez que se revisó |

### Tabla: `objetivos_tmas` (datos maestros)
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | text (PK) | 'SMS', 'CS_OM1', 'CS_OM2', 'NHDS_OM1'... |
| nombre | text | Nombre amigable |
| descripcion | text | Descripción para el usuario |
| requisitos | jsonb | Array de requisitos |
| documentos | jsonb | Array de documentos necesarios |
| fuente_oficial | text | URL o referencia a documento oficial |

---

## 4. FLUJO DE PROCESOS

### Proceso 1: Configuración inicial (una vez)
```
Admin carga datos maestros
    ├── Criterios SelloPRO (23 criterios)
    ├── Vínculos T-MAS (desde Excel de consultores)
    ├── Objetivos T-MAS (descripciones oficiales)
    └── Crea cuentas de consultores
```

### Proceso 2: Registro de empresa
```
Consultor registra nueva empresa
    ├── Datos básicos (RUT, nombre, sector, región)
    ├── Se asigna consultor responsable
    └── Estado: "diagnóstico"
```

### Proceso 3: Evaluación
```
Consultor evalúa empresa
    ├── Selecciona empresa
    ├── Crea nueva evaluación (diagnóstico o cierre)
    ├── Ingresa nota (1-5) por cada criterio
    ├── Agrega observaciones (opcional)
    ├── Guarda como borrador → o → Finaliza
    └── Al finalizar:
        ├── Se calcula automáticamente la alineación T-MAS
        ├── Se genera token único para URL pública
        └── Estado evaluación: "finalizada"
```

### Proceso 4: Publicación
```
Consultor publica evaluación
    ├── Revisa dashboard generado
    ├── Marca como "publicada"
    ├── Se genera link: sellotmas.cl/empresa/{token}
    └── Consultor comparte link con la empresa
```

### Proceso 5: Vista empresa
```
Empresa accede a su dashboard
    ├── Entra por link único (sin login)
    ├── Ve su dashboard de alineación T-MAS
    ├── Puede explorar cada criterio
    ├── Ve qué le falta (plan de acción)
    └── Puede descargar reporte PDF
```

---

## 5. FASES DE DESARROLLO

### FASE 0: Preparación y datos (2-3 días)
**Objetivo**: Tener todos los datos validados y el proyecto configurado

- [ ] Validar con consultores la matriz de vinculación
- [ ] Recibir template Excel llenado por consultores (ver sección 6)
- [ ] Setup proyecto Next.js + TypeScript + Tailwind
- [ ] Setup Supabase (proyecto, tablas, RLS)
- [ ] Migrar datos del mockup actual a Supabase
- [ ] Setup repositorio Git (branch strategy: main → develop → features)

**Entregable**: Proyecto configurado con datos maestros cargados

### FASE 1: Backend y datos maestros (3-4 días)
**Objetivo**: Toda la lógica de datos funcionando

- [ ] Crear todas las tablas en Supabase
- [ ] Script de migración de datos actuales
- [ ] CRUD de criterios SelloPRO (admin)
- [ ] CRUD de vínculos T-MAS (admin)
- [ ] CRUD de objetivos T-MAS (admin)
- [ ] Lógica de cálculo de alineación T-MAS (función en DB o API)
- [ ] Tests de la lógica de cálculo

**Entregable**: Base de datos poblada y funciones de cálculo operativas

### FASE 2: Panel de consultor (5-7 días)
**Objetivo**: Los consultores pueden gestionar todo desde la plataforma

- [ ] Autenticación (login/logout)
- [ ] Dashboard principal: lista de empresas con estado
- [ ] Formulario de registro de empresa
- [ ] Formulario de evaluación (ingreso de notas por criterio)
- [ ] Vista previa del dashboard T-MAS antes de publicar
- [ ] Publicar/despublicar evaluación
- [ ] Importación masiva de notas desde Excel (upload)
- [ ] Historial de evaluaciones por empresa

**Entregable**: Panel operativo para consultores

### FASE 3: Dashboard empresa (3-5 días)
**Objetivo**: Dashboard público mejorado basado en el mockup

- [ ] Migrar mockup actual a componentes React
- [ ] Conectar con datos de Supabase
- [ ] Ruta pública: /empresa/{token}
- [ ] Agregar exportación a PDF
- [ ] Agregar comparativa diagnóstico vs cierre (si hay 2 evaluaciones)
- [ ] Responsive mobile mejorado
- [ ] Agregar sección de recursos/documentos útiles

**Entregable**: Dashboard público funcional y hermoso

### FASE 4: Pulido y lanzamiento (2-3 días)
**Objetivo**: Producto listo para producción

- [ ] Testing end-to-end
- [ ] Seguridad: validar RLS, tokens, etc.
- [ ] Performance: optimización de queries
- [ ] Deploy a producción (Vercel + dominio)
- [ ] Manual de uso para consultores
- [ ] Capacitación a equipo

**Entregable**: Plataforma en producción

---

## 6. QUÉ NECESITAMOS DE LOS CONSULTORES

### Entregable 1: MATRIZ DE VINCULACIÓN (Excel)
**Archivo**: `TEMPLATE_matriz_vinculacion.xlsx`

Columnas requeridas:

| # | Columna | Descripción | Ejemplo |
|---|---------|-------------|---------|
| A | criterio_id | Número del criterio SelloPRO | 1 |
| B | dimension | Dimensión | Gobernanza |
| C | criterio | Nombre exacto del criterio | Estrategia de sostenibilidad |
| D | tipo_vinculo | Directo / Indirecto / Sin Vínculo | Directo |
| E | estrella_minima | Desde qué estrella aplica (1-5) | 2 |
| F | sms | ¿Impacta SMS? (Sí/No) | Sí |
| G | cs_om1 | ¿Impacta CS OM1 - Mitigación? (Sí/No) | Sí |
| H | cs_om2 | ¿Impacta CS OM2 - Adaptación? (Sí/No) | Sí |
| I | nhds_om1 | ¿Impacta NHDS OM1? (Sí/No) | Sí |
| J | nhds_om2 | ¿Impacta NHDS OM2? (Sí/No) | No |
| K | nhds_om3 | ¿Impacta NHDS OM3 - Agua? (Sí/No) | No |
| L | nhds_om4 | ¿Impacta NHDS OM4 - Residuos? (Sí/No) | No |
| M | nhds_om5 | ¿Impacta NHDS OM5 - Contaminación? (Sí/No) | No |
| N | nhds_om6 | ¿Impacta NHDS OM6 - Biodiversidad? (Sí/No) | No |
| O | justificacion | ¿POR QUÉ se relaciona este criterio con la T-MAS? | "La estrategia de sostenibilidad considera..." |
| P | como_demuestra | ¿QUÉ DOCUMENTOS o EVIDENCIA respaldan el cumplimiento? | "Mostrando en tu estrategia cómo..." |
| Q | que_falta_directo | (Solo para INDIRECTOS) ¿Qué acciones específicas necesita la empresa para pasar de indirecto a directo? | "Capacitarse en los CTS de la T-MAS..." |

**⚠️ IMPORTANTE para consultores:**
- Cada fila = un criterio SelloPRO (son ~30 criterios, solo llenar los que tengan vínculo)
- Los "Sin Vínculo" deben incluirse también marcando tipo_vinculo = "Sin Vínculo"
- La justificación debe ser en LENGUAJE SIMPLE, no técnico
- El "que_falta_directo" es CLAVE: es lo que motiva a la empresa a mejorar

### Entregable 2: DESCRIPCIONES DE ESTRELLAS POR CRITERIO (Excel)
**Archivo**: `TEMPLATE_descripcion_estrellas.xlsx`

| # | Columna | Descripción | Ejemplo |
|---|---------|-------------|---------|
| A | criterio_id | Número del criterio | 1 |
| B | criterio | Nombre | Estrategia de sostenibilidad |
| C | estrella_1 | Qué significa tener 1 estrella | "No cuenta con iniciativas..." |
| D | estrella_2 | Qué significa tener 2 estrellas | "Existe un Plan..." |
| E | estrella_3 | Qué significa tener 3 estrellas | "La sostenibilidad es liderada..." |
| F | estrella_4 | Qué significa tener 4 estrellas | "La empresa cuenta con..." |
| G | estrella_5 | Qué significa tener 5 estrellas | "La estrategia se construyó..." |

### Entregable 3: INFO OFICIAL T-MAS POR OBJETIVO (Excel)
**Archivo**: `TEMPLATE_objetivos_tmas.xlsx`

| # | Columna | Descripción | Ejemplo |
|---|---------|-------------|---------|
| A | objetivo_id | Código | SMS |
| B | nombre | Nombre amigable | Compromiso Social y Ético |
| C | descripcion | Explicación en lenguaje simple | "Tu empresa demuestra que opera..." |
| D | requisito_1 | Primer requisito | "Procedimientos para cumplir..." |
| E | requisito_2 | Segundo requisito | "Canal de denuncias..." |
| F | requisito_3 | Tercer requisito | "Respeta derechos de trabajadores" |
| G | requisito_4 | Cuarto requisito (si aplica) | "" |
| H | documento_1 | Primer documento necesario | "Código de ética" |
| I | documento_2 | Segundo documento | "Reglamento interno" |
| J | documento_3 | Tercer documento (si aplica) | "" |
| K | referencia_oficial | URL o nombre del documento oficial | "T-MAS Chile, Anexo 3" |

---

## 7. STACK TECNOLÓGICO DEFINITIVO

| Componente | Tecnología | Justificación |
|------------|-----------|---------------|
| **Framework** | Next.js 14 (App Router) | SSR, API routes, deploy fácil |
| **Lenguaje** | TypeScript | Tipado fuerte, menos errores |
| **UI** | Tailwind CSS + shadcn/ui | Moderno, rápido, consistente |
| **Estado** | React hooks + Context | Simple para el alcance actual |
| **Backend** | Supabase | PostgreSQL + Auth + Storage gratis |
| **ORM** | Supabase JS Client | Integración nativa |
| **Deploy** | Vercel | Integración perfecta con Next.js |
| **PDF** | @react-pdf/renderer | Exportar dashboards a PDF |
| **Charts** | Recharts | Gráficos simples y bonitos |
| **Excel import** | SheetJS (xlsx) | Leer archivos Excel en browser |

---

## 8. ESTRUCTURA DEL PROYECTO

```
sellotmas/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Rutas con autenticación
│   │   │   ├── login/                # Página de login
│   │   │   └── layout.tsx            # Layout de auth
│   │   ├── (admin)/                  # Panel de consultor
│   │   │   ├── dashboard/            # Vista principal
│   │   │   ├── empresas/             # CRUD empresas
│   │   │   │   ├── [id]/            # Detalle empresa
│   │   │   │   └── nueva/           # Crear empresa
│   │   │   ├── evaluaciones/         # Gestión evaluaciones
│   │   │   │   ├── [id]/            # Detalle evaluación
│   │   │   │   └── nueva/[empresaId]/ # Nueva evaluación
│   │   │   ├── configuracion/        # Datos maestros
│   │   │   └── layout.tsx            # Layout admin
│   │   ├── empresa/                  # Vista pública
│   │   │   └── [token]/             # Dashboard empresa
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Landing page
│   ├── components/
│   │   ├── ui/                       # Componentes base (shadcn)
│   │   ├── admin/                    # Componentes del panel
│   │   │   ├── EmpresaForm.tsx
│   │   │   ├── EvaluacionForm.tsx
│   │   │   ├── CriterioInput.tsx
│   │   │   └── EmpresaCard.tsx
│   │   ├── dashboard/                # Componentes del dashboard
│   │   │   ├── Sidebar.tsx
│   │   │   ├── CriteriaList.tsx
│   │   │   ├── CriteriaCard.tsx
│   │   │   ├── DetailPanel.tsx
│   │   │   ├── ObjectiveItem.tsx
│   │   │   ├── StarsDisplay.tsx
│   │   │   └── TMASRelation.tsx
│   │   └── shared/                   # Componentes compartidos
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             # Cliente Supabase (browser)
│   │   │   ├── server.ts             # Cliente Supabase (server)
│   │   │   └── types.ts              # Tipos generados
│   │   ├── calculos/
│   │   │   ├── alineacion.ts         # Lógica de cálculo T-MAS
│   │   │   └── estadisticas.ts       # Cálculos de resumen
│   │   └── utils/
│   │       ├── excel.ts              # Parser de Excel
│   │       └── pdf.ts                # Generador de PDF
│   ├── hooks/
│   │   ├── useEmpresa.ts
│   │   ├── useEvaluacion.ts
│   │   └── useTMAS.ts
│   └── types/
│       └── index.ts                  # Tipos TypeScript
├── supabase/
│   ├── migrations/                   # Migraciones SQL
│   │   ├── 001_create_tables.sql
│   │   ├── 002_create_rls.sql
│   │   └── 003_seed_data.sql
│   └── seed.sql                      # Datos iniciales
├── public/
│   └── logos/                        # Logos e imágenes
├── .env.local                        # Variables de entorno
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 9. PANTALLAS DEL SISTEMA

### Panel Consultor:
1. **Login** → Email + contraseña
2. **Dashboard** → Lista de empresas con estado (tarjetas con indicadores)
3. **Detalle empresa** → Info + historial de evaluaciones + link público
4. **Nueva evaluación** → Formulario con los 23+ criterios, nota 1-5 cada uno
5. **Preview** → Vista previa del dashboard antes de publicar
6. **Configuración** → Editar datos maestros (criterios, vínculos)

### Vista Empresa (pública):
1. **Dashboard** → Lo que ya tenemos (mejorado), con:
   - Resumen de alineación
   - Lista de criterios con detalle
   - Plan de acción para mejoras
   - Comparativa diagnóstico vs cierre (si hay 2 evaluaciones)
   - Botón "Descargar PDF"

---

## 10. TIMELINE ESTIMADO

| Fase | Duración | Acumulado |
|------|----------|-----------|
| Fase 0: Preparación | 2-3 días | Semana 1 |
| Fase 1: Backend | 3-4 días | Semana 1-2 |
| Fase 2: Panel consultor | 5-7 días | Semana 2-3 |
| Fase 3: Dashboard empresa | 3-5 días | Semana 3-4 |
| Fase 4: Pulido y launch | 2-3 días | Semana 4 |
| **TOTAL** | **~15-22 días hábiles** | **~4 semanas** |

---

## 11. RIESGOS Y DEPENDENCIAS

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Consultores tardan en entregar datos | Alto - bloquea desarrollo | Enviar template YA, poner deadline de 1 semana |
| Cambios en criterios SelloPRO | Medio | Diseñar BD flexible, datos maestros editables |
| Cambios en T-MAS | Medio | Misma solución, datos maestros editables |
| Escalabilidad (muchas empresas) | Bajo (MVP) | Supabase escala bien, optimizar queries |
| Seguridad de datos empresas | Alto | RLS en Supabase, tokens únicos, HTTPS |

---

## 12. DECISIONES CLAVE PENDIENTES

1. **Dominio**: ¿Usar subdominio de CompromisoPro? ¿O dominio nuevo?
2. **Branding**: ¿Logo propio para la plataforma o usar el de SelloPRO?
3. **Acceso empresa**: ¿Solo link único o también login?
4. **PDF exportable**: ¿Diseño simple o reporte completo?
5. **Multi-evaluación**: ¿Mostrar evolución en el tiempo?

---

*Documento creado: Febrero 2026*
*Proyecto: SelloPRO × T-MAS*
*Equipo: CChC - Compromiso PRO*

