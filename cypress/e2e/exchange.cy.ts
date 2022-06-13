/// <reference types="cypress" />

describe('example to-do app', () => {
  before(() => {
    cy.wrap('').as('exchange')
  })

  beforeEach(() => {
    cy.visit('/')
  })

  it('displays exchange list correctly', function () {
    cy.intercept('**/api/v3/exchanges?*').as('getExchanges')
    cy.wait('@getExchanges').then(({ response: { statusCode, body } }) => {
      /** test list renders item equals to api response */
      expect(statusCode).to.equal(200)
      cy.wrap(body).should('not.be.null')
      cy.dataCy('exchange-row').should('have.length', body.length)

      /** check fist item render correctly */
      const firstItem = body[0]
      cy.wrap(firstItem.name).as('exchange')
      cy.get(`[data-id=exchange-${firstItem.id}]`).as('first')
      cy.get('@first').should('not.be.null')
      cy.get('@first').should('contain', firstItem.trust_score_rank)
      cy.get('@first').within(() => {
        cy.dataCy('name').should('contain', firstItem.name)
        cy.dataCy('rank').should('contain', firstItem.trust_score_rank)
        cy.dataCy('country').should('contain', firstItem.country)
        cy.get('a').last().should('have.text', firstItem.url).and('have.attr', 'href', firstItem.url)
      })
    })
  })

  it('load more data correctly', function () {
    cy.intercept('**/api/v3/exchanges?*').as('getExchanges')
    cy.log(this.exchange)
    cy.wait('@getExchanges').then(({ response: { statusCode, body } }) => {
      /** test list renders item equals to api response */
      expect(statusCode).to.equal(200)
      cy.wrap(body).should('not.be.null')

      let firstCount = body.length

      if (firstCount >= 20) {
        cy.intercept('**/api/v3/exchanges?*').as('getExchangesMore')

        cy.dataCy('load-more').as('loadMoreBtn')
        cy.get('@loadMoreBtn').should('not.be.null')
        cy.get('@loadMoreBtn').click()
        cy.wait('@getExchangesMore').then(({ response: { body } }) => {
          if (body.length) {
            cy.dataCy('exchange-row').should('have.length', body.length + firstCount)
          }
        })
      }
    })
  })

  it('display exchange detail page correctly', function () {
    cy.intercept(`**/api/v3/exchanges/${this.exchange}`).as('getExchangeInfo')
    cy.visit(`/exchange/${this.exchange}`)
    cy.wait('@getExchangeInfo').then(({ response: { statusCode, body } }) => {
      expect(statusCode).to.equal(200)
      cy.wrap(body).should('not.be.null')

      cy.dataCy('exchange-name').should('contain', body.name)
      cy.dataCy('exchange-rank').should('contain', body.trust_score_rank)
      cy.dataCy('exchange-established').should('contain', body.year_established)

      if (body.facebook_url) {
        cy.dataCy('facebook').should('contain', body.facebook_url)
      }

      if (body.telegram_url) {
        cy.dataCy('telegram').should('contain', body.telegram_url)
      }

      if (body.reddit_url) {
        cy.dataCy('reddit').should('contain', body.reddit_url)
      }

      if (body.slack_url) {
        cy.dataCy('slack').should('contain', body.slack_url)
      }
    })
  })
})
