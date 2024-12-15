import {LitElement, html, css} from 'lit';
import './components/header/header-component.js';
import './components/data-table/data-table.js';
import {translations} from './components/shared/translation/index.js';

class App extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: 'Arial', sans-serif;
    }

    main {
      padding: 10px 50px 0 50px;
    }

    main h2 {
      color: #ff6200;
      margin-bottom: 40px;
    }

    header-component {
      background: #ffffff;
      position: sticky;
      top: 0;
      z-index: 10;
    }
  `;

  constructor() {
    super();
    this.rows = [];

    // Translation listen
    translations.subscribe(() => {
      this.requestUpdate();
    });
  }

  handleAddRow(event) {
    const newRow = event.detail;
    // DataTable bileşenini bul ve addRow metodunu çağır
    const dataTable = this.renderRoot.querySelector('data-table');
    if (dataTable) {
      dataTable.addRows(newRow);
    }
  }

  render() {
    const table = document.getElementById('jsonTable');

    if (table) {
      // Fetch data from the JSON file
      fetch('/src/services/data.json')
        .then((response) => response.json())
        .then((json) => {
          table.headers = json.headers;
          table.data = json.data;
        })
        .catch((error) => console.error('Error loading JSON:', error));
    }

    return html`
      <header-component
        title="ING"
        @add-rows="${this.handleAddRow}"
      ></header-component>

      <main>
        
        <h2>${translations.getTranslation('employeeList')}</h1>
        <data-table id="jsonTable"></data-table>
      </main>
    `;
  }

  navigateTo(route) {
    console.log(`Navigating to: ${route}`);
    // Burada bir router ile yönlendirme yapabilirsiniz.
  }
}

customElements.define('my-app', App);
