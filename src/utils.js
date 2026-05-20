import { state } from './state.js';

export function showToast(msg, isError = false) {
    const t = document.getElementById('toast');
    t.innerText = msg;
    t.className = `fixed top-4 right-4 px-6 py-3 rounded-2xl shadow-2xl transition-all duration-300 z-50 font-bold ${isError ? 'bg-red-500 text-white' : 'bg-slate-800 text-white'}`;
    t.style.transform = 'translateY(0)';
    setTimeout(() => t.style.transform = 'translateY(-120px)', 3000);
}

export function getComputedData() {
    const currentBusiness = state.businesses[state.activeBusinessIdx];
    const isOwner = state.user?.role === 'owner';
    const isSingleBranchMode = currentBusiness?.useCase === 'negocio_unico';
    const isPersonalMode = currentBusiness?.useCase === 'personal';

    let allTransactions = [];
    if (currentBusiness) {
        if (!isOwner) {
            allTransactions = currentBusiness.branches[state.user.branchIdx]?.transactions || [];
        } else {
            currentBusiness.branches.forEach(b => {
                const tWithBranch = b.transactions.map(t => ({...t, branchName: b.name}));
                allTransactions = allTransactions.concat(tWithBranch);
            });
            allTransactions.sort((a, b) => b.id - a.id);
        }
    }

    const totals = allTransactions.reduce((acc, t) => {
        if (t.type === 'income') {
            acc.income += t.amount;
            acc.salesCount += (t.salesCount || 0);
        } else {
            acc.expense += t.amount;
        }
        acc.balance = acc.income - acc.expense;
        return acc;
    }, { income: 0, expense: 0, balance: 0, salesCount: 0 });

    return { currentBusiness, isOwner, isSingleBranchMode, isPersonalMode, allTransactions, totals };
}
