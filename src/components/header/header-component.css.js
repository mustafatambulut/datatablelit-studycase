import {css} from 'lit';

export const headerStyles = css`
  :host {
    display: block;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: 'white';
    color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  h1 {
    margin: 0;
    font-size: 20px;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: white;
    color: 'white';
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .icon:hover {
    background-color: #005a9e;
    color: white;
  }

  .icon-logo {
    width: 40px; /* İkon boyutu */
    height: 40px;
    background-image: url('../../src/assets/images/icons/ing_logo.png');
    background-size: contain;
    background-repeat: no-repeat;
  }

  .icon-en {
    width: 40px; /* İkon boyutu */
    height: 40px;
    background-image: url('../../src/assets/images/icons/en.png');
    background-size: contain;
    background-repeat: no-repeat;
  }

  .icon-tr {
    width: 40px; /* İkon boyutu */
    height: 40px;
    background-image: url('../../src/assets/images/icons/tr.jpg');
    background-size: contain;
    background-repeat: no-repeat;
  }

  .icon-tr-default {
    background-size: cover !important;
    width: 50px !important;
    height: 28px !important;
  }

  .header-right {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  .header-right .element {
    color: #ff6200;
    cursor: pointer;
  }

  .header-left {
    display: flex;
    gap: 8px;
    text-align: center;
    align-items: center;
  }

  .header-left span {
    color: black;
    font-weight: 700;
    font-size: medium;
  }

  slot {
    margin-left: 20px;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown-item {
    /* padding: 12px 16px; */
    padding: 4px;
    display: flex;
    justify-content: center;
    margin-top: 6px;
    margin-bottom: -14px;
    align-items: center;
    cursor: pointer;
    /* color: black; */
    text-decoration: none;
  }
  /* 
    .dropdown-item img {
      margin-right: 10px;
      width: 20px;
      height: 20px;
    } */
`;
