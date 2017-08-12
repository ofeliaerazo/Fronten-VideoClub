'use strict';

AuthService.$inject  = ['$auth','$state'];
function AuthService($auth,$state){
	var Auth = {
		login:login,
		logout:logout,
		isAuthenticated:isAuthenticated,
		isAdmin:isAdmin,
		isUser:isUser

	};

	function login(user,collback){
		$auth.login(user)
		.then(response => {
			console.log("Login ok",response);

			$state.go('main');
		})
		.catch(err =>{
			console.log("Error de login",err);
			$state.go('login');
		})
	}

	function logout(){
		if($auth.isAuthenticated()){
			$auth.logout()
			.then(respose=>{
				$state.go('main');
			})
		}

	}
function isAuthenticated(){
	if($auth.isAuthenticated()){
		return true;
	}else{
		return false;
	}
}

function isAdmin(){
	if($auth.isAuthenticated()){
		if($auth.getPayload().roles.indexOf("ADMIN") !== -1){
		return true;
	}else{
		return false;
	}
}else{

	return false;
}
}

function isUser(){
	if($auth.isAuthenticated()){
		if($auth.getPayload().roles.indexOf("USER") !== -1){
		return true;
	}else{
		return false;
	}
}else{

	return false;
}
}





return Auth;
}

angular.module("videoClubApp")
.factory('AuthService',AuthService);
