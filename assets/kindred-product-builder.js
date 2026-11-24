// Kindred Product Builder - Handles subscription/grind/frequency selection
// This is UI-only logic. Actual subscription billing requires Recharge/Shopify Subscriptions integration.

class KindredProductBuilder {
  constructor(container) {
    this.container = container;
    this.form = container.closest('form') || document.getElementById(`product-form-${container.dataset.sectionId}`);
    this.init();
  }

  init() {
    this.bindPillSelectors();
    this.bindFrequencyRadios();
    this.updatePrice();
  }

  bindPillSelectors() {
    const pillGroups = this.container.querySelectorAll('.kindred-builder__options[data-option]');
    pillGroups.forEach(group => {
      const pills = group.querySelectorAll('.kindred-builder__pill');
      const targetId = group.dataset.target;
      const hiddenInput = document.getElementById(targetId);

      pills.forEach(pill => {
        pill.addEventListener('click', () => {
          // Update visual state
          pills.forEach(p => {
            p.classList.remove('kindred-builder__pill--selected');
            p.setAttribute('aria-pressed', 'false');
          });
          pill.classList.add('kindred-builder__pill--selected');
          pill.setAttribute('aria-pressed', 'true');

          // Update hidden input
          if (hiddenInput) {
            hiddenInput.value = pill.dataset.value;
          }

          this.updatePrice();
        });

        // Keyboard support
        pill.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            pill.click();
          }
        });
      });
    });
  }

  bindFrequencyRadios() {
    const radios = this.container.querySelectorAll('input[name="frequency"]');
    const intervalSelector = document.getElementById('interval-selector');
    const frequencyInput = document.getElementById('frequency');

    radios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (frequencyInput) {
          frequencyInput.value = radio.value;
        }

        // Show/hide interval selector
        if (intervalSelector) {
          if (radio.value === 'subscribe') {
            intervalSelector.hidden = false;
          } else {
            intervalSelector.hidden = true;
          }
        }

        this.updatePrice();
      });
    });

    // Interval selector change
    const intervalSelect = document.getElementById('interval');
    if (intervalSelect) {
      intervalSelect.addEventListener('change', () => this.updatePrice());
    }
  }

  updatePrice() {
    const basePrice = parseFloat(this.container.dataset.basePrice || '0') * 100; // in cents
    const dynamicPriceEl = document.getElementById('dynamic-price');
    const savingsDisplay = document.getElementById('savings-display');
    const savingsValue = document.getElementById('savings-value');
    const savingsPeriod = document.getElementById('savings-period');

    if (!dynamicPriceEl) return;

    // Check if subscribe is selected
    const subscribeRadio = this.container.querySelector('input[name="frequency"]:checked');
    const isSubscribed = subscribeRadio && subscribeRadio.value === 'subscribe';

    let finalPrice = basePrice;
    let savings = 0;
    let periodText = '';

    if (isSubscribed) {
      // 15% discount for subscription
      finalPrice = Math.round(basePrice * 0.85);
      savings = basePrice - finalPrice;

      // Calculate period savings based on interval
      const intervalSelect = document.getElementById('interval');
      const interval = intervalSelect ? intervalSelect.value : 'monthly';

      const intervalsPerYear = {
        'weekly': 52,
        'biweekly': 26,
        'monthly': 12,
        'quarterly': 4
      };

      const annualSavings = savings * (intervalsPerYear[interval] || 12);
      periodText = ` per year (${interval} delivery)`;
      savingsValue.textContent = `$${(annualSavings / 100).toFixed(2)}`;
    } else {
      savingsDisplay.hidden = true;
    }

    dynamicPriceEl.textContent = `$${(finalPrice / 100).toFixed(2)}`;

    if (isSubscribed && savingsDisplay) {
      savingsDisplay.hidden = false;
      savingsPeriod.textContent = periodText;
    }
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const builders = document.querySelectorAll('.kindred-subscription-builder');
  builders.forEach(builder => new KindredProductBuilder(builder));
});