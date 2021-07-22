module.exports = (router = require('express').Router())=>{
	return {
		router,
		post: (path,requireParams,handlers)=>{
			if (!Array.isArray(requireParams)){
				throw new Error('requireParams must be a type of array.');
			}
			router.post(path,(req,res,next)=>{
				let isMissing = false;
				requireParams.forEach((p)=>{
					if (!req.body[p]){
						res.json({
							code: 119,
							message: `Parameter missing {${p}}`,
						});
						isMissing = true;
					}
				});
				if (!isMissing){
					handlers(req,res,next);
				}
			});
		},
		get: (path,requireParams,handlers)=>{
			if (!Array.isArray(requireParams)){
				throw new Error('requireParams must be a type of array.');
			}
			router.get(path,(req,res,next)=>{
				let isMissing = false;
				requireParams.forEach((p)=>{
					if (!req.query[p]){
						res.json({
							code: 119,
							message: `Parameter missing {${p}}`,
						});
						isMissing = true;
					}
				});
				if (!isMissing){
					handlers(req,res,next);
				}
			});
		}
	}
}