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


$("#displayitem").on('pageinit',function(){
	//json
	$('#JSON').on('click', function() {
		$('#displaydata').empty();
		$('<h3>').html('JSON Data').appendTo('#displaydata');
		$.ajax({
			url: 'xhr/data.json',
			type: 'GET',
			dataType: 'json',
			success: function(result) {
				for(var i=0, j=result.tools.length; i<j; i++){
					var tools = result.tools[i];
					$(''+
						'<ul class="ui-listview ui-listview-inset ui-corner-all ui-shadow" data-inset="true" data-role="listview">'+
							'<li class="ui-li ui-li-static ui-btn-up-c ui-corner-top">'+
									'<h3 class="ui-li-heading">'+ tools.name + '<br />'+'</h3>'+
									'<p class="ui-li-desc">'+"Tool/Item Type: "+ tools.select + '</p>'+
									'<p class="ui-li-desc">'+"Make: "+ tools.make + '</p>'+
									'<p class="ui-li-desc">'+"Model Number: "+ tools.mnumber + '</p>'+
									'<p class="ui-li-desc">'+"Serial Number: "+ tools.snumber + '</p>'+
									'<p class="ui-li-desc">'+"Date Purchased: "+ tools.dpurchased + '</p>'+
									'<p class="ui-li-desc">'+"Where Purchased: "+ tools.wpurchased + '</p>'+
									'<p class="ui-li-desc">'+"Price: "+ tools.price + '</p>'+
									'<p class="ui-li-desc">'+"Estimated Value: "+ tools.ev + '</p>'+
									'<p class="ui-li-desc">'+"Purchase Type: "+ tools.condition + '</p>'+
									'<p class="ui-li-desc">'+" Quantity: "+ tools.qty + '</p>'+
									'<p class="ui-li-desc">'+"Date Added: "+ tools.dateadded + '</p>'+
									'<p class="ui-li-desc">'+"Additional Notes: "+ tools.notes + '</p>'+
							'</li>'+
						'</ul>'							
						
					).appendTo('#displaydata');
				};
				console.log(result);
			}
		});
		
	});

	//XML
	$('#XML').on('click', function() {
		$('#displaydata').empty();
		$('<h3>').html('XML Data').appendTo('#displaydata');
		$.ajax({
			url: 'xhr/data.xml',
			type: 'GET',
			dataType: 'xml',
			success: function(xml) {
				$(xml).find("tool").each(function(){
				
					var name 		= $(this).find('name').text();
					var select 		= $(this).find('select').text();
					var make 		= $(this).find('make').text();
					var mnumber 	= $(this).find('mnumber').text();
					var snumber 	= $(this).find('snumber').text();
					var dpurchased 	= $(this).find('dpurchased').text();
					var wpurchased 	= $(this).find('wpurchased').text();
					var price 		= $(this).find('price').text();
					var ev 			= $(this).find('ev').text();
					var condition 	= $(this).find('condition').text();
					var qty 		= $(this).find('qty').text();
					var dateadded 	= $(this).find('dateadded').text();
					var notes 		= $(this).find('notes').text();
					
					$(''+
						'<ul class="ui-listview ui-listview-inset ui-corner-all ui-shadow" data-inset="true" data-role="listview">'+
							'<li class="ui-li ui-li-static ui-btn-up-c ui-corner-top">'+
								'<h3 class="ui-li-heading">'+ name +'</h3>'+
								'<p class="ui-li-desc">'+"Tool/Item Type: "+ select + '</p>'+
								'<p class="ui-li-desc">'+"Make: "+ make + '</p>'+
								'<p class="ui-li-desc">'+"Model Number: "+ mnumber + '</p>'+
								'<p class="ui-li-desc">'+"Serial Number: "+ snumber + '</p>'+
								'<p class="ui-li-desc">'+"Date Purchased: "+ dpurchased + '</p>'+
								'<p class="ui-li-desc">'+"Where Purchased: "+ wpurchased + '</p>'+
								'<p class="ui-li-desc">'+"Price: "+ price + '</p>'+
								'<p class="ui-li-desc">'+"Estimated Value: "+ ev + '</p>'+
								'<p class="ui-li-desc">'+"Purchase Type: "+ condition + '</p>'+
								'<p class="ui-li-desc">'+"Quantity: "+ qty + '</p>'+
								'<p class="ui-li-desc">'+"Date Added: "+ dateadded + '</p>'+
								'<p class="ui-li-desc">'+"Additional Notes: "+ notes +'</p>'+
							'</li>'+
						'</ul>'
						
					).appendTo('#displaydata');
				});
				console.log(xml);
			}
		});
	});
	
//CSV Data
	$('#CSV').bind('click', function(){
		$('#displaydata').empty();
		$('<h3>').html('CSV Data').appendTo('#displaydata');
		$.ajax({
			type: "GET",
			url: "xhr/data.csv",
			dataType: "text",
			success: function(data) {
				var allTextLines = data.split(/\r\n|\n/);
				var headers = allTextLines[0].split(',');
				var lines = []; 

			for (var i=1; i<allTextLines.length; i++) {
				var data = allTextLines[i].split(',');
			if (data.length == headers.length) {
				var tools = []; 

				for (var j=0; j<headers.length; j++) {
					tools.push(data[j]);
				}
					lines.push(tools);
				}	

			}

			for (var m=0; m<lines.length; m++){
				var toolList = lines[m];
			$(''+
				'<ul class="ui-listview ui-listview-inset ui-corner-all ui-shadow" data-inset="true" data-role="listview">'+
					'<li class="ui-li ui-li-static ui-btn-up-c ui-corner-top">'+
						'<h3 class="ui-li-heading">'+ toolList[0] + '<br />'+'</h3>'+
						'<p class="ui-li-desc">'+"Tool/Item Type: "+ toolList[1] + '</p>'+
						'<p class="ui-li-desc">'+"Make: "+ toolList[2] + '</p>'+
						'<p class="ui-li-desc">'+"Model Number: "+ toolList[3] + '</p>'+
						'<p class="ui-li-desc">'+"Serial Number: "+ toolList[4] + '</p>'+
						'<p class="ui-li-desc">'+"Date Purchased: "+ toolList[5] + '</p>'+
						'<p class="ui-li-desc">'+"Where Purchased: "+ toolList[6] + '</p>'+
						'<p class="ui-li-desc">'+"Price: "+ toolList[7] + '</p>'+
						'<p class="ui-li-desc">'+"Estimated Value: "+ toolList[8] + '</p>'+
						'<p class="ui-li-desc">'+"Purchase Type: "+ toolList[9] + '</p>'+
						'<p class="ui-li-desc">'+" Quantity: "+ toolList[10] + '</p>'+
						'<p class="ui-li-desc">'+"Date Added: "+ toolList[11] + '</p>'+
						'<p class="ui-li-desc">'+"Additional Notes: "+ toolList[12] + '</p>'+
					'</li>'+
				'</ul>'	
				
			).appendTo('#displaydata');

			}
		}
	});
	});
});