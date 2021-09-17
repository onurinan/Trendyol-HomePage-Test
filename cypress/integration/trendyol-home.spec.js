/// <reference types='cypress' />

const TRENDYOL_HOMEPAGE_URL = "https://www.trendyol.com/";

describe("homepage-test", () => {
  beforeEach(() => {
    cy.visit(TRENDYOL_HOMEPAGE_URL);
    cy.get(".modal-close").click();
  });

  it("should open trendyol.com's homepage", () => {
    const currentUrl = cy.url();

    currentUrl.should("equal", TRENDYOL_HOMEPAGE_URL);
  });

  it("should have a title on trendyol's homepage", () => {
    const title = cy.title();

    title
      .should("not.be.empty")
      .and(
        "equal",
        "En Trend Ürünler Türkiye'nin Online Alışveriş Sitesi Trendyol'da"
      )
      .and("have.length.greaterThan", 5);
  });

  it("should scroll down 500px on trendyol.com's homepage", () => {
    cy.get(".scrool-to-up").should("not.be.exist");

    cy.scrollTo(0, 500);
    cy.get(".scroll-to-up").should("be.visible");

    cy.get(".scroll-to-up").click();
    cy.get(".scroll-to-up").should("not.be.exist");
  });

  it("should scroll down 500px on trendyol.com's homepage and window's scrollY attribute should be 500px", () => {
    cy.scrollTo(0, 500);

    cy.window().its("scrollY").should("equal", 500);
  });

  it("should have link to the female search page on navigation menu's first item", () => {
    cy.get(".tab-link > .category-header")
      .first()
      .should("have.attr", "href", "/butik/liste/1/kadin");
  });

  it("should contain 'Kadın' text in navigation on homepage", () => {
    cy.get(".main-nav").contains("Kadın");
  });

  it("should have links on navbar items", () => {
    cy.get(".tab-link").each((el) => {
      const text = el.text();
      assert.isNotEmpty(text);
    });
  });

  it("should open male gender boutique-list page when second navbar item clicked", () => {
    cy.get(".tab-link:nth-child(2) > .category-header").click();

    const currentUrl = cy.url();
    currentUrl.should("equal", "https://www.trendyol.com/butik/liste/2/erkek");
  });

  it("should redirect to given freetextsearch when search box is filled and submitted", () => {
    cy.get(".search-box").type("elbise");
    cy.get(".search-icon").click();
    cy.get(".search-icon").click();

    const currentUrl = cy.url();
    currentUrl.should(
      "equal",
      "https://www.trendyol.com/sr?q=elbise&qt=elbise&st=elbise&os=1"
    );
  });
});
