/**
 * PAMPA DOG - admin.js
 * Lógica do painel de administração (admin.html)
 */
document.addEventListener('DOMContentLoaded', () => {
  if (typeof PD === 'undefined') {
    alert('Erro: data.js não carregado!');
    return;
  }

  const listEl = document.getElementById('admin-list');
  const tabsEl = document.getElementById('admin-tabs');
  const modal = document.getElementById('edit-modal');
  const form = document.getElementById('edit-form');
  const imgInput = document.getElementById('edit-img-cardapio');
  const imgUpload = document.getElementById('edit-img-upload');
  const imgPreview = document.getElementById('edit-img-preview');
  const imgUploadName = document.getElementById('edit-img-upload-name');
  
  let currentCategory = 'all';
  let selectedUploadUrl = '';

  function resolveAdminAssetPath(src) {
    if (!src) return '';
    if (/^(https?:|data:|blob:|\/)/i.test(src)) return src;
    return '../' + src.replace(/^\.\//, '');
  }

  function normalizeCategory(category) {
    if (category === 'burgers') return 'classicos';
    return category;
  }

  function setImagePreview(src) {
    const previewSrc = resolveAdminAssetPath(src);
    imgPreview.innerHTML = previewSrc ? `<img src="${previewSrc}" alt="Prévia da imagem">` : '';
    imgPreview.style.display = previewSrc ? 'block' : 'none';
  }

  function resetUploadPreview() {
    if (selectedUploadUrl) URL.revokeObjectURL(selectedUploadUrl);
    selectedUploadUrl = '';
    imgUpload.value = '';
    imgUploadName.textContent = 'Use uma imagem existente da pasta img ou mantenha uma URL/caminho no campo acima.';
    setImagePreview(imgInput.value.trim());
  }

  function showToast(message) {
    let toast = document.getElementById('admin-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'admin-toast';
      toast.className = 'admin-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('active');
    setTimeout(() => toast.classList.remove('active'), 2800);
  }

  // INICIALIZAÇÃO
  function init() {
    renderTabs();
    renderList();
    bindEvents();
  }

  // RENDER TABS
  function renderTabs() {
    let html = `<button class="admin-tab active" data-cat="all">🌟 Todos</button>`;
    
    for (const [cat, label] of Object.entries(PD.catLabel)) {
      html += `<button class="admin-tab" data-cat="${cat}">${PD.catEmoji[cat]} ${label}</button>`;
    }
    
    tabsEl.innerHTML = html;
    
    tabsEl.querySelectorAll('.admin-tab').forEach(btn => {
      btn.addEventListener('click', (e) => {
        tabsEl.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentCategory = e.target.getAttribute('data-cat');
        renderList();
      });
    });
  }

  // RENDER LISTA DE PRODUTOS
  function renderList() {
    const products = PD.getProducts();
    let filtered = products;
    
    if (currentCategory !== 'all') {
      filtered = products.filter(p => normalizeCategory(p.category) === currentCategory);
    }
    
    listEl.innerHTML = filtered.map(p => {
      const imgSrc = resolveAdminAssetPath(PD.getProductImage(p, 'cardapio'));
      const imgHtml = imgSrc 
        ? `<img src="${imgSrc}" style="width:100%;height:100%;object-fit:cover;">`
        : `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:24px;">${PD.getPlaceholder(p.category)}</div>`;

      return `
        <div class="admin-card">
          <div class="admin-card-header">
            <div class="admin-card-img">${imgHtml}</div>
            <div>
              <div class="admin-card-title">${p.name}</div>
              <div class="admin-card-cat">${PD.catLabel[normalizeCategory(p.category)]} • R$ ${PD.formatPrice(p.price)}</div>
            </div>
          </div>
          
          <div class="admin-switches">
            <div class="switch-group">
              <span>🔥 Promoção</span>
              <label class="switch">
                <input type="checkbox" data-id="${p.id}" data-flag="isPromocao" ${p.isPromocao ? 'checked' : ''}>
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="switch-group">
              <span>⭐ Mais Pedido</span>
              <label class="switch">
                <input type="checkbox" data-id="${p.id}" data-flag="isMaisPedido" ${p.isMaisPedido ? 'checked' : ''}>
                <span class="slider"></span>
              </label>
            </div>
            
            <div class="switch-group">
              <span>🌟 Produto da Semana</span>
              <label class="switch">
                <input type="checkbox" data-id="${p.id}" data-flag="isProdutoSemana" ${p.isProdutoSemana ? 'checked' : ''}>
                <span class="slider"></span>
              </label>
            </div>
          </div>
          
          <div class="admin-actions">
            <button class="btn btn-outline" style="width:100%; padding:8px;" onclick="window.editProduct('${p.id}')">✏️ Editar Dados</button>
          </div>
        </div>
      `;
    }).join('');
    
    // Bind flags
    listEl.querySelectorAll('input[type="checkbox"]').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const id = e.target.getAttribute('data-id');
        const flag = e.target.getAttribute('data-flag');
        PD.toggleFlag(id, flag);
        // showToast('Atualizado!'); // Opcional
      });
    });
  }

  // EVENTOS GERAIS
  function bindEvents() {
    document.getElementById('btn-reset').addEventListener('click', () => {
      if(confirm('Tem certeza? Isso apagará todas as edições feitas no admin e voltará ao cardápio original.')) {
        PD.resetToDefaults();
        renderList();
        alert('Resetado com sucesso!');
      }
    });

    document.getElementById('btn-backup-toggle').addEventListener('click', () => {
      const panel = document.getElementById('backup-panel');
      panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
    });

    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('btn-cancel').addEventListener('click', closeModal);

    imgInput.addEventListener('input', () => {
      imgUploadName.textContent = 'Use uma imagem existente da pasta img ou mantenha uma URL/caminho no campo acima.';
      setImagePreview(imgInput.value.trim());
    });

    imgUpload.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (selectedUploadUrl) URL.revokeObjectURL(selectedUploadUrl);
      selectedUploadUrl = URL.createObjectURL(file);
      imgInput.value = `img/${file.name}`;
      imgUploadName.textContent = `Selecionada: ${file.name}`;
      imgPreview.innerHTML = `<img src="${selectedUploadUrl}" alt="Prévia da imagem">`;
      imgPreview.style.display = 'block';
    });
    
    // Adicionar Produto
    document.getElementById('btn-add').addEventListener('click', () => {
      document.getElementById('edit-id').value = '';
      document.getElementById('edit-category').value = currentCategory === 'all' ? 'hotdogs' : currentCategory;
      document.getElementById('edit-name').value = '';
      document.getElementById('edit-desc').value = '';
      document.getElementById('edit-price').value = '';
      document.getElementById('edit-product-url').value = '';
      document.getElementById('edit-img-cardapio').value = '';
      resetUploadPreview();
      
      document.getElementById('btn-delete').style.display = 'none';
      modal.classList.add('active');
    });

    // Excluir Produto
    document.getElementById('btn-delete').addEventListener('click', () => {
      const id = document.getElementById('edit-id').value;
      if (id && confirm('Tem certeza que deseja excluir este produto?')) {
        PD.deleteProduct(id);
        closeModal();
        renderList();
      }
    });

    // Exportar
    document.getElementById('btn-export').addEventListener('click', () => {
      const products = PD.getProducts();
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "pampa-dog-config.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });

    // Importar
    document.getElementById('input-import').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = function(evt) {
        try {
          const contents = evt.target.result;
          const parsed = JSON.parse(contents);
          if (Array.isArray(parsed) && parsed.length > 0) {
             PD.saveProducts(parsed);
             renderList();
             alert('Configurações importadas com sucesso!');
          } else {
             alert('Arquivo inválido ou vazio.');
          }
        } catch(err) {
          alert('Erro ao ler o arquivo json.');
        }
        e.target.value = '';
      };
      reader.readAsText(file);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const id = document.getElementById('edit-id').value;
      const isNewProduct = !id;
      let original = id ? PD.getProductById(id) : null;
      
      if (!original) {
        original = {
          id: 'prod-' + Date.now(),
          isPromocao: false,
          isMaisPedido: false,
          isProdutoSemana: false
        };
      }
      
      let rawPrice = document.getElementById('edit-price').value.replace(',', '.');
      
      const updated = Object.assign({}, original, {
        category: document.getElementById('edit-category').value,
        name: document.getElementById('edit-name').value,
        desc: document.getElementById('edit-desc').value,
        price: parseFloat(rawPrice) || 0,
        productUrl: document.getElementById('edit-product-url').value.trim(),
        imgCardapio: document.getElementById('edit-img-cardapio').value.trim(),
        imgHome: '',
        imgHero: original.imgHero || ''
      });
      
      PD.updateProduct(updated);
      closeModal();
      renderList();
      if (isNewProduct) showToast('Mais um Pampa criado com sucesso! ⭐');
    });
  }

  // EXPORT FUNÇÃO GLOBAL PARA ONCLICK NO HTML
  window.editProduct = function(id) {
    const p = PD.getProductById(id);
    if (!p) return;
    
    document.getElementById('edit-id').value = p.id;
    document.getElementById('edit-category').value = normalizeCategory(p.category);
    document.getElementById('edit-name').value = p.name;
    document.getElementById('edit-desc').value = p.desc;
    document.getElementById('edit-price').value = p.price.toFixed(2).replace('.', ',');
    document.getElementById('edit-product-url').value = p.productUrl || '';
    document.getElementById('edit-img-cardapio').value = p.imgCardapio || '';
    resetUploadPreview();
    
    document.getElementById('btn-delete').style.display = 'inline-block';
    modal.classList.add('active');
  };

  function closeModal() {
    modal.classList.remove('active');
    resetUploadPreview();
  }

  // START
  init();
});
