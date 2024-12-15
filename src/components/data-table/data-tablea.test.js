import {expect, fixture, html} from '@open-wc/testing';
import './data-table.js';

describe('DataTable Component', () => {
  it('should render a table with the correct columns', async () => {
    const data = [
      {id: 1, name: 'John Doe', age: 30},
      {id: 2, name: 'Jane Smith', age: 25},
    ];
    const el = await fixture(
      html`<data-table
        .data="${data}"
        .columns="${['id', 'name', 'age']}"
      ></data-table>`
    );

    const headers = el.shadowRoot.querySelectorAll('thead th');
    expect(headers.length).to.equal(3);
    expect(headers[0].textContent).to.equal('id');
    expect(headers[1].textContent).to.equal('name');
    expect(headers[2].textContent).to.equal('age');
  });

  it('should render rows with correct data', async () => {
    const data = [
      {id: 1, name: 'John Doe', age: 30},
      {id: 2, name: 'Jane Smith', age: 25},
    ];
    const el = await fixture(
      html`<data-table
        .data="${data}"
        .columns="${['id', 'name', 'age']}"
      ></data-table>`
    );

    const rows = el.shadowRoot.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(2);

    const firstRowCells = rows[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent).to.equal('1');
    expect(firstRowCells[1].textContent).to.equal('John Doe');
    expect(firstRowCells[2].textContent).to.equal('30');
  });

  it('should add a new row', async () => {
    const data = [
      {id: 1, name: 'John Doe', age: 30},
      {id: 2, name: 'Jane Smith', age: 25},
    ];
    const el = await fixture(
      html`<data-table
        .data="${data}"
        .columns="${['id', 'name', 'age']}"
      ></data-table>`
    );

    el.addRow({id: 3, name: 'New User', age: 28});
    await el.updateComplete;

    const rows = el.shadowRoot.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(3);

    const lastRowCells = rows[2].querySelectorAll('td');
    expect(lastRowCells[0].textContent).to.equal('3');
    expect(lastRowCells[1].textContent).to.equal('New User');
    expect(lastRowCells[2].textContent).to.equal('28');
  });

  it('should delete a selected row', async () => {
    const data = [
      {id: 1, name: 'John Doe', age: 30},
      {id: 2, name: 'Jane Smith', age: 25},
    ];
    const el = await fixture(
      html`<data-table
        .data="${data}"
        .columns="${['id', 'name', 'age']}"
      ></data-table>`
    );

    const rowToDelete = el.shadowRoot.querySelector('tbody tr');
    const checkbox = rowToDelete.querySelector('input[type="checkbox"]');
    checkbox.click();

    el.deleteSelectedRows();
    await el.updateComplete;

    const rows = el.shadowRoot.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(1);
    expect(rows[0].querySelector('td').textContent).to.equal('2');
  });

  it('should handle pagination correctly', async () => {
    const data = Array.from({length: 25}, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      age: 20 + i,
    }));
    const el = await fixture(
      html`<data-table
        .data="${data}"
        .columns="${['id', 'name', 'age']}"
        .rowsPerPage="${10}"
      ></data-table>`
    );

    // İlk sayfa kontrolü
    const rows = el.shadowRoot.querySelectorAll('tbody tr');
    expect(rows.length).to.equal(10);
    expect(rows[0].querySelector('td').textContent).to.equal('1');

    // İkinci sayfaya geçiş
    const nextButton = el.shadowRoot.querySelector('button.next');
    nextButton.click();
    await el.updateComplete;

    const updatedRows = el.shadowRoot.querySelectorAll('tbody tr');
    expect(updatedRows.length).to.equal(10);
    expect(updatedRows[0].querySelector('td').textContent).to.equal('11');
  });
});
