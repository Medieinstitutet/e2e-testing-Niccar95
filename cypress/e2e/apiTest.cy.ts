describe("testing real api", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173");

    cy.get("#searchText").type("Harry Potter");

    cy.get("#searchText").should("have.value", "Harry Potter");
    cy.get("button").click();

    cy.get("div#movie-container").should("have.length.greaterThan", 0);
  });
});
