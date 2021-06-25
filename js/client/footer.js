const lang8age = ["de", "en", "ru", "bg"];

jQuery(function($) {
	$('select').on('change', function() {
		var url = $(this).val();
		if (url) {
			//window.location = location.href.replace(lang8age, (this).val());
            for (const key of lang8age) {
                console.log("Key: " + key);
                if (window.location.href.indexOf(key) > 0) {
                    window.location = location.href.replace("/" + key + "/", "/" + url + "/");
                }else{
                    console.log("donw");
                }
            }
            /*
            lang.forEach(element => {
                console.log(element);
                if (window.location.href.indexOf(element)) {
                    console.log("klasse");
                }
            });
            */
		}
		return false;
	});
});