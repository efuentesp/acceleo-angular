
describe('Prueba de Departamento', function() {
	//This turn off uncaught errors 
	Cypress.on('uncaught:exception', (err, runnable) => {
	return false
	})

	beforeEach(function(){
		cy.visit(Cypress.env('api_server'))
		cy.screenshot('login_1')
		cy.get('input[name="username"]').type(Cypress.env('user'))
		cy.get('input[name="password"]').type(Cypress.env('password'))
		cy.screenshot('login_2')
		cy.get('button').contains('Login').click()
		cy.url().should('contain', 'admin')
		cy.screenshot('login_3')
	})

	it('1. Crear una Aplicaci?n nueva con datos incompletos', function() {		
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
					cy.get('li').contains('a', 'Agregar Application').click()
			})
		})
		cy.url().should('contain', '/createapplication')
		cy.screenshot('paso_1_1')
		cy.get('input#code').type('test_application')
		cy.get('button').contains('Agregar').should('be.disabled')
		cy.screenshot('paso_1_2')
	})

	it('2. Crear una Aplicaci?n nueva con datos completos', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Agregar Application').click()
			})
		})
		cy.url().should('contain', '/createapplication')
		cy.screenshot('paso_2_1')
		cy.get('input#code').clear().type('test_application')
		cy.get('input#name').type('Test Application')
		cy.screenshot('paso_2_2')
		cy.get('button').contains('Agregar').should('be.enabled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Application save successfully.')
		cy.wait(1000)
		cy.screenshot('paso_2_3', {capture:'viewport'})
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
	})

	it('3. Editar la Aplicaci?n con datos incompletos', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.wait(1000)
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Administrar Application').click()
			})
		})
		cy.url().should('contain', '/manageapplication')
		cy.get('table>tbody>').contains('tr', 'Test Application').within(() => {
			cy.get('button>span.fa.fa-pencil').click()
		})
		cy.url().should('contain', '/editapplication')
		cy.screenshot('paso_3_1')
		cy.get('input#code').clear()
		cy.get('button').contains('Modificar').should('be.disabled')
		cy.screenshot('paso_3_2')
	})
	
	it('4. Editar la Aplicaci?n creada con datos completos', function() {
		cy.get('div#sidebar-menu').within(() => {
				cy.get('div.menu_section').contains('General').as('menu')
				cy.get('@menu').parent().within(() => {
					cy.get('li').contains('a', 'Administrar Application').click()
			})
		})
		cy.url().should('contain', '/manageapplication')
			cy.get('table>tbody>').contains('tr', 'Test Application').within(() => {
				cy.get('button>span.fa.fa-pencil').click()
		})
		cy.url().should('contain', '/editapplication')
		cy.screenshot('paso_4_1')
		cy.get('input#code').clear().type('test_application_edited')
		cy.get('input#name').clear().type('Test Application Edited')
		cy.screenshot('paso_4_2')
		cy.get('button').contains('Modificar').should('be.enabled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Application save successfully.')
		cy.wait(1000)
		cy.screenshot('paso_4_3', {capture:'viewport'})
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
	})
	
	it('5. Crear un Modulo asociado a la Aplicaci?n con datos incompletos', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Agregar Module').click()
			})
		})
		cy.url().should('contain', '/createmodule')
		cy.get('div').contains('Aplicaci?n').parent().within(() => {
			cy.get('button[data-target="#modalApplication"]').click()
		})
		cy.wait(1000)
		cy.screenshot('paso_5_1')
		cy.get('div#modalApplication').within(() => {
			cy.get('table>tbody').contains('tr', 'Test Application Edited').within(() => {
				cy.get('input[type="checkbox"]').click()
			})
			cy.get('button').contains('Elegir').click()
		})
		cy.get('button').contains('Agregar').should('be.disabled')
		cy.screenshot('paso_5_2')
	})
	
	it('6. Crear un Modulo asociado a la Aplicaci?n con datos completos', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Agregar Module').click()
			})
		})
		cy.url().should('contain', '/createmodule')
		cy.get('div').contains('Aplicaci?n').parent().within(() => {
			cy.get('button[data-target="#modalApplication"]').click()
		})
		cy.wait(1000)
		cy.screenshot('paso_6_1')
		cy.get('div#modalApplication').within(() => {
			cy.get('table>tbody').contains('tr', 'Test Application Edited').within(() => {
				cy.get('input[type="checkbox"]').click()
			})
			cy.get('button').contains('Elegir').click()
		})
		cy.get('input#code').type('test_module')
		cy.get('input#name').type('Test Module')
		cy.screenshot('paso_6_2')
		cy.get('button').contains('Agregar').should('be.enabled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Module save successfully.')
		cy.wait(1000)
		cy.screenshot('paso_6_3', {capture:'viewport'})
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
	})
	
	it('7. Editar el Modulo con datos incompletos, validar que marque error', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Administrar Module').click()
			})
		})
		cy.url().should('contain', '/managemodule')
		cy.get('table>tbody>').contains('tr', 'Test Module').within(() => {
			cy.get('button>span.fa.fa-pencil').click()
		})
		cy.url().should('contain', '/editmodule')
		cy.screenshot('paso_7_1')
		cy.get('input#code').clear()
		cy.get('button').contains('Modificar').should('be.disabled')
		cy.screenshot('paso_7_2')
	})
	
	it('8. Editar el Modulo con datos completos, validar que se edit?', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Administrar Module').click()
			})
		})
		cy.url().should('contain', '/managemodule')
		cy.get('table>tbody>').contains('tr', 'Test Module').within(() => {
			cy.get('button>span.fa.fa-pencil').click()
		})
		cy.url().should('contain', '/editmodule')
		cy.screenshot('paso_8_1')
		cy.get('input#code').clear().type('test_module_edited')
		cy.get('input#name').clear().type('Test Module Edited')
		cy.screenshot('paso_8_2')
		cy.get('button').contains('Modificar').should('be.enabled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Module save successfully.')
		cy.wait(1000)
		cy.screenshot('paso_8_3', {capture:'viewport'})
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()	
	})
	
	it('9. Crear un Men? asociado al Modulo con datos incompletos, validar que marque error', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Agregar Menu').click()
			})
		})
		cy.url().should('contain', '/createmenu')
		cy.get('div').contains('M?dulo').parent().within(() => {
			cy.get('button[data-target="#modalModule"]').click()
		})
		cy.wait(1000)
		cy.screenshot('paso_9_1')
		cy.get('div#modalModule').within(() => {
			cy.get('table>tbody').contains('tr', 'Test Module Edited').within(() => {
				cy.get('input[type="checkbox"]').click()
			})
			cy.get('button').contains('Elegir').click()
		})
		cy.get('input#code').clear().type('test_menu')
		cy.screenshot('paso_9_2')
		cy.get('button').contains('Agregar').should('be.disabled')
		cy.screenshot('paso_9_3')
	})
	
	it('10. Crear un Men? asociado al Modulo con datos completos, validar que se cre?', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Agregar Menu').click()
			})
		})
		cy.url().should('contain', '/createmenu')
		cy.get('div').contains('M?dulo').parent().within(() => {
			cy.get('button[data-target="#modalModule"]').click()
		})
		cy.wait(1000)
		cy.screenshot('paso_10_1')
		cy.get('div#modalModule').within(() => {
			cy.get('table>tbody').contains('tr', 'Test Module Edited').within(() => {
				cy.get('input[type="checkbox"]').click()
			})
			cy.get('button').contains('Elegir').click()
		})
		cy.get('input#code').clear().type('test_menu')
		cy.get('input#path').clear().type('Test Menu')
		cy.screenshot('paso_10_2')
		cy.get('button').contains('Agregar').should('be.enabled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Menu save successfully.')
		cy.wait(1000)
		cy.screenshot('paso_10_3', {capture:'viewport'})
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
	})
	
	it('11. Editar el Men? creado con datos incompletos, validar que marque error', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Administrar Menu').click()
			})
		})
		cy.url().should('contain', '/managemenu')
		cy.get('table>tbody>').contains('tr', 'Test Menu').within(() => {
			cy.get('button>span.fa.fa-pencil').click()
		})
		cy.url().should('contain', '/editmenu')
		cy.screenshot('paso_11_1')
		cy.get('input#code').clear()
		cy.get('input#path').clear()
		cy.get('button').contains('Modificar').should('be.disabled')
		cy.screenshot('paso_11_2')
	})
	
	it('12. Editar el Men? creado con datos completos, validar que se edit?.', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Administrar Menu').click()
			})
		})
		cy.url().should('contain', '/managemenu')
		cy.get('table>tbody>').contains('tr', 'Test Menu').within(() => {
			cy.get('button>span.fa.fa-pencil').click()
		})
		cy.url().should('contain', '/editmenu')
		cy.screenshot('paso_12_1')
		cy.get('input#code').clear().type('test_menu_edited')
		cy.get('input#path').clear().type('Test Menu Edited')
		cy.screenshot('paso_12_2')
		cy.get('button').contains('Modificar').should('be.enabled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Menu save successfully.')
		cy.wait(1000)
		cy.screenshot('paso_12_3', {capture:'viewport'})
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
	})
	
	it('13. Crear un Servicio Funcional con datos incompletos, validar que marque error.', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Agregar Functionalservice').click()
			})
		})
		cy.url().should('contain', '/createfunctionalservice')
		cy.get('div').contains('Men?').parent().within(() => {
			cy.get('button[data-target="#modalMenu"]').click()
		})
		cy.wait(1000)
		cy.screenshot('paso_13_1')
		cy.get('div#modalMenu').within(() => {
			cy.get('table>tbody').contains('tr', 'Test Menu Edited').within(() => {
				cy.get('input[type="checkbox"]').click()
			})
			cy.get('button').contains('Elegir').click()
		})
		cy.get('button').contains('Agregar').should('be.disabled')
		cy.screenshot('paso_13_2')
	})
	
	it('14. Crear un Servicio Funcional con datos completos, validar que se cre?.', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Agregar Functionalservice').click()
			})
		})
		cy.url().should('contain', '/createfunctionalservice')
		cy.get('div').contains('Men?').parent().within(() => {
			cy.get('button[data-target="#modalMenu"]').click()
		})
		cy.wait(1000)
		cy.screenshot('paso_14_1')
		cy.get('div#modalMenu').within(() => {
			cy.get('table>tbody').contains('tr', 'Test Menu Edited').within(() => {
				cy.get('input[type="checkbox"]').click()
			})
			cy.get('button').contains('Elegir').click()
		})
		cy.get('input#code').type('functional_service_test')
		cy.get('input#name').type('Functional Service Test')
		cy.get('input#description').type('Application Test')
		cy.get('input#size').clear().type('1')
		cy.get('div').contains('label', 'Complejidad').parent().within(() => {
			cy.get('input[type="radio"]').eq(0).check()
		})
		cy.get('input#repetitions').clear().type('1')
		cy.get('div').contains('label', 'Entidades').parent().within(() => {
			cy.get('input[type="radio"]').eq(0).check()
		})
		cy.get('div').contains('label', 'Datos').parent().within(() => {
			cy.get('input[type="radio"]').eq(0).check()
		})
		cy.get('div').contains('label', 'Tipo de Algoritmo').parent().within(() => {
			cy.get('input[type="radio"]').eq(0).check()
		})
		cy.get('div').contains('label', 'Reusabilidad').parent().within(() => {
			cy.get('input[type="radio"]').eq(0).check()
		})
		cy.get('textarea#comments').type('This is only a test')
		cy.screenshot('paso_14_2')
		cy.get('button').contains('Agregar').should('be.enabled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Functionalservice save successfully.')
		cy.wait(1000)
		cy.screenshot('paso_14_3', {capture:'viewport'})
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
	})
	
	it('15. Editar un Servicio Funcional con datos incompletos, validar que marque error.', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Administrar Functionalservice').click()
			})
		})
		cy.url().should('contain', '/managefunctionalservice')
		cy.get('table>tbody>').contains('tr', 'Functional Service Test').within(() => {
			cy.get('button>span[class="fa fa-pencil"]').click()
		})
		cy.url().should('contain', '/editfunctionalservice')
		cy.screenshot('paso_15_1')
		cy.get('input#code').clear()
		cy.get('input#name').clear()
		cy.get('input#size').clear()
		cy.get('button').contains('Modificar').should('be.disabled')
		cy.screenshot('paso_15_2')
	})
	
	it('16. Editar un Servicio Funcional con datos completos, validar que se edit?.', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Administrar Functionalservice').click()
			})
		})
		cy.url().should('contain', '/managefunctionalservice')
		cy.get('table>tbody>').contains('tr', 'Functional Service Test').within(() => {
			cy.get('button>span.fa.fa-pencil').click()
		})
		cy.url().should('contain', '/editfunctionalservice')
		cy.screenshot('paso_16_1')
		cy.get('input#code').clear().type('functional_service_test_edited')
		cy.get('input#name').clear().type('Functional Service Test Edited')
		cy.get('input#size').clear().type('2')
		cy.screenshot('paso_16_2')
		cy.get('button').contains('Modificar').should('be.enabled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Functionalservice save successfully.')
		cy.wait(1000)
		cy.screenshot('paso_16_3', {capture:'viewport'})
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
	})
	
	it('17. Eliminar el Menu creado anteriormente, validar que no se pueda.', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Administrar Menu').click()
			})
		})
		cy.url().should('contain', '/managemenu')
		cy.get('table>tbody>').contains('tr', 'Test Menu Edited').within(() => {
			cy.get('button>span.fa.fa-trash').click()
		})
		cy.url().should('contain', '/editmenu')
		cy.screenshot('paso_17_1')
		cy.get('button').contains('Eliminar').should('be.enabled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Menu no se puede eliminar debido a que esta asociado con otra entidad.')
		cy.wait(1000)
		cy.screenshot('paso_17_2', {capture:'viewport'})
		cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-actions"]>button[class="swal2-confirm swal2-styled"]').click()
	})
	
	it('18. Eliminar el Serivicio Funcional creado anteriormente, validar que se elimin?.', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Administrar Functionalservice').click()
			})
		})
		cy.url().should('contain', '/managefunctionalservice')
		cy.get('table>tbody>').contains('tr', 'Functional Service Test Edited').within(() => {
			cy.get('button>span.fa.fa-trash').click()
		})
		cy.url().should('contain', '/editfunctionalservice')
		cy.screenshot('paso_18_1')
		cy.get('button').contains('Eliminar').should('be.enabled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Functionalservice item has been deleted successfully.')
		cy.wait(1000)
		cy.screenshot('paso_18_2', {capture:'viewport'})
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
	})
	
	it('19. Eliminar el Modulo creado anteriormente, validar que no se pueda.', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Administrar Module').click()
			})
		})
		cy.url().should('contain', '/managemodule')
		cy.get('table>tbody>').contains('tr', 'Test Module Edited').within(() => {
			cy.get('button>span.fa.fa-trash').click()
		})
		cy.url().should('contain', '/editmodule')
		cy.screenshot('paso_19_1')
		cy.get('button').contains('Eliminar').should('be.enabled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Module no se puede eliminar debido a que esta asociado con otra entidad.')
		cy.wait(1000)
		cy.screenshot('paso_19_2', {capture:'viewport'})
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
	})
	
	it('20. Eliminar el Menu creado anteriormente, validar que se elimin?.', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Administrar Menu').click()
			})
		})
		cy.url().should('contain', '/managemenu')
		cy.get('table>tbody>').contains('tr', 'Test Menu Edited').within(() => {
			cy.get('button>span.fa.fa-trash').click()
		})
		cy.url().should('contain', '/editmenu')
		cy.screenshot('paso_20_1')
		cy.get('button').contains('Eliminar').should('be.enabled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Menu item has been deleted successfully.')
		cy.wait(1000)
		cy.screenshot('paso_20_2', {capture:'viewport'})
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
	})
	
	it('21. Eliminar la Aplicaci?n creada anteriormente, validar que no se pueda.', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Administrar Application').click()
			})
		})
		cy.url().should('contain', '/manageapplication')
		cy.get('table>tbody>').contains('tr', 'Test Application Edited').within(() => {
			cy.get('button>span.fa.fa-trash').click()
		})
		cy.url().should('contain', '/editapplication')
		cy.screenshot('paso_21_1')
		cy.get('button').contains('Eliminar').should('be.enabled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Application no se puede eliminar debido a que esta asociado con otra entidad.')
		cy.wait(1000)
		cy.screenshot('paso_21_2', {capture:'viewport'})
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
	})
	
	it('22. Eliminar el Modulo creado anteriormente, validar que se elimin?.', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Administrar Module').click()
			})
		})
		cy.url().should('contain', '/managemodule')
		cy.get('table>tbody>').contains('tr', 'Test Module Edited').within(() => {
			cy.get('button>span.fa.fa-trash').click()
		})
		cy.url().should('contain', '/editmodule')
		cy.screenshot('paso_22_1')
		cy.get('button').contains('Eliminar').should('be.enabled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Module item has been deleted successfully.')
		cy.wait(1000)
		cy.screenshot('paso_22_2', {capture:'viewport'})
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
	})
	
	it('23. Eliminar la Aplicaci?n creada anteriormente, validar que se elimin?.', function() {
		cy.get('div#sidebar-menu').within(() => {
			cy.get('div.menu_section').contains('General').as('menu')
			cy.get('@menu').parent().within(() => {
				cy.get('li').contains('a', 'Administrar Application').click()
			})
		})
		cy.url().should('contain', '/manageapplication')
		cy.get('table>tbody>').contains('tr', 'Test Application Edited').within(() => {
			cy.get('button>span.fa.fa-trash').click()
		})
		cy.url().should('contain', '/editapplication')
		cy.screenshot('paso_23_1')
		cy.get('button').contains('Eliminar').should('be.enabled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-content').should('contain', 'Application item has been deleted successfully.')
		cy.wait(1000)
		cy.screenshot('paso_23_2', {capture:'viewport'})
		cy.get('div.swal2-popup.swal2-modal.swal2-show>div.swal2-actions>button.swal2-confirm.swal2-styled').click()
	})
	
	it('24. Logout, validar que se est? en pantalla de Login', function() {
		cy.get('div.nav_menu').within(() => {
			cy.get('a').contains('Javier Aguilar').click()
			cy.screenshot('paso_24_1')
			cy.get('button').contains('LogOut').click()
		})
		cy.url().should('contain', '/login')
		cy.screenshot('paso_24_2')
	})
	

})

