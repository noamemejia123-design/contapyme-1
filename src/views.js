import { state } from './state.js';
import { getComputedData } from './utils.js';

export function renderAuth() {
    const isLogin = state.authMode === 'login';
    return `
    <div class="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-indigo-50/30 fade-in">
        <div class="w-full max-w-md flex flex-col items-center mb-6 text-center">
            <img src="./logo.jpeg" alt="ContaPyme - Tu copiloto financiero inteligente" class="w-full max-w-[280px] object-contain drop-shadow-sm mix-blend-multiply">
        </div>
        <div class="w-full max-w-md bg-white rounded-[2rem] shadow-xl p-8 border border-slate-100">
            <div class="space-y-6">
                <div>
                    <label class="block text-slate-500 font-bold text-sm mb-2 ml-1">Usuario o Correo</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300"><i class="fa-solid fa-user"></i></span>
                        <input type="text" id="auth-user" placeholder="nombre@ejemplo.com" class="w-full pl-11 pr-4 py-4 rounded-2xl bg-slate-50/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all">
                    </div>
                </div>
                <div>
                    <label class="text-slate-500 font-bold text-sm ml-1 mb-2 block">Contraseña</label>
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-300"><i class="fa-solid fa-lock"></i></span>
                        <input type="password" id="auth-pass" placeholder="${isLogin ? '••••••••' : 'Mínimo 8 caracteres'}" class="w-full pl-11 pr-12 py-4 rounded-2xl bg-slate-50/50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]">
                    </div>
                </div>
                ${!isLogin ? `
                <div class="flex items-start gap-3 mt-4">
                    <input type="checkbox" id="auth-terms" class="mt-1 w-4 h-4 rounded text-[#4F46E5]">
                    <label for="auth-terms" class="text-xs text-slate-400 leading-tight">Acepto los <span class="text-[#4F46E5] font-bold">Términos</span> y <span class="text-[#4F46E5] font-bold">Privacidad</span>.</label>
                </div>` : ''}
                <button onclick="handleAuth()" class="w-full bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-all active:scale-95">
                    ${isLogin ? 'Iniciar sesión' : 'Crear cuenta'} <i class="fa-solid fa-arrow-right"></i>
                </button>
            </div>
        </div>
        <div class="mt-8 text-center text-slate-500 font-medium">
            ${isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'} 
            <button onclick="state.authMode='${isLogin ? 'register' : 'login'}'; renderApp();" class="ml-2 text-[#4F46E5] font-bold hover:underline">${isLogin ? 'Regístrate' : 'Inicia sesión'}</button>
        </div>
    </div>`;
}

export function renderOnboardingType() {
    const types = [
        { id: 'tienda', label: 'Tienda', desc: 'Ventas diarias y productos.', icon: 'fa-shopping-bag', color: 'bg-indigo-100 text-[#4F46E5]' },
        { id: 'panaderia', label: 'Panadería', desc: 'Producción e insumos.', icon: 'fa-bread-slice', color: 'bg-amber-100 text-amber-600' },
        { id: 'restaurante', label: 'Restaurante', desc: 'Mesas y comandas.', icon: 'fa-utensils', color: 'bg-rose-100 text-rose-600' },
        { id: 'personal', label: 'Personales', desc: 'Ahorros y presupuesto.', icon: 'fa-building-columns', color: 'bg-emerald-100 text-emerald-600' }
    ];

    const cards = types.map(t => `
        <button onclick="state.setupData.type='${t.id}'; state.setupData.useCase='${t.id==='personal'?'personal':'negocio_unico'}'; renderApp();" 
                class="p-5 rounded-2xl border-2 transition-all text-left flex flex-col gap-3 min-h-[170px] ${state.setupData.type === t.id ? 'border-[#4F46E5] bg-indigo-50/30' : 'border-slate-100 bg-white'}">
            <div class="${t.color} p-3 rounded-xl w-fit shadow-sm"><i class="fa-solid ${t.icon} text-2xl"></i></div>
            <div>
                <h3 class="font-bold text-slate-800 text-sm mb-1">${t.label}</h3>
                <p class="text-[10px] text-slate-500 font-medium leading-tight">${t.desc}</p>
            </div>
        </button>
    `).join('');

    return `
    <div class="min-h-screen bg-white flex flex-col fade-in">
        <div class="p-4 flex items-center justify-between border-b border-slate-50">
            <img src="./logo.jpeg" alt="ContaPyme" class="h-8 object-contain mix-blend-multiply">
        </div>
        <div class="px-6 py-4">
            <div class="flex justify-between text-[11px] font-bold uppercase tracking-wider mb-2"><span class="text-[#4F46E5]">Paso 1 de 2</span><span class="text-slate-400">Rubro</span></div>
            <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden"><div class="h-full w-1/2 bg-[#4F46E5] rounded-full"></div></div>
        </div>
        <div class="px-6 py-6 text-center max-w-xl mx-auto">
            <h2 class="text-xl font-bold text-slate-800 leading-tight tracking-tight">¿Qué vamos a gestionar?</h2>
        </div>
        <div class="flex-grow px-6 pb-24 max-w-2xl mx-auto w-full grid grid-cols-2 gap-4">${cards}</div>
        <div class="fixed bottom-0 left-0 w-full p-6 bg-white/90 backdrop-blur-md border-t border-slate-50 flex justify-center z-10">
            <button onclick="state.view='onboarding-setup'; renderApp();" class="w-full max-w-md py-4 rounded-xl font-bold bg-[#4F46E5] text-white flex justify-center gap-2 shadow-lg">Siguiente <i class="fa-solid fa-arrow-right mt-1"></i></button>
        </div>
    </div>`;
}

