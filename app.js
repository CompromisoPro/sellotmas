// ============================================
// SELLOPRO × T-MAS - App Principal
// Enfoque: Criterio → Relación T-MAS
// ============================================

class App {
    constructor() {
        this.criteriosCalculados = [];
        this.filtroActual = 'all';
        this.vistaActual = 'list';
        this.criterioSeleccionado = null;
        
        this.init();
    }

    init() {
        this.calcularCriterios();
        this.renderSidebar();
        this.renderCriterios();
        this.setupEventListeners();
        this.animateStats();
    }

    // Calcula el estado de cada criterio
    calcularCriterios() {
        this.criteriosCalculados = CRITERIOS_SELLOPRO.map(criterio => {
            const nota = EMPRESA_DEMO.notas[criterio.id] || 0;
            const cumple = nota >= criterio.estrellaVinculo;
            const brecha = cumple ? 0 : criterio.estrellaVinculo - nota;
            
            // Determinar qué objetivos impacta
            const objetivosImpactados = [];
            
            if (criterio.SMS === 1) {
                objetivosImpactados.push({
                    tipo: 'SMS',
                    nombre: 'Compromiso Social y Ético',
                    descripcion: 'Cuidas a tu gente y operas con ética',
                    icon: '🤝',
                    color: '#343434',
                    bg: 'rgba(52, 52, 52, 0.1)'
                });
            }
            
            if (criterio.CS_OM1 === 1) {
                objetivosImpactados.push({
                    tipo: 'CS_OM1',
                    nombre: 'Reducción de Emisiones',
                    descripcion: 'Ayudas a combatir el cambio climático',
                    icon: '🌱',
                    color: '#35d38b',
                    bg: 'rgba(53, 211, 139, 0.15)'
                });
            }
            
            if (criterio.CS_OM2 === 1) {
                objetivosImpactados.push({
                    tipo: 'CS_OM2',
                    nombre: 'Preparación ante el Clima',
                    descripcion: 'Estás listo para los cambios del clima',
                    icon: '🛡️',
                    color: '#35d38b',
                    bg: 'rgba(53, 211, 139, 0.15)'
                });
            }
            
            const nhdsObjetivos = [
                { key: 'NHDS_OM1', nombre: 'Sin Daño al Clima', icon: '✓', color: '#35d38b', bg: 'rgba(53, 211, 139, 0.1)' },
                { key: 'NHDS_OM2', nombre: 'Sin Daño a la Adaptación', icon: '✓', color: '#35d38b', bg: 'rgba(53, 211, 139, 0.1)' },
                { key: 'NHDS_OM3', nombre: 'Cuidado del Agua', icon: '💧', color: '#06B6D4', bg: '#CFFAFE' },
                { key: 'NHDS_OM4', nombre: 'Gestión de Residuos', icon: '♻️', color: '#35d38b', bg: 'rgba(53, 211, 139, 0.1)' },
                { key: 'NHDS_OM5', nombre: 'Control de Contaminación', icon: '🌬️', color: '#343434', bg: 'rgba(52, 52, 52, 0.1)' },
                { key: 'NHDS_OM6', nombre: 'Protección de la Naturaleza', icon: '🌿', color: '#35d38b', bg: 'rgba(53, 211, 139, 0.1)' }
            ];
            
            nhdsObjetivos.forEach(obj => {
                if (criterio[obj.key] === 1) {
                    objetivosImpactados.push({
                        tipo: obj.key.replace('_', '-'),
                        nombre: obj.nombre,
                        descripcion: 'No causar daño significativo',
                        icon: obj.icon,
                        color: obj.color,
                        bg: obj.bg
                    });
                }
            });

            return {
                ...criterio,
                nota,
                cumple,
                brecha,
                objetivosImpactados
            };
        });
    }

    // Renderiza el sidebar con estadísticas
    renderSidebar() {
        document.getElementById('companyName').textContent = EMPRESA_DEMO.nombre;
        
        const cumplidos = this.criteriosCalculados.filter(c => c.cumple).length;
        const total = this.criteriosCalculados.length;
        const porcentaje = Math.round((cumplidos / total) * 100);
        
        document.getElementById('globalScore').textContent = porcentaje;
        document.getElementById('cumpleCount').textContent = cumplidos;
        document.getElementById('brechaCount').textContent = total - cumplidos;
        
        // Contadores por dimensión
        const countByDim = {};
        this.criteriosCalculados.forEach(c => {
            countByDim[c.dimension] = (countByDim[c.dimension] || 0) + 1;
        });
        
        document.getElementById('countAll').textContent = total;
        document.getElementById('countGob').textContent = countByDim['GOBERNANZA'] || 0;
        document.getElementById('countTrab').textContent = countByDim['TRABAJADORES'] || 0;
        document.getElementById('countSST').textContent = countByDim['SST'] || 0;
        document.getElementById('countCadena').textContent = countByDim['CADENA_VALOR'] || 0;
        document.getElementById('countCom').textContent = countByDim['COMUNIDAD'] || 0;
        document.getElementById('countMedio').textContent = countByDim['MEDIOAMBIENTE'] || 0;
        document.getElementById('countInno').textContent = countByDim['INNOVACION'] || 0;
    }

