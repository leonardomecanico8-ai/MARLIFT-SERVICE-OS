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

    // ... (seu código de gerar PDF) ...

    // Assinatura em Paisagem (Otimizado)
    const canvas = document.getElementById('sigCanvas'); // Certifique-se que é o ID correto
    if (canvas) {
        const imgData = canvas.toDataURL('image/png');
        // Adiciona no rodapé: pos(10, 250), tamanho(100x30)
        doc.addImage(imgData, 'PNG', 10, 250, 100, 30);
    }
    
    doc.save('OS_' + document.getElementById('osNum').innerText + '.pdf');
}}
function editarOS(osId) {
    const historico = JSON.parse(localStorage.getItem('os_historico') || '[]');
    const os = historico.find(o => o.id == osId);
    if (!os) return;

    editingOSId = osId;
    
    // Preenche os campos
    document.getElementById('selCliente').value = os.clienteId;
    carregarCliente(os.clienteId); // Função que você já deve ter
    
    setTimeout(() => {
        document.getElementById('selEquipamento').value = os.equipamentoId;
        document.getElementById('tNome').value = os.tecnico || '';
        document.getElementById('tipo').value = os.tipo || '';
        document.getElementById('servico').value = os.servico || '';
        // ... adicione outros campos conforme necessário
    }, 300);

    switchTab('tab-os');
    toast('Modo edição: O.S. #' + os.numero, 'warning');
}
<div id="modalSig" class="modal">
  <div class="modal-box">
    <div class="modal-header">
      <h3>Assinatura do Cliente</h3>
      <button class="modal-close" onclick="fecharModalAssinatura()">&times;</button>
    </div>
    <div class="modal-body">
      <canvas id="sigCanvas"></canvas>
    </div>
    <div class="modal-footer">
      <button class="btn btn-danger" onclick="fecharModalAssinatura()">
        <i class="fa-solid fa-xmark"></i> Cancelar
      </button>
      <button class="btn btn-primary" onclick="salvarAssinatura()">
        <i class="fa-solid fa-check"></i> Confirmar
      </button>
   function carregarCliente(clienteId) {
    // Verifica se é o modo manual
    if (clienteId === "MANUAL") {
        limparCliente(); // Limpa campos anteriores
        document.getElementById('clienteCarregadoNome').innerText = "Preenchimento Manual";
        document.getElementById('clienteCarregadoBadge').style.display = 'block';
        document.getElementById('painelResumoCliente').style.display = 'none'; // Esconde resumo fixo
        document.getElementById('cardSelEquip').style.display = 'block'; // Mostra seletor de equip
        
        // Habilita inputs para edição manual (remova o 'readonly' se tiver)
        document.getElementById('cNome').value = "";
        toast('Modo manual ativado', 'info');
        return;
    }

    // ... (Sua lógica atual para carregar cliente do banco de dados) ...
    if (!clienteId) return;
    
    // ... restante do seu código existente ...
}
    </div>
  </div>
</div>
