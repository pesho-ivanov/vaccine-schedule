function toggleVisibleByCheckbox(container, state)
{
        $('#' + container).css("display",(state ? "block" : "none"));
}



function displayTerms()
{
	ctr =1;

	 $("a").click(function(event){
   		 
		//alert("hello");
		//if ($('#termsAndConditions').modal!=null)
		if ($('#termsAndConditions').modal!=null)
		kur = new Object();
		kur = $.modal;
		//	$.modal.close();
		ctr++;
		//alert(ctr);
 		});

	//$($("<div id='termsAndConditions'></div>")).modal( {
	$('#termsAndConditions').modal({
		onClose: function() {

		
			kur.close();
			

			$('html, body').animate({scrollTop: 3000}, 1);
		}

		

	});
	
	$.get(TAX.site_url + '/termssite/display/1',
                          function(data) {
				
				$('#termsAndConditions > #content').html(data);
                          }
                );

}

function checkUsername(username)
{
	$.ajax({
		type: "POST",
		cache: false,
		dataType: 'text',
		url: TAX.site_url + '/register/check_username_js/' + username,
		success: function(state) {
			state = parseInt(state);
			$('#f_username').css('background-color',(state ? '#8ee892' : '#ef7474'));
			return Boolean(state);
		},
		error: function() {
			$('#f_username').css('background-color', '#ef7474');
			return false;
		}
	});
}

function sendListOrder(listname, orderdata)
{
	$.ajax({
		type: "POST",
		cache: false,
		dataType: 'text',
		url: TAX.site_url + '/profile/set_user_order/' + listname,
		data: orderdata,
		success: function(state) {
			state = parseInt(state);
			return Boolean(state);
		},
		error: function() {
			return false;
		}
	});
}

function getAjaxHtml(elem_id, code)
{	
	
	var tmpHTML = $("#" + elem_id).attr(elem_id + code)
	if (tmpHTML)
	{
		$("#" + elem_id).html(tmpHTML); 
		return true;
	}

        $.get(TAX.site_url + '/ajax_service/' + code,
                  function(data)
                  {
			$("#" + elem_id).html(data);
			$("#" + elem_id).attr(elem_id + code, data);
                  }
        );
}

function getAjaxHtmlNew(elem_id, code)
{
	var tmpHTML = $("#" + elem_id).attr(elem_id + code)
	if (tmpHTML)
	{
		$("#" + elem_id).html(tmpHTML); 
		return true;
	}

        $.get('http://lex.bg/ajax_service/' + code,
                  function(data)
                  {
			$("#" + elem_id).html(data);
			$("#" + elem_id).attr(elem_id + code, data);
                  }
        );
}
