describe("example weather app", () => {
  beforeEach(() => {
    //before each test, launch the application and wait for 'adservice' to complete
    //this provides enough wait time for application to finish initial load
    cy.intercept(
      "https://adservice.google.com/adsid/integrator.js?domain=weather.com"
    ).as("adservice");
    cy.visit("");
    //default timeout is midified to 20 seconds, to provide enough time for api to finish executing
    cy.wait("@adservice", { timeout: 20000 }).then((interception) => {});
  });

  it("Check privacy policy has section 14 and verify its content", () => {
    //Click on hambugerMenu
    cy.get("button[data-testid='hamburgerMenu']>span").click({ force: true });
    //Click on Privacy Policy Menu
    cy.get("[data-testid='privacyPolicy']").click();
    //Click on 14th Section
    cy.get(".toc > li:nth-child(14)").click();
    //iterate each paragraphs in this section and assert
    cy.get("#lgpd-notice-new > p").each((item, index) => {
      cy.readFile("cypress\\fixtures\\section14.json")
        .its(index)
        .should("eq", item.text());
    });

    //iterate 2 subsections in 14th section and assert
    cy.get("#lgpd-notice-new >ul> li").each((item, index) => {
      cy.readFile("cypress\\fixtures\\section14_sub.json")
        .its(index)
        .should("eq", item.text());
    });
  });
});
