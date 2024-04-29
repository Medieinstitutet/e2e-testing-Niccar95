describe("testing url", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173");
  });
});

describe("Testing input and submit", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Input should accept value and value should be submitted", () => {
    cy.get("input")
      .type("Harry Potter{enter}")
      .should("have.value", "Harry Potter");
  });
});
