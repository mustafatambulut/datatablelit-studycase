import {LitElement, html, css} from 'lit';

export class IconButton extends LitElement {
  static properties = {
    icon: {type: String}, // Font Awesome ikonu adı (ör: 'fa-edit', 'fa-trash')
    color: {type: String}, // Renk özelliği
    size: {type: String}, // Boyut özelliği (ör: '16px', '24px')
  };

  static styles = css`
    button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    button:hover {
      opacity: 0.8;
    }
    i {
      font-size: var(--icon-size, 16px);
      color: var(--icon-color, black);
    }
  `;

  render() {
    return html`
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        rel="stylesheet"
      />
      <button style="--icon-color: ${this.color}; --icon-size: ${this.size}">
        <i class="fas ${this.icon}"></i>
      </button>
    `;
  }
}

customElements.define('icon-button', IconButton);
