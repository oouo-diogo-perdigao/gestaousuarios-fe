describe("No records on the database.", () => {
  /////////////////////////
  //  EMPTY LIST
  /////////////////////////
  describe("EMPTY LIST", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });

    it("should show an info message when the database is empy", () => {
      cy.get(".MuiTypography-h4").contains("No User yet");
      cy.get(".MuiTypography-body1").contains("Do you want to add one?");
    });
  });
});

describe("Users CRUD operations", () => {
  /////////////////////////
  //  CREATE NEW USER
  /////////////////////////
  describe("CREATE AN USER", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });

    it("should open the New User form by clicking the central button CREATE.", () => {
      cy.get(".RaEmpty-toolbar > .MuiButtonBase-root").click();
      cy.get(".css-w4sorp-RaConfigurable-root > :nth-child(1) > span").contains(
        "Create User"
      );
    });

    it("should register a New User by clicking the button SAVE.", () => {
      cy.get(".RaCreateButton-root").click();
      cy.get("#name").type("Usuário de Teste 1");
      cy.get("#email").type("usertest1@test.com");
      cy.get("#password").type("test123-1");

      cy.get(".RaToolbar-defaultToolbar > .MuiButtonBase-root").click();

      cy.contains("Usuário de Teste 1");
      cy.contains("usertest1@test.com");
      cy.contains("test123-1");
    });

    it("should create a new user by pressing ENTER.", () => {
      cy.get(".RaCreateButton-root").click();
      cy.get("#name").type("Usuário de Teste 2");
      cy.get("#email").type("usertest2@test.com");
      cy.get("#password").type("test321");

      cy.get("#password").type("{enter}");
      cy.wait(500);

      cy.contains("Usuário de Teste 2");
      cy.contains("usertest2@test.com");
      cy.contains("test321");
    });
  });

  /////////////////////////
  //  LIST USERS
  /////////////////////////
  describe("USER LISTING", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });

    it("should list all the users", () => {
      cy.contains("Usuário de Teste 1");
      cy.contains("usertest1@test.com");
      cy.contains("test123-1");
    });
  });

  /////////////////////////
  //  EDIT USER
  /////////////////////////
  describe("EDIT USER", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });

    it("should edit an users", () => {
      cy.get(
        ".RaDatagrid-rowEven > :nth-child(6) > .MuiButtonBase-root"
      ).click();
      cy.get("#name").clear().type("Teste Edição");
      cy.get("#email").clear().type("testeedicao@test.com");
      cy.get("#password").clear().type("test-edicao321");

      cy.get(".RaToolbar-defaultToolbar > .MuiButton-contained").click();

      cy.contains("Teste Edição");
      cy.contains("testeedicao@test.com");
      cy.contains("test-edicao321");
    });
  });

  /////////////////////////
  //  DELETE USER
  /////////////////////////
  describe("DELETE USER", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });

    it("should delete an users", () => {
      cy.get(
        ".RaDatagrid-rowEven > :nth-child(6) > .MuiButtonBase-root"
      ).click();
      cy.get(":nth-child(7) > .MuiButtonBase-root").click();
    });
  });
});
