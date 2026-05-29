/**
 * PAMPA DOG - data.js
 * Módulo de gerenciamento de produtos, flags e renderização dinâmica.
 * Carregado em: index.html, cardapio.html, admin.html
 */
'use strict';

var PD = (function () {

  var STORAGE_KEY = 'pampaDog_v1_products';

  /* ============================================================
     DADOS PADRÃO — editáveis pelo Admin
     ============================================================ */
  var DEFAULT_PRODUCTS = [
    // HOT DOGS
    { id: 'hd-tradicional', name: 'Hot Dog Tradicional',       desc: 'Salsicha, mostarda, ketchup, maionese, milho e batata palha. O clássico que nunca falha!',                                      price: 14.90, category: 'hotdogs',   imgCardapio: 'img/hotdog_tradicional.png', imgHome: '',                          isPromocao: false, isMaisPedido: false, isProdutoSemana: false, productUrl: '' },
    { id: 'hd-especial',    name: 'Pampa Dog Especial',         desc: 'Salsicha gourmet, bacon crocante, cheddar, cebola caramelizada e molho especial da casa.',                                       price: 22.90, category: 'hotdogs',   imgCardapio: 'img/pampa_dog_especial.png', imgHome: 'img/hero1.png',             isPromocao: true,  isMaisPedido: true,  isProdutoSemana: true, productUrl: ''  },
    { id: 'hd-bacon',       name: 'Hot Dog Bacon',              desc: 'Salsicha, tiras de bacon grelhadas, queijo prato derretido, molho barbecue e cebola crispy.',                                   price: 19.90, category: 'hotdogs',   imgCardapio: '',                          imgHome: '',                          isPromocao: false, isMaisPedido: false, isProdutoSemana: false, productUrl: '' },
    { id: 'hd-cheddar',     name: 'Hot Dog Cheddar',            desc: 'Salsicha grelhada coberta com generoso cheddar derretido, jalapeño e molho sriracha.',                                         price: 18.90, category: 'hotdogs',   imgCardapio: '',                          imgHome: '',                          isPromocao: false, isMaisPedido: false, isProdutoSemana: false, productUrl: '' },
    // BURGERS
    { id: 'bg-campeiro',    name: 'Burger Campeiro',            desc: 'Blend artesanal 200g, queijo americano, alface, tomate, picles e maionese especial no pão brioche.',                           price: 29.90, category: 'burgers',   imgCardapio: 'img/burger_campeiro.png',   imgHome: 'img/burger_campeiro.png',   isPromocao: true,  isMaisPedido: false, isProdutoSemana: true, productUrl: ''  },
    { id: 'bg-smash',       name: 'Smash Burger',               desc: 'Dois smash patties, cheddar, maionese de ervas, cebola caramelizada e picles artesanal.',                                      price: 34.90, category: 'burgers',   imgCardapio: '',                          imgHome: '',                          isPromocao: false, isMaisPedido: false, isProdutoSemana: false, productUrl: '' },
    { id: 'bg-xtudo',       name: 'X-Tudo Pampa',               desc: 'Hambúrguer, bacon, ovo, presunto, queijo, tomate, alface, milho e maionese. Tem de tudo!',                                     price: 38.90, category: 'burgers',   imgCardapio: '',                          imgHome: '',                          isPromocao: false, isMaisPedido: false, isProdutoSemana: false, productUrl: '' },
    { id: 'bg-chicken',     name: 'Chicken Burger',             desc: 'Frango empanado crocante, queijo, alface, tomate e molho honey mustard no pão de leite.',                                      price: 26.90, category: 'burgers',   imgCardapio: '',                          imgHome: '',                          isPromocao: false, isMaisPedido: false, isProdutoSemana: false, productUrl: '' },
    // COMBOS
    { id: 'cb-dog-batata',  name: 'Combo Dog + Batata + Refri', desc: '1 Hot Dog à escolha + Batata Frita Média + Refrigerante Lata. O combo perfeito para o dia a dia!',                            price: 28.90, category: 'combos',    imgCardapio: 'img/batata_refri.png',      imgHome: '',                          isPromocao: true,  isMaisPedido: false, isProdutoSemana: false, productUrl: '' },
    { id: 'cb-burger-batata',name:'Combo Burger + Batata + Refri',desc:'1 Burger à escolha + Batata Frita Grande + Refrigerante 600ml. Bem servido!',                                                  price: 38.90, category: 'combos',    imgCardapio: '',                          imgHome: '',                          isPromocao: false, isMaisPedido: false, isProdutoSemana: false, productUrl: '' },
    { id: 'cb-familia',     name: 'Combo Família',              desc: '2 Hot Dogs + 2 Burgers + Batata Grande + 4 Refrigerantes. Perfeito para reunir a galera!',                                     price: 89.90, category: 'combos',    imgCardapio: 'img/combo_familia.png',     imgHome: 'img/combo_familia.png',     isPromocao: true,  isMaisPedido: false, isProdutoSemana: false, productUrl: '' },
    { id: 'cb-casal',       name: 'Combo Casal',                desc: '2 Lanches à escolha + Batata Frita para dividir + 2 Refrigerantes. Programa perfeito!',                                       price: 54.90, category: 'combos',    imgCardapio: '',                          imgHome: '',                          isPromocao: false, isMaisPedido: false, isProdutoSemana: false, productUrl: '' },
    // BEBIDAS
    { id: 'beb-refri',      name: 'Refrigerante Lata',          desc: 'Coca-Cola, Guaraná Antarctica, Fanta Laranja ou Sprite. Lata 350ml geladinha!',                                               price:  5.00, category: 'bebidas',   imgCardapio: '',                          imgHome: '',                          isPromocao: false, isMaisPedido: false, isProdutoSemana: false, productUrl: '' },
    { id: 'beb-suco',       name: 'Suco Natural',               desc: 'Laranja, limão, morango ou maracujá. Feito na hora, 300ml, sem conservantes.',                                                 price:  9.00, category: 'bebidas',   imgCardapio: '',                          imgHome: '',                          isPromocao: false, isMaisPedido: false, isProdutoSemana: false, productUrl: '' },
    { id: 'beb-agua',       name: 'Água Mineral',               desc: 'Água mineral 500ml com ou sem gás. Sempre geladinha!',                                                                         price:  3.50, category: 'bebidas',   imgCardapio: '',                          imgHome: '',                          isPromocao: false, isMaisPedido: false, isProdutoSemana: false, productUrl: '' },
    { id: 'beb-milk',       name: 'Milk Shake',                 desc: 'Morango, chocolate, baunilha ou Nutella. Cremoso, gelado e irresistível! 400ml.',                                              price: 16.90, category: 'bebidas',   imgCardapio: '',                          imgHome: '',                          isPromocao: false, isMaisPedido: false, isProdutoSemana: false, productUrl: '' },
    // ADICIONAIS
    { id: 'add-bacon',      name: 'Bacon Extra',                desc: 'Mais tiras de bacon crocante no seu lanche.',                                                                                  price:  4.00, category: 'adicionais', imgCardapio: '',                          imgHome: '',                          isPromocao: false, isMaisPedido: false, isProdutoSemana: false, productUrl: '' },
    { id: 'add-cheddar',    name: 'Cheddar Extra',              desc: 'Porção extra de cheddar cremoso derretido.',                                                                                   price:  3.50, category: 'adicionais', imgCardapio: '',                          imgHome: '',                          isPromocao: false, isMaisPedido: false, isProdutoSemana: false, productUrl: '' },
    { id: 'add-batata',     name: 'Batata Frita',               desc: 'Batata frita crocante temperada. Porção pequena, média ou grande.',                                                            price:  8.00, category: 'adicionais', imgCardapio: 'img/batata_refri.png',      imgHome: '',                          isPromocao: false, isMaisPedido: false, isProdutoSemana: false, productUrl: '' },
    { id: 'add-ovo',        name: 'Ovo Frito',                  desc: 'Ovo frito quentinho para complementar seu lanche.',                                                                            price:  2.50, category: 'adicionais', imgCardapio: '',                          imgHome: '',                          isPromocao: false, isMaisPedido: false, isProdutoSemana: false, productUrl: '' }
  ];

  /* ============================================================
     METADADOS
     ============================================================ */
  var catEmoji  = { hotdogs: '🌭', burgers: '🍔', combos: '🎁', bebidas: '🥤', adicionais: '➕' };
  var catLabel  = { hotdogs: 'Hot Dogs', burgers: 'Burgers', combos: 'Combos', bebidas: 'Bebidas', adicionais: 'Adicionais' };
  var catHolder = { hotdogs: '🌭', burgers: '🍔', combos: '🎁', bebidas: '🥤', adicionais: '🍳' };

  /* ============================================================
     CRUD — localStorage
     ============================================================ */
  function getProducts() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        var parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
        // Merge: garante que novos produtos defaults aparecem se não existem no storage
      }
    } catch (e) {}
    return saveProducts(DEFAULT_PRODUCTS.map(function(p){ return Object.assign({}, p); }));
  }

  function saveProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    refreshDynamicViews();
    return products;
  }

  function deleteProduct(id) {
    var products = getProducts().filter(function(p){ return p.id !== id; });
    return saveProducts(products);
  }

  function resetToDefaults() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function getProductById(id) {
    return getProducts().filter(function(p){ return p.id === id; })[0] || null;
  }

  function updateProduct(updated) {
    var products = getProducts();
    var idx = -1;
    products.forEach(function(p, i){ if (p.id === updated.id) idx = i; });
    if (idx >= 0) products[idx] = updated;
    else products.push(updated);
    saveProducts(products);
  }

  function toggleFlag(id, flag) {
    var products = getProducts();
    products.forEach(function(p){
      if (p.id === id) p[flag] = !p[flag];
    });
    saveProducts(products);
  }

  function refreshDynamicViews() {
    renderProdutosSemana();
    renderHomePromos();
    applyCardapioOverrides();
  }

  /* ============================================================
     UTILITÁRIOS
     ============================================================ */
  function getProductImage(product, type) {
    if (type === 'home') return product.imgHome || product.imgCardapio || '';
    return product.imgCardapio || '';
  }

  function formatPrice(price) {
    return Number(price).toFixed(2).replace('.', ',');
  }

  function getPlaceholder(category) {
    return catHolder[category] || '🌭';
  }

  function buildImgHtml(src, alt, category) {
    if (src) {
      return '<img src="' + src + '" alt="' + (alt||'') + '" loading="lazy" '
           + 'style="width:100%;height:100%;object-fit:cover;transition:transform 0.5s ease;" />';
    }
    return '<div class="food-placeholder">' + getPlaceholder(category) + '</div>';
  }

  function buildProductUrl(product) {
    var url = product.productUrl || 'https://www.ifood.com.br';
    if (url.indexOf('wa.me') !== -1 || url.indexOf('api.whatsapp.com') !== -1 || url.indexOf('web.whatsapp.com') !== -1) {
      if (url.indexOf('text=') === -1) {
        var emoji = catEmoji[product.category] || '🍔';
        var msg = "Olá! Gostaria de fazer um pedido:\n\n" + emoji + " Produto: " + product.name + "\n💰 Valor: R$ " + formatPrice(product.price);
        var sep = url.indexOf('?') !== -1 ? '&' : '?';
        url += sep + 'text=' + encodeURIComponent(msg);
      }
    }
    return url;
  }

  /* ============================================================
     RENDER: PRODUTOS DA SEMANA (index.html)
     ============================================================ */
  function renderProdutosSemana() {
    var section = document.getElementById('produtos-semana');
    if (!section) return;

    var semana = getProducts().filter(function(p){ return p.isProdutoSemana || p.isPromocao || p.isMaisPedido; });

    if (!semana.length) {
      section.style.display = 'none';
      return;
    }
    section.style.display = '';

    var container = document.getElementById('semana-carousel-container');
    if (!container) return;

    if (semana.length === 1) {
      /* --- Destaque fixo único --- */
      var p = semana[0];
      var src = getProductImage(p, 'home');
      container.innerHTML =
        '<div class="semana-single" data-promocao="' + p.isPromocao + '" data-mais-pedido="' + p.isMaisPedido + '" data-semana="' + p.isProdutoSemana + '">'
          + '<div class="semana-img-wrap">' + buildImgHtml(src, p.name, p.category) + '</div>'
          + '<div class="semana-info">'
            + '<div class="semana-badges">'
              + (p.isProdutoSemana ? '<span class="semana-badge produto-semana">🌟 Produto da Semana</span>' : '')
              + (p.isMaisPedido ? '<span class="semana-badge mais-pedido">⭐ Mais Pedido</span>' : '')
              + (p.isPromocao   ? '<span class="semana-badge promocao">🔥 Promoção</span>' : '')
            + '</div>'
            + '<h3 class="semana-name">' + p.name + '</h3>'
            + '<p class="semana-desc">' + p.desc + '</p>'
            + '<div class="semana-price">R$ ' + formatPrice(p.price) + '</div>'
            + '<a href="' + buildProductUrl(p) + '" target="_blank" rel="noopener" '
            +    'class="btn btn-primary btn-lg" data-action="pedido" data-item="' + p.name + '">'
            +   '🛵 Pedir agora'
            + '</a>'
          + '</div>'
        + '</div>';
    } else {
      /* --- Carrossel com múltiplos produtos --- */
      var slidesHtml = semana.map(function(p, i) {
        var src = getProductImage(p, 'home');
        return '<div class="semana-slide' + (i === 0 ? ' active' : '') + '" data-idx="' + i + '" '
             + 'data-promocao="' + p.isPromocao + '" '
             + 'data-mais-pedido="' + p.isMaisPedido + '" '
             + 'data-semana="' + p.isProdutoSemana + '">'
          + '<div class="semana-img-wrap">' + buildImgHtml(src, p.name, p.category) + '</div>'
          + '<div class="semana-info">'
            + '<div class="semana-badges">'
              + (p.isProdutoSemana ? '<span class="semana-badge produto-semana">🌟 Produto da Semana</span>' : '')
              + (p.isMaisPedido ? '<span class="semana-badge mais-pedido">⭐ Mais Pedido</span>' : '')
              + (p.isPromocao   ? '<span class="semana-badge promocao">🔥 Promoção</span>' : '')
            + '</div>'
            + '<h3 class="semana-name">' + p.name + '</h3>'
            + '<p class="semana-desc">' + p.desc + '</p>'
            + '<div class="semana-price">R$ ' + formatPrice(p.price) + '</div>'
            + '<a href="' + buildProductUrl(p) + '" target="_blank" rel="noopener" '
            +    'class="btn btn-primary btn-lg" data-action="pedido" data-item="' + p.name + '">'
            +   '🛵 Pedir agora'
            + '</a>'
          + '</div>'
        + '</div>';
      }).join('');

      var dotsHtml = semana.map(function(_, i) {
        return '<button class="semana-dot' + (i === 0 ? ' active' : '') + '" '
             + 'data-idx="' + i + '" aria-label="Produto ' + (i + 1) + '"></button>';
      }).join('');

      container.innerHTML =
        '<div class="semana-track">' + slidesHtml + '</div>'
        + '<div class="semana-controls">'
          + '<button class="semana-arrow" id="semana-prev" aria-label="Anterior">&#8592;</button>'
          + '<div class="semana-dots">' + dotsHtml + '</div>'
          + '<button class="semana-arrow" id="semana-next" aria-label="Próximo">&#8594;</button>'
        + '</div>';

      _initSemanaCarousel(section);
    }
  }

  function _initSemanaCarousel(section) {
    var slides = Array.from(section.querySelectorAll('.semana-slide'));
    var dots   = Array.from(section.querySelectorAll('[data-idx]'));
    var current = 0;
    var timer;

    function getVisibleIndices() {
      return slides.map(function(s, i) { return s.style.display !== 'none' ? i : -1; }).filter(function(i) { return i !== -1; });
    }

    function goTo(idx) {
      var visible = getVisibleIndices();
      if (!visible.length) return;
      
      slides.forEach(function(s) { s.classList.remove('active'); });
      dots.forEach(function(d) { if (d) d.classList.remove('active'); });

      var currPos = visible.indexOf(current);
      var nextPos = currPos;

      if (currPos === -1) {
         nextPos = 0;
      } else {
         if (idx === 'next') nextPos = (currPos + 1) % visible.length;
         else if (idx === 'prev') nextPos = (currPos - 1 + visible.length) % visible.length;
         else {
            if (visible.indexOf(idx) !== -1) nextPos = visible.indexOf(idx);
            else nextPos = 0;
         }
      }

      current = visible[nextPos];
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    function startAuto() {
      clearInterval(timer);
      timer = setInterval(function () { goTo('next'); }, 4500);
    }

    section._goTo = goTo;
    section._startAuto = startAuto;

    goTo('refresh'); // ativa o primeiro

    var prev = section.querySelector('#semana-prev');
    var next = section.querySelector('#semana-next');
    if (prev) prev.addEventListener('click', function () { goTo('prev'); startAuto(); });
    if (next) next.addEventListener('click', function () { goTo('next'); startAuto(); });

    dots.forEach(function (d) {
      d.addEventListener('click', function () {
        goTo(parseInt(d.getAttribute('data-idx'), 10));
        startAuto();
      });
    });

    section.addEventListener('mouseenter', function () { clearInterval(timer); });
    section.addEventListener('mouseleave', startAuto);

    var touchX = 0;
    section.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    section.addEventListener('touchend', function (e) {
      var diff = touchX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { diff > 0 ? goTo('next') : goTo('prev'); startAuto(); }
    }, { passive: true });

    startAuto();
  }

  function applyHomeFilter(filterType) {
    var section = document.getElementById('produtos-semana');
    if (!section) return;
    var slides = Array.from(section.querySelectorAll('.semana-slide, .semana-single'));
    var dots   = Array.from(section.querySelectorAll('.semana-dot'));

    slides.forEach(function(slide, idx) {
      var show = false;
      if (filterType === 'all') show = true;
      else if (filterType === 'promocao' && slide.getAttribute('data-promocao') === 'true') show = true;
      else if (filterType === 'mais-pedido' && slide.getAttribute('data-mais-pedido') === 'true') show = true;
      else if (filterType === 'semana' && slide.getAttribute('data-semana') === 'true') show = true;
      
      if (show) {
        slide.style.display = '';
        if (dots[idx]) dots[idx].style.display = '';
      } else {
        slide.style.display = 'none';
        if (dots[idx]) dots[idx].style.display = 'none';
      }
    });

    if (section._goTo) {
       section._goTo('refresh');
       section._startAuto();
    }
  }

  /* ============================================================
     RENDER: PROMOÇÕES (index.html)
     ============================================================ */
  function renderHomePromos() {
    var container = document.getElementById('promo-cards-container');
    if (!container) return;

    var promos = getProducts().filter(function (p) { return p.isPromocao; });

    if (!promos.length) {
      container.innerHTML =
        '<p style="color:var(--gray);text-align:center;padding:60px 0;grid-column:1/-1;">'
        + 'Nenhuma promoção ativa no momento. '
        + '<a href="admin.html" style="color:var(--red);font-weight:700;">Acesse o Admin</a> para ativar.</p>';
      return;
    }

    container.innerHTML = promos.map(function (p) {
      var src = getProductImage(p, 'cardapio');
      var badge = p.isMaisPedido ? '⭐ Mais Pedido' : '🔥 Promoção';
      return '<article class="promo-card reveal" id="dyn-card-' + p.id + '">'
        + '<div class="card-img-wrap">'
          + buildImgHtml(src, p.name, p.category)
          + '<span class="card-badge">' + badge + '</span>'
        + '</div>'
        + '<div class="card-body">'
          + '<h3 class="card-name">' + p.name + '</h3>'
          + '<p class="card-desc">' + p.desc + '</p>'
          + '<div class="card-footer">'
            + '<div class="card-price">R$ ' + formatPrice(p.price) + '</div>'
            + '<a href="' + buildProductUrl(p) + '" target="_blank" rel="noopener" '
            +    'class="btn btn-primary btn-sm" data-action="pedido" data-item="' + p.name + '">Pedir</a>'
          + '</div>'
        + '</div>'
      + '</article>';
    }).join('');
  }

  /* ============================================================
     APPLY: CARDÁPIO — imagens e selos dinâmicos (cardapio.html)
     ============================================================ */
  function applyCardapioOverrides() {
    var products = getProducts();
    var activeIds = products.map(function(p){ return p.id; });

    Array.from(document.querySelectorAll('[data-product-id]')).forEach(function(card) {
      var id = card.getAttribute('data-product-id');
      if (activeIds.indexOf(id) === -1) {
        card.remove();
      }
    });

    products.forEach(function (p) {
      var card = document.querySelector('[data-product-id="' + p.id + '"]');
      if (!card) return;

      // Atualiza imagem se definida no admin
      var imgWrap = card.querySelector('.menu-card-img');
      if (imgWrap && p.imgCardapio) {
        var existingImg = imgWrap.querySelector('img');
        if (existingImg) {
          existingImg.src = p.imgCardapio;
        } else {
          imgWrap.innerHTML = '';
          imgWrap.style.cssText = '';
          imgWrap.insertAdjacentHTML('beforeend',
            '<img src="' + p.imgCardapio + '" alt="' + p.name + '" loading="lazy" '
            + 'style="width:100%;height:100%;object-fit:cover;transition:transform 0.4s ease;" />');
        }
      }

      // Atualiza/remove selo
      var old = card.querySelector('.dyn-badge');
      if (old) old.remove();

      if (p.isMaisPedido || p.isPromocao) {
        var wrapEl = card.querySelector('.menu-card-img');
        if (wrapEl) {
          wrapEl.style.position = 'relative';
          var badge = document.createElement('span');
          badge.className = 'card-badge dyn-badge';
          badge.style.cssText = 'position:absolute;top:12px;right:12px;z-index:2;';
          badge.textContent = p.isMaisPedido ? '⭐ Mais Pedido' : '🔥 Promoção';
          wrapEl.appendChild(badge);
        }
      }

      // Atualiza URL de pedido
      var btn = card.querySelector('[data-action="pedido"]');
      if (btn) {
        btn.href = buildProductUrl(p);
      }
    });
  }

  window.addEventListener('storage', function(e) {
    if (e.key === STORAGE_KEY) {
      refreshDynamicViews();
    }
  });

  /* ============================================================
     API PÚBLICA
     ============================================================ */
  return {
    getProducts:            getProducts,
    saveProducts:           saveProducts,
    deleteProduct:          deleteProduct,
    resetToDefaults:        resetToDefaults,
    getProductById:         getProductById,
    updateProduct:          updateProduct,
    toggleFlag:             toggleFlag,
    getProductImage:        getProductImage,
    formatPrice:            formatPrice,
    getPlaceholder:         getPlaceholder,
    catEmoji:               catEmoji,
    catLabel:               catLabel,
    renderProdutosSemana:   renderProdutosSemana,
    applyHomeFilter:        applyHomeFilter,
    renderHomePromos:       renderHomePromos,
    applyCardapioOverrides: applyCardapioOverrides,
    DEFAULT_PRODUCTS:       DEFAULT_PRODUCTS
  };
})();
