
describe('OrangeHRM Login Feature - Automated Test', () => {

  const baseUrl = 'https://opensource-demo.orangehrmlive.com/';

  beforeEach(() => {
    cy.visit(baseUrl);
    cy.wait(3000);
  });

  it('TC01 - Login dengan username dan password valid', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.wait(2000)
    cy.url().should('include', '/dashboard');
  });

  it('TC02 - Login menggunakan tombol Enter di keyboard', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123{enter}');
    cy.url().should('include', '/dashboard/index');
  });

  it('TC03 - Tidak bisa login dengan password salah', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('salah123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC04 - Tidak bisa login dengan username kosong', () => {
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-group__message').should('contain', 'Required');
  });

  it('TC05 - Tidak bisa login dengan password kosong', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-group__message').should('contain', 'Required');
  });

  it('TC06 - Menampilkan pesan error untuk username dan password kosong', () => {
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-input-group__message').should('contain', 'Required');
  });

  it('TC07 - Username case-sensitive (ADMIN% vs Admin)', () => {
    cy.get('input[name="username"]').type('ADMIN%');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get('.oxd-alert-content-text', {timeout: 10000}).should('contain', 'Invalid credentials');
  });

  it('TC08 - Password case-sensitive (Admin123 vs admin123)', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('Admin123');
    cy.get('button[type="submit"]').click();
    cy.get('.oxd-alert-content-text').should('contain', 'Invalid credentials');
  });

  it('TC09 - Menampilkan nama pengguna setelah login berhasil', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.get('.oxd-userdropdown-name', {timeout:10000}).should('contain', 'idan schmidt');
  });

  it('TC10 - Tetap login setelah refresh halaman dashboard', () => {
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard/index');
    cy.reload();
    cy.url().should('include', '/dashboard/index');
  });

});
