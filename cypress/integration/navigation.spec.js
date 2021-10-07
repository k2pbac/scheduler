describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });

  it("should book an interview", () => {
    cy.visit("/");

    cy.get(".appointment:nth-of-type(2)")
      .click()
      .then(() => {
        cy.get("input")
          .type("Kris")
          .get(".interviewers__item:nth-of-type(1)")
          .click();

        cy.contains("Save").click();
      });
  });
  it("should edit an interview", () => {
    cy.visit("/");

    cy.get(".appointment__actions-button")
      .eq(0)
      .click({ force: true })
      .then(() => {
        cy.get("input")
          .clear()
          .type("Gregory Dimash")
          .get(".interviewers__item:nth-of-type(2)")
          .click();

        cy.contains("Save").click();
      });
  });
  it("should cancel an interview", () => {
    cy.visit("/");

    cy.get(".appointment__actions-button")
      .eq(1)
      .click({ force: true })
      .then(() => {
        cy.contains("Confirm").click();
      });
  });
});
