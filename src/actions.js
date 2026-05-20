import { state, saveData } from './state.js';
import { showToast } from './utils.js';

export function handleAuth() {
    const userInp = document.getElementById('auth-user').value.trim();
    const passInp = document.getElementById('auth-pass').value;

    if (state.authMode === 'register') {
        const terms = document.getElementById('auth-terms').checked;
        if (!userInp || !passInp) return showToast("Completa los campos", true);
        if (!terms) return showToast("Acepta los términos", true);
        state.user = { username: userInp, role: 'owner' };
        state.view = 'onboarding-type';
    } else {
        if (!userInp || !passInp) return showToast("Ingresa usuario y contraseña", true);
        
        let found = false;
        for (let bIdx = 0; bIdx < state.businesses.length; bIdx++) {
            const biz = state.businesses[bIdx];
            for (let brIdx = 0; brIdx < biz.branches.length; brIdx++) {
                const branch = biz.branches[brIdx];
                if (branch.username === userInp && branch.password === passInp) {
                    state.user = { username: branch.name, role: 'branch_user', businessIdx: bIdx, branchIdx: brIdx };
                    state.activeBusinessIdx = bIdx;
                    found = true;
                    break;
                }
            }
            if(found) break;
        }

        if (!found) {
            state.user = { username: userInp || 'Propietario', role: 'owner' };
        }

        if (state.businesses.length === 0) state.view = 'onboarding-type';
        else state.view = 'main';
    }
    saveData();
    window.renderApp();
}

export function completeSetup() {
    const isSingle = state.setupData.useCase === 'negocio_unico' || state.setupData.type === 'personal';
    const count = isSingle ? 1 : state.setupData.branchCount;
    const branchesGenerated = [];
    if (!state.setupData.branchNames) state.setupData.branchNames = [];

    for(let i = 0; i < count; i++) {
        branchesGenerated.push({
            name: isSingle ? 'Cuenta Principal' : (state.setupData.branchNames[i] || `Sucursal ${i + 1}`),
            username: '',
            password: '',
            transactions: []
        });
    }

    const newBiz = {
        id: Date.now(),
        name: state.setupData.name || (state.setupData.type === 'personal' ? 'Mis Finanzas' : 'Mi Negocio'),
        type: state.setupData.type,
        useCase: state.setupData.type === 'personal' ? 'personal' : state.setupData.useCase,
        branches: branchesGenerated,
        products: [], 
        savingsGoal: { name: '', target: 0, saved: 0, percentage: 10 } 
    };

    state.businesses.push(newBiz);
    state.view = 'main';
    saveData();
    window.renderApp();
}

export function addTransaction() {
    const type = document.getElementById('tx-type').value;
    const amount = parseFloat(document.getElementById('tx-amount').value);
    const desc = document.getElementById('tx-desc').value;
    const date = document.getElementById('tx-date').value;
    
    const branchSel = document.getElementById('tx-branch');
    let targetBranchIdx = 0;
    
    if(state.user.role === 'branch_user') {
        targetBranchIdx = state.user.branchIdx;
    } else if (branchSel) {
        targetBranchIdx = parseInt(branchSel.value);
    }

    if (!amount) return showToast("Ingrese un monto", true);

    const trans = { id: Date.now(), type, amount, description: desc, date };
    state.businesses[state.activeBusinessIdx].branches[targetBranchIdx].transactions.unshift(trans);
    
    saveData();
    showToast("Registro guardado");
    window.renderApp(); 
}

export function updateBranchCredentials(branchIdx) {
    const u = document.getElementById(`user-${branchIdx}`).value;
    const p = document.getElementById(`pass-${branchIdx}`).value;
    if(!u || !p) return showToast("Completa usuario y clave", true);
    state.businesses[state.activeBusinessIdx].branches[branchIdx].username = u;
    state.businesses[state.activeBusinessIdx].branches[branchIdx].password = p;
    saveData();
    showToast("Credenciales actualizadas");
}

export function logout() {
    localStorage.clear();
    window.location.reload();
}

export function exportToExcel(idTabla, nombreArchivo) {
    if (typeof XLSX === 'undefined') return showToast("Error: Librería Excel no cargada", true);
    const tabla = document.getElementById(idTabla);
    if (!tabla) return showToast("Error: No hay datos para exportar", true);

    const libro = XLSX.utils.table_to_book(tabla, { sheet: "Reporte" });
    XLSX.writeFile(libro, `${nombreArchivo}_${new Date().getTime()}.xlsx`);
    showToast("Archivo Excel generado con éxito");
}

