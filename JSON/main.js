var PageCounter = 1
var btn = document.getElementById('btn');
var animals = document.getElementById('animals');
btn.addEventListener('click', function(){
	var Request = new XMLHttpRequest();
	Request.open('GET','https://learnwebcode.github.io/json-example/animals-' + PageCounter + '.json');
	Request.onload = function(){
		var data = JSON.parse(Request.responseText);
		RenderHTML(data);
};
Request.send();
PageCounter++
if (PageCounter > 3){
	btn.classList.add('hidden');
}
});

function RenderHTML(data){
	var string = '';
	for(i=0;i<data.length;i++){
		string += '<p>' + data[i].name + ' is a ' + data[i].species + ' and loves ';
		for (j=0;j<data[i].foods.likes.length;j++){
			 string += data[i].foods.likes[j];
			 if (j != data[i].foods.likes.length - 1){
			 	string += ' and ';
			 } 
		}
		string += ' but hates ';
		for (j=0;j<data[i].foods.dislikes.length;j++){
			 string += data[i].foods.dislikes[j];
			 if (j != data[i].foods.dislikes.length - 1){
			 	string += ' and ';
			 } 
		}
		string += '.</p>';
	}
	animals.insertAdjacentHTML('beforeend', string);
}