export function renderOnboardingSetup() {
    const isPersonal = state.setupData.type === 'personal';
    if (!state.setupData.branchNames) state.setupData.branchNames = [];
    
    let contentHTML = '';
    if (isPersonal) {
        contentHTML = `
        <div class="text-center mb-8">
            <div class="bg-emerald-100 p-4 rounded-[1.5rem] shadow-sm mb-6 inline-block"><i class="fa-solid fa-building-columns text-4xl text-emerald-600"></i></div>
            <h2 class="text-3xl font-black text-slate-800 tracking-tight">Finanzas Personales</h2>
            <p class="text-slate-500 text-sm mt-3 italic font-medium px-4">"El mejor momento para tomar el control de tu dinero fue ayer. El segundo mejor es hoy."</p>
        </div>
        <div class="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
            <div>
                <label class="block text-xs font-black text-slate-400 uppercase mb-3 ml-1 tracking-widest">Nombre de perfil/cuenta</label>
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-5 flex items-center text-slate-400"><i class="fa-solid fa-user"></i></span>
                    <input type="text" onchange="state.setupData.name=this.value" value="${state.setupData.name}" placeholder="Ej. Mis Ahorros" class="w-full pl-12 pr-5 py-5 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:border-emerald-500 font-bold text-slate-700">
                </div>
            </div>
        </div>`;
    } else {
        const isMulti = state.setupData.useCase === 'sucursales';
        contentHTML = `
        <div class="text-center"><h2 class="text-2xl font-bold text-slate-800">Configura tu entorno</h2></div>
        <div class="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm mt-6">
            <button onclick="state.setupData.useCase='sucursales'; if(state.setupData.branchCount < 2) state.setupData.branchCount = 2; renderApp();" class="flex-1 py-4 rounded-xl flex flex-col items-center gap-2 ${isMulti ? 'bg-indigo-50/50 border-[#4F46E5] border-2 text-[#4F46E5]' : 'text-slate-400'}">
                <i class="fa-solid fa-store text-xl"></i><span class="font-bold text-xs uppercase">Múltiples Sucursales</span>
            </button>
            <button onclick="state.setupData.useCase='negocio_unico'; renderApp();" class="flex-1 py-4 rounded-xl flex flex-col items-center gap-2 ${!isMulti ? 'bg-indigo-50/50 border-[#4F46E5] border-2 text-[#4F46E5]' : 'text-slate-400'}">
                <i class="fa-solid fa-briefcase text-xl"></i><span class="font-bold text-xs uppercase">Sede Única</span>
            </button>
        </div>
        <div class="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-6 mt-6">
            <div>
                <label class="block text-sm font-bold text-slate-600 mb-2">${isMulti ? 'Panel del administrador (Nombre del negocio)' : 'Nombre del negocio'}</label>
                <input type="text" onchange="state.setupData.name=this.value" value="${state.setupData.name}" placeholder="Ej. Café Central" class="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-200">
            </div>
            ${isMulti ? `
            <div>
                <label class="block text-sm font-bold text-slate-600 mb-3">Número de sucursales (2 - 6)</label>
                <div class="flex gap-2">
                    ${[2,3,4,5,6].map(n => `<button onclick="state.setupData.branchCount=${n}; renderApp();" class="flex-1 py-3 rounded-xl font-black ${state.setupData.branchCount===n ? 'bg-[#4F46E5] text-white':'bg-slate-50 text-slate-400'}">${n}</button>`).join('')}
                </div>
            </div>
            ${Array.from({length: state.setupData.branchCount}).map((_, i) => `
            <div>
                <label class="block text-sm font-bold text-slate-600 mb-2">Nombre de la sucursal ${i + 1}</label>
                <input type="text" onchange="state.setupData.branchNames[${i}]=this.value" value="${state.setupData.branchNames[i] || ''}" placeholder="Ej. Sede ${i===0?'Centro':(i===1?'Norte':i+1)}" class="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-200">
            </div>
            `).join('')}
            ` : ''}
        </div>`;
    }

    return `
    <div class="min-h-screen bg-slate-50 flex flex-col fade-in">
        <header class="p-4 flex justify-between bg-white border-b border-slate-50">
            <img src="./logo.jpeg" alt="ContaPyme" class="h-8 object-contain mix-blend-multiply">
        </header>
        <div class="p-6 max-w-xl mx-auto w-full pb-32 mt-4">${contentHTML}</div>
        <div class="fixed bottom-0 left-0 w-full p-6 bg-white border-t border-slate-50 flex justify-center z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
            <button onclick="completeSetup()" class="w-full max-w-md text-white font-bold py-4 rounded-xl flex justify-center gap-2 shadow-lg active:scale-95 transition-all ${isPersonal ? 'bg-emerald-600' : 'bg-[#4F46E5]'}">
                Finalizar <i class="fa-solid fa-arrow-right mt-1"></i>
            </button>
        </div>
    </div>`;
}

