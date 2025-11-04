class LoginPage {
  usernameField = 'input[name="username"]';
  passwordField = 'input[name="password"]';
  loginButton = 'button[type="submit"]';
  errorMessage = '.oxd-alert-content-text';
  requiredMessage = '.oxd-input-group__message';
  profileName = '.oxd-userdropdown-name';

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/');
    cy.wait(2000);
  }

  login(username, password) {
    if (username) cy.get(this.usernameField).type(username);
    if (password) cy.get(this.passwordField).type(password);
    cy.get(this.loginButton).click();
  }

  verifyDashboard() {
    cy.url().should('include', '/dashboard');
  }

  verifyErrorMessage(message) {
    cy.get(this.errorMessage).should('contain', message);
  }

  verifyRequiredMessage() {
    cy.get(this.requiredMessage).should('contain', 'Required');
  }

  verifyProfileName(name) {
    cy.get(this.profileName, { timeout: 10000 }).should('contain', name);
  }
}

export default LoginPage;
