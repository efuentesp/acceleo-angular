describe('Prueba de Seguridad', function() {
  it('Prueba Integral de Seguridad', function() {
	  
	//This turn off uncaught errors 
	Cypress.on('uncaught:exception', (err, runnable) => {
		return false
	})
	
	//**************************************************************
	//*************** 1. Firmarse como administrador ***************
	//**************************************************************
	cy.visit(Cypress.env('api_server'))
	cy.get('input[name="username"]').type('admin')
	cy.get('input[name="password"]').type('admin')
	cy.get('button').contains('Login').click()
	cy.url().should('contain', '/admin')
	cy.wait(3000)
	cy.screenshot('paso_1', {capture:'viewport'})
	
	//**************************************************************
	//************* 2. Crear un Authority (Rol) nuevo. *************
	//**************************************************************
	cy.wait(3000)
	cy.get('li>a').contains('Agregar Authority').click()
	cy.url().should('contain', '/createAuthority')
	cy.get('input[type="text"]').type('TEST_ROLE')
	cy.get('div').contains('Activo').within(() => {
		cy.get('input[type="radio"]').check()
	})
	cy.get('button').contains('Agregar').click()
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-content"]').should('contain', 'Authority save successfully.')
	cy.wait(3000)
	cy.screenshot('paso_2', {capture:'viewport'})
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-actions"]>button[class="swal2-confirm swal2-styled"]').click()
	
	//**************************************************************
	//****** 3. Crear Usuario nuevo y asignarle el nuevo Rol. ******
	//**************************************************************
	cy.get('li>a').contains('Agregar User').click()
	cy.url().should('contain', '/createUser')
	cy.get('input[name="username"]').type('test_user')
	cy.get('input[name="password"]').type('test_user')
	cy.get('input[name="firstname"]').type('Test')
	cy.get('input[name="lastname"]').type('User')
	cy.get('input[name="email"]').type('test.user@softtek.com')
	cy.get('div').contains('Activo').within(() => {
		cy.get('input[type="radio"]').check()
	})
	cy.get('div>select').select('TEST_ROLE')
	cy.get('button').contains('Agregar').click()
	cy.wait(1000)
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-content"]').should('contain', 'User save successfully.')
	cy.wait(3000)
	cy.screenshot('paso_3', {capture:'viewport'})
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-actions"]>button[class="swal2-confirm swal2-styled"]').click()
	
	//**************************************************************
	// 4. Crear otro Usuario con el mismo username que el anterior  
	//**************************************************************
	cy.get('li>a').contains('Agregar User').click()
	cy.url().should('contain', '/createUser')
	cy.get('input[name="username"]').type('test_user')
	cy.get('input[name="password"]').type('test_user')
	cy.get('input[name="firstname"]').type('Test')
	cy.get('input[name="lastname"]').type('User Repeated')
	cy.get('input[name="email"]').type('test.user.repeated@softtek.com')
	cy.get('div').contains('Activo').within(() => {
		cy.get('input[type="radio"]').check()
	})
	cy.get('div>select').select('TEST_ROLE')
	cy.get('button').contains('Agregar').click()
	cy.get('button').contains('Agregar').click()
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-content"]').should('contain', 'User duplicated.')
	cy.wait(3000)
	cy.screenshot('paso_4', {capture:'viewport'})
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-actions"]>button[class="swal2-confirm swal2-styled"]').click()
	
	
	//**************************************************************
	//******* 5. Dar permisos al nuevo Rol para afiliados(CRUD)*****
	//**************************************************************
	cy.get('li>a').contains('Manage Privileges').click()
	cy.wait(3000)
	cy.get('table>thead>tr').find('th').contains('TEST_ROLE')
	cy.get('table>tbody>').contains('tr', 'AFILIADOCREATE').within(() => {
		cy.get('input[type="checkbox"]').eq(3).check()
	})
	cy.get('table>tbody>').contains('tr', 'AFILIADODELETE').within(() => {
		cy.get('input[type="checkbox"]').eq(3).check()
	})
	cy.get('table>tbody>').contains('tr', 'AFILIADOSEARCH').within(() => {
		cy.get('input[type="checkbox"]').eq(3).check()
	})
	cy.get('table>tbody>').contains('tr', 'AFILIADOUPDATE').within(() => {
		cy.get('input[type="checkbox"]').eq(3).check()
	})
	cy.get('table>tbody>').contains('tr', 'BENEFICIARIOCREATE').within(() => {
		cy.get('input[type="checkbox"]').eq(3).check()
	})
	cy.get('table>tbody>').contains('tr', 'BENEFICIARIODELETE').within(() => {
		cy.get('input[type="checkbox"]').eq(3).check()
	})
	cy.get('table>tbody>').contains('tr', 'BENEFICIARIOSEARCH').within(() => {
		cy.get('input[type="checkbox"]').eq(3).check()
	})
	cy.get('table>tbody>').contains('tr', 'BENEFICIARIOUPDATE').within(() => {
		cy.get('input[type="checkbox"]').eq(3).check()
	})
	cy.wait(3000)
	cy.screenshot('paso_5', {capture:'fullPage'})
	
	//**************************************************************
	//******************** 6. Salir del sistema ********************
	//**************************************************************
	cy.get('ul[class="nav navbar-nav navbar-right"]').within(() => {
		cy.get('li>a').contains('Normaysel Carbajal').click()
		cy.get('ul>li>button').contains('LogOut').should('be.visible').click()
	})
	cy.url().should('contain', '/login')
	cy.wait(3000)
	cy.screenshot('paso_6', {capture:'viewport'})
	
	//**************************************************************
	//* 7. Firmarse con el nuevo Usuario, verificar CRUD afiliado **
	//**************************************************************
	cy.get('input[name="username"]').type('test_user')
	cy.get('input[name="password"]').type('test_user')
	cy.get('button').contains('Login').click()
	cy.url().should('contain', '/admin')
	cy.get('div[class="menu_section"]').within(() => {
		cy.get('li>a').should('contain', 'Administrar Afiliado')
		cy.get('li>a').should('contain', 'Agregar Afiliado')
		cy.get('li>a').should('contain', 'Administrar Beneficiario')
		cy.get('li>a').should('contain', 'Agregar Beneficiario')
		cy.get('li>a').should('not.contain', 'Administrar Tipopension')
		cy.get('li>a').should('not.contain', 'Agregar Tipopension')
		cy.get('li>a').should('not.contain', 'Administrar Solicitudpension')
		cy.get('li>a').should('not.contain', 'Agregar Solicitudpension')
		cy.get('li>a').should('not.contain', 'Manage Privileges')
		cy.get('li>a').should('not.contain', 'Administrar Authority')
		cy.get('li>a').should('not.contain', 'Agregar Authority')
		cy.get('li>a').should('not.contain', 'Administrar User')
		cy.get('li>a').should('not.contain', 'Agregar User')
	})
	cy.wait(3000)
	cy.screenshot('paso_7', {capture:'viewport'})
	
	//**************************************************************
	//******************** 8. Crear un Afiliado ********************
	//**************************************************************
	cy.get('li>a').contains('Agregar Afiliado').click()
	cy.url().should('contain', '/createAfiliado')
	cy.get('input[name="fecha_afiliacion"]').type('10-11-98')
	cy.get('input[name="foto"]').type('N/A')
	cy.get('input[name="correo"]').type('afiliado.test@softtek.com')
	cy.get('input[name="apellido_materno"]').type('Test')
	cy.get('input[name="acta_nacimiento"]').type('999999')
	cy.get('input[name="monto_pension"]').type('100000')
	cy.get('input[name="apellido_paterno"]').type('User')
	cy.get('textarea[name="observaciones"]').type('Sin observaciones')
	cy.get('input[name="nombre"]').type('Afiliado')
	cy.get('input[name="semanas_cotizadas"]').type('8')
	cy.get('input[name="nss"]').type('123456')
	cy.get('div').contains('Male').within(() => {
		cy.get('input[type="radio"]').check()
	})
	cy.get('button[data-target="#modalBeneficiario"]').click()
	cy.wait(3000)
	cy.get('div[id="modalBeneficiario"]').within(() => {
		cy.get('tbody').contains('tr', 'VEDA761212HO1VRR0').click()
	})
	cy.get('button').contains('Agregar').click()
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-content"]').should('contain', 'Afiliado save successfully.')
	cy.wait(3000)
	cy.screenshot('paso_8', {capture:'viewport'})
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-actions"]>button[class="swal2-confirm swal2-styled"]').click()
	
	//**************************************************************
	//******************* 9. Editar el Afiliado. *******************
	//**************************************************************
	cy.get('li>a').contains('Administrar Afiliado').click()
	cy.url().should('contain', '/manageAfiliado')
	cy.get('table>tbody>').contains('tr', 'Afiliado').within(() => {
		cy.get('button>span[class="fa fa-pencil"]').click()
	})
	cy.get('input[name="correo"]').clear().type('afiliado.user.test@softtek.com')
	cy.get('button').contains('Modificar').click()
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-content"]').should('contain', 'Afiliado save successfully.')
	cy.wait(3000)
	cy.screenshot('paso_9', {capture:'viewport'})
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-actions"]>button[class="swal2-confirm swal2-styled"]').click()
	
	//**************************************************************
	//****************** 10. Borrar el Afiliado. *******************
	//**************************************************************
	cy.get('li>a').contains('Administrar Afiliado').click()
	cy.url().should('contain', '/manageAfiliado')
	cy.get('table>tbody>').contains('tr', 'Afiliado').within(() => {
		cy.get('button>span[class="fa fa-trash"]').click()
	})
	cy.get('button').contains('Eliminar').click()
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-actions"]>button[class="swal2-confirm swal2-styled"]').click()
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-content"]').should('contain', 'Afiliado item has been deleted successfully.')
	cy.wait(3000)
	cy.screenshot('paso_10', {capture:'viewport'})
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-actions"]>button[class="swal2-confirm swal2-styled"]').click()
	
	//**************************************************************
	//******************** 11. Salir del sistema *******************
	//**************************************************************
	cy.get('ul[class="nav navbar-nav navbar-right"]').within(() => {
		cy.get('li>a').contains('Test User').click()
		cy.get('ul>li>button').contains('LogOut').should('be.visible').click()
	})
	cy.url().should('contain', '/login')
	cy.wait(3000)
	cy.screenshot('paso_11', {capture:'viewport'})
	
	//**************************************************************
	//*************** 12. Firmarse como administrador. *************
	//**************************************************************
	cy.get('input[name="username"]').type('admin')
	cy.get('input[name="password"]').type('admin')
	cy.get('button').contains('Login').click()
	cy.url().should('contain', '/admin')
	cy.wait(3000)
	cy.screenshot('paso_12', {capture:'viewport'})
	
	//**************************************************************
	//******* 13. Intentar borrar el Authority (Rol) creado. *******
	//**************************************************************
	cy.wait(3000)
	cy.get('li>a').contains('Administrar Authority').click()
	cy.url().should('contain', '/manageAuthority')
	cy.get('table>tbody>').contains('tr', 'TEST_ROLE').within(() => {
		cy.get('button>span[class="fa fa-trash"]').click()
	})
	cy.url().should('contain', '/editAuthority')
	cy.get('button').contains('Eliminar').click()
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-actions"]>button[class="swal2-confirm swal2-styled"]').click()
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-content"]').should('contain', 'El Authority no se puede eliminar debido a que esta asociado con usuarios.')
	cy.wait(3000)
	cy.screenshot('paso_13', {capture:'viewport'})
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-actions"]>button[class="swal2-confirm swal2-styled"]').click()
	
	
	//**************************************************************
	//******************* 14. Desactivar el Rol. *******************
	//**************************************************************
	cy.get('li>a').contains('Administrar Authority').click()
	cy.url().should('contain', '/manageAuthority')
	cy.get('table>tbody>').contains('tr', 'TEST_ROLE').within(() => {
		cy.get('button>span[class="fa fa-pencil"]').click()
	})
	cy.get('div').contains('Inactivo').within(() => {
		cy.get('input[type="radio"]').check()
	})
	cy.get('button').contains('Modificar').click()
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-content"]').should('contain', 'Authority save successfully.')
	cy.wait(3000)
	cy.screenshot('paso_14', {capture:'viewport'})
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-actions"]>button[class="swal2-confirm swal2-styled"]').click()
	
	
	//**************************************************************
	//******************** 15. Salir del sistema *******************
	//**************************************************************
	cy.get('ul[class="nav navbar-nav navbar-right"]').within(() => {
		cy.get('li>a').contains('Normaysel Carbajal').click()
		cy.get('ul>li>button').contains('LogOut').should('be.visible').click()
	})
	cy.url().should('contain', '/login')
	cy.wait(3000)
	cy.screenshot('paso_15', {capture:'viewport'})
	
	//**************************************************************
	// 16. Firmarse con el nuevo Usuario, validar opciones de menú 
	//**************************************************************
	cy.get('input[name="username"]').type('test_user')
	cy.get('input[name="password"]').type('test_user')
	cy.get('button').contains('Login').click()
	cy.url().should('contain', '/admin')
	cy.wait(3000)
	// ------------> Cambiar a 0
	cy.get('div[id="sidebar-menu"]').within(() => {
		cy.get('li').should('have.length', 1)
	})
	cy.wait(3000)
	cy.screenshot('paso_16', {capture:'viewport'})
	
	//**************************************************************
	//******************** 17. Salir del sistema *******************
	//**************************************************************
	cy.get('ul[class="nav navbar-nav navbar-right"]').within(() => {
		cy.get('li>a').contains('Test User').click()
		cy.get('ul>li>button').contains('LogOut').should('be.visible').click()
	})
	cy.url().should('contain', '/login')
	cy.wait(3000)
	cy.screenshot('paso_17', {capture:'viewport'})
	
	//**************************************************************
	//************** 18. Firmarse como Administrador. **************
	//**************************************************************
	cy.get('input[name="username"]').type('admin')
	cy.get('input[name="password"]').type('admin')
	cy.get('button').contains('Login').click()
	cy.url().should('contain', '/admin')
	cy.wait(3000)
	cy.screenshot('paso_18', {capture:'viewport'})
	
	//**************************************************************
	//********** 19. Activar nuevamente el Authority (Rol). ********
	//**************************************************************
	cy.wait(3000)
	cy.get('li>a').contains('Administrar Authority').click()
	cy.url().should('contain', '/manageAuthority')
	cy.get('table>tbody>').contains('tr', 'TEST_ROLE').within(() => {
		cy.get('button>span[class="fa fa-pencil"]').click()
	})
	cy.get('div').contains('Activo').within(() => {
		cy.get('input[type="radio"]').check()
	})
	cy.get('button').contains('Modificar').click()
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-content"]').should('contain', 'Authority save successfully.')
	cy.wait(3000)
	cy.screenshot('paso_19', {capture:'viewport'})
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-actions"]>button[class="swal2-confirm swal2-styled"]').click()
	
	
	//**************************************************************
	//************** 20. Desactivar ahora el Usuario. **************
	//**************************************************************
	cy.get('li>a').contains('Administrar User').click()
	cy.url().should('contain', '/manageUser')
	cy.get('table>tbody>').contains('tr', 'test_user').within(() => {
		cy.get('button>span[class="fa fa-pencil"]').click()
	})
	cy.get('div').contains('Inactivo').within(() => {
		cy.get('input[type="radio"]').check()
	})
	cy.get('button').contains('Modificar').click()
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-content"]').should('contain', 'User save successfully.')
	cy.wait(3000)
	cy.screenshot('paso_20', {capture:'viewport'})
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-actions"]>button[class="swal2-confirm swal2-styled"]').click()
	
	
	//**************************************************************
	//******************** 21. Salir del sistema *******************
	//**************************************************************
	cy.get('ul[class="nav navbar-nav navbar-right"]').within(() => {
		cy.get('li>a').contains('Normaysel Carbajal').click()
		cy.get('ul>li>button').contains('LogOut').should('be.visible').click()
	})
	cy.url().should('contain', '/login')
	cy.wait(3000)
	cy.screenshot('paso_21', {capture:'viewport'})
	
	//**************************************************************
	// 22. Firmarse con el nuevo usuario, validar no se pueda entrar
	//**************************************************************
	cy.get('input[name="username"]').type('test_user')
	cy.get('input[name="password"]').type('test_user')
	cy.get('button').contains('Login').click()
	cy.get('div[class="alert alert-danger"]').should('contain', 'Username or password is incorrect')
	cy.wait(3000)
	cy.screenshot('paso_22', {capture:'viewport'})
	
	//**************************************************************
	//************** 23. Firmarse como administrador. **************
	//**************************************************************
	cy.get('input[name="username"]').clear().type('admin')
	cy.get('input[name="password"]').clear().type('admin')
	cy.get('button').contains('Login').click()
	cy.url().should('contain', '/admin')
	cy.wait(3000)
	cy.screenshot('paso_23', {capture:'viewport'})
	
	//**************************************************************
	//*************** 24. Eliminar el usuario nuevo. ***************
	//**************************************************************
	cy.wait(3000)
	cy.get('li>a').contains('Administrar User').click()
	cy.url().should('contain', '/manageUser')
	cy.get('table>tbody>').contains('tr', 'test_user').within(() => {
		cy.get('button>span[class="fa fa-trash"]').click()
	})
	cy.get('button').contains('Eliminar').click()
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-actions"]>button[class="swal2-confirm swal2-styled"]').click()
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-content"]').should('contain', 'User item has been deleted successfully.')
	cy.wait(3000)
	cy.screenshot('paso_24', {capture:'viewport'})
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-actions"]>button[class="swal2-confirm swal2-styled"]').click()	
	
	//**************************************************************
	// 25. Eliminar el Authority (rol) nuevo, validar que se pueda *
	//**************************************************************
	cy.get('li>a').contains('Administrar Authority').click()
	cy.url().should('contain', '/manageAuthority')
	cy.get('table>tbody>').contains('tr', 'TEST_ROLE').within(() => {
		cy.get('button>span[class="fa fa-trash"]').click()
	})
	cy.url().should('contain', '/editAuthority')
	cy.get('button').contains('Eliminar').click()
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-actions"]>button[class="swal2-confirm swal2-styled"]').click()
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-content"]').should('contain', 'Authority item has been deleted successfully.')
	cy.wait(3000)
	cy.screenshot('paso_25', {capture:'viewport'})
	cy.get('div[class="swal2-popup swal2-modal swal2-show"]>div[class="swal2-actions"]>button[class="swal2-confirm swal2-styled"]').click()	
	
	//**************************************************************
	//******************** 26. Salir del sistema *******************
	//**************************************************************
	cy.get('ul[class="nav navbar-nav navbar-right"]').within(() => {
		cy.get('li>a').contains('Normaysel Carbajal').click()
		cy.get('ul>li>button').contains('LogOut').should('be.visible').click()
	})
	cy.url().should('contain', '/login')
	cy.wait(3000)
	cy.screenshot('paso_26', {capture:'viewport'})
	
	//**************************************************************
	// 27. Firmarse con el nuevo usuario, validar no se pueda entrar
	//**************************************************************
	cy.get('input[name="username"]').type('test_user')
	cy.get('input[name="password"]').type('test_user')
	cy.get('button').contains('Login').click()
	cy.get('div[class="alert alert-danger"]').should('contain', 'Username or password is incorrect')
	cy.wait(3000)
	cy.screenshot('paso_27', {capture:'viewport'})
	
  })
})