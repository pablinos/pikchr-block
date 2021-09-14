module.exports = {
	module: {
	  rules: [
		  // wasm files should not be processed but just be emitted and we want
		  // to have their public URL.
		  {
			  test: /.*\.wasm$/,
			  type: "javascript/auto",
			  loader: "file-loader",
			  // options: {
				  // publicPath: "build/"
			  // }
		  }
	  ]
	},
}; 
