import {LitElement, html} from 'lit';
import {fetchData} from '../../services/data-service';
import {translations} from '../shared/translation';
import {IconButton} from '../shared/icon-button';
import {EmptyState} from '../empty-state';
import {dataTableStyles} from './data-table.css.js';

class DataTable extends LitElement {
  static styles = dataTableStyles;

  static properties = {
    headers: {type: Array},
    data: {type: Array},
    showModal: {type: Boolean},
    modalData: {type: Object},
    editMode: {type: Boolean},
    editRowIndex: {type: Number},
    editColumnKey: {type: String},
    selectedRows: {type: Array},
    language: {type: String},
    currentPage: {type: Number},
    rowsPerPage: {type: Number},
    displayedData: {type: Array},
    editedRow: {type: Object}, // Added here
    showAddModal: {type: Boolean}, // Add row modal visibility
    rows: {type: Array},
    selectAll: {type: Boolean}, // Tüm satırları seçme durumu
  };

  constructor() {
    super();
    this.headers = [];
    this.data = [];
    this.showModal = false;
    this.modalData = {
      firstName: '',
      lastName: '',
      dateOfEmployment: '',
      dateOfBirth: '',
      phone: '',
      email: '',
      department: '',
      position: '',
    };
    this.editMode = false;
    this.editRowIndex = -1;
    this.editColumnKey = '';
    this.selectedRows = [];
    this.language = 'en'; // Default language
    // this.loadTranslations(this.language);
    this.currentPage = 1;
    this.displayedData = [];
    this.rowsPerPage = 9; // Default number of rows per page
    this.editedRow = {};
    this.showAddModal = false; // Control Add Row modal visibility
    this.rows = [];
    this.selectAll = false;

    // Translation listen
    translations.subscribe((language) => {
      this.currentLanguage = language;
      this.requestUpdate();
    });
  }

