/**
 * AKASH INTERIORS — Master JavaScript Application
 * Studio: Akash Interiors
 * Location: Gola Gokarannath, Lakhimpur Kheri, Uttar Pradesh, India
 * 
 * Includes:
 * - Central Configuration (Editable placeholders for launch)
 * - Navigation & Glassmorphic Scroll Controller
 * - Mobile Drawer Menu & Focus Trapping
 * - Service Category Action Handlers
 * - Interactive Project Inspiration Lightbox & Material Details
 * - Accessible FAQ Accordion
 * - Lead Generation Form with Validation, LocalStorage, and WhatsApp Handoff
 * - Floating WhatsApp Widget with Quick Presets
 * - Admin Lead Viewer & CSV Export
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. BUSINESS CONFIGURATION (EDITABLE PLACEHOLDERS)
  // =========================================================================
  const AKASH_CONFIG = {
    businessName: "Akash Interiors",
    tagline: "Thoughtful interiors for the way you live.",
    locationName: "Gola Gokarannath, Lakhimpur Kheri, Uttar Pradesh, India",
    
    // BUSINESS WHATSAPP NUMBER (INDIA +91)
    // IMPORTANT: Replace with the verified 10-digit business number before official launch.
    // Format: "91" + 10 digits without spaces or '+' (e.g., "919876543210")
    whatsappNumber: "919876543210", 
    whatsappFormatted: "+91 98XXX XXXXX (Configure your number)",
    
    // BUSINESS CALL NUMBER (EDITABLE)
    phoneDisplay: "+91 98XXX XXXXX (Editable)",
    phoneTel: "+919876543210",
    
    // BUSINESS EMAIL (EDITABLE)
    emailDisplay: "contact@akashinteriors.in (Editable)",
    emailMailto: "contact@akashinteriors.in",
    
    // DEFAULT WHATSAPP PREFILLED MESSAGE
    defaultMessage: "Hello Akash Interiors, I am interested in discussing an interior design project for my home in Gola Gokarannath / Lakhimpur Kheri. Could you please guide me on the next steps?"
  };

  // Expose configuration globally for client verification and edits
  window.AKASH_CONFIG = AKASH_CONFIG;

  // =========================================================================
  // 2. PROJECT INSPIRATION GALLERY DATA
  // Note: Transparently labeled as design inspiration demonstrations
  // =========================================================================
  const INSPIRATION_PROJECTS = {
    "warm-living": {
      title: "The Warm Contemporary Living Room",
      category: "Living Room Design",
      image: "assets/images/hero_interior.jpg",
      description: "A harmonious living space celebrating natural teak wood fluting, honed travertine coffee table, and soft textured oatmeal linen. Designed around soft morning light and effortless family gatherings.",
      palette: ["#211F1B (Dark Timber)", "#F5F2EC (Warm Ivory)", "#E6DED1 (Stone Beige)", "#B69A6B (Muted Brass)"],
      materials: "Natural Teak Fluting, Travertine Marble, Oatmeal Linen, Brushed Brass",
      suitedFor: "Independent houses and modern apartments in Lakhimpur Kheri seeking timeless warmth.",
      serviceKey: "living"
    },
    "calm-bedroom": {
      title: "A Calm and Comfortable Bedroom",
      category: "Bedroom Design",
      image: "assets/images/bedroom_interior.jpg",
      description: "A restorative sanctuary with a low-profile upholstered linen bed, concealed cove mood lighting, warm timber paneling, and an understated bedside ceramic lamp.",
      palette: ["#F5F2EC (Warm Ivory)", "#E6DED1 (Stone Beige)", "#87917B (Muted Sage)", "#211F1B (Deep Walnut)"],
      materials: "Textured Limewash Plaster, Fluted Teak Wall Panel, Oatmeal Linen, Warm Brass Sconces",
      suitedFor: "Master bedrooms and guest suites requiring a clutter-free, restful atmosphere.",
      serviceKey: "bedroom"
    },
    "modular-kitchen": {
      title: "Natural Wood Kitchen Concepts",
      category: "Modular Kitchen Design",
      image: "assets/images/modular_kitchen.jpg",
      description: "A functional U-shaped modular kitchen pairing warm fluted oak cabinetry with reeded glass upper storage, warm quartz countertops, undermount sink, and concealed warm LED task lighting.",
      palette: ["#E6DED1 (Stone Beige)", "#B69A6B (Muted Brass)", "#FFFFFF (Polished Quartz)", "#211F1B (Teak)"],
      materials: "Moisture-Resistant Fluted Wood, Quartz Counters, Fluted Glass, Brass Pulls",
      suitedFor: "Daily home cooking with optimized ergonomics and ample smart storage.",
      serviceKey: "kitchen"
    },
    "gathering-dining": {
      title: "Modern Indian Home Interiors",
      category: "Dining & Social Spaces",
      image: "assets/images/dining_interior.jpg",
      description: "A welcoming circular solid wood dining table paired with artisanal cane chairs, framed by warm limewash walls, an arched display niche, and a sculptural brass chandelier.",
      palette: ["#211F1B (Teak Wood)", "#F5F2EC (Warm Ivory)", "#B69A6B (Brushed Brass)", "#87917B (Botanicals)"],
      materials: "Solid Teak Joinery, Hand-Woven Cane, Travertine Niche, Warm Brass Fixtures",
      suitedFor: "Family meals, festive dinners, and memorable shared moments.",
      serviceKey: "home"
    },
    "study-library": {
      title: "Thoughtful Small-Space Design",
      category: "Study & Work Nook",
      image: "assets/images/study_nook.jpg",
      description: "Custom floor-to-ceiling wooden bookshelves with warm integrated LED lighting, an ergonomic teak writing desk, cane swivel chair, and an arched window overlooking greenery.",
      palette: ["#211F1B (Natural Wood)", "#E6DED1 (Stone Wall)", "#D6C29E (Soft Brass)", "#F5F2EC (Ivory)"],
      materials: "Custom Teak Joinery, Integrated LED Channels, Terracotta Floor, Linen Lounge Chair",
      suitedFor: "Home offices, reading libraries, student study areas, or private sanctuaries.",
      serviceKey: "renovation"
    },
    "architectural-living": {
      title: "Timeless Neutral Interiors",
      category: "Living & Alcoves",
      image: "assets/images/living_detail.jpg",
      description: "A serene living layout highlighted by an illuminated architectural arched alcove displaying terracotta ceramics, a slatted timber partition divider, and a low floating media console.",
      palette: ["#F5F2EC (Lime Plaster)", "#E6DED1 (Terrazzo)", "#B69A6B (Muted Brass)", "#636D57 (Garden Green)"],
      materials: "Slatted Wood Screen, Limewash Wall Plaster, Terrazzo Flooring, Cognac Leather",
      suitedFor: "Open-plan living rooms needing subtle spatial division without blocking daylight.",
      serviceKey: "living"
    }
  };

  // =========================================================================
  // 3. CORE DOM INITIALIZATION
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    initHeaderScroll();
    initMobileNavigation();
    initSmoothScrolling();
    initFaqAccordion();
    initInspirationModal();
    initServiceActions();
    initConsultationForm();
    initWhatsAppWidget();
    initAdminLeadDrawer();
  });

  // =========================================================================
  // 4. HEADER SCROLL & GLASSMORPHISM
  // =========================================================================
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
  }

  // =========================================================================
  // 5. MOBILE DRAWER NAVIGATION
  // =========================================================================
  function initMobileNavigation() {
    const toggleBtn = document.querySelector('.mobile-toggle');
    const drawer = document.querySelector('.mobile-drawer');
    const backdrop = document.querySelector('.mobile-backdrop');
    const drawerLinks = drawer.querySelectorAll('a[href^="#"]');

    if (!toggleBtn || !drawer || !backdrop) return;

    const openMenu = () => {
      toggleBtn.setAttribute('aria-expanded', 'true');
      drawer.classList.add('open');
      backdrop.classList.add('active');
      document.body.classList.add('menu-open');
    };

    const closeMenu = () => {
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.classList.remove('open');
      backdrop.classList.remove('active');
      document.body.classList.remove('menu-open');
    };

    toggleBtn.addEventListener('click', () => {
      const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    backdrop.addEventListener('click', closeMenu);

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  // =========================================================================
  // 6. SMOOTH SCROLLING WITH OFFSET
  // =========================================================================
  function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');

    links.forEach(link => {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 72;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - (headerHeight - 8);

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // =========================================================================
  // 7. SERVICE ACTION LINKS (DISCUSS THIS SERVICE)
  // =========================================================================
  function initServiceActions() {
    const serviceButtons = document.querySelectorAll('[data-service-target]');
    const spaceSelect = document.getElementById('spaceRequiring');

    serviceButtons.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const serviceName = this.getAttribute('data-service-target');

        // Map service to form select value
        if (spaceSelect) {
          if (serviceName.includes('Kitchen')) {
            spaceSelect.value = 'Kitchen';
          } else if (serviceName.includes('Bedroom')) {
            spaceSelect.value = 'Bedroom';
          } else if (serviceName.includes('Living')) {
            spaceSelect.value = 'Living room';
          } else if (serviceName.includes('New Home') || serviceName.includes('Home Interior')) {
            spaceSelect.value = 'Full home';
          } else {
            spaceSelect.value = 'Multiple rooms';
          }
        }

        // Scroll to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 72;
          const offsetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - (headerHeight - 8);
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }

        showToast(`Selected "${serviceName}". Fill your details below to discuss.`);
      });
    });
  }

  // =========================================================================
  // 8. PROJECT INSPIRATION DETAIL MODAL
  // =========================================================================
  function initInspirationModal() {
    const modalOverlay = document.getElementById('inspirationModal');
    const closeBtn = document.getElementById('modalCloseBtn');
    const triggerCards = document.querySelectorAll('[data-inspiration-id]');

    if (!modalOverlay) return;

    const modalImg = document.getElementById('modalImg');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalPalette = document.getElementById('modalPalette');
    const modalMaterials = document.getElementById('modalMaterials');
    const modalSuited = document.getElementById('modalSuited');
    const modalEnquireBtn = document.getElementById('modalEnquireBtn');

    const openModal = (projId) => {
      const data = INSPIRATION_PROJECTS[projId];
      if (!data) return;

      if (modalImg) modalImg.src = data.image;
      if (modalCategory) modalCategory.textContent = data.category;
      if (modalTitle) modalTitle.textContent = data.title;
      if (modalDesc) modalDesc.textContent = data.description;
      if (modalMaterials) modalMaterials.textContent = data.materials;
      if (modalSuited) modalSuited.textContent = data.suitedFor;

      if (modalPalette) {
        modalPalette.innerHTML = '';
        data.palette.forEach(color => {
          const li = document.createElement('li');
          li.textContent = color;
          modalPalette.appendChild(li);
        });
      }

      if (modalEnquireBtn) {
        modalEnquireBtn.onclick = () => {
          closeModal();
          // Pre-fill form space
          const spaceSelect = document.getElementById('spaceRequiring');
          if (spaceSelect) {
            if (data.serviceKey === 'kitchen') spaceSelect.value = 'Kitchen';
            else if (data.serviceKey === 'bedroom') spaceSelect.value = 'Bedroom';
            else if (data.serviceKey === 'living') spaceSelect.value = 'Living room';
            else spaceSelect.value = 'Full home';
          }
          const contactSec = document.getElementById('contact');
          if (contactSec) {
            contactSec.scrollIntoView({ behavior: 'smooth' });
          }
          showToast(`Inquiring about ${data.title}`);
        };
      }

      modalOverlay.classList.add('open');
      document.body.classList.add('modal-open');
    };

    const closeModal = () => {
      modalOverlay.classList.remove('open');
      document.body.classList.remove('modal-open');
    };

    triggerCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-inspiration-id');
        openModal(id);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = card.getAttribute('data-inspiration-id');
          openModal(id);
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // =========================================================================
  // 9. FAQ ACCORDION (ACCESSIBLE ARIA)
  // =========================================================================
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      const panel = item.querySelector('.faq-panel');

      if (!trigger || !panel) return;

      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other accordion items for clean editorial experience
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherTrigger = otherItem.querySelector('.faq-trigger');
            const otherPanel = otherItem.querySelector('.faq-panel');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            if (otherPanel) otherPanel.style.maxHeight = null;
          }
        });

        if (isActive) {
          item.classList.remove('active');
          trigger.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = null;
        } else {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    });
  }

  // =========================================================================
  // 10. LOCAL CONSULTATION & ENQUIRY FORM
  // =========================================================================
  function initConsultationForm() {
    const form = document.getElementById('consultationForm');
    const successCard = document.getElementById('formSuccessCard');
    const submitBtn = document.getElementById('formSubmitBtn');
    const sendWhatsAppBtn = document.getElementById('successWhatsAppBtn');
    const newEnquiryBtn = document.getElementById('newEnquiryBtn');

    if (!form) return;

    // Validation patterns
    const phoneRegex = /^[6-9]\d{9}$/;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let isValid = true;

      // Inputs to validate
      const fullName = document.getElementById('fullName');
      const phoneNumber = document.getElementById('phoneNumber');
      const projectLocation = document.getElementById('projectLocation');
      const propertyType = document.getElementById('propertyType');
      const spaceRequiring = document.getElementById('spaceRequiring');
      const projectBudget = document.getElementById('projectBudget');
      const startDate = document.getElementById('startDate');
      const additionalReq = document.getElementById('additionalRequirements');
      const contactMethod = document.querySelector('input[name="contactMethod"]:checked')?.value || 'WhatsApp';

      // 1. Name Check
      if (!fullName.value.trim() || fullName.value.trim().length < 2) {
        fullName.classList.add('is-invalid');
        isValid = false;
      } else {
        fullName.classList.remove('is-invalid');
      }

      // 2. Phone Check (10-digit Indian mobile)
      const cleanPhone = phoneNumber.value.replace(/\D/g, '');
      if (!phoneRegex.test(cleanPhone)) {
        phoneNumber.classList.add('is-invalid');
        isValid = false;
      } else {
        phoneNumber.classList.remove('is-invalid');
      }

      // 3. Location Check
      if (!projectLocation.value.trim()) {
        projectLocation.classList.add('is-invalid');
        isValid = false;
      } else {
        projectLocation.classList.remove('is-invalid');
      }

      // 4. Property Type Check
      if (!propertyType.value) {
        propertyType.classList.add('is-invalid');
        isValid = false;
      } else {
        propertyType.classList.remove('is-invalid');
      }

      // 5. Space Requiring Check
      if (!spaceRequiring.value) {
        spaceRequiring.classList.add('is-invalid');
        isValid = false;
      } else {
        spaceRequiring.classList.remove('is-invalid');
      }

      if (!isValid) {
        showToast('Please check the highlighted fields above.', true);
        return;
      }

      // Enter Submitting State
      submitBtn.classList.add('is-submitting');
      submitBtn.disabled = true;

      // Prepare Lead Object
      const leadData = {
        id: 'LEAD-' + Date.now(),
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        fullName: fullName.value.trim(),
        phoneNumber: cleanPhone,
        contactMethod: contactMethod,
        projectLocation: projectLocation.value.trim(),
        propertyType: propertyType.value,
        spaceRequiring: spaceRequiring.value,
        projectBudget: projectBudget.value || 'Not specified',
        startDate: startDate.value || 'Flexible',
        additionalRequirements: additionalReq.value.trim() || 'None'
      };

      // Simulate network persistence & store to LocalStorage
      setTimeout(() => {
        saveLeadLocally(leadData);

        submitBtn.classList.remove('is-submitting');
        submitBtn.disabled = false;

        // Display Success Card
        form.style.display = 'none';
        if (successCard) {
          successCard.classList.add('active');
          successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Configure WhatsApp Hand-off Button
        if (sendWhatsAppBtn) {
          const waMessage = 
`*NEW INTERIOR DESIGN ENQUIRY*
*Studio:* Akash Interiors (Gola Gokarannath)

*Client Name:* ${leadData.fullName}
*Phone:* ${leadData.phoneNumber}
*Preferred Contact:* ${leadData.contactMethod}
*Location:* ${leadData.projectLocation}
*Property Type:* ${leadData.propertyType}
*Space:* ${leadData.spaceRequiring}
*Budget:* ${leadData.projectBudget}
*Timeline:* ${leadData.startDate}
*Notes:* ${leadData.additionalRequirements}

_Sent via Akash Interiors Official Website_`;

          sendWhatsAppBtn.href = `https://wa.me/${AKASH_CONFIG.whatsappNumber}?text=${encodeURIComponent(waMessage)}`;
        }

        showToast('Enquiry recorded successfully!');
      }, 750);
    });

    // Reset button to submit another enquiry
    if (newEnquiryBtn) {
      newEnquiryBtn.addEventListener('click', () => {
        form.reset();
        form.style.display = 'block';
        if (successCard) {
          successCard.classList.remove('active');
        }
      });
    }

    // Input blur cleanup
    form.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
      });
    });
  }

  function saveLeadLocally(lead) {
    try {
      const existing = JSON.parse(localStorage.getItem('akash_interiors_leads') || '[]');
      existing.unshift(lead);
      localStorage.setItem('akash_interiors_leads', JSON.stringify(existing));
    } catch (e) {
      console.error('LocalStorage unavailable:', e);
    }
  }

  // =========================================================================
  // 11. FLOATING WHATSAPP WIDGET
  // =========================================================================
  function initWhatsAppWidget() {
    const triggerBtn = document.getElementById('whatsappWidgetBtn');
    const popupCard = document.getElementById('whatsappPopupCard');
    const closeBtn = document.getElementById('whatsappPopupClose');
    const quickReplyButtons = document.querySelectorAll('[data-wa-preset]');

    if (!triggerBtn || !popupCard) return;

    const togglePopup = () => {
      popupCard.classList.toggle('open');
    };

    const closePopup = () => {
      popupCard.classList.remove('open');
    };

    triggerBtn.addEventListener('click', togglePopup);

    if (closeBtn) {
      closeBtn.addEventListener('click', closePopup);
    }

    quickReplyButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const preset = this.getAttribute('data-wa-preset');
        let text = AKASH_CONFIG.defaultMessage;

        if (preset === 'kitchen') {
          text = "Hello Akash Interiors, I would like to discuss a Modular Kitchen design for my home in Gola Gokarannath / Lakhimpur Kheri. Please share details on consultation.";
        } else if (preset === 'living-bed') {
          text = "Hello Akash Interiors, I am planning interiors for my living room and bedrooms. Can we discuss design concepts and possibilities?";
        } else if (preset === 'new-home') {
          text = "Hello Akash Interiors, I am constructing/planning a new residential building in Lakhimpur Kheri district and would like guidance on comprehensive home interiors.";
        } else if (preset === 'renovation') {
          text = "Hello Akash Interiors, I would like to enquire about renovating and redesigning existing rooms in my home.";
        }

        const url = `https://wa.me/${AKASH_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        closePopup();
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!triggerBtn.contains(e.target) && !popupCard.contains(e.target)) {
        closePopup();
      }
    });
  }

  // =========================================================================
  // 12. ADMIN LEAD VIEWER & CSV EXPORT
  // =========================================================================
  function initAdminLeadDrawer() {
    const adminLink = document.getElementById('openAdminDrawer');
    const drawer = document.getElementById('adminDrawer');
    const closeBtn = document.getElementById('closeAdminDrawer');
    const leadsContainer = document.getElementById('adminLeadsContainer');
    const exportBtn = document.getElementById('exportLeadsBtn');
    const clearBtn = document.getElementById('clearLeadsBtn');

    if (!adminLink || !drawer) return;

    const renderLeads = () => {
      const leads = JSON.parse(localStorage.getItem('akash_interiors_leads') || '[]');

      if (leads.length === 0) {
        leadsContainer.innerHTML = `
          <div style="text-align: center; padding: 3rem 1rem; color: #777168;">
            <p style="font-weight: 600; margin-bottom: 0.5rem;">No enquiries recorded yet.</p>
            <p style="font-size: 0.8rem;">Submissions from the consultation form will appear here and persist locally in this browser.</p>
          </div>
        `;
        return;
      }

      leadsContainer.innerHTML = leads.map(l => `
        <div class="lead-card-item">
          <div class="lead-header-row">
            <span>${l.fullName}</span>
            <span style="color: #B69A6B;">${l.propertyType}</span>
          </div>
          <div style="margin-bottom: 0.4rem; color: #777168;">
            <span>Phone: <strong>${l.phoneNumber}</strong> (${l.contactMethod})</span>
          </div>
          <div style="margin-bottom: 0.4rem; color: #777168;">
            <span>Location: <strong>${l.projectLocation}</strong></span> | 
            <span>Space: <strong>${l.spaceRequiring}</strong></span>
          </div>
          <div style="margin-bottom: 0.4rem; color: #777168;">
            <span>Budget: ${l.projectBudget}</span> | 
            <span>Timeline: ${l.startDate}</span>
          </div>
          ${l.additionalRequirements !== 'None' ? `
            <div style="background: rgba(41,39,34,0.05); padding: 0.5rem; border-radius: 2px; margin-top: 0.5rem;">
              <em>"${l.additionalRequirements}"</em>
            </div>
          ` : ''}
          <div style="margin-top: 0.5rem; font-size: 0.68rem; color: #9E9991; text-align: right;">
            Received: ${l.timestamp}
          </div>
        </div>
      `).join('');
    };

    adminLink.addEventListener('click', (e) => {
      e.preventDefault();
      renderLeads();
      drawer.classList.add('open');
      document.body.classList.add('modal-open');
    });

    const closeDrawer = () => {
      drawer.classList.remove('open');
      document.body.classList.remove('modal-open');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const leads = JSON.parse(localStorage.getItem('akash_interiors_leads') || '[]');
        if (leads.length === 0) {
          showToast('No leads available to export.', true);
          return;
        }

        const headers = ["ID", "Timestamp", "Name", "Phone", "Contact Method", "Location", "Property Type", "Space", "Budget", "Start Date", "Notes"];
        const rows = leads.map(l => [
          l.id,
          `"${l.timestamp}"`,
          `"${l.fullName}"`,
          `"${l.phoneNumber}"`,
          `"${l.contactMethod}"`,
          `"${l.projectLocation}"`,
          `"${l.propertyType}"`,
          `"${l.spaceRequiring}"`,
          `"${l.projectBudget}"`,
          `"${l.startDate}"`,
          `"${(l.additionalRequirements || '').replace(/"/g, '""')}"`
        ]);

        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `akash_interiors_leads_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showToast('Enquiries exported to CSV.');
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear stored test enquiries?')) {
          localStorage.removeItem('akash_interiors_leads');
          renderLeads();
          showToast('Enquiry logs cleared.');
        }
      });
    }
  }

  // =========================================================================
  // 13. TOAST NOTIFICATION HELPER
  // =========================================================================
  function showToast(message, isWarning = false) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    if (isWarning) {
      toast.style.borderLeftColor = '#D32F2F';
    }
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

})();
