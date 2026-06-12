/* =============================================================
   MARLIFT SERVICE - Sistema OS v3.1 (Versão Corrigida)
   ============================================================= */

// Inicialização: Remove login e carrega direto
document.addEventListener('DOMContentLoaded', () => {
    // Esconde tela de login se existir
    const login = document.getElementById('loginScreen');
    if (login) login.style.display = 'none';
    
    // Carrega o dashboard e dados
    switchTab('tab-dash');
    renderHist(); 
});

// Correção: Gerar PDF com fotos
async function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text("Ordem de Servico: " + document.getElementById('osNum').innerText, 10, 15);
    doc.setFontSize(12);
    doc.text("Cliente: " + document.getElementById('cNome').value, 10, 25);
    doc.text("Servico: " + document.getElementById('servico').value, 10, 35);
    doc.text("Inicio: " + document.getElementById('timeInicio').value + " | Pausa: " + document.getElementById('timePausa').value + " | Fim: " + document.getElementById('timeFim').value, 10, 45);

    const fotos = document.querySelectorAll('.photos-grid img');
    let y = 60;

    for (let i = 0; i < fotos.length; i++) {
        if (y > 220) {
            doc.addPage();
            y = 10;
        }
        doc.addImage(fotos[i].src, 'JPEG', 10, y, 60, 60);
        y += 70;
    }
    
    doc.save('OS_' + document.getElementById('osNum').innerText + '.pdf');
}

// Função de salvamento com campos manuais
function autoSave() {
    // Lógica simples de salvar no localStorage
    const data = {
        timeInicio: document.getElementById('timeInicio').value,
        timePausa: document.getElementById('timePausa').value,
        timeFim: document.getElementById('timeFim').value,
        // ... outros campos que você já tinha
    };
    localStorage.setItem('os_temporaria', JSON.stringify(data));
}

// Manter o restante das suas funções de navegação e busca (switchTab, renderHist, etc.)
// ... (Cole suas outras funções aqui) ...
