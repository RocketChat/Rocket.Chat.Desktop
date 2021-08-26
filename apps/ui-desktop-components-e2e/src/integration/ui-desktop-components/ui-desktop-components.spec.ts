describe('ui-desktop-components: UiDesktopComponents component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=uidesktopcomponents--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to UiDesktopComponents!');
    });
});
