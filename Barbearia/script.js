document.addEventListener('DOMContentLoaded', () => {
    
    /* -------------------------------------------------------------
       1. HEADER EFFECT ON SCROLL
    ------------------------------------------------------------- */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* -------------------------------------------------------------
       2. MOBILE MENU NAVIGATION
    ------------------------------------------------------------- */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        nav.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('open');
        });
    });

    /* -------------------------------------------------------------
       3. ACTIVE LINK STATE ON SCROLL
    ------------------------------------------------------------- */
    const sections = document.querySelectorAll('section, footer');
    
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            // Offset helps to trigger the state slightly earlier for better UX
            if (window.scrollY >= (sectionTop - 250)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    /* -------------------------------------------------------------
       4. MODAL UTILITY FUNCTIONS
    ------------------------------------------------------------- */
    function openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    /* -------------------------------------------------------------
       5. BOOKING MODAL SYSTEM
    ------------------------------------------------------------- */
    const bookingModal = document.getElementById('booking-modal');
    const bookingModalClose = bookingModal ? bookingModal.querySelector('.modal-close-booking') : null;
    const serviceSelect = document.getElementById('service');
    const bookingForm = document.getElementById('booking-form');
    const whatsappNumber = '5551993981995';

    // Open booking modal (used by all "Agendar" and CTA buttons)
    function openBookingModal(serviceName) {
        if (serviceName && serviceSelect) {
            serviceSelect.value = serviceName;
            // Highlight the field briefly
            serviceSelect.style.borderColor = 'var(--color-primary)';
            serviceSelect.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.3)';
            setTimeout(() => {
                serviceSelect.style.borderColor = '';
                serviceSelect.style.boxShadow = '';
            }, 1500);
        }
        openModal(bookingModal);
    }

    // Close booking modal
    if (bookingModalClose) {
        bookingModalClose.addEventListener('click', () => closeModal(bookingModal));
    }
    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) closeModal(bookingModal);
        });
    }

    // CTA button "Agende seu horário"
    const btnOpenBooking = document.getElementById('btn-open-booking');
    if (btnOpenBooking) {
        btnOpenBooking.addEventListener('click', () => openBookingModal(null));
    }

    // Header "Agendar Agora" button
    const btnHeader = document.querySelector('.btn-header');
    if (btnHeader) {
        btnHeader.addEventListener('click', (e) => {
            e.preventDefault();
            openBookingModal(null);
        });
    }

    // Hero "Agendar agora" button
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(btn => {
        if (btn.getAttribute('href') === '#agendar') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openBookingModal(null);
            });
        }
    });

    /* -------------------------------------------------------------
       6. SERVICE CARD "AGENDAR" BUTTONS → Open Booking Modal
    ------------------------------------------------------------- */
    const serviceButtons = document.querySelectorAll('.btn-select-service');

    serviceButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceName = button.getAttribute('data-service');
            openBookingModal(serviceName);
        });
    });

    /* -------------------------------------------------------------
       7. PLAN CARD "ASSINAR AGORA" BUTTONS → Open Booking Modal
    ------------------------------------------------------------- */
    const planButtons = document.querySelectorAll('.btn-select-plan');

    planButtons.forEach(button => {
        button.addEventListener('click', () => {
            const planName = button.getAttribute('data-plan');
            openBookingModal(planName);
        });
    });

    /* -------------------------------------------------------------
       8. "VER MAIS SERVIÇOS" BUTTON → Open Services Modal
    ------------------------------------------------------------- */
    const serviceModal = document.getElementById('service-modal');
    const serviceModalClose = serviceModal ? serviceModal.querySelector('.modal-close') : null;
    const modalServicesContainer = document.getElementById('modal-services-container');
    const btnVerMais = document.getElementById('btn-ver-mais');

    // All services data for the modal
    const allServices = [
        {
            name: "Corte Masculino",
            description: "Corte moderno ou clássico, alinhado ao seu formato de rosto e estilo de vida.",
            price: "R$ 45",
            value: "Corte Masculino"
        },
        {
            name: "Barba Completa",
            description: "Modelagem de barba com navalha e toalha quente, alinhamento e óleo hidratante.",
            price: "R$ 35",
            value: "Barba"
        },
        {
            name: "Corte + Barba",
            description: "Combo VIP: corte personalizado aliado ao ritual completo de barba com toalha quente.",
            price: "R$ 75",
            value: "Corte + Barba"
        },
        {
            name: "Sobrancelha",
            description: "Design e limpeza detalhada da sobrancelha na navalha ou pinça.",
            price: "R$ 20",
            value: "Sobrancelha"
        },
        {
            name: "Corte Degradê / Fade",
            description: "Corte moderno com transição suave e gradiente perfeito nas laterais.",
            price: "R$ 50",
            value: "Corte Degradê / Fade"
        },
        {
            name: "Barboterapia Premium",
            description: "Ritual completo com óleos essenciais, toalha quente, massagem facial e navalha.",
            price: "R$ 45",
            value: "Barboterapia Premium"
        },
        {
            name: "Combo Gold VIP",
            description: "Corte de cabelo + Barboterapia + Sobrancelha inclusa.",
            price: "R$ 85",
            value: "Combo Gold VIP"
        },
        {
            name: "Hidratação Capilar",
            description: "Tratamento profundo com produtos premium para cabelo saudável e brilhoso.",
            price: "R$ 40",
            value: "Hidratação Capilar"
        }
    ];

    function renderServicesModal() {
        if (!modalServicesContainer) return;
        modalServicesContainer.innerHTML = '';

        allServices.forEach(service => {
            const card = document.createElement('div');
            card.className = 'mini-card';
            card.innerHTML = `
                <div class="mini-card-info">
                    <h4 class="mini-card-name">${service.name}</h4>
                    <p class="mini-card-description">${service.description}</p>
                </div>
                <div class="mini-card-action">
                    <span class="mini-card-price">${service.price}</span>
                    <button type="button" class="btn btn-primary mini-card-btn" data-value="${service.value}">Agendar</button>
                </div>
            `;
            modalServicesContainer.appendChild(card);
        });

        // Attach click events to mini card "Agendar" buttons
        const miniCardBtns = modalServicesContainer.querySelectorAll('.mini-card-btn');
        miniCardBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetValue = btn.getAttribute('data-value');

                // Ensure option exists in the select
                if (serviceSelect) {
                    let optionExists = Array.from(serviceSelect.options).some(opt => opt.value === targetValue);
                    if (!optionExists) {
                        const newOption = document.createElement('option');
                        newOption.value = targetValue;
                        newOption.text = `${btn.closest('.mini-card').querySelector('.mini-card-name').textContent} - ${btn.closest('.mini-card').querySelector('.mini-card-price').textContent}`;
                        serviceSelect.appendChild(newOption);
                    }
                }

                // Close services modal
                closeModal(serviceModal);

                // Open booking modal with service pre-selected
                openBookingModal(targetValue);
            });
        });
    }

    if (btnVerMais) {
        btnVerMais.addEventListener('click', () => {
            renderServicesModal();
            openModal(serviceModal);
        });
    }

    // Close services modal
    if (serviceModalClose) {
        serviceModalClose.addEventListener('click', () => closeModal(serviceModal));
    }
    if (serviceModal) {
        serviceModal.addEventListener('click', (e) => {
            if (e.target === serviceModal) closeModal(serviceModal);
        });
    }

    /* -------------------------------------------------------------
       9. WHATSAPP FORM SUBMISSION SYSTEM
    ------------------------------------------------------------- */
    if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Retrieve form fields
            const clientName = document.getElementById('name').value.trim();
            const clientPhone = document.getElementById('phone').value.trim();
            const selectedService = document.getElementById('service').value;
            const selectedBarber = document.getElementById('barber').value;
            const rawDate = document.getElementById('date').value;
            const selectedTime = document.getElementById('time').value;

            // Validation fallback
            if (!clientName || !clientPhone || !selectedService || !selectedBarber || !rawDate || !selectedTime) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            // Format Date to Brazilian format: DD/MM/AAAA
            const dateParts = rawDate.split('-');
            const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

            // Format and structure the WhatsApp message with Emojis
            const textMessage = 
