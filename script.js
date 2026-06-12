/* =============================================================
   MARLIFT SERVICE - SCRIPT COMPLETO E FUNCIONAL
   ============================================================= */

// 1. INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    const login = document.getElementById('loginScreen');
    if (login) login.style.display = 'none';
    
    // Mostra o dashboard inicialmente
    switchTab('tab-dash');
});

// 2. NAVEGAÇÃO ENTRE ABAS (Obrigatório para os menus funcionarem)
function switchTab(tabId) {
    // Esconde todas as abas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
        tab.classList.remove('active');
    });
    
    // Remove classe active dos botões de menu
    document.querySelectorAll('.nav-tab').forEach(nav => {
        nav.classList.remove('active');
    });
    
    // Mostra a aba clicada
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.style.display = 'block';
        selectedTab.classList.add('active');
    }
    
    // Adiciona classe active ao botão de menu correspondente
    const navBtn = document.querySelector(`[data-tab="${tabId}"]`);
    if (navBtn) navBtn.classList.add('active');
}

// 3. FUNÇÃO DE SALVAMENTO (Sem cronômetro)
function autoSave() {
    const data = {
        timeInicio: document.getElementById('timeInicio')?.value,
        timePausa: document.getElementById('timePausa')?.value,
        timeFim: document.getElementById('timeFim')?.value,
        cliNome: document.getElementById('cNome')?.value
    };
    localStorage.setItem('os_temp_data', JSON.stringify(data));
}

// 4. CORREÇÃO DE FOTOS NO PDF
async function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.text("Ordem de Servico: " + (document.getElementById('osNum')?.innerText || '---'), 10, 10);
    
    const fotos = document.querySelectorAll('.photos-grid img');
    let y = 30;
    for (let i = 0; i < fotos.length; i++) {
        doc.addImage(fotos[i].src, 'JPEG', 10, y, 50, 50);
        y += 60;
    }
    doc.save('OS_Marlift.pdf');
}