    // Anima las estadísticas
    animateStats() {
        const cumplidos = this.criteriosCalculados.filter(c => c.cumple).length;
        const total = this.criteriosCalculados.length;
        const porcentaje = Math.round((cumplidos / total) * 100);
        
        // Animar barra
        setTimeout(() => {
            document.getElementById('globalBar').style.width = porcentaje + '%';
        }, 300);
        
        // Animar número
        this.animateNumber('globalScore', porcentaje);
        this.animateNumber('cumpleCount', cumplidos);
        this.animateNumber('brechaCount', total - cumplidos);
    }

    animateNumber(elementId, target) {
        const element = document.getElementById(elementId);
        const duration = 1000;
        const start = 0;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (target - start) * easeOut);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    // Renderiza la lista de criterios
    renderCriterios() {
        const container = document.getElementById('criteriaContainer');
        container.innerHTML = '';
        container.className = `criteria-container ${this.vistaActual === 'grid' ? 'grid-view' : ''}`;
        
        const criteriosFiltrados = this.filtroActual === 'all' 
            ? this.criteriosCalculados 
            : this.criteriosCalculados.filter(c => c.dimension === this.filtroActual);
        
        criteriosFiltrados.forEach((criterio, index) => {
            const card = document.createElement('div');
            card.className = `criteria-card ${criterio.cumple ? 'cumple' : 'no-cumple'}`;
            card.dataset.id = criterio.id;
            
            if (this.criterioSeleccionado === criterio.id) {
                card.classList.add('selected');
            }
            
            const dimInfo = DIMENSIONES[criterio.dimension];
            
            card.innerHTML = `
                <div class="card-number">${criterio.id}</div>
                <div class="card-content">
                    <div class="card-dimension">${dimInfo.icon} ${dimInfo.nombre}</div>
                    <div class="card-title">${criterio.criterio}</div>
                    <div class="card-stars">
                        <div class="stars">${this.renderStars(criterio.nota)}</div>
                        <span class="stars-label">Tu nota: ${criterio.nota} de 5</span>
                    </div>
                </div>
                <div class="card-status">
                    <span class="status-badge ${criterio.cumple ? 'cumple' : 'parcial'}">
                        ${criterio.cumple ? '✓ Alineado' : '↗ Oportunidad'}
                    </span>
                    <span class="link-type ${criterio.tipoVinculo.toLowerCase()}">
                        ${criterio.tipoVinculo}
                    </span>
                </div>
                <div class="card-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </div>
            `;
            
            card.addEventListener('click', () => this.mostrarDetalle(criterio));
            container.appendChild(card);
        });
    }

    renderStars(count) {
        let html = '';
        for (let i = 1; i <= 5; i++) {
            const filled = i <= count ? 'filled' : '';
            html += `<svg class="star ${filled}" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>`;
        }
        return html;
    }

