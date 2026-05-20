// Estado global reactivo
export const state = {
    view: 'auth', // auth, onboarding-type, onboarding-setup, main
    authMode: 'login', // login, register
    user: null, 
    businesses: [],
    activeBusinessIdx: 0,
    activeTab: 'dashboard',
    setupData: { type: 'tienda', name: '', branchNames: [], useCase: 'sucursales', branchCount: 2 }
};

// Arrancar estado desde LocalStorage
export function initData() {
    const savedUser = localStorage.getItem('cp_vanilla_user');
    const savedBiz = localStorage.getItem('cp_vanilla_biz');
    if (savedUser && savedBiz) {
        state.user = JSON.parse(savedUser);
        state.businesses = JSON.parse(savedBiz);
        state.view = 'main';
    }
}

// Persistir datos
export function saveData() {
    if (state.user) localStorage.setItem('cp_vanilla_user', JSON.stringify(state.user));
    if (state.businesses.length > 0) localStorage.setItem('cp_vanilla_biz', JSON.stringify(state.businesses));
}
