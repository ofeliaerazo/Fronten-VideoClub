'use strict';

(function() {

    class UsuariosCreateComponent {
        constructor(usuariosService, departamentosService, ciudadesService, tiposDocumentosService, $state) {
            this.usuariosService = usuariosService;
            this.departamentosService = departamentosService;
            this.$state = $state;
            this.tiposDocumentosService = tiposDocumentosService;
            this.ciudadesService = ciudadesService;
            this.showValidaDocumento= false;
            this.showValidaEmail= false;
            this.usuario = {
              numDocumento: null,
              ciudad:{
                id: null
              }
            }


        }
        $onInit() {
          console.log('ejecucion on init');
          //this.traerCiudades("p");
            this.departamentosService.query().$promise
                .then(response => {
                    this.departamentos = response;
                })
                .catch(err => console.error(err));

            this.tiposDocumentosService.query().$promise
                .then(response => {
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

        traerCiudades(searchText){
          return this.ciudadesService.getCiudades({nombre: searchText}).$promise
            .then(response => {
              console.log("REST Ciudades", response);
              return response;
            })
            .catch(err => console.error(err));


        }

        selectItemChange(item){
          console.log("ITEM", item);
          if(item != undefined){
          this.usuarios.ciudad.id=item.id;
          }


        }

        validarNumDocumento(){
          console.log("numDocumento", this.usuario.numDocumento);
          this.usuariosService.query({numDocumento:this.usuario.numDocumento}).$promise
          .then(response =>{
          console.log("Valida", response.length);
          //this.showValidaDocumento = true;
          if(this.usuario.numDocumento == undefined ||response.length == 0){
            this.showValidaDocumento = true;
            console.log('Validacion ',this.showValidaDocumento);
          }else{
            this.showValidaDocumento = false;
            console.log('Validacion ',this.showValidaDocumento);
          }

        })
          .catch(err => {
            console.log("No exite", err);
          })

        }

        validarEmail(){
          console.log("email", this.usuario.email);
          this.usuariosService.query({email:this.usuario.email}).$promise
          .then(response =>{
          console.log("Valida", response.length);
          this.showvalidaEmail = true;
          console.log("este email ya existe",this.showvalidaEmail);
          if(this.usuario.email == undefined ||response.length == 0){
           this.showvalidaEmail = false;
           console.log(this.showvalidaEmail);
         }
          })
          .catch(err => {
            console.log("No exite", err);
          })

        }

        imageLoad($fileContent) {
            this.image = $fileContent;
        }

    }
    //UsuariosCreateComponent.$inject = ['usuariosService', 'departamentosService', 'ciudadesService', 'tiposDocumentosService', '$state','showValidaDocumento','showValidarEmail'];
    angular.module('videoClubApp')
        .component('usuariosCreate', {
            templateUrl: 'app/usuarios/usuarios-create/usuarios-create.html',
            controller: UsuariosCreateComponent,
            controllerAs: 'vm'
        });

})();
