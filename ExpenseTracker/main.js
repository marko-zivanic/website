const button = document.getElementById('add-btn');
const select = document.getElementById('category-select');
const amount = document.getElementById('amount-input');
const date = document.getElementById('date');
const div = document.getElementById('table');
const totalValue = document.getElementById('total-price');
let total = 0;
let counter = 0

function reply_click(elementId){
	let partsarray = elementId.split('-');
	let element = document.getElementById('ul-' + partsarray[1]);
	total -= parseInt(document.getElementById('cost-' + partsarray[1]).innerHTML);
	totalValue.innerHTML = total;
	element.remove()
}

button.addEventListener('click',() =>{
	if (select.value === ''){
		alert('Select is empty');
	}
	else if (amount.value === ''){
		alert('Amount is empty');
	}
	else if (date.value === ''){
		alert('Date is empty');
	}
	else{
		if (select.value === 'Income'){
			amount.value = parseInt(amount.value) * -1;
		}
		total += parseInt(amount.value);
		let ul = document.createElement('ul');
		ul.setAttribute('id','ul-' + counter);
		let li = document.createElement('li');
		let node = document.createTextNode(select.value);
		li.appendChild(node);
		ul.appendChild(li);
		li = document.createElement('li');
		li.setAttribute('id','cost-' + counter);
		node = document.createTextNode(amount.value);
		li.appendChild(node);
		ul.appendChild(li);
		li = document.createElement('li');
		node = document.createTextNode(date.value);
		li.appendChild(node);
		ul.appendChild(li);
		li = document.createElement('button');
		li.setAttribute('id','btn-' + counter);
		li.setAttribute('onClick','reply_click(this.id)')
		li.setAttribute('class','del-btn')
		node = document.createTextNode('delete');
		li.appendChild(node);
		ul.appendChild(li);
		div.appendChild(ul);
		counter++;
		totalValue.innerHTML = total;
	}
})