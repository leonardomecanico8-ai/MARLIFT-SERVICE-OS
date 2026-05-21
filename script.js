/* =============================================================
   MARLIFT SERVICE - Sistema OS v3.1 (Atualizado)
   ============================================================= */

// ... (Mantenha as variáveis globais que você já tem) ...

// FUNÇÃO DE EDIÇÃO (Adicione esta função no seu script.js)
function carregarOSParaEdicao(osId) {
    const hist = JSON.parse(localStorage.getItem('os_historico') || '[]');
    const os = hist.find(item => item.id == osId);
    if (!os) return;

    editingOSId = osId; 
    
    // Preenche campos
    document.getElementById('selCliente').value = os.clienteId;
    // Dispara carregamento de equipamentos
    document.getElementById('selCliente').dispatchEvent(new Event('change'));
    
    // Aguarda um pouco para o select popular e define o valor
    setTimeout(() => {
        document.getElementById('selEquipamento').value = os.equipamentoId;
    }, 100);

    document.getElementById('triagem').value = os.triagem || '';
    switchTab('tab-os');
    toast('Modo edição ativado: O.S. #' + os.numero, 'warning');
}

// PDF PROFISSIONAL E ASSINATURA PAISAGEM
function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    doc.setFontSize(18);
    doc.text("ORDEM DE SERVIÇO - MARLIFT", 10, 15);
    doc.setFontSize(12);
    doc.text("Equipamento: " + document.getElementById('selEquipamento').options[document.getElementById('selEquipamento').selectedIndex].text, 10, 25);
    
    doc.line(10, 30, 200, 30);
    
    // Assinatura em Paisagem
    const canvas = document.getElementById('sigCanvas');
    const imgData = canvas.toDataURL('image/png');
    // Adiciona a imagem no rodapé (Dimensões 120x40mm para ficar bem visível na horizontal)
    doc.addImage(imgData, 'PNG', 10, 250, 120, 40); 
    
    doc.save('OS_' + new Date().getTime() + '.pdf');
}
