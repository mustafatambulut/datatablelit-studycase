import {LitElement, html} from 'lit';
import {translations} from '../shared/translation';
import {headerStyles} from './header-component.css.js';
class HeaderComponent extends LitElement {
  static styles = headerStyles;

  static properties = {
    title: {type: String},
    icons: {type: Array},
    showModal: {type: Boolean},
    selectedOption: {type: String},
    currentLanguage: {type: String},
  };

  constructor() {
    super();

    this.title = 'Header Title';
    this.showModal = false;
    this.selectedOption = 'en';
    this.icons = [
      {
        slug: 'addRow',
        action: () => {},
      },
      {slug: '', action: () => {}},
    ];

    this.currentLanguage = translations.currentLanguage;

    // Translation değişimlerini dinle
    translations.subscribe((language) => {
      this.currentLanguage = language;
      this.requestUpdate();
    });
  }

  connectedCallback() {
    super.connectedCallback();
  }

  closeModal() {
    this.showModal = false; // Hide the modal
  }

  handleClick(action) {
    if (typeof action === 'function') {
      action();
    }
    this.showModal = !this.showModal;

    this.dispatchEvent(
      new CustomEvent('add-rows', {
        detail: {showModal: this.showModal},
      })
    );
  }

  // Seçilen öğeyi güncelleyen fonksiyon
  selectLang(option) {
    this.currentLanguage = option; // Seçilen öğeyi state'e kaydediyoruz
    translations.setLanguage(option);
  }

  render() {
    return html`
      <header>
        <div class="header-left">
          <div class="icon-logo"></div>
          <span>${this.title}</span>
        </div>

        <div class="header-right" style="color:red">
          ${this.icons.map(
            (icon) => html`
              <div
                class="element"
                @click="${() => this.handleClick(icon.action)}"
                title="${icon.name}"
              >
                ${icon.slug !== ''
                  ? '+ ' + translations.getTranslation(icon.slug) + ''
                  : null}
              </div>
            `
          )}
          <slot></slot>

          <div class="dropdown">
            ${this.currentLanguage === 'en'
              ? html` <div class="icon-en"></div>`
              : html` <div
                  class="icon-tr icon-tr-default"
                  style="background-size: cover !important; width: 50px !important; height: 28px !important"
                ></div>`}
            <div class="dropdown-content">
              ${this.currentLanguage !== 'en'
                ? html` <div
                    class="dropdown-item icon-en"
                    @click="${() => this.selectLang('en')}"
                  ></div>`
                : html` <div
                    class="dropdown-item icon-tr"
                    @click="${() => this.selectLang('tr')}"
                  ></div>`}
            </div>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define('header-component', HeaderComponent);
