/* UPGRADE DE ESTABILIDADE: Fila de Sincronização Robusta */
let syncQueue = JSON.parse(localStorage.getItem('syncQueue') || '[]');

function saveToQueue(data) {
  syncQueue.push({ id: Date.now(), data, timestamp: new Date().toISOString() });
  localStorage.setItem('syncQueue', JSON.stringify(syncQueue));
  verificarConexao();
}

function processarFila() {
  if (!navigator.onLine || syncQueue.length === 0) return;
  const item = syncQueue[0];
  fetch(cfg.gsUrl, { method: 'POST', body: JSON.stringify(item.data) })
    .then(r => {
      if (r.ok) {
        syncQueue.shift();
        localStorage.setItem('syncQueue', JSON.stringify(syncQueue));
        processarFila();
      }
    })
    .catch(err => console.error('Falha ao sincronizar:', err));
}

window.addEventListener('online', () => {
  document.getElementById('offlineBadge').style.display = 'none';
  processarFila();
});

window.addEventListener('offline', () => {
  document.getElementById('offlineBadge').style.display = 'block';
});
