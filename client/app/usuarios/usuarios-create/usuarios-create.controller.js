'use strict';

(function() {

    class UsuariosCreateComponent {
        constructor(usuariosService, departamentosService, ciudadesService, tiposDocumentosService, $state) {
            this.usuariosService = usuariosService;
            this.departamentosService = departamentosService;
            this.$state = $state;
            this.tiposDocumentosService = tiposDocumentosService;
            this.ciudadesService = ciudadesService;
            this.showvalidaDocumento= false;
            this.showValidaremail= false;
        }
        $onInit() {
            this.departamentosService.query().$promise
                .then(response => {
                    this.departamentos = response;
                })
                .catch(err => console.error(err));
            this.tiposDocumentosService.query().$promise
                .then(response => {response
                    this.tiposDocumento = response;
                    console.log(this.tiposDocumento);
                })
                .catch(err => console.error(err));
        }
        getCiudades() {
            this.ciudadesService.getCiudades({ idDepartamento: this.idDepartamento }).$promise
                .then(response => {
                    this.ciudades = response;
                    console.log("Ciudades", this.ciudades);
                })
                .catch(err => console.error(err));
        }

        createUser() {
            console.log('IMAGEN');
            console.log(this.croppedImage);
            if (this.croppedImage) {
                var newImagen = this.croppedImage.split(',');
                this.usuario.tipoImagen = newImagen[0];
                this.usuario.fotoPerfil = newImagen[1];
            }

            this.usuariosService.save(this.usuario).$promise
                .then(response => {
                    console.log("Usuario registrado correctamente ", response);
                    this.$state.go('usuarios-list');
                })
                .catch(err => {
                    console.log("Error al crear el usuario ", err);
                })
        }

        validarNumDocumento(){
          console.console.log("numDocumento", this.usuario.numDocumento);
          this.usuariosService.query({numDocumento:this.usuario.numDocumento}).$promise
          .then(response =>{
          console.log("Valida", response.length);
          this.showValidaDocumento = true;
          if(this.usuario.numDocumento == Undefined ||response.length <= 0);
           this.ValidarNumeroDocumento = false;
          })
          .catch(err => {
            console.log("No exite", err);
          })

        }

        validarEmail(){
          console.console.log("email", this.usuario.email);
          this.usuariosService.query({email:this.usuario.email}).$promise
          .then(response =>{
          console.log("Valida", response.length);
          this.showValidaremail = true;
          if(this.usuario.email == Undefined ||response.length <= 0);
           this.Validaremail = false;
          })
          .catch(err => {
            console.log("No exite", err);
          })

        }

        imageLoad($fileContent) {
            this.image = $fileContent;
        }

    }
    UsuariosCreateComponent.$inject = ['usuariosService', 'departamentosService', 'ciudadesService', 'tiposDocumentosService', '$state'];
    angular.module('videoClubApp')
        .component('usuariosCreate', {
            templateUrl: 'app/usuarios/usuarios-create/usuarios-create.html',
            controller: UsuariosCreateComponent,
            controllerAs: 'vm'
        });

})();
