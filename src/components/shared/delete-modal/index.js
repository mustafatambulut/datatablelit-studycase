import { LitElement, html, css } from "lit";
import { translations } from "../translation";
import { deleteModalStyles } from "./styles.css";
export class DeleteConfirmModal extends LitElement {
  static styles = deleteModalStyles;
  static properties = {
    open: { type: Boolean },
    employeeName: { type: String },
    row: { type: Object },
    all: { type: Boolean },
  };

  constructor() {
    super();
    this.open = false;
    this.employeeName = "";
    this.row = {};
    this.all = false;

    translations.subscribe((language) => {
      this.currentLanguage = language;
      this.requestUpdate();
    });
  }

  show(row) {
    if (row === "all") {
      this.all = true;
      this.open = true;
      this.row = row;
    } else {
      this.row = row;
      this.employeeName = row?.firstName;
      this.open = true;
    }
  }

  close() {
    this.open = false;
  }

  proceed() {
    this.dispatchEvent(
      new CustomEvent("delete-confirmed", { detail: this.row })
    );
    this.close();
  }

  render() {
    return html`
      <div class="modal ${this.open ? "show" : ""}">
        <div class="modal-content">
          <div class="header">
            <span class="close-icon" @click="${this.close}">&times;</span>
            <h3>${translations.getTranslation("sure")}</h3>
          </div>
          ${this.row === "all"
            ? html` <p>${translations.getTranslation("allDelete")}</p> `
            : html`
                <p>
                  ${translations.getTranslation("selectDelete")} &nbsp;
                  <b>${this.employeeName}</b> &nbsp;
                  ${translations.getTranslation("selectDelete2")}
                </p>
              `}

          <div class="actions">
            <button class="proceed" @click="${this.proceed}">
              ${translations.getTranslation("proceed")}
            </button>
            <button class="cancel" @click="${this.close}">
              ${translations.getTranslation("cancel")}
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("delete-confirm-modal", DeleteConfirmModal);
