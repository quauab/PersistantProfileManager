$(document).ready(function(){
	
	initDateTime();

	$('.delete-profile').on('click',function(){        
        var rev = $(this).data('rev');  
		var id = $(this).data('id') + ':' + rev;      
		var url = '/delete/'+id;
        
		if (confirm('Delete Profile?')) {
			$.ajax({
				url: url,
				type: 'DELETE',
                data:{rev:rev},
				success:function(result){
					console.log('Deleting User ...');
					window.location.href='/';
				},
				error:function(err) {
					console.log(err);
				}
			});
		}
	});

	$('.edit-profile').on('click', function(){
		$('#edit-form-id').val($(this).data('id'));
		$('#edit-form-name').val($(this).data('name'));
		$('#edit-form-username').val($(this).data('username'));
		$('#edit-form-title').val($(this).data('title'));
		$('#edit-form-pwd').val($(this).data('pwd'));
		$('#edit-form-middle_name').val($(this).data('middle_name'));
		$('#edit-form-email').val($(this).data('email'));
		$('#edit-form-emails').val($(this).data('emails'));
		$('#edit-form-phone').val($(this).data('phone'));
		$('#edit-form-site').val($(this).data('site'));
        $('#edit-form-extra').val($(this).data('extra'));
	});
	
	$('.expand').on('click', function(){
		if ($(this).hasClass('glyphicon-triangle-top')) {
			$(this).removeClass('glyphicon glyphicon-triangle-top');
			$(this).addClass('glyphicon glyphicon-triangle-bottom');
		} else if ($(this).hasClass('glyphicon-triangle-bottom')) {			
			$(this).removeClass('glyphicon glyphicon-triangle-bottom');
			$(this).addClass('glyphicon glyphicon-triangle-top');
		}
	});
	
	//*
	$('.profile').on('click', function(){
		var id = $(this).data('id'),
			url = '/profile/' + id;
		$.ajax({
			url: url,
			type: 'GET',
			success: function(result) {
				console.log('success');
				window.location.href='/profile/' + id;
			},
			error: function(err) {
				console.log(err);
			}
		});
	});
	//*/
	
    $('.saveButton').on('click', function(){
        window.location.href = '/';
    });
    
    $('#textInput').on('click', function(){
		addTextInput();
	});
    
    $('#passwordInput').on('click', function(){
		addPasswordInput();
	});
   
    $('#emailInput').on('click', function(){
		addEmailInput();
	});
    
});

function addTextInput() {
	var divParent = newElement('div'),
		divChild = newElement('div'),
		span = newElement('span'),
		remove = newElement('span'),
		italic = newElement('i'),
		bold = newElement('b');
		input = newElement('input');

	var count = childCount(element('form1')) + 1,
        name = 'input' + count;
        
    if (confirm('Do you want to name the input?')) {
        var newName = prompt('Enter input name');
        if (newName.length) {
            name = newName;
        }
    }

	addAttribute('class', 'form-group', divParent);
    // addAttribute('id', 'inputAdder', divParent);
	addAttribute('class', 'input-group', divChild);
	addAttribute('class', 'input-group-addon', span);
	addAttribute('class', 'input-group-addon', remove);
	addAttribute('class', 'glyphicon glyphicon-edit', italic);
	addAttribute('class', 'glyphicon glyphicon-remove-sign', bold);
	addAttribute('type', 'text', input);
	addAttribute('class', 'form-control', input);
	addAttribute('placeholder', 'Enter ' + cfc(name), input);
	addAttribute('name', name, input);

	addHandler(remove, 'click', function() {
		element('form1').removeChild(divParent);
	});
    
	appendElement(divParent, divChild);
	appendElement(divChild, span);
	appendElement(span, italic);
	appendElement(divChild, input);
	appendElement(divChild, remove);
	appendElement(remove, bold);

	$(divParent).appendTo('.form');
}

function addPasswordInput() {
	var divParent = newElement('div'),
		divChild = newElement('div'),
		span = newElement('span'),
		remove = newElement('span'),
		italic = newElement('i'),
		bold = newElement('b');
		input = newElement('input');

	var count = childCount(element('form1')) + 1,
        name = 'input' + count;
        
    if (confirm('Do you want to name the input?')) {
        newName = prompt('Enter input name');
        if (newName.length) {
            name = newName;
        }
    }

	addAttribute('class', 'form-group', divParent);
    // addAttribute('id', 'inputAdder', divParent);
	addAttribute('class', 'input-group', divChild);
	addAttribute('class', 'input-group-addon', span);
	addAttribute('class', 'input-group-addon', remove);
	addAttribute('class', 'glyphicon glyphicon-lock', italic);
	addAttribute('class', 'glyphicon glyphicon-remove-sign', bold);
	addAttribute('type', 'password', input);
	addAttribute('class', 'form-control', input);
	addAttribute('placeholder', 'Enter ' + cfc(name), input);
	addAttribute('name', name, input);

	addHandler(remove, 'click', function() {
		element('form1').removeChild(divParent);
	});

       
	appendElement(divParent, divChild);
	appendElement(divChild, span);
	appendElement(span, italic);
	appendElement(divChild, input);
	appendElement(divChild, remove);
	appendElement(remove, bold);

	$(divParent).appendTo('.form');
}

function addEmailInput() {
	var divParent = newElement('div'),
		divChild = newElement('div'),
		span = newElement('span'),
		remove = newElement('span'),
		italic = newElement('i'),
		bold = newElement('b');
		input = newElement('input');

	var count = childCount(element('form1')) + 1,
        name = 'input' + count;
        
    if (confirm('Do you want to name the input?')) {
        newName = prompt('Enter input name');
        if (newName.length) {
            name = newName;
        }
    }

	addAttribute('class', 'form-group', divParent);
    // addAttribute('id', 'inputAdder', divParent);
	addAttribute('class', 'input-group', divChild);
	addAttribute('class', 'input-group-addon', span);
	addAttribute('class', 'input-group-addon', remove);
	addAttribute('class', 'glyphicon glyphicon-envelope', italic);
	addAttribute('class', 'glyphicon glyphicon-remove-sign', bold);
	addAttribute('type', 'email', input);
	addAttribute('class', 'form-control', input);
	addAttribute('placeholder', 'Enter ' + cfc(name) + ' Email', input);
	addAttribute('name', name, input);

	addHandler(remove, 'click', function() {
		element('form1').removeChild(divParent);
	});

   
    
	appendElement(divParent, divChild);
	appendElement(divChild, span);
	appendElement(span, italic);
	appendElement(divChild, input);
	appendElement(divChild, remove);
	appendElement(remove, bold);

	$(divParent).appendTo('.form');
}

function initDateTime() {
    interval = doInterval(dateTime,1);
}

function dateTime() {
	elements().navbottom.innerHTML = stamp();
}

function elements() {
	return {
		navtop:element('navbarheadertop'),
		navbottom:element('navbarheaderbottom')
	};
}
