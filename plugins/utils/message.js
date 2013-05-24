exports.showMessage = function(res, message, next){
	var page =  'history.back();' ;

	if(next !== undefined)
		page = 'location.href="'+next+'";';

	console.log('<script type="text/javascript">alert("'+message+'");'+page+'</script>');
	res.write('<script type="text/javascript">alert("'+message+'");'+page+'</script>');
}