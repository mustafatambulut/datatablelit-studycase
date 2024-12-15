import {LitElement, html, css} from 'lit';

export class EmptyState extends LitElement {
  static properties = {
    message: {type: String},
    icon: {type: String},
  };

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
      color: #666;
    }
    .icon {
      font-size: 48px;
      margin-bottom: 16px;
      color: #aaa;
    }
    .message {
      font-size: 18px;
      margin-bottom: 16px;
    }
    button {
      background-color: #007bff;
      color: #fff;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 4px;
      cursor: pointer;
      outline: none;
    }
    button:hover {
      background-color: #0056b3;
    }
  `;

  constructor() {
    super();
    this.message = 'No data available';
    this.icon = '📄';
    this.buttonLabel = 'Add Data';
    this.onAction = () => {};
  }

  render() {
    return html`
      <div>
        <div class="icon">${this.icon}</div>
        <div class="message">${this.message}</div>
        <!-- ${this.buttonLabel
          ? html`
              <button">${this.buttonLabel}</button>
            `
          : ''} -->
      </div>
    `;
  }
}

customElements.define('empty-state', EmptyState);
