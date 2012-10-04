$('#home').on('pageinit', function(){

});

$('#additem').on('pageinit', function(){
		delete $.validator.methods.date;
		var myForm = $('#toolForm');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			alert("Please fill in highlighted missing fields");
			},
			submitHandler: function() {
		var data = $(".myForm").serializeArray();
			storeData(data);
		}
	});
	
	$('#reset').click(function() {
	    $('#qty').val('1').slider('refresh');
	    $('#selectType').val('selection').selectmenu('refresh');
		$('#type-2').attr('checked',false).checkboxradio('refresh');
		$('#type-1').attr('checked',true).checkboxradio('refresh');
		$('form#toolForm')[0].reset();
		
	});
	
	$("#clear").click(function(){
        clearLocal();
        return false;
    }); 
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

	$("#display").click(function(){
		$.mobile.changePage('#displayitem', { transition: "slide"});
        getData();
        return false;
    });

var autofillData = function (){
	//store JSON data in actual storage
	for(var n in json){
	    var id = Math.floor(Math.random()*100000001);
	    localStorage.setItem(id, JSON.stringify(json[n]));
	}
};

var getData = function(){
	if(localStorage.length === 0){
        	alert("You have no data to display so default data will be added.");
        	autofillData();
        }
	        var makeDiv = $('<div>');
	        makeDiv.attr("id", "items");
	        var makeList = $('<div>');
	        makeList.attr("id", "ulList");
	        makeList.appendTo(makeDiv);
			$('#displaydata').append(makeDiv);
			$('#items').show();
	        for(var i=0, len=localStorage.length; i<len; i++){
	            var makeLi = $('<li>');
	            makeLi.attr("id", "mainLi");
	            var linksLi = $('<li>');
	            linksLi.attr("id", "editDeleteLi");
	            makeList.append(makeLi);
	            var key = localStorage.key(i);
	            var value = localStorage.getItem(key);
	            var obj = JSON.parse(value);
	            var makeSubList = $('<div>');
	            makeSubList.attr("id", "subUl");
	            makeLi.append(makeSubList);
	            for(var n in obj){
	                var makeSubLi = $('<li>');
	                makeSubList.append(makeSubLi);
	                var optSubText = obj[n][0]+ " " +obj[n][1];
	                makeSubLi.html(optSubText);
	                makeLi.append(linksLi);
            	}
	            makeItemLinks(localStorage.key(i), linksLi); //create edit and delete buttons
            }
};

var makeItemLinks = function(key, linksLi){
    var editLink = $('<a>');
		editLink.attr("href", "#additem")
				.attr("data-role", "button")
				.attr("data-theme", "b")
				.attr("data-transition", "slide")
				.attr("data-direction", "reverse")
				.attr("style", "padding: 10px")
				.attr("class", "ui-btn ui-btn-up-b ui-shadow ui-btn-corner-all")
				.key = key;
    var editText = "Edit Item ";
    	editLink.on("click", editItem)
				.html(editText)
				.appendTo(linksLi);
				
    var deleteLink = $('<a>');
    	deleteLink.attr("href", "#")
				  .attr("data-role", "button")
				  .attr("data-theme", "b")
				  .attr("style", "padding: 10px")
				  .attr("class", "ui-btn ui-btn-up-b ui-shadow ui-btn-corner-all")
				  .key = key;
    var deleteText = "Delete Item";
    	deleteLink.on("click", deleteItem)
				  .html(deleteText)
				  .appendTo(linksLi);
};