  async connectedCallback() {
    super.connectedCallback();
    // Support for setting headers/data via attributes in HTML

    console.log('  >>> this app state', this.stateController);
    try {
      // JSON verisini fetch et
      const response = await fetchData('/src/assets/data/data.json');

      this.data = response.data || [];
      this.headers = response.headers || [];
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  toggleSelectAll() {
    if (!this.selectAll) {
      this.selectedRows = this.displayedData.map((x) => x.id);
    } else {
      this.selectedRows = [];
    }
    this.selectAll = !this.selectAll;
  }

  toggleRowSelection(rowIndex) {
    const selectedIndex = this.selectedRows.indexOf(rowIndex);
    if (selectedIndex >= 0) {
      this.selectedRows = [
        ...this.selectedRows.slice(0, selectedIndex),
        ...this.selectedRows.slice(selectedIndex + 1),
      ];
    } else {
      this.selectedRows = [...this.selectedRows, rowIndex];
    }
  }

  // Function to remove selected rows
  removeSelectedRows() {
    this.data = this.data.filter((row) => !this.selectedRows.includes(row.id)); // Remove selected rows
    this.updateDisplayedData(); // Refresh the displayed data
    this.displayedData.length === this.selectedRows.length &&
      (this.selectAll = !this.selectAll);
    this.currentPage > Math.ceil(this.data.length / this.rowsPerPage) &&
      this.handlePageChange('first');
    this.selectedRows = [];
  }

  addRows(newRow) {
    // if (newRow?.showModal) {
    this.openModal();
    // } else {
    //   this.closeModal();
    // }
  }

  updateDisplayedData() {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    this.displayedData = this.data.slice(startIndex, endIndex);
  }

  handlePageChange(action) {
    const totalPages = Math.ceil(this.data.length / this.rowsPerPage);

    if (action === 'next' && this.currentPage < totalPages) {
      this.currentPage++;
    } else if (action === 'previous' && this.currentPage > 1) {
      this.currentPage--;
    } else if (action === 'first') {
      this.currentPage = 1;
    } else if (action === 'last') {
      this.currentPage = totalPages;
    }

    this.updateDisplayedData();
  }

  closeModal() {
    this.editedRow = null; // Reset the edited row
    this.showModal = false; // Hide the modal
  }

  handleInput(event, header) {
    debugger;
    // this.modalData = {...this.modalData, [header]: event.target.value};
    this.modalData[header] = event.target.value;
  }

  cancelEdit() {
    this.editIndex = -1;
    this.newRow = {};
  }

  // deleteSelectedRows() {
  //   this.data = this.data.filter(
  //     (_, index) => !this.selectedRows.includes(index)
  //   );
  //   this.selectedRows = [];
  // }

  editRow(rowId) {
    // Find the row in the original data using the id
    const row = this.data.find((item) => item.id === rowId);
    if (row) {
      this.openEditModal(row); // Pass the row data to the modal
    }
    this.editMode = true;
  }

  openEditModal(row) {
    // Populate the modal inputs with the row's data
    this.editedRow = {...row}; // Create a copy of the row for editing
    this.showModal = true; // Open the modal
  }

  // updateCell() {
  //   if (this.editMode) {
  //     // Update existing cell
  //     let _updatedArray = this.data;
  //     _updatedArray[this.editRowIndex] = this.modalData;
  //     this.data = _updatedArray;
  //     //   this.data = [...this.data, this.modalData];
  //   } else {
  //     // Add new row
  //     this.data = [...this.data, this.modalData];
  //   }
  //   this.closeModal();
  // }

  addRow() {
    this.newRow = {}; // Clear any previous data
    this.showAddModal = true; // Show the modal for adding a new row
  }

  openModal(rowIndex = -1, columnKey = '') {
    if (rowIndex === -1) {
      // New Row Modal
      // let obj = {};
      // let _headers = this.headers;
      // let xx = _headers.reduce((acc, header) => ({...acc, [header]: ''}), {});
      // console.log(xx);
      // for (let i = 1; i < _headers.length; i++) {
      //   obj[_headers[i]] = '';
      // }
      this.modalData = this.headers.reduce(
        (acc, header) => ({...acc, [header]: ''}),
        {}
      );
      this.editMode = false;
    } else {
      // Edit Cell Modal
      this.editMode = true;
      this.editRowIndex = rowIndex;
      this.editColumnKey = columnKey;
      this.modalData = {...this.data[rowIndex]}; // Copy row data
    }
    this.showModal = true;
  }

  save() {
    debugger;
    // Update the original dataset
    const rowIndex = this.data.findIndex(
      (item) => item.id === this.editedRow?.id
    );
    if (rowIndex !== -1) {
      this.data[rowIndex] = {...this.editedRow}; // Save the changes
      this.updateDisplayedData(); // Refresh the displayed data
    } else {
      this.modalData['id'] = this.data.length + 1;
      this.data = [...this.data, this.modalData];
      this.updateDisplayedData();
    }
    this.showModal = false; // Close the modal
  }

  // Function to cancel adding a new row
  cancelAddRow() {
    this.showAddModal = false; // Close the modal without adding the row
  }

  removeRow(rowId) {
    this.data = this.data.filter((row) => row.id !== rowId); // Filter out the row by id
    this.updateDisplayedData(); // Refresh the displayed data after removal
    !!this.displayedData && this.handlePageChange('first');
  }

  render() {
    this.updateDisplayedData();

    return html`
      ${this.selectedRows.length !== 0
        ? html`
            <div class="delete-selected" @click="${this.removeSelectedRows}">
              - Delete Selected
            </div>
          `
        : null}
      ${this.showModal
        ? html`
            <div class="overlay" @click="${this.closeModal}"></div>

            <div class="modal">
              <div class="modal-header">
                ${this.editMode
                  ? translations.getTranslation('edit')
                  : translations.getTranslation('addRow')}
              </div>
              <!-- <h3>${this.editMode
                ? 'Edit Record'
                : 'Add New Record'}</h3> -->

              <div class="modal-body">
                ${this.editMode
                  ? Object.entries(this.editedRow || {})
                      .filter(
                        ([key]) => key !== 'id' || key !== 'actions'
                      ) /* Don't allow editing the id */
                      .map(
                        ([key, value]) => html`
                          <label>${translations.getTranslation(key)}:</label>
                          <input
                            type="text"
                            .value="${value}"
                            @input="${(e) =>
                              (this.editedRow[key] = e.target.value)}"
                          />
                        `
                      )
                  : this.headers.map((header) =>
                      header !== 'id' && header !== 'actions'
                        ? html`
                            <label
                              >${translations.getTranslation(header)}</label
                            >
                            <input
                              type="text"
                              class="${header}"
                              .value="${this.modalData[header] || ''}"
                              @input="${(e) => this.handleInput(e, header)}"
                              placeholder="Enter ${header}"
                            />
                          `
                        : null
                    )}
              </div>
              <div class="modal-footer">
                <button class="save" @click="${this.save}">
                  ${translations.getTranslation('save')}
                </button>
                <button
                  class="cancel"
                  @click="${() => (this.showModal = false)}"
                >
                  ${translations.getTranslation('cancel')}
                </button>
              </div>
            </div>
          `
        : ''}
      <!-- </form> -->

      <!-- Data Table -->
      ${!!this.data.length
        ? html`
            <table>
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      class="checkbox"
                      .checked="${this.selectAll}"
                      @change="${this.toggleSelectAll}"
                    />
                  </th>
                  ${this.headers.map((header) =>
                    header !== 'id' && header !== 'actions'
                      ? html`<th>${translations.getTranslation(header)}</th>`
                      : null
                  )}
                  <th>${translations.getTranslation('actions')}</th>
                </tr>
              </thead>
              <tbody>
                ${this.displayedData.map(
                  (row, rowIndex) => html`
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          .checked="${this.selectedRows.includes(row.id) ||
                          this.selectAll}"
                          @change="${() => this.toggleRowSelection(row.id)}"
                        />
                      </td>
                      ${Object.entries(row)
                        .filter(
                          ([key]) => key !== 'id' && key !== 'actions'
                        ) /* Exclude id from table display */
                        .map(([_, value]) => {
                          return html`<td>${value}</td>`;
                        })}
                      <td>
                        <icon-button
                          icon="fa-edit"
                          color="#ff6200"
                          size="14px"
                          @click=${() => this.editRow(row.id)}
                        ></icon-button>
                        <icon-button
                          icon="fa-trash"
                          color="#ff6200"
                          size="14px"
                          @click=${() => this.removeRow(row.id)}
                        ></icon-button>
                      </td>
                    </tr>
                  `
                )}
              </tbody>
            </table>

            <div class="pagination">
              <button
                class="left-last"
                @click="${() => this.handlePageChange('first')}"
                ?disabled="${this.currentPage === 1}"
              >
                <<
              </button>
              <button
                class="left-arrow"
                @click="${() => this.handlePageChange('previous')}"
                ?disabled="${this.currentPage === 1}"
              >
                <
              </button>
              ${this.currentLanguage === 'en'
                ? html` <span class="pagination-info"
                    >Page ${this.currentPage} of
                    ${Math.ceil(this.data.length / this.rowsPerPage)}</span
                  >`
                : html`
                    <span class="pagination-info">
                      ${'' +
                      Math.ceil(this.data.length / this.rowsPerPage) +
                      '. Sayfanın ' +
                      this.currentPage +
                      "'cisi"}
                    </span>
                  `}

              <button
                class="right-arrow"
                @click="${() => this.handlePageChange('next')}"
                ?disabled="${this.currentPage ===
                Math.ceil(this.data.length / this.rowsPerPage)}"
              >
                >
              </button>
              <button
                class="right-last"
                @click="${() => this.handlePageChange('last')}"
                ?disabled="${this.currentPage ===
                Math.ceil(this.data.length / this.rowsPerPage)}"
              >
                >>
              </button>
            </div>
          `
        : html` <empty-state
            message="No data to display"
            icon="📋"
          ></empty-state>`}
    `;
  }
}

customElements.define('data-table', DataTable);
