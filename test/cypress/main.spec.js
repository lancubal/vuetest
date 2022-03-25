import { cy } from "date-fns/locale"

describe('Main', () => {

    it('muestra titulo', () => {
      cy.visit('/')
      cy.contains('h1', 'Visor de expedientes electronicos:')
    }),

    it('login', () => {
      let login = {user : 'IRAMIREZ', pass : 'Testing2021'}
      cy.visit('/')
      cy.get('user').within(() => {
        cy.get('input').type(login.user)
      })
      cy.get('password').within(() => {
        cy.get('input').type(login.pass)
      })
      cy.get('boton-login').click()
    })
  })