document.addEventListener('DOMContentLoaded', () => {
    alert("O sistema carregou com sucesso!");
    // Esconde login e inicia abas
    const login = document.getElementById('loginScreen');
    if (login) login.style.display = 'none';
    switchTab('tab-dash');
});/* =============================================================
   MARLIFT SERVICE - Sistema OS v3.2 (Completo e Corrigido)
   ============================================================= */

// 1. Remove qualquer bloqueio de login e vai direto ao ponto
document.addEventListener('DOMContentLoaded', () => {
    // Esconde qualquer tela de login que possa existir no DOM
    const loginScreen = document.getElementById('loginScreen');
    if (loginScreen) loginScreen.style.display = 'none';
    
    // Inicializa a navegação
    switchTab('tab-dash');
    renderHist();
});

// 2. Correção: Gerar PDF capturando todas as fotos carregadas
async function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Cabeçalho da OS
    doc.setFontSize(18);
    doc.text("Ordem de Servico: " + (document.getElementById('osNum')?.innerText || '---'), 10, 15);
    doc.setFontSize(12);
    doc.text("Cliente: " + (document.getElementById('cNome')?.value || '---'), 10, 25);
    doc.text("Data: " + new Date().toLocaleDateString(), 10, 32);
    
    // Dados de Horário Manual
    doc.text("Horarios: Inicio " + (document.getElementById('timeInicio')?.value || '--:--') + 
             " | Pausa " + (document.getElementById('timePausa')?.value || '--:--') + 
             " | Fim " + (document.getElementById('timeFim')?.value || '--:--'), 10, 42);

    // Processamento de Fotos
    const fotos = document.querySelectorAll('.photos-grid img');
    let y = 55;

    for (let i = 0; i < fotos.length; i++) {
        if (y > 200) {
            doc.addPage();
            y = 10;
        }
        try {
            doc.addImage(fotos[i].src, 'JPEG', 10, y, 60, 60);
            y += 70;
        } catch (e) {
            console.error("Erro ao adicionar foto:", e);
        }
    }
    
    doc.save('OS_' + (document.getElementById('osNum')?.innerText.replace('#','') || 'doc') + '.pdf');
}

// 3. Salvamento Automático dos campos manuais
function autoSave() {
    const data = {
        timeInicio: document.getElementById('timeInicio')?.value,
        timePausa: document.getElementById('timePausa')?.value,
        timeFim: document.getElementById('timeFim')?.value
    };
    localStorage.setItem('os_temp_data', JSON.stringify(data));
}

// Nota: Mantenha suas outras funções (switchTab, renderHist, etc) abaixo desta linha.