`Olá, Golden Cuts! Gostaria de realizar um agendamento:

👤 *Nome:* ${clientName}
📞 *Telefone:* ${clientPhone}
💈 *Serviço:* ${selectedService}
✂️ *Barbeiro:* ${selectedBarber}
📅 *Data:* ${formattedDate}
⏰ *Horário:* ${selectedTime}

Aguardo a confirmação, obrigado!`;

            // URL encode the structured message
            const encodedMessage = encodeURIComponent(textMessage);

            // WhatsApp direct API link (opens in a new tab/app)
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Reset form and close modal
            bookingForm.reset();
            closeModal(bookingModal);
        });
    }

    /* -------------------------------------------------------------
       10. SCROLL REVEAL ANIMATIONS (Intersection Observer)
    ------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal-up');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once animated to improve page performance
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.12, // Element is 12% visible
            rootMargin: '0px 0px -40px 0px' // Triggers slightly before entering fully
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for older browsers: show elements immediately
        revealElements.forEach(element => {
            element.classList.add('active');
        });
    }

    /* -------------------------------------------------------------
       11. DYNAMIC DATE PICKER MINIMUM VALUE LIMITATION
    ------------------------------------------------------------- */
    // Prevent client from choosing past dates
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        // Pad single digit months and days with leading zero
        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;

        const minDate = `${year}-${month}-${day}`;
        dateInput.setAttribute('min', minDate);
    }

    /* -------------------------------------------------------------
       12. CLOSE MODALS WITH ESCAPE KEY
    ------------------------------------------------------------- */
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (bookingModal && bookingModal.classList.contains('active')) {
                closeModal(bookingModal);
            }
            if (serviceModal && serviceModal.classList.contains('active')) {
                closeModal(serviceModal);
            }
        }
    });
});