    // Muestra el panel de detalle
    mostrarDetalle(criterio) {
        this.criterioSeleccionado = criterio.id;
        
        // Marcar card como seleccionada
        document.querySelectorAll('.criteria-card').forEach(card => {
            card.classList.toggle('selected', parseInt(card.dataset.id) === criterio.id);
        });
        
        const panel = document.getElementById('detailPanel');
        const content = document.getElementById('panelContent');
        
        const dimInfo = DIMENSIONES[criterio.dimension];
        
        // Generar explicación según el tipo de vínculo y estado
        let explicacion = '';
        let justificacionTMAS = criterio.justificacionTMAS || '';
        let comoDemuestra = criterio.comoDemuestra || '';
        
        if (criterio.cumple) {
            if (criterio.tipoVinculo === 'Directo') {
                explicacion = `<strong>¡Felicitaciones!</strong> 🎉 Con ${criterio.nota} estrellas ya cumples con lo que pide la Taxonomía de Finanzas Verdes de Chile. Esto te puede abrir puertas a <strong>financiamiento verde, mejores tasas de crédito y reconocimiento</strong> como empresa sostenible.`;
            } else {
                explicacion = `<strong>¡Vas muy bien!</strong> 👏 Con ${criterio.nota} estrellas estás contribuyendo a los objetivos de sostenibilidad de Chile. Aunque no es un cumplimiento directo, <strong>suma puntos</strong> para tu perfil de empresa responsable.`;
            }
        } else {
            if (criterio.brecha === 1) {
                explicacion = `<strong>¡Estás muy cerca!</strong> 🎯 Con ${criterio.nota} estrella${criterio.nota !== 1 ? 's' : ''} ya tienes una base sólida. Solo necesitas <strong>subir 1 estrella más</strong> para desbloquear acceso a financiamiento verde y reconocimiento como empresa sostenible.`;
            } else if (criterio.brecha === 2) {
                explicacion = `<strong>Buen avance</strong> 📈 Tienes ${criterio.nota} estrella${criterio.nota !== 1 ? 's' : ''} y necesitas llegar a ${criterio.estrellaVinculo}. Con <strong>2 pasos más</strong> podrías acceder a mejores condiciones de crédito y posicionarte como empresa verde.`;
            } else {
                explicacion = `<strong>Aquí hay una oportunidad</strong> 💡 Actualmente tienes ${criterio.nota} estrella${criterio.nota !== 1 ? 's' : ''}. Mejorar en este criterio te acercaría a los beneficios de la Taxonomía Verde: <strong>mejor acceso a financiamiento, imagen corporativa y ventajas competitivas</strong>.`;
            }
        }
        
        content.innerHTML = `
            <!-- Header del Criterio -->
            <div class="panel-criterio-header">
                <div class="panel-criterio-dimension">${dimInfo.icon} ${dimInfo.nombre}</div>
                <h2 class="panel-criterio-title">${criterio.criterio}</h2>
                <div class="panel-stars-row">
                    <div class="panel-stars">${this.renderStars(criterio.nota)}</div>
                    <span class="panel-stars-text">${criterio.nota} de 5 estrellas</span>
                </div>
            </div>
            
            <!-- Relación con T-MAS -->
            <div class="panel-section">
                <div class="panel-section-title">Relación con la Taxonomía</div>
                <div class="tmas-relation">
                    <div class="tmas-relation-header">
                        <div class="tmas-icon ${criterio.cumple ? 'cumple' : 'parcial'}">
                            ${criterio.cumple ? '✓' : '↗'}
                        </div>
                        <div>
                            <div class="tmas-relation-title">
                                ${criterio.cumple ? 'Criterio Alineado con T-MAS' : 'Oportunidad de Mejora'}
                            </div>
                            <div class="tmas-relation-subtitle">
                                Vínculo ${criterio.tipoVinculo} · Requiere ${criterio.estrellaVinculo}+ estrellas
                            </div>
                        </div>
                    </div>
                    <div class="tmas-explanation">${explicacion}</div>
                </div>
                
                ${justificacionTMAS ? `
                <div class="tmas-detail-box">
                    <div class="tmas-detail-title">📋 ¿Por qué se alinea con T-MAS?</div>
                    <p>${justificacionTMAS}</p>
                </div>
                ` : ''}
                
                ${comoDemuestra && criterio.cumple ? `
                <div class="tmas-detail-box success">
                    <div class="tmas-detail-title">✅ ¿Cómo lo demuestras?</div>
                    <p>${comoDemuestra}</p>
                </div>
                ` : ''}
            </div>
            
            <!-- Objetivos Impactados -->
            ${criterio.objetivosImpactados.length > 0 ? `
                <div class="panel-section">
                    <div class="panel-section-title">Objetivos T-MAS que impactas</div>
                    <div class="objectives-list">
                        ${criterio.objetivosImpactados.map(obj => {
                            // Obtener info detallada del objetivo
                            const infoKey = obj.tipo.replace('-', '_');
                            const infoTMAS = typeof INFO_TMAS !== 'undefined' ? INFO_TMAS[infoKey] : null;
                            
                            return `
                            <div class="objective-item ${criterio.cumple ? 'expandable' : ''}" data-info="${infoKey}">
                                <div class="objective-icon" style="background: ${obj.bg}">
                                    ${obj.icon}
                                </div>
                                <div class="objective-info">
                                    <div class="objective-name">${obj.nombre}</div>
                                    <div class="objective-type">${obj.tipo} · ${obj.descripcion}</div>
                                    ${criterio.cumple && infoTMAS ? `
                                        <div class="objective-detail-hint">Click para ver requisitos T-MAS</div>
                                    ` : ''}
                                </div>
                                ${criterio.cumple ? '<div class="objective-check">✓</div>' : ''}
                            </div>
                            ${criterio.cumple && infoTMAS ? `
                            <div class="objective-expanded" id="detail-${infoKey}" style="display: none;">
                                <div class="expanded-content">
                                    <p class="expanded-desc">${infoTMAS.descripcion}</p>
                                    <div class="expanded-title">Requisitos que cumples:</div>
                                    <ul class="expanded-list">
                                        ${infoTMAS.requisitos.map(req => `<li>${req}</li>`).join('')}
                                    </ul>
                                    ${infoTMAS.documentos ? `
                                        <div class="expanded-title" style="margin-top: 12px;">📄 Documentos recomendados:</div>
                                        <ul class="expanded-list docs">
                                            ${infoTMAS.documentos.map(doc => `<li>${doc}</li>`).join('')}
                                        </ul>
                                    ` : ''}
                                </div>
                            </div>
                            ` : ''}
                        `}).join('')}
                    </div>
                </div>
            ` : ''}
            
            <!-- Brecha (si no cumple) -->
            ${!criterio.cumple ? `
                <div class="panel-section">
                    <div class="panel-section-title">🚀 Tu próximo paso</div>
                    <div class="brecha-card">
                        <div class="brecha-header">
                            <span class="brecha-icon">${criterio.brecha === 1 ? '🎯' : criterio.brecha === 2 ? '📈' : '💡'}</span>
                            <span class="brecha-title">${criterio.brecha === 1 ? '¡Solo 1 estrella más!' : `Sube ${criterio.brecha} estrellas`}</span>
                        </div>
                        <p class="brecha-text">
                            ${criterio.brecha === 1 
                                ? `Estás a un paso de desbloquear <strong>beneficios reales</strong>: acceso a financiamiento verde, mejores tasas de crédito y reconocimiento como empresa sostenible.`
                                : `Al mejorar este criterio, tu empresa podrá acceder a <strong>financiamiento verde, beneficios tributarios</strong> y posicionarse como líder en sostenibilidad en tu sector.`
                            }
                        </p>
                        <div class="brecha-benefits">
                            <div class="benefit-item">💰 Mejores tasas de crédito</div>
                            <div class="benefit-item">🏆 Sello de empresa verde</div>
                            <div class="benefit-item">📊 Ventaja competitiva</div>
                        </div>
                        <button class="brecha-action">
                            <span>Solicitar asesoría</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </button>
                    </div>
                </div>
            ` : ''}
        `;
        
        // Mostrar panel
        panel.classList.add('open');
        this.mostrarOverlay();
        
        // Agregar event listeners para objetivos expandibles
        setTimeout(() => {
            document.querySelectorAll('.objective-item.expandable').forEach(item => {
                item.addEventListener('click', () => {
                    const infoKey = item.dataset.info;
                    const detailEl = document.getElementById(`detail-${infoKey}`);
                    if (detailEl) {
                        const isVisible = detailEl.style.display !== 'none';
                        detailEl.style.display = isVisible ? 'none' : 'block';
                        item.classList.toggle('expanded', !isVisible);
                    }
                });
            });
        }, 100);
    }

    cerrarPanel() {
        const panel = document.getElementById('detailPanel');
        panel.classList.remove('open');
        this.ocultarOverlay();
        this.criterioSeleccionado = null;
        
        document.querySelectorAll('.criteria-card').forEach(card => {
            card.classList.remove('selected');
        });
    }

    mostrarOverlay() {
        let overlay = document.querySelector('.panel-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'panel-overlay';
            overlay.addEventListener('click', () => this.cerrarPanel());
            document.body.appendChild(overlay);
        }
        setTimeout(() => overlay.classList.add('visible'), 10);
    }

    ocultarOverlay() {
        const overlay = document.querySelector('.panel-overlay');
        if (overlay) {
            overlay.classList.remove('visible');
        }
    }

    // Event Listeners
    setupEventListeners() {
        // Cerrar panel
        document.getElementById('closePanel').addEventListener('click', () => this.cerrarPanel());
        
        // Tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.cerrarPanel();
        });
        
        // Filtros de dimensión
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filtroActual = btn.dataset.filter;
                this.renderCriterios();
            });
        });
        
        // Toggle de vista
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.vistaActual = btn.dataset.view;
                this.renderCriterios();
            });
        });
    }
}

// Inicializar app
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