var storeData = function(data){
	var key;
	if(!key){
    	var id = Math.floor(Math.random()*100000001);
    }
    else{
    	id = key;
    }

    var item 			= {};
		item.name 		= ["Name:", $('#name').val()];
        item.selectType = ["Tool/Item Type:", $('#selectType').val()];
        item.make 		= ["Make:", $('#make').val()];
        item.mnumber 	= ["Model Number:", $('#mnumber').val()];
        item.snumber 	= ["Serial Number:", $('#snumber').val()];
        item.dpurchased = ["Date Purchased:", $('#dpurchased').val()];
        item.wpurchased = ["Where Purchased:", $('#wpurchased').val()];
        item.price 		= ["Price:", $('#price').val()];
        item.ev 		= ["Estimated Value:", $('#ev').val()];
        item.condition 	= ["Purchase Type:", $('input[name=condition]:checked').val()];
        item.qty 		= ["Quantity:", $('#qty').val()];
        item.dateadded 	= ["Date Added:", $('#dateadded').val()];
        item.notes 		= ["Additional notes:", $('#notes').val()];
		
		//save to local storage: use stringify to convert to string
		console.log(id, item);
        localStorage.setItem(id, JSON.stringify(item));
        alert("Your item was stored successfully!");
		
		$('form#toolForm')[0].reset();
		$('#qty').val('1').slider('refresh');
	    $('#selectType').val('selection').selectmenu('refresh');
		$('#type-2').attr('checked',false).checkboxradio('refresh');
		$('#type-1').attr('checked',true).checkboxradio('refresh');
}; 

 var editItem = function(){
    	//grab item data from local storage
    	var value = localStorage.getItem(this.key);
    	var item = JSON.parse(value);
    	   	
    	$('#name').val(item.name[1]);
    	$('#selectType').val(item.selectType[1]).selectmenu();
    	$('#make').val(item.make[1]);
    	$('#mnumber').val(item.mnumber[1]);
    	$('#snumber').val(item.snumber[1]);
    	$('#dpurchased').val(item.dpurchased[1]);
    	$('#wpurchased').val(item.wpurchased[1]);
    	$('#price').val(item.price[1]);
    	$('#ev').val(item.ev[1]);
    	$('#condition').val(item.condition[1]);
    	$('#qty').val(item.qty[1]);
    	$('#dateadded').val(item.dateadded[1]);
    	$('#notes').val(item.notes[1]);
    	
    	save.off('click', storeData);
    	//change submit value to edit
    	$('#submit').val("Edit Item");
    	var editSubmit = $('#submit');
    	//save key value established
    	$('#editSubmit').on("click", validate);
    	editSubmit.key = this.key;	
};

var clearLocal = function(){
	if (localStorage.length === 0){
    		alert("You have no data to clear.");
			$.mobile.changePage('#additem', { transition: "slide"});			
    	}
    	else{
    		localStorage.clear();
    		alert("Your contents have been deleted.");
			$.mobile.changePage('#additem', { transition: "slide"});
			window.location.reload();
		}
	};

var	deleteItem = function (){
	var ask = confirm("Are you sure you want to delete this item?");
    	if(ask){
    		localStorage.removeItem(this.key);
    		alert("Item was deleted.");
    		$.mobile.changePage('#additem', { transition: "slide"});
			window.location.reload();
    	}
    	else{
    		alert("Item was not deleted.");
    	}	
};

$('#displayitem').on('pageinit', function(){

	//json
	$('#JSON').on('click', function() {
		$('#displaydata').empty();
		
		$.ajax({
			url: 'xhr/data.json',
			type: 'GET',
			dataType: 'json',
			success: function(result) {
				for(var i=0, j=result.tools.length; i<j; i++){
					var tools = result.tools[i];
					$(''+
						'<div class="tools">'+
							'<ul>'+
								'<li>'+ tools.name +'</li>'+
								'<li>'+ tools.select +'</li>'+
								'<li>'+ tools.make +'</li>'+
								'<li>'+ tools.mnumber +'</li>'+
								'<li>'+ tools.snumber +'</li>'+
								'<li>'+ tools.dpurchased +'</li>'+
								'<li>'+ tools.wpurchased +'</li>'+
								'<li>'+ tools.price +'</li>'+
								'<li>'+ tools.ev +'</li>'+
								'<li>'+ tools.condition +'</li>'+
								'<li>'+ tools.qty +'</li>'+
								'<li>'+ tools.dateadded +'</li>'+
								'<li>'+ tools.notes +'</li>'+
							'</ul>'+
						'</div>'
					).appendTo('#displaydata');
				};
				console.log(result);
			}
			error: function(result){
				console.log(result);
				}
		});
		
	});

});