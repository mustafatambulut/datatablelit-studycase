import { LitElement, html, css } from "lit";

export class AddNewPage extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
    h2 {
      color: #333;
    }
  `;

  render() {
    return html`
      <h2>Add New Record</h2>
      <p>This is the Add New Page!</p>
    `;
  }
}

customElements.define("add-new-page", AddNewPage);
