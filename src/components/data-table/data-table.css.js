import {css} from 'lit';

export const dataTableStyles = css`
  table {
    background-color: white;
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    font-size: 14px;
  }

  thead th {
    padding: 24px;
    color: #ff6200;
  }

  th,
  td {
    border: 1px solid #efefef;
    padding: 24px;
    text-align: left;
  }
  button {
    margin: 10px 0;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
  }

  .modal-header {
    font-size: 1.2em;
    margin-bottom: 16px;
  }
  .modal-body {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  label {
    font-weight: bold;
    font-size: 0.9em;
    margin-bottom: 4px;
  }
  input {
    width: 93%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 12px;
  }
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
    gap: 12px;
  }
  button {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button.save {
    background-color: #007bff;
    color: white;
  }
  button.cancel {
    background-color: #f2f2f2;
    color: black;
    margin-right: 8px;
  }

  .modal {
    display: flex;
    flex-direction: column;
    background-color: white;
    border: 1px solid #ccc;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    border-radius: 8px;
    padding: 16px;
    width: 400px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  .language-switcher {
    margin-bottom: 10px;
  }
  .pagination {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }
  .delete-selected {
    color: #ff6200;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .left-arrow[disabled] {
    color: #b5b5b5;
  }
  .left-arrow {
    color: #ff6200;
    background: transparent;
    border: transparent;
    font-size: x-large;
  }
  .right-arrow[disabled] {
    color: #b5b5b5;
  }
  .right-arrow {
    color: #ff6200;
    background: transparent;
    border: transparent;
    font-size: x-large;
  }
  .pagination-info {
    display: flex;
    align-items: center;
  }

  .right-last {
    background: transparent;
    border: transparent;
    font-size: x-large;
  }

  .left-last {
    background: transparent;
    border: transparent;
    font-size: x-large;
  }
`;