export function exportToPDF(tituloReporte) {
    if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
        return showToast("Error: Librería PDF no cargada", true);
    }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.setTextColor(30, 41, 59); 
    doc.text(`ContaPyme - Reporte: ${tituloReporte}`, 14, 22);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Fecha de generación: ${new Date().toLocaleDateString()}`, 14, 30);

    doc.autoTable({
        html: '#tabla-reporte',
        startY: 35,
        theme: 'grid',
        headStyles: { fillColor: [79, 70, 229] },
        styles: { fontSize: 9, cellPadding: 4 },
        alternateRowStyles: { fillColor: [248, 250, 252] }
    });

    const nombreLimpio = tituloReporte.replace(/\s+/g, '_');
    doc.save(`ContaPyme_${nombreLimpio}.pdf`);
    showToast("Documento PDF generado con éxito");
}

export function addProduct() {
    const name = document.getElementById('new-prod-name').value.trim();
    const price = parseFloat(document.getElementById('new-prod-price').value);
    if (!name || isNaN(price)) return showToast("Ingresa un nombre y precio válido", true);
    
    const biz = state.businesses[state.activeBusinessIdx];
    if (!biz.products) biz.products = []; 
    biz.products.push({ name, price });
    
    saveData();
    showToast("Platillo/Producto agregado");
    window.renderApp();
}

export function deleteProduct(index) {
    const biz = state.businesses[state.activeBusinessIdx];
    biz.products.splice(index, 1);
    saveData();
    showToast("Producto eliminado");
    window.renderApp();
}

export function handleProductSelect(selectElement) {
    const idx = selectElement.value;
    if (idx === "") return; 
    
    const biz = state.businesses[state.activeBusinessIdx];
    const product = biz.products[idx];
    
    if (product) {
        document.getElementById('tx-amount').value = product.price;
        document.getElementById('tx-desc').value = product.name;
        document.getElementById('tx-type').value = 'income'; 
    }
}

export function updateSavingsGoal() {
    const name = document.getElementById('goal-name').value.trim();
    const target = parseFloat(document.getElementById('goal-target').value);
    const percentage = parseFloat(document.getElementById('goal-percentage').value);

    if (!name || isNaN(target) || isNaN(percentage)) return showToast("Completa los datos correctamente", true);

    const biz = state.businesses[state.activeBusinessIdx];
    if (!biz.savingsGoal) biz.savingsGoal = { saved: 0 }; 

    biz.savingsGoal.name = name;
    biz.savingsGoal.target = target;
    biz.savingsGoal.percentage = percentage;

    saveData();
    showToast("Meta de ahorro actualizada");
    window.renderApp();
}

export function addSavings(amountStr) {
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) return showToast("Monto no válido", true);

    const biz = state.businesses[state.activeBusinessIdx];
    if (!biz.savingsGoal) return;
    
    biz.savingsGoal.saved += amount;
    saveData();
    showToast(`¡Fantástico! Has ahorrado $${amount.toFixed(2)}`);
    window.renderApp();
}

// ==========================================
// FUNCIONES DE FILTRO (HISTORIAL Y DASHBOARD)
// ==========================================

export function filterHistory() {
    const start = document.getElementById('filter-start').value;
    const end = document.getElementById('filter-end').value;
    const branchSel = document.getElementById('filter-branch');
    
    if(!state.filters) state.filters = {};
    state.filters.startDate = start;
    state.filters.endDate = end;
    if(branchSel) state.filters.branchName = branchSel.value;
    
    window.renderApp();
}

export function clearHistoryFilter() {
    if(!state.filters) state.filters = {};
    state.filters.startDate = '';
    state.filters.endDate = '';
    state.filters.branchName = '';
    window.renderApp();
}

export function filterDashboard() {
    const date = document.getElementById('dash-filter-date').value;
    if(!state.dashFilters) state.dashFilters = {};
    state.dashFilters.date = date;
    window.renderApp();
}

export function clearDashboardFilter() {
    if(!state.dashFilters) state.dashFilters = {};
    state.dashFilters.date = '';
    window.renderApp();
}