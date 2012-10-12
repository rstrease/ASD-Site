function (doc) {
	if (doc.select.substr(0, 10) === "Power Tool") {
		emit(doc.select, {
			"Name": doc.name,
			"Tool/Item Type": doc.select,
			"Make": doc.make,
			"Model Number": doc.mnumber,
			"Serial Number": doc.snumber,
			"Date Purchased": doc.dpurchased,
			"Where Purchased": doc.wpurchased,
			"Price": doc.price,
			"Estimated Value": doc.ev,
			"Purchased Type": doc.condition,
			"Quantity": doc.qty,
			"Date Added": doc.dateadded,
			"Additional Notes": doc.notes
		});
	}
};