export function renderMain() {
    const data = getComputedData();
    const { currentBusiness, isOwner, isSingleBranchMode, isPersonalMode, allTransactions, totals } = data;
    const dateStr = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const themeColor = isPersonalMode ? 'emerald' : 'indigo';
    const themeHex = isPersonalMode ? '#059669' : '#4F46E5';

    // Reglas de visualización
    const isRestaurant = currentBusiness.type === 'restaurante';
    const isSingleBranch = currentBusiness.useCase === 'negocio_unico';
    const isBranchUser = state.user.role === 'branch_user';
    const showSettings = isRestaurant && (isSingleBranch || isBranchUser);
    const isAdminMultiBranch = isOwner && !isSingleBranchMode && !isPersonalMode;

    // Inicializar filtros
    if (!state.filters) state.filters = { startDate: '', endDate: '', branchName: '' };
    if (!state.dashFilters) state.dashFilters = { date: '' };

    let tabsHTML = '';
    
    // --- DASHBOARD ---
    if (state.activeTab === 'dashboard') {
        let cardsHTML = `
            <div class="bg-white p-5 sm:p-6 rounded-[1rem] shadow-sm border border-slate-200">
                <p class="text-[11px] font-bold text-[#4F46E5] mb-2 uppercase tracking-wide">Balance Neto</p>
                <h3 class="text-3xl font-bold text-[#4F46E5] mb-2">$${totals.balance.toLocaleString('es-ES', {minimumFractionDigits: 2})}</h3>
                <p class="text-[10px] text-slate-400 font-medium">${isAdminMultiBranch ? 'Global • Todas las sucursales' : (isPersonalMode ? 'Finanzas personales' : 'Mi Negocio')}</p>
            </div>
            <div class="bg-white p-5 sm:p-6 rounded-[1rem] shadow-sm border border-slate-200 flex justify-between items-start">
                <div>
                    <p class="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wide">Ingresos</p>
                    <h3 class="text-2xl font-bold text-emerald-600 mb-2">$${totals.income.toLocaleString('es-ES', {minimumFractionDigits: 2})}</h3>
                </div>
                <div class="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><i class="fa-solid fa-arrow-up text-xs"></i></div>
            </div>
            <div class="bg-white p-5 sm:p-6 rounded-[1rem] shadow-sm border border-slate-200 flex justify-between items-start">
                <div>
                    <p class="text-[11px] font-bold text-slate-800 mb-2 uppercase tracking-wide">Gastos</p>
                    <h3 class="text-2xl font-bold text-rose-600 mb-2">$${totals.expense.toLocaleString('es-ES', {minimumFractionDigits: 2})}</h3>
                </div>
                <div class="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600"><i class="fa-solid fa-arrow-down text-xs"></i></div>
            </div>
        `;

        let dashFilterUI = '';
        let branchesTableHTML = '';

        if (isAdminMultiBranch) {
            let dashDateFilter = state.dashFilters.date;
            dashFilterUI = `
            <div class="bg-white p-4 rounded-[1rem] shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 items-end">
                <div class="flex-grow">
                    <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Filtrar tabla por día específico</label>
                    <input type="date" id="dash-filter-date" value="${dashDateFilter}" class="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-indigo-500">
                </div>
                <div class="flex gap-2 w-full md:w-auto">
                    <button onclick="filterDashboard()" class="flex-grow md:flex-grow-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg shadow-sm transition-all">Filtrar</button>
                    <button onclick="clearDashboardFilter()" class="flex-grow md:flex-grow-0 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-bold rounded-lg shadow-sm transition-all">Limpiar</button>
                </div>
            </div>
            `;

            branchesTableHTML = `
            <div class="bg-white rounded-[1rem] shadow-sm border border-slate-200 overflow-hidden">
                <div class="p-5 sm:p-6 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h4 class="font-bold text-slate-800">Panel del Propietario - Rendimiento</h4>
                        ${dashDateFilter ? `<p class="text-[10px] text-indigo-600 font-bold uppercase mt-1">Mostrando datos del: ${dashDateFilter}</p>` : `<p class="text-[10px] text-slate-400 uppercase mt-1">Histórico completo</p>`}
                    </div>
                    <div class="flex gap-2">
                        <button onclick="exportToExcel('tabla-reporte-dash', 'Rendimiento_Sucursales')" class="flex items-center gap-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm">
                            <i class="fa-solid fa-file-excel"></i> Excel
                        </button>
                        <button onclick="exportToPDF('Rendimiento por Sucursal')" class="flex items-center gap-2 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm">
                            <i class="fa-solid fa-file-pdf"></i> PDF
                        </button>
                    </div>
                </div>
                <div class="overflow-x-auto">
                    <table id="tabla-reporte-dash" class="w-full text-left">
                        <thead>
                            <tr class="text-[10px] text-slate-400 uppercase tracking-wider border-b border-slate-100 bg-slate-50/50">
                                <th class="px-5 py-3 font-bold whitespace-nowrap">Sucursal</th>
                                <th class="px-5 py-3 font-bold whitespace-nowrap">Ingresos</th>
                                <th class="px-5 py-3 font-bold whitespace-nowrap">Gastos</th>
                                <th class="px-5 py-3 font-bold whitespace-nowrap">Neto</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50">
                            ${currentBusiness.branches.map(b => {
                                let bTxs = b.transactions;
                                if(dashDateFilter) bTxs = bTxs.filter(t => t.date === dashDateFilter);
                                
                                const bInc = bTxs.filter(t=>t.type==='income').reduce((a,c)=>a+c.amount,0);
                                const bExp = bTxs.filter(t=>t.type==='expense').reduce((a,c)=>a+c.amount,0);
                                const bNet = bInc - bExp;
                                return `
                                <tr class="hover:bg-slate-50/50 transition">
                                    <td class="px-5 py-4"><span class="font-bold text-slate-800 text-xs">${b.name}</span></td>
                                    <td class="px-5 py-4 text-xs font-bold text-slate-700">$${bInc.toLocaleString('es-ES', {minimumFractionDigits: 2})}</td>
                                    <td class="px-5 py-4 text-xs font-bold text-slate-700">$${bExp.toLocaleString('es-ES', {minimumFractionDigits: 2})}</td>
                                    <td class="px-5 py-4 text-xs font-bold ${bNet >= 0 ? 'text-emerald-600' : 'text-rose-600'}">$${bNet.toLocaleString('es-ES', {minimumFractionDigits: 2})}</td>
                                </tr>`;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>`;
        }

        let txListHTML = allTransactions.length === 0 
            ? `<div class="p-10 text-center text-slate-400 italic text-sm flex-grow flex items-center justify-center">No hay registros aún.</div>` 
            : allTransactions.slice(0,6).map(t => `
                <div class="p-4 flex items-center justify-between hover:bg-slate-50/50 transition">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center ${t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}">
                            <i class="fa-solid ${t.type === 'income' ? 'fa-arrow-up' : 'fa-arrow-down'} text-[10px]"></i>
                        </div>
                        <div>
                            <p class="font-bold text-slate-800 text-[11px] leading-tight">${t.description || (t.type === 'income' ? 'Ingreso' : 'Egreso')}</p>
                            <p class="text-[9px] text-slate-400 font-medium">${(isAdminMultiBranch) ? t.branchName + ' • ' : ''}${t.date}</p>
                        </div>
                    </div>
                    <span class="font-bold text-xs ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}">${t.type === 'income' ? '+' : '-'}$${t.amount.toLocaleString('es-ES', {minimumFractionDigits: 2})}</span>
                </div>
            `).join('');

        tabsHTML = `
        <div class="space-y-6 fade-in">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">${cardsHTML}</div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="lg:col-span-2 space-y-6">
                    ${dashFilterUI}
                    ${branchesTableHTML}
                    <div class="bg-white rounded-[1rem] shadow-sm border border-slate-200 p-5 sm:p-6">
                        <h4 class="font-bold text-slate-800 mb-6">Actividad de la semana</h4>
                        <div class="h-64 w-full"><canvas id="activityChart"></canvas></div>
                    </div>
                </div>
                <div class="lg:col-span-1">
                    <div class="bg-white rounded-[1rem] shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
                        <div class="p-5 border-b border-slate-50"><h4 class="font-bold text-slate-800">Últimos movimientos</h4></div>
                        <div class="divide-y divide-slate-50 flex-grow">${txListHTML}</div>
                    </div>
                </div>
            </div>
        </div>`;
    } 
    // --- BRANCHES (PANEL ADMIN) ---
    else if (state.activeTab === 'branches') {
        tabsHTML = `
        <div class="space-y-6 fade-in">
            <div class="bg-white p-6 sm:p-8 rounded-[1rem] shadow-sm border border-slate-200 mb-6">
                <h3 class="text-xl font-bold text-slate-800 mb-1"><i class="fa-solid fa-users-gear text-[#4F46E5] mr-2"></i>Gestión de Accesos</h3>
                <p class="text-sm text-slate-500">Asigna un usuario y contraseña a cada sucursal para que los cajeros registren sus ingresos y gastos.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${currentBusiness.branches.map((b, idx) => {
                    const bInc = b.transactions.filter(t=>t.type==='income').reduce((a,c)=>a+c.amount,0);
                    const bExp = b.transactions.filter(t=>t.type==='expense').reduce((a,c)=>a+c.amount,0);
                    return `
                    <div class="bg-white rounded-[1rem] shadow-sm border border-slate-200 p-5 flex flex-col gap-4">
                        <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div class="w-10 h-10 bg-indigo-50 text-[#4F46E5] rounded-full flex items-center justify-center"><i class="fa-solid fa-store"></i></div>
                            <div>
                                <h4 class="font-bold text-slate-800">${b.name}</h4>
                                <p class="text-[10px] font-bold text-slate-400 uppercase">Sede #${idx+1}</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-2 text-center text-xs">
                            <div class="bg-slate-50 p-2 rounded-lg"><span class="block text-[9px] text-slate-400">Ingresos históricos</span><span class="font-bold text-emerald-600">$${bInc}</span></div>
                            <div class="bg-slate-50 p-2 rounded-lg"><span class="block text-[9px] text-slate-400">Gastos históricos</span><span class="font-bold text-rose-600">$${bExp}</span></div>
                        </div>
                        <div class="mt-2 space-y-2 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                            <label class="block text-[10px] font-bold text-slate-500 uppercase">Credenciales de acceso</label>
                            <input type="text" class="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-indigo-500" value="${b.username}" id="user-${idx}" placeholder="Usuario (Ej. cajero1)">
                            <input type="password" class="w-full px-3 py-2 text-xs rounded-lg bg-white border border-slate-200 focus:outline-none focus:border-indigo-500" value="${b.password}" id="pass-${idx}" placeholder="Contraseña">
                            <button onclick="updateBranchCredentials(${idx})" class="w-full py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-colors mt-1">Guardar accesos</button>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        </div>`;
    }
    // --- HISTORY ---
    else if (state.activeTab === 'history') {
        let filteredTransactions = allTransactions;

        if (state.filters.startDate) {
            filteredTransactions = filteredTransactions.filter(t => t.date >= state.filters.startDate);
        }
        if (state.filters.endDate) {
            filteredTransactions = filteredTransactions.filter(t => t.date <= state.filters.endDate);
        }
        if (state.filters.branchName) {
            filteredTransactions = filteredTransactions.filter(t => t.branchName === state.filters.branchName);
        }

        const histTotals = filteredTransactions.reduce((acc, t) => {
            if (t.type === 'income') acc.income += t.amount; else acc.expense += t.amount;
            return acc;
        }, { income: 0, expense: 0 });
        const histNet = histTotals.income - histTotals.expense;

        // SELECTOR DE SUCURSALES (Solo para Administrador)
        let branchFilterOption = '';
        if (isAdminMultiBranch) {
            branchFilterOption = `
            <div class="w-full md:w-48 flex-shrink-0">
                <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Sucursal</label>
                <select id="filter-branch" class="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-${themeColor}-500">
                    <option value="">Todas</option>
                    ${currentBusiness.branches.map(b => `<option value="${b.name}" ${state.filters.branchName === b.name ? 'selected' : ''}>${b.name}</option>`).join('')}
                </select>
            </div>
            `;
        }

        const filterUI = `
        <div class="bg-white p-4 rounded-[1rem] shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-end mb-6">
            ${branchFilterOption}
            <div class="w-full md:w-auto flex-grow">
                <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Desde</label>
                <input type="date" id="filter-start" value="${state.filters.startDate}" class="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-${themeColor}-500">
            </div>
            <div class="w-full md:w-auto flex-grow">
                <label class="block text-[10px] font-bold text-slate-500 uppercase mb-1">Hasta</label>
                <input type="date" id="filter-end" value="${state.filters.endDate}" class="w-full px-3 py-2 text-sm rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:border-${themeColor}-500">
            </div>
            <div class="flex gap-2 w-full md:w-auto">
                <button onclick="filterHistory()" class="flex-grow md:flex-grow-0 px-4 py-2 bg-${themeColor}-600 hover:bg-${themeColor}-700 text-white text-sm font-bold rounded-lg shadow-sm transition-all">Filtrar</button>
                <button onclick="clearHistoryFilter()" class="flex-grow md:flex-grow-0 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-bold rounded-lg shadow-sm transition-all">Limpiar</button>
            </div>
        </div>`;

        tabsHTML = `
        <div class="space-y-6 fade-in">
            ${filterUI}

            <div class="bg-white p-5 sm:p-6 rounded-[1rem] shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 flex-grow w-full">
                    <div><p class="text-[10px] font-bold text-slate-500">Ingresos</p><p class="text-[15px] font-bold text-emerald-600">$${histTotals.income.toLocaleString('es-ES', {minimumFractionDigits: 2})}</p></div>
                    <div><p class="text-[10px] font-bold text-slate-500">Gastos</p><p class="text-[15px] font-bold text-rose-600">$${histTotals.expense.toLocaleString('es-ES', {minimumFractionDigits: 2})}</p></div>
                    <div><p class="text-[10px] font-bold text-slate-500">Balance neto</p><p class="text-[15px] font-bold text-[#4F46E5]">$${histNet.toLocaleString('es-ES', {minimumFractionDigits: 2})}</p></div>
                    <div><p class="text-[10px] font-bold text-slate-500">Resultados</p><p class="text-[15px] font-bold text-[#4F46E5]">${filteredTransactions.length}</p></div>
                </div>
                
                ${!isPersonalMode ? `
                <div class="flex gap-2 w-full md:w-auto justify-end">
                    <button onclick="exportToExcel('tabla-historial', 'Historial_Filtrado')" class="flex items-center gap-2 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm">
                        <i class="fa-solid fa-file-excel"></i> Excel
                    </button>
                    <button onclick="exportToPDF('Historial de Movimientos')" class="flex items-center gap-2 px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-all shadow-sm">
                        <i class="fa-solid fa-file-pdf"></i> PDF
                    </button>
                </div>
                ` : ''}
            </div>

            <div class="bg-white rounded-[1rem] shadow-sm border border-slate-200 overflow-hidden overflow-x-auto">
                <table id="tabla-historial" class="w-full text-left min-w-[700px]">
                    <thead class="bg-slate-50 text-[10px] text-slate-400 uppercase tracking-wider">
                        <tr><th class="p-5">Fecha</th><th class="p-5">Descripción</th>${isAdminMultiBranch ? `<th class="p-5">Sucursal</th>` : ''}<th class="p-5">Tipo</th><th class="p-5 text-right">Monto</th></tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50 text-xs">
                        ${filteredTransactions.length === 0 ? `<tr><td colspan="5" class="p-6 text-center text-slate-400 italic">No hay registros en esta búsqueda.</td></tr>` : ''}
                        ${filteredTransactions.map(t => `
                        <tr class="hover:bg-slate-50/50">
                            <td class="px-5 py-4 font-bold text-slate-600">${t.date}</td>
                            <td class="px-5 py-4 font-bold text-slate-800">${t.description || 'Movimiento'}</td>
                            ${isAdminMultiBranch ? `<td class="px-5 py-4 text-slate-600">${t.branchName || 'Central'}</td>` : ''}
                            <td class="px-5 py-4 font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}">${t.type === 'income' ? 'Ingreso' : 'Gasto'}</td>
                            <td class="px-5 py-4 font-bold text-right ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}">${t.type === 'income' ? '+$' : '-$'}${t.amount}</td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>`;
    }
    // --- SETTINGS ---
    else if (state.activeTab === 'settings' && showSettings) {
        const products = currentBusiness.products || [];
        tabsHTML = `
        <div class="space-y-6 fade-in">
            <div class="bg-white p-6 sm:p-8 rounded-[1rem] shadow-sm border border-slate-200">
                <h3 class="text-xl font-bold text-slate-800 mb-2">Configuración de Menú</h3>
                <p class="text-sm text-slate-500 mb-6">Crea platillos o productos para registrarlos más rápido al agregar ingresos.</p>

                <div class="flex flex-col md:flex-row gap-4 mb-8">
                    <input type="text" id="new-prod-name" placeholder="Nombre del platillo (Ej. Jugo natural)" class="flex-grow px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#4F46E5]">
                    <div class="relative w-full md:w-40">
                        <span class="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold">$</span>
                        <input type="number" id="new-prod-price" placeholder="0.00" step="0.01" class="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#4F46E5]">
                    </div>
                    <button onclick="addProduct()" class="px-6 py-3 bg-[#4F46E5] hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md">Agregar</button>
                </div>

                <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Productos Actuales</h4>
                <div class="space-y-3">
                    ${products.length === 0 ? '<p class="text-sm text-slate-400 italic bg-slate-50 p-4 rounded-xl text-center">No hay productos registrados aún.</p>' : ''}
                    ${products.map((p, i) => `
                    <div class="flex items-center justify-between p-4 border border-slate-100 rounded-xl bg-white shadow-sm hover:shadow-md transition">
                        <div class="flex items-center gap-3">
                            <div class="w-8 h-8 rounded-full bg-indigo-50 text-[#4F46E5] flex items-center justify-center"><i class="fa-solid fa-utensils text-xs"></i></div>
                            <span class="font-bold text-slate-800">${p.name}</span>
                        </div>
                        <div class="flex items-center gap-4">
                            <span class="font-bold text-emerald-600">$${parseFloat(p.price).toFixed(2)}</span>
                            <button onclick="deleteProduct(${i})" class="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 flex items-center justify-center transition-colors"><i class="fa-solid fa-trash text-xs"></i></button>
                        </div>
                    </div>
                    `).join('')}
                </div>
            </div>
        </div>`;
    }
    // --- AHORRO AUTOMÁTICO ---
    else if (state.activeTab === 'savings' && isPersonalMode) {
        const goal = currentBusiness.savingsGoal || { name: '', target: 0, saved: 0, percentage: 10 };
        const realNetBalance = totals.balance; 
        const availableToSave = realNetBalance - goal.saved; 
        const suggested = availableToSave > 0 ? (availableToSave * (goal.percentage / 100)) : 0;
        const progress = goal.target > 0 ? Math.min(100, Math.floor((goal.saved / goal.target) * 100)) : 0;

        let msg = "¡Establece tu meta y empieza a ahorrar hoy!";
        if (goal.target > 0) {
            if (progress >= 100) msg = "¡Felicidades! Has alcanzado tu meta. 🎉";
            else if (progress >= 75) msg = "¡Ya casi lo logras! Sigue así. 💪";
            else if (progress >= 50) msg = "¡Vas por la mitad! Excelente trabajo. ✨";
            else if (progress > 0) msg = `¡Buen comienzo! Has alcanzado el ${progress}% de tu meta. 🚀`;
        }

        tabsHTML = `
        <div class="space-y-6 fade-in">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="bg-white p-6 sm:p-8 rounded-[1rem] shadow-sm border border-slate-200">
                    <div class="flex items-center gap-3 mb-6">
                        <div class="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center"><i class="fa-solid fa-piggy-bank"></i></div>
                        <div>
                            <h3 class="text-xl font-bold text-slate-800">${goal.name || 'Sin meta definida'}</h3>
                            <p class="text-xs text-slate-500 font-medium">${msg}</p>
                        </div>
                    </div>
                    
                    <div class="flex justify-between items-end mb-2">
                        <div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ahorrado</p>
                            <h4 class="text-3xl font-black text-emerald-600">$${goal.saved.toLocaleString('es-ES', {minimumFractionDigits:2})}</h4>
                        </div>
                        <div class="text-right">
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Objetivo</p>
                            <h4 class="text-lg font-bold text-slate-700">$${goal.target.toLocaleString('es-ES', {minimumFractionDigits:2})}</h4>
                        </div>
                    </div>

                    <div class="h-4 w-full bg-slate-100 rounded-full overflow-hidden mt-4 relative">
                        <div class="h-full bg-emerald-500 transition-all duration-1000" style="width: ${progress}%"></div>
                        <span class="absolute inset-0 flex items-center justify-center text-[10px] font-black text-slate-700 ${progress>50?'text-white':''}">${progress}%</span>
                    </div>
                </div>

                <div class="bg-gradient-to-br from-emerald-600 to-teal-800 p-6 sm:p-8 rounded-[1rem] shadow-lg text-white flex flex-col justify-between">
                    <div>
                        <h3 class="text-lg font-bold mb-1"><i class="fa-solid fa-bolt text-yellow-300 mr-2"></i>Ahorro Inteligente</h3>
                        <p class="text-emerald-100 text-xs mb-6 leading-relaxed">Basado en tu saldo neto y tu porcentaje establecido (${goal.percentage}%), te sugerimos transferir este monto a tu meta.</p>
                        
                        <div class="grid grid-cols-2 gap-4 mb-6">
                            <div class="bg-white/10 p-3 rounded-xl border border-white/20">
                                <p class="text-[10px] text-emerald-200 uppercase font-bold tracking-widest">Saldo Disponible</p>
                                <p class="font-bold text-lg">$${availableToSave.toLocaleString('es-ES', {minimumFractionDigits:2})}</p>
                            </div>
                            <div class="bg-white p-3 rounded-xl shadow-inner">
                                <p class="text-[10px] text-emerald-600 uppercase font-bold tracking-widest">Sugerencia</p>
                                <p class="font-black text-xl text-emerald-700">$${suggested.toLocaleString('es-ES', {minimumFractionDigits:2})}</p>
                            </div>
                        </div>
                    </div>
                    
                    <button onclick="addSavings(${suggested})" class="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-teal-900 font-black rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${suggested <= 0 ? 'opacity-50 pointer-events-none' : ''}">
                        Ahorrar sugerencia <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>

            <div class="bg-white p-6 sm:p-8 rounded-[1rem] shadow-sm border border-slate-200">
                <h4 class="font-bold text-slate-800 mb-4"><i class="fa-solid fa-bullseye text-emerald-500 mr-2"></i>Configurar Meta</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label class="block text-[11px] font-bold text-slate-500 mb-1">Nombre de la meta</label>
                        <input type="text" id="goal-name" value="${goal.name}" placeholder="Ej. Viaje, Laptop..." class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-slate-500 mb-1">Monto Objetivo ($)</label>
                        <input type="number" id="goal-target" value="${goal.target}" placeholder="100.00" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500">
                    </div>
                    <div>
                        <label class="block text-[11px] font-bold text-slate-500 mb-1">% de Ahorro del saldo neto</label>
                        <div class="flex gap-2">
                            <input type="number" id="goal-percentage" value="${goal.percentage}" placeholder="10" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-500">
                            <button onclick="updateSavingsGoal()" class="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all shadow-md"><i class="fa-solid fa-save"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }

    const headerTitle = state.activeTab === 'dashboard' ? 'Resumen Diario' : 
                        state.activeTab === 'branches' ? 'Gestión de Sucursales' : 
                        state.activeTab === 'history' ? 'Historial' :
                        state.activeTab === 'savings' ? 'Módulo de Ahorro' : 'Configuración';

    return `
    <div class="min-h-screen bg-slate-50 fade-in">
        <aside class="fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-100 z-50 hidden sm:flex flex-col py-8 px-5 shadow-sm">
            <div class="flex items-center gap-3 mb-10 px-2">
                <img src="./logo.jpeg" alt="ContaPyme" class="h-10 object-contain mix-blend-multiply">
            </div>
            <nav class="space-y-1.5 flex-grow">
                <button onclick="state.activeTab='dashboard'; renderApp();" class="w-full flex items-center gap-3 p-3.5 rounded-2xl font-medium ${state.activeTab==='dashboard'? `bg-${themeColor}-50 text-${themeHex}` : 'text-slate-600 hover:bg-slate-50'}"><i class="fa-solid fa-chart-pie w-5 text-center"></i> Resumen</button>
                
                ${isAdminMultiBranch ? `<button onclick="state.activeTab='branches'; renderApp();" class="w-full flex items-center gap-3 p-3.5 rounded-2xl font-medium ${state.activeTab==='branches'? 'bg-[#4F46E5]/10 text-[#4F46E5]' : 'text-slate-600 hover:bg-slate-50'}"><i class="fa-solid fa-store w-5 text-center"></i> Sucursales</button>` : ''}
                
                <button onclick="state.activeTab='history'; renderApp();" class="w-full flex items-center gap-3 p-3.5 rounded-2xl font-medium ${state.activeTab==='history'? `bg-${themeColor}-50 text-${themeHex}` : 'text-slate-600 hover:bg-slate-50'}"><i class="fa-solid fa-file-invoice w-5 text-center"></i> Historial</button>
                
                ${showSettings ? `<button onclick="state.activeTab='settings'; renderApp();" class="w-full flex items-center gap-3 p-3.5 rounded-2xl font-medium ${state.activeTab==='settings'? `bg-${themeColor}-50 text-${themeHex}` : 'text-slate-600 hover:bg-slate-50'}"><i class="fa-solid fa-cog w-5 text-center"></i> Configuración</button>` : ''}
                
                ${isPersonalMode ? `<button onclick="state.activeTab='savings'; renderApp();" class="w-full flex items-center gap-3 p-3.5 rounded-2xl font-medium ${state.activeTab==='savings'? `bg-${themeColor}-50 text-${themeHex}` : 'text-slate-600 hover:bg-slate-50'}"><i class="fa-solid fa-piggy-bank w-5 text-center"></i> Mis Ahorros</button>` : ''}
            </nav>
            <div class="pt-6 border-t border-slate-50"><button onclick="logout()" class="w-full flex items-center gap-3 p-3.5 text-rose-500 hover:bg-rose-50 rounded-2xl font-medium"><i class="fa-solid fa-sign-out-alt w-5 text-center"></i> Cerrar Sesión</button></div>
        </aside>

        <main class="sm:ml-64 min-h-screen pb-28 sm:pb-12">
            <header class="bg-slate-50 p-6 flex justify-between items-center sticky top-0 z-30">
                <div>
                    <h2 class="text-2xl font-bold text-slate-800">${headerTitle}</h2>
                    <p class="text-sm text-slate-500">${dateStr}</p>
                </div>
            </header>
            <div class="p-6 sm:px-10 max-w-6xl mx-auto relative">${tabsHTML}</div>
        </main>

        <nav class="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-100 p-3 sm:hidden flex justify-around z-40">
            <button onclick="state.activeTab='dashboard'; renderApp();" class="flex flex-col items-center gap-1.5 p-3 rounded-2xl ${state.activeTab==='dashboard'?`text-${themeHex} bg-${themeColor}-50`:'text-slate-400'}"><i class="fa-solid fa-chart-pie text-xl"></i><span class="text-[9px] font-bold uppercase">Resumen</span></button>
            ${isAdminMultiBranch ? `<button onclick="state.activeTab='branches'; renderApp();" class="flex flex-col items-center gap-1.5 p-3 rounded-2xl ${state.activeTab==='branches'?'text-[#4F46E5] bg-indigo-50':'text-slate-400'}"><i class="fa-solid fa-store text-xl"></i><span class="text-[9px] font-bold uppercase">Sedes</span></button>` : ''}
            <button onclick="state.activeTab='history'; renderApp();" class="flex flex-col items-center gap-1.5 p-3 rounded-2xl ${state.activeTab==='history'?`text-${themeHex} bg-${themeColor}-50`:'text-slate-400'}"><i class="fa-solid fa-file-invoice text-xl"></i><span class="text-[9px] font-bold uppercase">Historial</span></button>
            
            ${showSettings ? `<button onclick="state.activeTab='settings'; renderApp();" class="flex flex-col items-center gap-1.5 p-3 rounded-2xl ${state.activeTab==='settings'?`text-${themeHex} bg-${themeColor}-50`:'text-slate-400'}"><i class="fa-solid fa-cog text-xl"></i><span class="text-[9px] font-bold uppercase">Ajustes</span></button>` : ''}
            ${isPersonalMode ? `<button onclick="state.activeTab='savings'; renderApp();" class="flex flex-col items-center gap-1.5 p-3 rounded-2xl ${state.activeTab==='savings'?`text-${themeHex} bg-${themeColor}-50`:'text-slate-400'}"><i class="fa-solid fa-piggy-bank text-xl"></i><span class="text-[9px] font-bold uppercase">Ahorros</span></button>` : ''}
        </nav>

        ${state.activeTab === 'dashboard' && !(isAdminMultiBranch) ? `
        <button onclick="document.getElementById('tx-modal').classList.remove('hidden')" class="fixed bottom-24 right-6 sm:bottom-10 sm:right-10 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl active:scale-90 transition-all z-40 bg-${themeColor}-600">
            <i class="fa-solid fa-plus"></i>
        </button>

        <div id="tx-modal" class="hidden fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-end sm:items-center justify-center z-50 p-4">
            <div class="bg-white w-full max-w-md rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative">
                <button onclick="document.getElementById('tx-modal').classList.add('hidden')" class="absolute top-6 right-6 p-2 bg-slate-100 rounded-full text-slate-400 hover:text-slate-600"><i class="fa-solid fa-times"></i></button>
                <h3 class="text-xl font-bold text-slate-800 mb-6">Agregar Movimiento</h3>
                <div class="space-y-4">
                    <select id="tx-type" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 font-bold text-slate-700">
                        <option value="income">Ingreso (+)</option>
                        <option value="expense">Gasto (-)</option>
                    </select>

                    ${(showSettings && currentBusiness.products && currentBusiness.products.length > 0) ? `
                    <select id="tx-product" onchange="handleProductSelect(this)" class="w-full px-4 py-3 rounded-xl bg-indigo-50 border border-indigo-100 font-medium text-[#4F46E5] focus:outline-none">
                        <option value="">Seleccionar producto (Opcional)...</option>
                        ${currentBusiness.products.map((p, i) => `<option value="${i}">${p.name} — $${parseFloat(p.price).toFixed(2)}</option>`).join('')}
                    </select>
                    ` : ''}

                    <input type="number" id="tx-amount" placeholder="Monto Total ($)" class="w-full text-xl font-black px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
                    <input type="date" id="tx-date" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 font-medium text-slate-700" value="${new Date().toISOString().split('T')[0]}">
                    <input type="text" id="tx-desc" placeholder="Descripción (Ej. Venta en caja)" class="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 font-medium text-slate-700">
                    
                    <button onclick="addTransaction()" class="w-full py-4 rounded-xl font-bold text-white shadow-md bg-${themeColor}-600 mt-4">Guardar registro</button>
                </div>
            </div>
        </div>` : ''}
    </div>`;
}