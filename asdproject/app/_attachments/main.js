$(document).ready(function() {
		$.ajax({
			"url": "_view/powertool",
			"dataType": "json",
			"success": function(data) {
				$.each(data.rows, function(index, program){
					var name 		= program.value.name;
					var select 		= program.value.select;
					var make		= program.value.make;
					var mnumber		= program.value.mnumber;
					var snumber		= program.value.snumber;
					var dpurchased	= program.value.dpurchased;
					var wpurchased	= program.value.wpurchased;
					var price 		= program.value.price;
					var ev			= program.value.ev;
					var ptype		= program.value.condition;
					var qty			= program.value.qty;
					var date		= program.value.dateadded;
					var note		= program.value.notes;
					$('#ptool').append(
						$('<li>').append(
							$('<a>').attr("href", "#")
								.text(name)
						)
					);
				});
			$('#ptool').listview('refresh');
			}
		});
	});