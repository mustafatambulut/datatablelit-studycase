import { LitElement, html, css } from "lit";
import { iconButtonStyles } from "./styles.css";
export class IconButton extends LitElement {
  static styles = iconButtonStyles;
  static properties = {
    icon: { type: String }, 
    color: { type: String }, 
    size: { type: String }, 
  };
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

customElements.define("icon-button", IconButton);
