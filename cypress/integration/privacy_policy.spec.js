describe("example weather app", () => {
  beforeEach(() => {
    cy.intercept(
      "https://adservice.google.com/adsid/integrator.js?domain=weather.com"
    ).as("manifest");

    cy.visit("");

    cy.wait("@manifest", { timeout: 20000 }).then((interception) => {});
  });

  it("Check privacy policy has section 14 and verify its content", () => {
    cy.get("button[data-testid='hamburgerMenu']>span").click({ force: true });
    // cy.get("button[data-testid='hamburgerMenu']>span").click({ force: true });
    cy.get("[data-testid='privacyPolicy']").click();
    cy.get(".toc > li:nth-child(14)").click();
    var section14Text;
    cy.get("#lgpd-notice-new > p").each((item, index) => {
      cy.readFile("cypress\\fixtures\\section14.json")
        .its(index)
        .should("eq", item.text());
    });

    cy.get("#lgpd-notice-new >ul> li").each((item, index) => {
      cy.readFile("cypress\\fixtures\\section14_sub.json")
        .its(index)
        .should("eq", item.text());
    });
  });
});
