'use strict';

import $ from 'jquery/src/jquery';

let Api = {};
let PATH = '/fpapi/index.php?s=Home/';

let restArr = (api) => {
	let arr = {
		login : ['Logreg/login','post'],
		register : ['Logreg/register','post'],
		commentList : ['Transaction/getCommentList','get'],
		seekUsers : ['Userinfo/seekUsers','get']
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
				console.log(typeof(res));
				console.log(JSON.parse(res).code);
				console.log(JSON.parse(res).code==-1);
				if(res.code==-1){
					location.href = './#/login';
					return false;
				}else{
					succCb && succCb.apply(this,arguments);
				}
			},
			error:function(e){
				console.log(e);
				errorCb && errorCb.apply(this,arguments);
			}
		})  
};

export default Api;
