describe("testing url", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173");
    cy.intercept("http://omdbapi.com/*");
  });
});

describe("Testing input and submit", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "http://omdbapi.com/*", {
      body: {
        Search: [
          {
            Title: "Harry Potter 1",
            imdbID: "bsdsds",
            Type: "dddd",
            Poster: "fdjf",
            Year: "1990",
          },

          {
            Title: "Harry Potter 2",
            imdbID: "bsdsds",
            Type: "dddd",
            Poster: "fdjf",
            Year: "2001",
          },

          {
            Title: "Harry Potter 3",
            imdbID: "bsdsds",
            Type: "dddd",
            Poster: "fdjf",
            Year: "2001",
          },
        ],
      },
    }).as("apiCall");
  });

  it("Input should accept value and value should be submitted", () => {
    cy.get("#searchText").type("Harry Potter");

    cy.get("#searchText").should("have.value", "Harry Potter");
    cy.get("button").click();
  });

  it("movie-container should have movie elements after submit", () => {
    cy.get("#searchText").type("Harry Potter");

    cy.get("#searchText").should("have.value", "Harry Potter");
    cy.get("button").click();
    cy.get("div#movie-container").find("div.movie").should("exist");
    cy.get("div#movie-container").find("div.movie").should("have.length", 3);
  });

  it("should get a certain amount of objects on api call", () => {
    cy.get("#searchText").type("Harry Potter");

    cy.get("#searchText").should("have.value", "Harry Potter");
    cy.get("button").click();

    cy.wait("@apiCall").its("request.url").should("contain", "Harry%20Potter");
  });

  it("should give a status code of 500", () => {
    cy.intercept("GET", "http://omdbapi.com/*", {
      statusCode: 500,
      body: {
        Search: [
          {
            Title: "Harry Potter 1",
            imdbID: "bsdsds",
            Type: "dddd",
            Poster: "fdjf",
            Year: "1990",
          },

          {
            Title: "Harry Potter 2",
            imdbID: "bsdsds",
            Type: "dddd",
            Poster: "fdjf",
            Year: "2001",
          },

          {
            Title: "Harry Potter 3",
            imdbID: "bsdsds",
            Type: "dddd",
            Poster: "fdjf",
            Year: "2001",
          },
        ],
      },
    });

    cy.get("#searchText").type("Harry Potter");

    cy.get("button").click();

    cy.get("div#movie-container").find("div.movie").should("have.length", 0);

    cy.get("p").should("contain", "Inga sökresultat att visa");

    //lägga till text som säger inga sökresultat att visas
  });
});
