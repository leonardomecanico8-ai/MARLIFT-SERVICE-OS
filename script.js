/* =============================================================
   MARLIFT SERVICE - Sistema OS v3.0
   ============================================================= */

// ... (Mantenha todo o seu código original aqui até chegar na função renderHist) ...

/* ===== HISTÓRICO ===== */
function renderHist() {
  const el = document.getElementById('osList');
  const tot = document.getElementById('totalOS');
  if (!el) return;
  const hist = JSON.parse(localStorage.getItem('os_historico') || '[]');
  
  if (tot) tot.textContent = hist.length;

  if (hist.length === 0) {
    el.innerHTML = '<div class="os-empty"><i class="fa-solid fa-folder-open"></i><p>Nenhuma OS registrada ainda.</p></div>';
    return;
  }

  const statusBadge = {
    'Concluído': 'badge-green', 'Concluido': 'badge-green',
    'Pendente': 'badge-orange', 'Aguardando Peça': 'badge-blue',
    'Orçamento Enviado': 'badge-purple', 'Agendado': 'badge-blue'
  };

  el.innerHTML = hist.map(os => {
    const dt = new Date(os.data);
    return `<div class="os-card">
        <div class="os-card-top">
            <div class="os-card-info">
                <div class="os-num">${fmtNum(os.numero)} — ${dt.toLocaleDateString('pt-BR')}</div>
                <div class="os-cliente">${esc(os.cliNome)}</div>
                <div class="os-meta">${esc(os.eqMarca || '')} ${esc(os.eqModelo || '')}</div>
                <div class="os-tags"><span class="badge ${statusBadge[os.status] || 'badge-gray'}">${esc(os.status || '--')}</span></div>
            </div>
        </div>
        <div class="os-actions">
            <button class="btn btn-atendimento-sm btn-sm" onclick="carregarOSParaAtendimento('${os.id}')">
                <i class="fa-solid fa-play-circle"></i> Atender
            </button>
            <button class="btn btn-ghost btn-sm" onclick="verOS('${os.id}')"><i class="fa-solid fa-eye"></i> Ver</button>
            <button class="btn btn-secondary btn-sm" onclick="gerarPDFPorId('${os.id}')"><i class="fa-solid fa-file-pdf"></i> PDF</button>
        </div>
    </div>`;
  }).join('');
}

// ... (Mantenha todo o restante do seu arquivo original aqui) ...

/* ===== NOVA FUNÇÃO DE ATENDIMENTO (Adicione isto ao final do arquivo) ===== */
function carregarOSParaAtendimento(idOS) {
    const historico = JSON.parse(localStorage.getItem('os_historico') || '[]');
    const os = historico.find(o => o.id === idOS);

    if (!os) {
        alert('Erro: OS não encontrada!');
        return;
    }

    // Carrega dados básicos
    editingOSId = os.id;
    document.getElementById('cNome').value = os.cliNome || '';
    document.getElementById('eMarca').value = os.eqMarca || '';
    document.getElementById('eModelo').value = os.eqModelo || '';
    
    // Feedback visual
    switchTab('tab-os');
    alert('OS ' + fmtNum(os.numero) + ' carregada para atendimento.');
}
