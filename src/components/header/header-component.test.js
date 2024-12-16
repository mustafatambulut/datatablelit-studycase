import {expect, fixture, html} from '@open-wc/testing';
import './header-component.js';


describe('Header Component', () => {
  it('should render with default title', async () => {
    const el = await fixture(html`<header-component></header-component>`);
    const title = el.shadowRoot.querySelector('h1');
    expect(title.textContent).to.equal('Header Title'); 
  });

  it('should render with a custom title', async () => {
    const el = await fixture(
      html`<header-component title="Custom Title"></header-component>`
    );
    const title = el.shadowRoot.querySelector('h1');
    expect(title.textContent).to.equal('Custom Title'); 
  });

  it('should render icons', async () => {
    const icons = [
      {name: 'home', action: () => console.log('Home clicked')},
      {name: 'settings', action: () => console.log('Settings clicked')},
    ];

    const el = await fixture(
      html`<header-component .icons="${icons}"></header-component>`
    );
    const iconElements = el.shadowRoot.querySelectorAll('.icon');
    expect(iconElements.length).to.equal(icons.length); 
    expect(iconElements[0].getAttribute('title')).to.equal('home'); 
  });

  it('should trigger action on icon click', async () => {
    let clicked = false;
    const icons = [{name: 'test', action: () => (clicked = true)}];
    const el = await fixture(
      html`<header-component .icons="${icons}"></header-component>`
    );

    const icon = el.shadowRoot.querySelector('.icon');
    icon.click();
    expect(clicked).to.be.true; 
  });

  it('should project slot content', async () => {
    const el = await fixture(
      html`<header-component
        ><div id="slot-test">Extra Content</div></header-component
      >`
    );
    const slotContent = el.querySelector('#slot-test');
    expect(slotContent).to.exist; 
    expect(slotContent.textContent).to.equal('Extra Content'); 
  });
});
