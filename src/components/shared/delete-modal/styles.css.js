import { css } from "lit";

export const deleteModalStyles = css`
  :host {
    display: block;
    font-family: Arial, sans-serif;
  }
  .modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    justify-content: center;
    align-items: center;
  }
  .modal.show {
    display: flex;
  }
  .modal-content {
    background: #fff;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    text-align: center;
    padding: 16px;
    position: relative; /* X butonu için pozisyonlama */
  }
  .close-icon {
    /* position: absolute; */
    top: 10px;
    right: 10px;
    font-size: 2em;
    cursor: pointer;
  }
  .header {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    color: #ff6600;
    font-size: 1.2em;
    margin-bottom: 8px;
  }
  p {
    margin: 12px 0;
    font-size: 0.9em;
    display: flex;
  }
  .actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 18px;
    gap: 6px;
  }
  button {
    cursor: pointer;
    font-size: 1em;
    border-radius: 4px;
    border: none;
    padding: 8px 16px;
  }
  .proceed {
    background: #ff6600;
    color: white;
  }
  .cancel {
    background: transparent;
    color: #555;
    border: 1px solid #ccc;
  }
`;
