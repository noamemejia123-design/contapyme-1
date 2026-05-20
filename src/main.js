import { state, initData } from './state.js';
import { showToast } from './utils.js';
import { 
    handleAuth, completeSetup, addTransaction, updateBranchCredentials, 
    logout, exportToExcel, exportToPDF, addProduct, deleteProduct, handleProductSelect,
    updateSavingsGoal, addSavings, filterHistory, clearHistoryFilter,
    filterDashboard, clearDashboardFilter // <-- NUEVAS FUNCIONES
} from './actions.js';
import { renderAuth, renderOnboardingType, renderOnboardingSetup, renderMain } from './views.js';
import { initChart } from './chart.js';

// 1. Exponer estado y utilidades al ámbito global
window.state = state;
window.handleAuth = handleAuth;
window.completeSetup = completeSetup;
window.addTransaction = addTransaction;
window.updateBranchCredentials = updateBranchCredentials;
window.logout = logout;
window.showToast = showToast;

// Exponer funciones de descarga
window.exportToExcel = exportToExcel;
window.exportToPDF = exportToPDF;

// Exponer funciones de productos / configuración
window.addProduct = addProduct;
window.deleteProduct = deleteProduct;
window.handleProductSelect = handleProductSelect;

// Exponer funciones del módulo de Ahorro
window.updateSavingsGoal = updateSavingsGoal;
window.addSavings = addSavings;

// Exponer funciones de Filtros
window.filterHistory = filterHistory;
window.clearHistoryFilter = clearHistoryFilter;
window.filterDashboard = filterDashboard;
window.clearDashboardFilter = clearDashboardFilter;

// 2. Definir función render principal y exponerla
window.renderApp = function() {
    const root = document.getElementById('app-root');
    root.innerHTML = ''; 
    
    if (state.view === 'auth') root.innerHTML = renderAuth();
    else if (state.view === 'onboarding-type') root.innerHTML = renderOnboardingType();
    else if (state.view === 'onboarding-setup') root.innerHTML = renderOnboardingSetup();
    else if (state.view === 'main') {
        root.innerHTML = renderMain();
        initChart(); // Inicializar gráfico después de renderizar
    }
};

// 3. Inicializar aplicación
document.addEventListener('DOMContentLoaded', () => {
    initData();
    window.renderApp();
});