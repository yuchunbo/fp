'use strict';

import $ from 'jquery/src/jquery';

let Api = {};
let PATH = '/fpapi/index.php?s=Home/';

let restArr = (api) => {
	let arr = {
		login:['Logreg/login','post'],
		register:['Logreg/register','post']
	}
	return arr[api];
}

Api.fetch = (api,params,succCb,errorCb) => {
	let req = restArr(api);
    $.ajax({
			url:PATH+req[0],
			data:params,
			type:req[1],
			success:function(res){
				succCb && succCb.apply(this,arguments);
			},
			error:function(e){
				console.log(e);
				errorCb && errorCb.apply(this,arguments);
			}
		})  
};

export default Api;
