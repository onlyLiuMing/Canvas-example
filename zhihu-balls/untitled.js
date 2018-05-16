function getRowData(el){//传入你的CheckBox元素，不是jquer的虚拟节点
	var row = el.parentNode;//假设这是你获取的row标签
	var tds = row.getElementsByTagName("td");//row下所有的td元素
	var data = {};//用于存储数据的object
	for (var i = 0; i<tds.length;i++){
		var value = tds[i].innerHTML;
		data["td"+i+1] = value;
	}
	return value;
}