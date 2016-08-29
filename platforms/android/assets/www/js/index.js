$(document).on('pagebeforeshow', '#mainPage', function ()
{
    // alert("hello");
    localStorage.setItem("siteName", "http://sarkaripariksha.com");
    // check if user id exist
    if(localStorage.getItem("spUserId")) // if user is already logged in
    	{
    	  localStorage.setItem("userName", localStorage.getItem("spUserName"));
          localStorage.setItem("userId", localStorage.getItem("spUserId"));
    	// redirect him to profile page
          $.mobile.changePage("profile.html");

    	}
   // localStorage.setItem("userName", "");
    //localStorage.setItem("userId", "");
});


$(document).on('click', '#submit_login', function ()
{

    loginUser();
});

function loginUser()
{
    if ($('#user_name').val().length > 0 && $('#password').val().length > 0)
    {
        var userName = $('#user_name').val();
        var siteName = localStorage.getItem("siteName");

        siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttLogin.php";

        var formData = $("#frm_login").serialize();



        $.ajax({
            url: siteUrl,
            data: formData, // Convert a form to a JSON string representation
            type: 'post',
            async: true,
            dataType: "jsonp",
            jsonpCallback: 'successCallback',
            beforeSend: function () {
                $.mobile.showPageLoadingMsg(true);
            },
            complete: function () {
                $.mobile.hidePageLoadingMsg();
            },
            success: function (result)
            {

                $.each(result, function (i, row)
                {
                    if (row.section_title == 'valid')
                    {
                        var uid = row.section_id;

                        localStorage.setItem("userName", userName);
                        localStorage.setItem("userId", uid);
                        localStorage.setItem("spUserId", uid);
                        localStorage.setItem("spUserName", userName);

                        // check if user has requested for plan purchase
                        // redirect him to checkout page directly
                        var reqPlanId= localStorage.getItem("TT_REQUESTED_PLAN_ID");
          			    var reqExamID= localStorage.getItem("TT_REQUESTED_CATEGORY_ID");
          			  var demoExamID= localStorage.getItem("TT_DEMO_EXAM_ID");
          			    if(reqPlanId!="" && reqPlanId!="")
          			    	{
          		           callCheckout(true);
          			    	}
          			    /*else if(demoExamID!="") // if user want to give demo exam
          			    	{
          			    	openMockTest(demoExamID);
          			    	} */
          			    else
          			    	{
          			    	 $.mobile.changePage("profile.html");
          			    	}


                    }
                    else
                    {
                        $('#loginmsg').empty();
                        $('#loginmsg').append('<p>' + row.section_title + '</p>');
                    }


                });


            },
            error: function (x, t, m) {
                alert('Network error has occurred please try again! ');
            }
        });



    }
    else
    {
        alert('Please fill all necessary fields');
    }

}
/*-----Logout the user------------*/
$(document).on('click', '#btn_logout', function ()
{
    localStorage.setItem("userName", "");
    localStorage.setItem("userId", "");

    localStorage.setItem("spUserName","");
    localStorage.setItem("spUserId", "");


    $.mobile.changePage("index.html");
});
/*---------End of log out code---------*/

/*-------Call Profile Page-------------------*/

$(document).on('pagebeforeshow', '#profile_page', function ()
{
    callProfilePage();
});

$(document).on('click', '#btn_profile_back', function ()
        {
             callProfilePage();
        });


function callProfilePage()
{

    var siteName = localStorage.getItem("siteName");
    var userId = localStorage.getItem("userId");

    var userList = {'user_id': userId};

    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttProfile.php";

    $.ajax({
        type: "GET",
        url: siteUrl,
        data: userList,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {

            dataT = $.trim(data);
            $('#profile_page').empty();

            $('#profile_page').append(dataT);
            $('#profile_page').trigger('create');





        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
}

/*----------End of profile page--------------*/


/*--------- Word Page -----------------------*/

$(document).on('pagebeforeshow', '#my_word_page', function ()
{
    callMyTodaywordPage();
});

function callMyTodaywordPage()
{

    var siteName = localStorage.getItem("siteName");
    var userId = localStorage.getItem("userId");

    var userList = {'user_id': userId};

    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttMyword.php";

    $.ajax({
        type: "GET",
        url: siteUrl,
        data: userList,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {

            dataT = $.trim(data);
            $('#my_word_page').empty();

            $('#my_word_page').append(dataT);
            $('#my_word_page').trigger('create');





        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
}



/*------------- End Of Word Page --------------*/



/*--------- Word Page -----------------------*/

$(document).on('pagebeforeshow', '#my_scratch_page', function ()
{
    callMywordPage();
});

function callMywordPage()
{

    var siteName = localStorage.getItem("siteName");
    var userId = localStorage.getItem("userId");

    var userList = {'user_id': userId};

    siteUrl = siteName + "/wp-content/plugins/tet-india/m/scratch.php";

    $.ajax({
        type: "GET",
        url: siteUrl,
        data: userList,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {

            dataT = $.trim(data);
            $('#my_scratch_page').empty();

            $('#my_scratch_page').append(dataT);
            $('#my_scratch_page').trigger('create');





        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
}



/*------------- End Of Word Page --------------*/


/*--------- Ranking Page -----------------------*/

$(document).on('pagebeforeshow', '#my_ranking_page', function ()
{
    callRankingPage();
});

function callRankingPage()
{

    var siteName = localStorage.getItem("siteName");
    var userId = localStorage.getItem("userId");

    var userList = {'user_id': userId};

    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttRanking.php";

    $.ajax({
        type: "GET",
        url: siteUrl,
        data: userList,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {

            dataT = $.trim(data);
            $('#my_ranking_page').empty();

            $('#my_ranking_page').append(dataT);
            $('#my_ranking_page').trigger('create');





        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
}



/*------------- End Of Raanking Page --------------*/


function slide_me(id)
{
    $("#" + id).slideToggle("fast");
}
/*----------------------My Tutorial Page----------------------------*/
$(document).on('pagebeforeshow', '#mytutorial_page', function ()
{
    var siteName = localStorage.getItem("siteName");
    var userId = localStorage.getItem("userId");

    var userList = {'user_id': userId};

    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttMyTutorials.php";

    $.ajax({
        type: "GET",
        url: siteUrl,
        data: userList,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);
            $('#mytutorial_page').empty();

            $('#mytutorial_page').append(dataT);
            $('#mytutorial_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
});

/*----------------Open tutorial----------------------------*/
function openTutorial(sId)
{
    $.mobile.changePage("ttViewTutorial.html");
    var siteName = localStorage.getItem("siteName");
    var userId = localStorage.getItem("userId");

    var userList = {'user_id': userId, 'sID': sId};

    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttExamTree.php";


    $.ajax({
        type: "GET",
        url: siteUrl,
        data: userList,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {


            dataT = $.trim(data);
            $('#view_tutorial_page').empty();

            $('#view_tutorial_page').append(dataT);
            $('#view_tutorial_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
}

function alertMsg()
{
    alert('Coming Soon.');
}

/*--------------Read Tutorial------------------*/
function readTutorial(cId, sId)
{
    $.mobile.changePage("ttReadTutorial.html");

    var siteName = localStorage.getItem("siteName");


    var dataList = {'cId': cId, 'sID': sId};

    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttViewTutorial.php";


    $.ajax({
        type: "GET",
        url: siteUrl,
        data: dataList,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {


            dataT = $.trim(data);
            $('#read_tutorial_page').empty();

            $('#read_tutorial_page').append(dataT);
            $('#read_tutorial_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
}
/*--------------End of  Read Tutorial------------------*/

/*---------------Slide the tutorial content-----------------------*/
function slideDiv(id)
{
    $("#content-" + id).slideToggle("slow");
    // now check if class exist

    if ($('#head-' + id).hasClass("tutorial_header_active"))
    {
        $('#head-' + id).removeClass("tutorial_header_active");
    }
    else
    {
        $('#head-' + id).addClass("tutorial_header_active");
    }



}
/*------------------End of Slide the tutorial content------------------------------------*/

/*---------------------Login user on enter keypress-----------------------------*/
$(document).keypress(function (event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);

    if (keycode == '13') // enter key press
    {
        // check if user is logged in.. if not then call login function on enter key press
        if (localStorage.getItem("userId") == "")
        {
            loginUser();
        }


    }


});
/*-------------------------------------------------------------------------------*/




/*-----------------------------My Subject Wise Exam Page----------------------------------------*/

$(document).on('pagebeforeshow', '#subject_exam_page', function ()
{
    var siteName = localStorage.getItem("siteName");
    var userId = localStorage.getItem("userId");

    var userList = {'user_id': userId};

    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttMyExamssubject.php";

    $.ajax({
        type: "GET",
        url: siteUrl,
        data: userList,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);
           // $('#subject_exam_page').empty();
           $('#subject_exam_page').html(dataT);
            //$('#subject_exam_page').append(dataT);
            //$('#subject_exam_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            console.log(errorThrown);
            console.log(jqXHR);
            alert('Network error has occurred please try again!');
        }

    });
});
/*----------------------------------------------------------------------------------*/

/*-----------------------------My Exam Page----------------------------------------*/

$(document).on('pagebeforeshow', '#my_exam_page', function ()
{
    var siteName = localStorage.getItem("siteName");
    var userId = localStorage.getItem("userId");

    var userList = {'user_id': userId};

    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttMyExams.php";

    $.ajax({
        type: "GET",
        url: siteUrl,
        data: userList,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);
            $('#my_exam_page').empty();

            $('#my_exam_page').append(dataT);
            $('#my_exam_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
});
/*----------------------------------------------------------------------------------*/

function showAlert(msg)
{
    alert(msg);
}



function startMockTest(sId)
{
    var siteName = localStorage.getItem("siteName");
    $.mobile.changePage("ttMockTest.html");

    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttMockTest.php";
    var formData = $("#frmStartMock" + sId).serialize();

    //alert(formData);

    $.ajax({
        type: "POST",
        url: siteUrl,
        data: formData,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);
            $('#mock_test_page').empty();

            $('#mock_test_page').append(dataT);
            $('#mock_test_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
}


$(document).on('click', '#show_areas', function ()
{
    // check if user selected instruction checkbox
    console.log(document.getElementById('chk_accept').checked);
    if (document.getElementById('chk_accept').checked)
    {

        document.getElementById('instruction_area1').style.display = 'none'; 
        document.getElementById('instruction_area2').style.display = 'block';
    }
    else
    {
        alert('Please tick instructions checkbox!');
    }
});


$(document).on('click', '#show_area2', function ()
{
    // check if user selected instruction checkbox
    if ($('#chk_accept').is(':checked'))
    {
        $('#instruction_area1').css({'display': 'none'});
        $('#instruction_area2').css({'display': 'block'});
    }
    else
    {
        alert('Please tick instructions checkbox!');
    }
});



$(document).on('click', '#start_subject_test', function ()
{
    console.log('enter function');
    $('#instruction_area2').css({'display': 'none'});
    $('#question_div').css({'display': 'block'});
    //get site url
    var siteName = localStorage.getItem("siteName");
    var userId = localStorage.getItem("userId");
     var sID = document.getElementById('sID').value;
     var view = document.getElementById('view').value;
     var exam_subject_category_id = document.getElementById('exam_cat_subject_id').value;
     var exam_parent_id = document.getElementById('exam_parent_id').value;

  

   // alert('view->'+view+' exam='+exam_category_id+'sid='+sID);

    var formData = {'user_id': userId, 'sID': sID, 'view': view, 'exam_category_id': exam_category_id};


    var siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttsubjectquestion.php?sID="+sID+"&view="+view+"&exam_subject_category_id="+exam_subject_category_id+"&exam_parent_id="+exam_parent_id;

    $.ajax({
        type: "POST",
        url: siteUrl,
        data: formData,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            $('#tt_time_div').css({'display': 'block'});
            $('#dashboard').css({'display': 'block'});
            $("#question_div").html(data);
            $('#question_div').trigger('create');
            setCountDown(); // start timer
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('We are unable to load page,Please try again');
            $('#instruction_area1').css({'display': 'block'});
        }

    });


});



$(document).on('click', '#start_test', function ()
{
    $('#instruction_area2').css({'display': 'none'});
    $('#question_div').css({'display': 'block'});
    //get site url
    var siteName = localStorage.getItem("siteName");
    var userId = localStorage.getItem("userId");

    var sID = $("#sID").val();
    var view = $("#view").val();
    var exam_category_id = $('#exam_category_id').val();

   // alert('view->'+view+' exam='+exam_category_id+'sid='+sID);

    var formData = {'user_id': userId, 'sID': sID, 'view': view, 'exam_category_id': exam_category_id};


    var siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttMockQuestion.php";

    $.ajax({
        type: "POST",
        url: siteUrl,
        data: formData,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            $('#tt_time_div').css({'display': 'block'});
            $('#dashboard').css({'display': 'block'});
            $("#question_div").html(data);
            $('#question_div').trigger('create');
            setCountDown(); // start timer
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('We are unable to load page,Please try again');
            $('#instruction_area1').css({'display': 'block'});
        }

    });


});







/*-------------------------Mock test functions-------------------------------*/
//-------------Next button click -----------------
$(document).on('click', '.tet_mock_next', function ()
{

    var buttonId = this.id;
    var id = parseInt(buttonId.substring(7));
    var prevId = 'ques_' + id;
    var test_taken_id = $('#test_taken_id').val();
    var time_taken = $('#time_taken').val();

    var url = localStorage.getItem("siteName");

    // check if radio button is checked
           var radioName = 'rd_ans' + id;

     if ($('input[name=' + radioName + ']:checked').length)
     // button is checked mark thsi question as attempted
     {

     var qid = "Q" + id;
     // remove this question from pending list
     var removeId = "tt_pend_q" + id;
     //$("#"+removeId  ).remove();

     $("#" + removeId).css({'background-color': '#00CC00', 'border': '1 px solid #00CC00'});

     }


    ++id;

    var nextId = 'ques_' + id;

    // alert('next==>'+prevId+'  '+nextId);

    $('#' + prevId).css({'display': 'none', 'width': '100%'});
    $('#' + nextId).css({'display': 'block', 'width': '100%'});
    $('#tet_previous' + id).css({'display': 'block'}); // show previous button
    $('#tet_previous_disable' + id).css({'display': 'none'}); // show previous button

    // save the current display question id
    $("#currentQuestionId").val(id);

    // get the maximum no of question
    var MaxQuestionNo = $("#MaxQuestionNo").val();

    if (id == MaxQuestionNo) // hide the next button
    {
        $('#tet_mock_next' + id).css({'display': 'none'});
        $('#tet_mock_next_disable' + id).css({'display': 'block'}); // show next disable button
    }



    var module_id = $('#mod_id' + id).val();
    var subject_id = $('#cat_id' + id).val();

    var ques_id = $('#q_id' + id).val();


    // save total time taken for this question by user
    saveTimeSpentOnQues(test_taken_id, time_taken, ques_id, module_id, subject_id);

});
//-------------End of next  button click -----------------



//------------ PREVIOUS BUTTON CLICK--------------------

$(document).on('click', '.tet_prevoius', function ()
{
    var buttonId = this.id;
    var id = parseInt(buttonId.substring(7));
    var curId = 'ques_' + id;
    var url = localStorage.getItem("siteName");
    var test_taken_id = $('#test_taken_id').val();
    var time_taken = $('#time_taken').val();

    // check if radio button is checked
      var radioName = 'rd_ans' + id;
     if ($('input[name=' + radioName + ']:checked').length)  // button is checked mark thsi question as attempted
     {
     var qid = "Q" + id;
     // change the color of question
     var removeId = "tt_pend_q" + id;
     //$("#"+removeId  ).remove();
     $("#" + removeId).css({'background-color': '#00CC00'});

     }

    --id;

    var prevId = 'ques_' + id;

    //   alert('next==>'+prevId+'  '+nextId);

    $('#' + curId).css({'display': 'none', 'width': '100%'});
    $('#' + prevId).css({'display': 'block', 'width': '100%'});
    if (id == 1)
    {
        $('#tet_previous' + id).css({'display': 'none'});
        $('#tet_previous_disable' + id).css({'display': 'block'}); // show previous button
    }
    else
    {
        $('#tet_previous' + id).css({'display': 'block'});
        $('#tet_previous_disable' + id).css({'display': 'none'}); // show previous button
    }

    // save the current display question id
    $("#currentQuestionId").val(id);

    // get the maximum no of question
    var MaxQuestionNo = $("#MaxQuestionNo").val();

    if (id == MaxQuestionNo) // hide the next button
    {
        $('#tet_mock_next' + id).css({'display': 'none'});
        $('#tet_mock_next_disable' + id).css({'display': 'block'}); // show next disable button
    }


    var module_id = $('#mod_id' + id).val();
    var subject_id = $('#cat_id' + id).val();

    var ques_id = $('#q_id' + id).val();



    // save total time taken for this question by user
    saveTimeSpentOnQues(test_taken_id, time_taken, ques_id, module_id, subject_id);

});
//-------------END OF PREVIOUS BUTTON CLICK-------------

function saveTimeSpentOnQues(test_taken_id, time_taken, ques_id, module_id, subject_id)
{
    var formData = {'test_taken_id': test_taken_id, 'time_taken': time_taken, 'question_id': ques_id, 'module_id': module_id, 'subject_id': subject_id, 'ip': '0'};

    var siteName = localStorage.getItem("siteName");
    var siteUrl = siteName + "/wp-content/plugins/tet-india/tt_save_exam_time.php";

    $.ajax({
        type: "POST",
        url: siteUrl,
        data: formData,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
        	var saveRes = data;
        },
        error: function (jqXHR, status, errorThrown)
        {

        }

    });
}


/*----------------------------------------------------------------------------*/

// save subject answer on radio button click

//$(document).on('click', '.tt_test_option', function ()
$(document).on('change', '[type="radio"].tt_test_option_subject', function()
{
    console.log(this);
    var timee=(document.getElementById("tt_timer").innerHTML).replace(/\s/g, '');

    var url = localStorage.getItem("siteName");

    var buttonId = this.name;
    
    var answer = document.getElementById().value
    
    var id = parseInt(buttonId.substring(6));

    var ques_id = $('#q_id' + id).val();
    var module_id = $('#mod_id' + id).val();
    var subject_id = $('#cat_id' + id).val();
    var test_taken_id = $('#test_taken_id').val();
    var idAddress = 0;
    var time_taken = $('#time_taken').val();


    var siteUrl = url + "/wp-content/plugins/tet-india/tt_save_test_question.php";


    formData = {"test_taken_id": test_taken_id, "ip": idAddress, "question_id": ques_id, "answer":
                answer, "module_id": module_id, "subject_id": subject_id, "time_taken": time_taken,"enterTime":timee};


console.log(formData);
  /*  $.ajax({
        type: "POST",
        url: siteUrl,
        data: formData,
        cache: false,
        dataType: "text",
        beforeSend: function () {

        },
        complete: function () {

        },
        success: function (data, status)
        {
            var saveRes = data;
        },
        error: function (jqXHR, status, errorThrown)
        {

        }

    });*/
});

/*---------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------*/

// save answer on radio button click

//$(document).on('click', '.tt_test_option', function ()
$(document).on('change', '[type="radio"].tt_test_option', function()
{

    var timee=(document.getElementById("tt_timer").innerHTML).replace(/\s/g, '');

    var url = localStorage.getItem("siteName");

    var buttonId = this.name;

    var answer = $('#' + this.id).val();
    var id = parseInt(buttonId.substring(6));

    var ques_id = $('#q_id' + id).val();
    var module_id = $('#mod_id' + id).val();
    var subject_id = $('#cat_id' + id).val();
    var test_taken_id = $('#test_taken_id').val();
    var idAddress = 0;
    var time_taken = $('#time_taken').val();


    var siteUrl = url + "/wp-content/plugins/tet-india/tt_save_test_question.php";


    formData = {"test_taken_id": test_taken_id, "ip": idAddress, "question_id": ques_id, "answer":
                answer, "module_id": module_id, "subject_id": subject_id, "time_taken": time_taken,"enterTime":timee};

    $.ajax({
        type: "POST",
        url: siteUrl,
        data: formData,
        cache: false,
        dataType: "text",
        beforeSend: function () {

        },
        complete: function () {

        },
        success: function (data, status)
        {
            var saveRes = data;
        },
        error: function (jqXHR, status, errorThrown)
        {

        }

    });
});

/*---------------------------------------------------------------------------------*/
/*--------------------------Save pending Test--------------------------------------*/

$(document).on('click', '#tt_btn_save', function ()
		{
			if(confirm("Are you sure to save and exit the exam??"))
			{
		    var url = localStorage.getItem("siteName");


		    var siteUrl = url + "/wp-content/plugins/tet-india/m/ttSavePendingTest.php";

		   // alert(siteUrl);

		    var formData = $("#frmMockTest").serialize();

		  //  alert(formData);
		    $.ajax({
		        type: "POST",
		        url: siteUrl,
		        data: formData,
		        cache: false,
		        dataType: "text",
		        beforeSend: function () {
		            $.mobile.showPageLoadingMsg(true);
		        },
		        complete: function () {
		            $.mobile.hidePageLoadingMsg();
		        },
		        success: function (data, status)
		        {
		        	   $.mobile.changePage("profile.html");
		        },
		        error: function (jqXHR, status, errorThrown)
		        {
		        	alert("there is some error whie saving the exam.");
		        	   $.mobile.changePage("profile.html");
		        }

		    });
			}
		});

/*-----------------------------------------------------------------------------------*/

$(document).on('click', '#tt_at_q_hd', function ()
		{

	$("#tt_q_left").slideToggle("slow");
    $("#tt_pend_div").slideToggle("slow");
});
/*-----------------------------------------------------------------------------------------*/

// add onclick event for pending question link
// this will display that question
$(document).on('click', '.tt_pend_q', function ()
{
	//alert('id');
    var buttonId = this.id;

    var id = parseInt(buttonId.substring(9));
    var test_taken_id = $('#test_taken_id').val();
    var time_taken = $('#time_taken').val();


    // get the current display question id
    var currentId = $("#currentQuestionId").val();
    var currentQuestionId = 'ques_' + currentId;


    // check if radio button is checked
    var radioName = 'rd_ans' + currentId;
    if ($('input[name=' + radioName + ']:checked').length)  // button is checked mark thsi question as attempted
    {

        var qid = "Q" + currentId;
        // change the color of question
        var removeId = "tt_pend_q" + currentId;
        //$("#"+removeId  ).remove();
        $("#" + removeId).css({'background-color': '#00CC00'});

    }

    var targetQuestionId = 'ques_' + id;




    $('#' + currentQuestionId).css({'display': 'none', 'width': '100%'}); // hide current question
    $('#' + targetQuestionId).css({'display': 'block', 'width': '100%'}); // display target question

    // save the current display question id
    $("#currentQuestionId").val(id);

    // get the maximum no of question
    var MaxQuestionNo = $("#MaxQuestionNo").val();

    // alert(id+' max=='+MaxQuestionNo)

    // display and hide the next and previus button
    if (id == 1) // hide the previous button
    {
        $('#tet_previous' + id).css({'display': 'none'});
        $('#tet_previous_disable' + id).css({'display': 'block'}); // show previous button
    }
    else
    {
        $('#tet_previous' + id).css({'display': 'block'});
        $('#tet_previous_disable' + id).css({'display': 'none'}); // show previous button
    }

    if (id == MaxQuestionNo) // hide the next button
    {
        $('#tet_mock_next' + id).css({'display': 'none'});
        $('#tet_mock_next_disable' + id).css({'display': 'block'}); // show next disable button
    }

    // save total time taken by user
  var module_id = $('#mod_id' + id).val();
    var subject_id = $('#cat_id' + id).val();
    var idAddress = $('#ipAdress').val();
     var ques_id = $('#q_id' + id).val();




    // save total time taken for this question by user
    saveTimeSpentOnQues(test_taken_id, time_taken, ques_id, module_id, subject_id);

    $("#tt_q_left").slideToggle("slow");
    $("#tt_pend_div").slideToggle("slow");
});

/*----------------------------------------------------*/
function viewHistory(testId){
		    var siteName = localStorage.getItem("siteName");
		    var userId = localStorage.getItem("userId");

		    $.mobile.changePage("viewHistory.html");

		    var userList = {'user_id': userId,'testId':testId};

		    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttViewHistory.php";

		    $.ajax({
		        type: "GET",
		        url: siteUrl,
		        data: userList,
		        cache: false,
		        dataType: "text",
		        beforeSend: function () {
		            $.mobile.showPageLoadingMsg(true);
		        },
		        complete: function () {
		            $.mobile.hidePageLoadingMsg();
		        },
		        success: function (data, status)
		        {
		            dataT = $.trim(data);
		            $('#tt_history_page').empty();

		            $('#tt_history_page').append(dataT);
		            $('#tt_history_page').trigger('create');
		        },
		        error: function (jqXHR, status, errorThrown)
		        {
		            alert('Network error has occurred please try again!');
		        }

		    });
		}


$(document).on('click', '.ttMenuLi', function ()
		{

	 $("#ttMenu").children().removeClass("current");

    var buttonId = this.id;

	$("#"+buttonId).addClass('current');

	// hide all graph div
	$(".graphDiv").css({'display': 'none'});
	// display only selected menu div

	$("#"+buttonId+'_div').css({'display': 'block'});
		});

$(document).on('click', '#submit_mock_test', function ()
{

	submitMockExam();

});


 function submitMockExam()
 {

	 $.mobile.changePage("mockResult.html");
     var siteName = localStorage.getItem("siteName");

     siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttMockTestResult.php";



     var formData = $("#frmMockTest").serialize();

		        $.ajax({
		            url: siteUrl,
		            data: formData, // Convert a form to a JSON string representation
		            type: 'post',
		            cache: false,
		            dataType: "text",
		            beforeSend: function () {
		                $.mobile.showPageLoadingMsg(true);
		            },
		            complete: function () {
		                $.mobile.hidePageLoadingMsg();
		            },
		            success: function  (data, status)
		            {

		            	  dataT = $.trim(data);
				            $('#mock_result_page').empty();

				            $('#mock_result_page').append(dataT);
				            $('#mock_result_page').trigger('create');


		            },
		            error: function (x, t, m) {
		            	$('#tet_loading_img').css({'display': 'none'});
		                alert('Network error has occurred please try again! ');
		            }
		        });
 }

 $(document).on('change', '[type="radio"].myClass', function(){
     alert('Change');
    // var buttonId = this.name;
     var answer = $('#' + this.id).val();
     alert('val'+answer);
 });

 $(document).on('pagebeforeshow', '#my_exam_his_page', function ()
			{
			    var siteName = localStorage.getItem("siteName");
			    var userId = localStorage.getItem("userId");

			    var userList = {'user_id': userId};

			    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttMyHistory.php";

			    $.ajax({
			        type: "GET",
			        url: siteUrl,
			        data: userList,
			        cache: false,
			        dataType: "text",
			        beforeSend: function () {
			            $.mobile.showPageLoadingMsg(true);
			        },
			        complete: function () {
			            $.mobile.hidePageLoadingMsg();
			        },
			        success: function (data, status)
			        {
			            dataT = $.trim(data);
			            $('#my_exam_his_page').empty();

			            $('#my_exam_his_page').append(dataT);
			            $('#my_exam_his_page').trigger('create');
			        },
			        error: function (jqXHR, status, errorThrown)
			        {
			            alert('Network error has occurred please try again!');
			        }

			    });
			});

 function resumeExam(testTakenId)
 {
	     var siteName = localStorage.getItem("siteName");
	     $.mobile.changePage("ttMockTest.html");

	     siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttMockTest.php";
	    // alert("#frmPendingExam" + testTakenId);

	     var formData = $("#frmPendingExam" + testTakenId).serialize();

	   //  alert(formData);

	     $.ajax({
	         type: "POST",
	         url: siteUrl,
	         data: formData,
	         cache: false,
	         dataType: "text",
	         beforeSend: function () {
	             $.mobile.showPageLoadingMsg(true);
	         },
	         complete: function () {
	             $.mobile.hidePageLoadingMsg();
	         },
	         success: function (data, status)
	         {
	             dataT = $.trim(data);
	             $('#mock_test_page').empty();

	             $('#mock_test_page').append(dataT);
	             $('#mock_test_page').trigger('create');
	           //  alert('succ');
	         },
	         error: function (jqXHR, status, errorThrown)
	         {
	             alert('Network error has occurred please try again!');
	         }

	     });
	 }


 $(document).on('click', '#start_pending_test', function ()
{
	 $('#instruction_area2').css({'display':'none'});
	 $('#question_div').css({'display':'block'});
	        //get site url

	        var siteName = localStorage.getItem("siteName");
	        var sID= $("#sID").val();
	        var view= $("#view").val();
	        var userId = localStorage.getItem("userId");
	        var testTakenId=$("#test_taken_id").val();

	        var formData = {'user_id': userId, 'sID': sID, 'view': view, 'testTakenId': testTakenId};


	        var siteUrl=siteName+"/wp-content/plugins/tet-india/m/ttMockPendingQuestion.php" ;

	        $.ajax({
	            type: "POST",
	            url: siteUrl,
	            data: formData,
	            cache: false,
	            dataType: "text",
	            beforeSend: function () {
	                $.mobile.showPageLoadingMsg(true);
	            },
	            complete: function () {
	                $.mobile.hidePageLoadingMsg();
	            },
	            success: function (data, status)
	            {
	                $('#tt_time_div').css({'display': 'block'});
	                $('#dashboard').css({'display': 'block'});
	                $("#question_div").html(data);
	                $('#question_div').trigger('create');
	                setCountDown(); // start timer
	            },
	            error: function (jqXHR, status, errorThrown)
	            {
	                alert('We are unable to load page,Please try again');
	                $('#instruction_area1').css({'display': 'block'});
	            }

	        });

});

 $(document).on('pagebeforeshow', '#my_account_page', function ()
			{
			    var siteName = localStorage.getItem("siteName");
			    var userId = localStorage.getItem("userId");

			    var userList = {'user_id': userId};

			    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttAccountHeader.php";

			    $.ajax({
			        type: "GET",
			        url: siteUrl,
			        data: userList,
			        cache: false,
			        dataType: "text",
			        beforeSend: function () {
			            $.mobile.showPageLoadingMsg(true);
			        },
			        complete: function () {
			            $.mobile.hidePageLoadingMsg();
			        },
			        success: function (data, status)
			        {
			            dataT = $.trim(data);
			            $('#my_account_page').empty();

			            $('#my_account_page').append(dataT);
			            $('#my_account_page').trigger('create');
			        },
			        error: function (jqXHR, status, errorThrown)
			        {
			            alert('Network error has occurred please try again!');
			        }

			    });
			});
 $(document).on('pagebeforeshow', '#personal_info_page', function ()
			{
			    var siteName = localStorage.getItem("siteName");
			    var userId = localStorage.getItem("userId");

			    var userList = {'user_id': userId,'display':"personal_info"};

			    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttPersonalInfo.php";

			    $.ajax({
			        type: "GET",
			        url: siteUrl,
			        data: userList,
			        cache: false,
			        dataType: "text",
			        beforeSend: function () {
			            $.mobile.showPageLoadingMsg(true);
			        },
			        complete: function () {
			            $.mobile.hidePageLoadingMsg();
			        },
			        success: function (data, status)
			        {
			            dataT = $.trim(data);
			            $('#personal_info_page').empty();

			            $('#personal_info_page').append(dataT);
			            $('#personal_info_page').trigger('create');
			        },
			        error: function (jqXHR, status, errorThrown)
			        {
			            alert('Network error has occurred please try again!');
			        }

			    });
			});
 /* change city on state change */
 $(document).on('change', '#cmbState', function ()
 {

     var state = $(this).val();

     state = state.replace(/ /g, '%20');
     var siteName = localStorage.getItem("siteName");
     siteUrl=siteName+"/wp-content/plugins/tet-india/get_city.php";
    // $("#cmbCity").load(siteName+"/wp-content/plugins/tet-india/get_city.php?state=" + state);

     var List = {'state': state};

     $.ajax({
	        type: "GET",
	        url: siteUrl,
	        data: List,
	        cache: false,
	        dataType: "text",
	        beforeSend: function () {
	            $.mobile.showPageLoadingMsg(true);
	        },
	        complete: function () {
	            $.mobile.hidePageLoadingMsg();
	        },
	        success: function (data, status)
	        {
	            dataT = $.trim(data);
	            $('#cmbCity').empty();

	            $('#cmbCity').append(dataT);
	            $('#cmbCity').trigger('create');
	        },
	        error: function (jqXHR, status, errorThrown)
	        {
	            alert('Network error has occurred please try again!');
	        }

	    });

 });
$(document).on('click', '#submit_per_info', function ()
		{

	if(validatePersonalForm())
		{
    var siteName = localStorage.getItem("siteName");
    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttPersonalInfo.php";
    var formData = $("#frmPersInfo").serialize();

    $.ajax({
        type: "POST",
        url: siteUrl,
        data: formData,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);
            $('#personal_info_page').empty();

            $('#personal_info_page').append(dataT);
            $('#personal_info_page').trigger('create');

        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
		}
});

$(document).on('click', '#submit_acc_info', function ()
		{

	if(validateAccountForm())
		{
    var siteName = localStorage.getItem("siteName");
    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttPersonalInfo.php";
    var formData = $("#frmAccount").serialize();

    $.ajax({
        type: "POST",
        url: siteUrl,
        data: formData,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);
            $('#account_page').empty();

            $('#account_page').append(dataT);
            $('#account_page').trigger('create');

        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
		}
});

function validatePersonalForm()
{
	 if ($('#billing_first_name').val() == '')
	    {

	       alert("Please Enter First Name.");
	        return false;
	    }
	    if ($('#billing_last_name').val() == '')
	    {
	    	alert("Please Enter Last Name.");
	        return false;
	    }
	    if ($('#billing_address_1').val() == '')
	    {
	    	alert("Please Enter Address.");
	        return false;
	    }
	    if ($('#cmbState').val() == '')
	    {
	    	alert("Please Enter State.");
	        return false;
	    }
	    if ($('#cmbCity').val() == '')
	    {
	    	alert("Please Enter City.");
	        return false;
	    }
	    if ($('#billing_postcode').val() == '')
	    {
	    	alert("Please Enter ZipCode.");
	        return false;
	    }

	    if ($('#billing_email').val() == '')
	    {

	    	alert("Please Enter Email.");
	        return false;
	    }
	    else
	    	{
		    	if( !isValidEmailAddress( $('#billing_email').val() ) )
	    		{
		    		alert("Please Enter Valid Email.");
			        return false
	    		}
	    	}

	    if ($('#billing_phone').val()  == '')
	    {
	    	alert("Please Enter Phone.");
	        return false;
	    }
	    return true;
	}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
};

$(document).on('pagebeforeshow', '#account_page', function ()
		{
		    var siteName = localStorage.getItem("siteName");
		    var userId = localStorage.getItem("userId");

		    var userList = {'user_id': userId,'display':"account_info"};

		    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttPersonalInfo.php";

		    $.ajax({
		        type: "GET",
		        url: siteUrl,
		        data: userList,
		        cache: false,
		        dataType: "text",
		        beforeSend: function () {
		            $.mobile.showPageLoadingMsg(true);
		        },
		        complete: function () {
		            $.mobile.hidePageLoadingMsg();
		        },
		        success: function (data, status)
		        {
		            dataT = $.trim(data);
		            $('#account_page').empty();

		            $('#account_page').append(dataT);
		            $('#account_page').trigger('create');
		        },
		        error: function (jqXHR, status, errorThrown)
		        {
		            alert('Network error has occurred please try again!');
		        }

		    });
		});

function callRegistrationForm()
{
	var siteName = localStorage.getItem("siteName");


    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttRegistrationForm.php";

    $.ajax({
        type: "GET",
        url: siteUrl,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);

            $('#registration_page').empty();

            $('#registration_page').append(dataT);
            $('#registration_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
	}

// Get registration form
$(document).on('click', '#btn_regis', function ()
{
	  $.mobile.changePage("ttRegistrationPage.html");

	  callRegistrationForm();

		});

// submit registration
$(document).on('click', '#submit_register', function ()
{
	if(validateForm()) // chek for validation
	{

	        var siteName = localStorage.getItem("siteName");

	        siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttRegisterUser.php";

	        var formData = $("#frmRegister").serialize();



	        $.ajax({
	            url: siteUrl,
	            data: formData, // Convert a form to a JSON string representation
	            type: 'post',
	            cache: false,
		        dataType: "text",
	            beforeSend: function () {
	                $.mobile.showPageLoadingMsg(true);
	            },
	            complete: function () {
	                $.mobile.hidePageLoadingMsg();
	            },
	            success: function (data, status)
		        {
		            dataT = $.trim(data);
		            $('#register_msg').empty();
		            $('#register_msg').append(dataT);

		        },
	            error: function (jqXHR, status, errorThrown)
		        {
		            alert('Network error has occurred please try again!');
		        }

		    });
	    }



});

function validateForm()
{
	 if ($('#user_name').val().length > 0 && $('#password').val().length > 0 && $('#password_repeat').val().length > 0 && $('#email').val().length > 0)
		 {
		  if($('#password').val()==$('#password_repeat').val())
			  {
			  // chek for valid email
			  if( !isValidEmailAddress( $('#email').val() ) )
	    		{
		    		alert("Please Enter Valid Email.");
			        return false;
	    		}
			  else
				  {
				  return true;
				  }

			  }
		  else
			  {
			  	alert('Passwords do not match!');
				 return false;
			  }
		 }
	 else
		 {
		 alert('Please fill all the fields!');
		 return FALSE;
		 }
}
function loadLoginPage()
{
	$.mobile.changePage("ttLoginPage.html");

 	var siteName = localStorage.getItem("siteName");


    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttLoginForm.php";

    $.ajax({
        type: "GET",
        url: siteUrl,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);

            $('#login_page').empty();

            $('#login_page').append(dataT);
            $('#login_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('mNetwork error has occurred please try again!');
        }

    });
}


function loadLoginPageDemo()
{
    $.mobile.changePage("ttLogindemo.html");

    var siteName = localStorage.getItem("siteName");


    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttLoginFormDemo.php";
   
   console.log('call Login Form');
    $.ajax({
        type: "GET",
        url: siteUrl,
        cache: false,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);

            $('#login_page').empty();

            $('#login_page').append(dataT);
            $('#login_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('mNetwork error has occurred please try again!');
        }

    });
}

$(document).on('click', '#btn_login', function ()
		{

			loadLoginPage();

		});

$(document).on('click', '#btn_search_exam', function ()
		{

	  $.mobile.changePage("ttExamCategortyPage.html");
		var siteName = localStorage.getItem("siteName");


	    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttExamCategory.php";

	    $.ajax({
	        type: "GET",
	        url: siteUrl,
	        cache: false,
	        dataType: "text",
	        beforeSend: function () {
	            $.mobile.showPageLoadingMsg(true);
	        },
	        complete: function () {
	            $.mobile.hidePageLoadingMsg();
	        },
	        success: function (data, status)
	        {
	            dataT = $.trim(data);

	            $('#exam_category_page').empty();

	            $('#exam_category_page').append(dataT);
	            $('#exam_category_page').trigger('create');
	        },
	        error: function (jqXHR, status, errorThrown)
	        {
	            alert('Network error has occurred please try again!');
	        }

	    });

		});

function openDiv(id)
{
	if(id=="hnd")
		{
		 $('#block_eng').css({'display':'none'});
		 $('#block_hnd').css({'display':'block'});
		}
	else
		{
		 $('#block_hnd').css({'display':'none'});
		 $('#block_eng').css({'display':'block'});
		}

	}



  /*------------------ check out page ---------*/


function Startsubjectmocktest() {
    // body...


    var siteName = localStorage.getItem("siteName");
     console.log('enter function');
    $('#instruction_area2').css({'display': 'none'});
    $('#question_div').css({'display': 'block'});

     var user_id= localStorage.getItem("userId"); 
        var sID= jQuery("#sID").val();
        var view= jQuery("#view").val();
        var exam_subject_category_id=jQuery('#exam_cat_subject_id').val();
        var exam_parent_id=jQuery('#exam_parent_id').val();


     siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttsubjectquestion.php?sID="+sID+"&view="+view+"&exam_subject_category_id="+exam_subject_category_id+"&exam_parent_id="+exam_parent_id;
     var formData = {'user_id':user_id};

    // alert('user_id='+user_id+' pCID='+examID);

     $.ajax({
         type: "POST",
         url: siteUrl,
         data: formData,
         cache: false,
         dataType: "text",
         beforeSend: function () {
             $.mobile.showPageLoadingMsg(true);
         },
         complete: function () {
             $.mobile.hidePageLoadingMsg();
         },
         success: function (data, status)
         {
             dataT = $.trim(data);
            $('#tt_time_div').css({'display': 'block'});
            $('#dashboard').css({'display': 'block'});
              $("#question_div").html(dataT);
            $('#question_div').trigger('create');
            setCountDown(); // start timer
         },
         error: function (jqXHR, status, errorThrown)
         {
             alert('We are unable to load page,Please try again');
            $('#instruction_area1').css({'display': 'block'});
         }

     });
}


 function Startsubjecttest( sID , pCID )
 {
     var siteName = localStorage.getItem("siteName");
     $.mobile.changePage("ttMockTest.html");

     var user_id= localStorage.getItem("userId");
     var exam_cat_subject_id = document.getElementById('exam_cat_subject_id').value;
     siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttSubjecttest.php";
     var formData = {'view':'AST','user_id':user_id,'exam_cat_subject_id':exam_cat_subject_id,'sID':sID,'pCID':pCID,'testType':'new'};

    // alert('user_id='+user_id+' pCID='+examID);

     $.ajax({
         type: "POST",
         url: siteUrl,
         data: formData,
         cache: false,
         dataType: "text",
         beforeSend: function () {
             $.mobile.showPageLoadingMsg(true);
         },
         complete: function () {
             $.mobile.hidePageLoadingMsg();
         },
         success: function (data, status)
         {
             dataT = $.trim(data);
             $('#mock_test_page').empty();

             $('#mock_test_page').append(dataT);
             $('#mock_test_page').trigger('create');
         },
         error: function (jqXHR, status, errorThrown)
         {
             alert('Network error has occurred please try again!');
         }

     });
 }

function ttexamanyonesubject( subscriptionPlanID , categoryID ) {
    
    console.log(subscriptionPlanID);
    console.log(categoryID);


    $.mobile.changePage("ttexamanyonesubject.html");
        var siteName = localStorage.getItem("siteName");

        var dataList={'userID':localStorage.getItem("userId"),'sID':subscriptionPlanID,'pCID':categoryID};


        siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttsubjectexamanyone.php";

        $.ajax({
            type: "GET",
            url: siteUrl,
            cache: false,
            data:dataList,
            dataType: "text",
            beforeSend: function () {
                $.mobile.showPageLoadingMsg(true);
            },
            complete: function () {
                $.mobile.hidePageLoadingMsg();
            },
            success: function (data, status)
            {
                dataT = $.trim(data);

                $('#subject_exam_anyone').empty();

                $('#subject_exam_anyone').append(dataT);
                $('#subject_exam_anyone').trigger('create');
            },
            error: function (jqXHR, status, errorThrown)
            {
                alert('Network error has occurred please try again!');
            }

        });

}

function Myexamsubject(userID , subscriptionPlanID , categoryID ) {
    console.log(userID);
    console.log(subscriptionPlanID);
    console.log(categoryID);


    $.mobile.changePage("ttsubjectexamtest.html");
        var siteName = localStorage.getItem("siteName");

        var dataList={'userID':localStorage.getItem("userId"),'sID':subscriptionPlanID,'pCID':categoryID};


        siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttmyexamsubject.php";

        $.ajax({
            type: "GET",
            url: siteUrl,
            cache: false,
            data:dataList,
            dataType: "text",
            beforeSend: function () {
                $.mobile.showPageLoadingMsg(true);
            },
            complete: function () {
                $.mobile.hidePageLoadingMsg();
            },
            success: function (data, status)
            {
                dataT = $.trim(data);

                $('#subject_exam_test').empty();

                $('#subject_exam_test').append(dataT);
                $('#subject_exam_test').trigger('create');
            },
            error: function (jqXHR, status, errorThrown)
            {
                alert('Network error has occurred please try again!');
            }

        });

}

function showExamSubjectDetailPage(id)
{
      $.mobile.changePage("ttExamPage.html");
        var siteName = localStorage.getItem("siteName");

        var dataList={'examCategoryId':id};


        siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttExamPage.php";

        $.ajax({
            type: "GET",
            url: siteUrl,
            cache: false,
            data:dataList,
            dataType: "text",
            beforeSend: function () {
                $.mobile.showPageLoadingMsg(true);
            },
            complete: function () {
                $.mobile.hidePageLoadingMsg();
            },
            success: function (data, status)
            {
                dataT = $.trim(data);

                $('#exam_page').empty();

                $('#exam_page').append(dataT);
                $('#exam_page').trigger('create');
            },
            error: function (jqXHR, status, errorThrown)
            {
                alert('Network error has occurred please try again!');
            }

        });
    }

function showExamPage(id)
{
	  $.mobile.changePage("ttExamPage.html");
		var siteName = localStorage.getItem("siteName");

		var dataList={'examCategoryId':id};


	    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttExamPage.php";

	    $.ajax({
	        type: "GET",
	        url: siteUrl,
	        cache: false,
	        data:dataList,
	        dataType: "text",
	        beforeSend: function () {
	            $.mobile.showPageLoadingMsg(true);
	        },
	        complete: function () {
	            $.mobile.hidePageLoadingMsg();
	        },
	        success: function (data, status)
	        {
	            dataT = $.trim(data);

	            $('#exam_page').empty();

	            $('#exam_page').append(dataT);
	            $('#exam_page').trigger('create');
	        },
	        error: function (jqXHR, status, errorThrown)
	        {
	            alert('Network error has occurred please try again!');
	        }

	    });
	}

     var emailID = '';
/* close the app on back button press*/
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.addEventListener("backbutton", onBackKeyDown, false);
    //window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      
               var notificationOpenedCallback = function(jsonData) {
              if (jsonData.additionalData) {
                if (jsonData.additionalData.yourUrlKey)
                  location.href = jsonData.additionalData.yourUrlKey;
              }
            }

       
        window.plugins.DeviceAccounts.get(function(accounts){
          // accounts is an array with objects containing name and type attributes
          console.log('account registered on this device:', accounts);

           for (var i = accounts.length - 1; i >= 0; i--) {
               accounts[i]

               if (accounts[i].type == 'com.google') {

                 console.log('email ID Final: '+accounts[i].name);


                  window.plugins.OneSignal.sendTag("email "+i,accounts[i].name);
               }
           }

          emailID = accounts[0].name;
          //console.log('email ID : '+emailID);

          //window.plugins.OneSignal.sendTag("key", "value");

//console.log('email ID : '+emailID);
  window.plugins.OneSignal.init("ac1240c5-6531-4fa7-8233-3c740c9741f3",
                                 {googleProjectNumber: "191917393429",
                               autoRegister: true},
                                 notificationOpenedCallback);

//window.plugins.OneSignal.sendTag("email",emailID);
  // Show an alert box if a notification comes in when the user is in your app.
  window.plugins.OneSignal.enableInAppAlertNotification(true);

        
        }, function(error){
        
          console.log('Fail to retrieve accounts, details on exception:', error);
        
        });



}
function onBackKeyDown()
{
	if(confirm('Do you want to close the app??'))
	{
		navigator.app.exitApp();
	}

}

/* close the app on back button press*/

function buy_now(exam_page_id)
{
	$.mobile.changePage("ttBuyNowPage.html");
	var siteName = localStorage.getItem("siteName");

	  if(localStorage.getItem("userId")) // if user is already logged in
		   {
		  var dataList={'exam_page_id':exam_page_id,'user_id':localStorage.getItem("userId")};
		   }
	  else
		  {
		  var dataList={'exam_page_id':exam_page_id};
		  }



    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttBuyNow.php";

    $.ajax({
        type: "GET",
        url: siteUrl,
        cache: false,
        data:dataList,
        dataType: "text",
        beforeSend: function () {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function () {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (data, status)
        {
            dataT = $.trim(data);

            $('#buy_now_page').empty();

            $('#buy_now_page').append(dataT);
            $('#buy_now_page').trigger('create');
        },
        error: function (jqXHR, status, errorThrown)
        {
            alert('Network error has occurred please try again!');
        }

    });
}
/* change plan desc and price on plan change and onmdeium change*/
function changeDesc()
{

    var selected = $("input[type='radio'][name='medium_id']:checked");
    if (selected.length > 0) {
        medium = selected.val();
    }
    else
    {
        medium = 1;
    }



    if (medium == "1")
    {
        var prefix = "e";
    }
    else
    {
        var prefix = "h";
    }
    var plan = $('#plans').val();
    var id = '#' + prefix + 'Plan' + plan;

    //alert(plan+' md='+medium);
    if (plan == 6) // display subject if user has selected one subject plan
    {
        $('.subDivClass').css({'display': 'none'});
        $('#subDiv' + medium).css({'display': ''});
    }
    else
    {
        $('.subDivClass').css({'display': 'none'});
    }

    $('.planDesc').css({'display': 'none'});
    $(id).css({'display': 'block'});

    // display the related price div


    $('.priceDvClass').css({'display': 'none'});
    $("#priceDv" + plan).css({'display': 'block'});



}


$(document).on('change', '[type="radio"].rd_medium', function()
{

	changeDesc();
       //uncheked allready select subject
    $("input[type='radio'][name='sub_category_id']").attr("checked", false);


});



$(document).on('change', '#plans', function ()
 {

	changeDesc();
     //uncheked allready select subject
    $("input[type='radio'][name='sub_category_id']").attr("checked", false);



});
/*------------------ check out page ---------*/

/*------------------ check out page ---------*/
$(document).on('click', '#checkout', function ()
		{

	// check for validation
	if(validateCheckoutForm())
	{

		  var selectedPaymentMode = $("input[type='radio'][name='rd_scr_code']:checked");
	    	selectedPaymentModeValue= selectedPaymentMode.val();


		// 	check if user is logged in
		var userId = localStorage.getItem("userId");
		if(userId!="")
			{

			// call checkout page
			$.mobile.changePage("ttCheckOutPage.html");
			callCheckout(false);
			}
		else // redirect user to register/ login  page
			{

			// call checkout page
			var reqPlanId= $('#plans').val();
			  var selected = $("input[type='radio'][name='medium_id']:checked");
			    if (selected.length > 0) {
			        medium = selected.val();
			    }
			    else
			    {
			        medium = 1;
			    }
			    // 	get payment mode

		    if(selectedPaymentModeValue==1) // scratch card mode
		    	{
		    	  var scratchCardCode= $('#txtDiscountCode').val();

		    	  localStorage.setItem("TT_SCRATCH_CARD_CODE",scratchCardCode);
		    	  localStorage.setItem("TT_SCRATCH_CARD",1);
		    	  if(medium==1) // choose english exam
			    	{
			    	var reqExamId= $('#engExamId').val();
			    	}
			    	else
			    	{
			    	var reqExamId= $('#hindiExamId').val();
			    	}
		    	}
		    else // online payment
		    {
		    	localStorage.setItem("TT_SCRATCH_CARD",0);
			    if(reqPlanId==6)// one subject plan
			    	{
			     	var selectedSub = $("input[type='radio'][name='sub_category_id']:checked");
		    		 if (selectedSub.length > 0) {
		    			 var reqExamId=  selectedSub.val();
		    			// alert(reqExamId);
		    		 }

			    	}
			    else
			    	{
				    	if(medium==1) // choose english exam
				    	{
				    	var reqExamId= $('#engExamId').val();
				    	}
				    	else
				    	{
				    	var reqExamId= $('#hindiExamId').val();
				    	}
			    	}

			}


		    localStorage.setItem("TT_REQUESTED_CATEGORY_ID",reqExamId);
			localStorage.setItem("TT_REQUESTED_PLAN_ID", reqPlanId);


			loadLoginPage();

			}
	}
		});

function validateCheckoutForm()
{
// check if user has selected any medium
	 var selected = $("input[type='radio'][name='medium_id']:checked");
	    if (selected.length > 0) {
	    	// check what payment mode user has selected
	    	var selectedPaymentMode = $("input[type='radio'][name='rd_scr_code']:checked");
	    	selectedPaymentModeValue= selectedPaymentMode.val();

	    	if(selectedPaymentModeValue=='1') // scratch card code
	    		{
	    		// check if scratch card code box is not empty
	    		if($('#txtDiscountCode').val()=="")
	    			{
	    			alert('Please enter scratch card code!');
	    			  return false;
	    			}
	    		else
	    			{
	    			return true;



	    			}

	    		}
	    	else //online payment
	    		{
	        // check selected plan
	    	var reqPlanId= $('#plans').val();
	    	if(reqPlanId==6)// one subject plan
	    	{
	    		// check if user has selected any one subject
	    		var selectedSub = $("input[type='radio'][name='sub_category_id']:checked");
	    		 if (selectedSub.length == 0) {
	    			 alert('Please select any one subject');
	    			 return false;
	    		 }
	    		 else
	    			 {
	    				return true;
	    			 }
	    	}
	    	else
	    		{
	    		//alert('selected');
	    		return true;
	    		}
	    		}
	    }
	    else
	    {
	    alert('Please select any medium!');
	    return false;
	    }
}

function callCheckout(condition)
{
	  var url = localStorage.getItem("siteName");


	    var siteUrl = url + "/wp-content/plugins/tet-india/m/ttCheckOutPage.php";

	   if(condition) // user has requested the plan purchase
		   {
			var reqPlanId= localStorage.getItem("TT_REQUESTED_PLAN_ID");
		    var reqExamID=	   localStorage.getItem("TT_REQUESTED_CATEGORY_ID");
		    var user_id=   localStorage.getItem("userId");
		    $.mobile.changePage("ttCheckOutPage.html");
		   // check if user has selected scratch card code
		  if(localStorage.getItem("TT_SCRATCH_CARD")==1)
			  {
			  var code= localStorage.getItem("TT_SCRATCH_CARD_CODE");


			  // submit the buy now form
			  var formData={'dierctCheckout':1,'plans':reqPlanId,'examId':reqExamID,
			   'user_id':user_id,'rd_scr_code':1,'txtDiscountCode':code};
			  var reqPlanId= localStorage.setItem("TT_SCRATCH_CARD","");
			  var reqPlanId= localStorage.setItem("TT_SCRATCH_CARD_CODE","");

			  }
		  else
			  {
			  var formData={'dierctCheckout':1,'plans':reqPlanId,'examId':reqExamID,'user_id':user_id};

			  }
		    var reqPlanId= localStorage.setItem("TT_REQUESTED_PLAN_ID","");
		    var reqExamID= localStorage.setItem("TT_REQUESTED_CATEGORY_ID","");

		   }
	   else
		   {
		   var formData = $("#frmBuy").serialize();
		   }


	  //  alert(formData);
	    $.ajax({
	        type: "POST",
	        url: siteUrl,
	        data: formData,
	        cache: false,
	        dataType: "text",
	        beforeSend: function () {
	            $.mobile.showPageLoadingMsg(true);
	        },
	        complete: function () {
	            $.mobile.hidePageLoadingMsg();
	        },
	        success: function (data, status)
	        {

	        	 dataT = $.trim(data);

	            $('#checkout_page').empty();

	            $('#checkout_page').append(dataT);
	            $('#checkout_page').trigger('create');
	        },
	        error: function (jqXHR, status, errorThrown)
	        {
	        	alert('Network error has occurred please try again!');

	        }

	    });
}

$("#payment_method_cheque").click(function () {


    $("#tt_payment_cheque").slideDown('slow');
    $("#tt_payment_online_trans").slideUp('slow');

    $("#frmCheckout").attr("action", "");

});

 $("#payment_method_online_trans").click(function () {


    $("#tt_payment_cheque").slideUp('slow');
    $("#tt_payment_online_trans").slideDown('slow');

    $("#frmCheckout").attr("action", "");

});

 // apply discount code
 $(document).on('click', '#btn_apply_disc', function ()
 	        {
	            var code = $("#txtDiscountCode").val();
	            var plan_id = $("#plans").val();
	            var url = localStorage.getItem("siteName");

	            //   fancybox_loading
	            $('#tet_loading_img').css({'display': 'block'});

	            var discountUrl = url + "/wp-content/plugins/tet-india/tt_discount_price.php?" +
	                    "dCode=" + code + "&pID=" + plan_id;

	           // alert(discountUrl);

	            var jqxhr = $.get(discountUrl);

	            jqxhr.success(function (data)
	            {
	            	$('#tet_loading_img').css({'display': 'none'});

	                if (data == 'false')
	                {
	                    // get original cost
	                    var orgPrice = $("#orgCost").val();

	                    $("#txtDiscountCode").val('');
	                    $("#amount").html('Rs. ' + orgPrice); // refresh the plan cost
	                    $("#dicsountMsg").html('Invalid Discount Code');
	                    //$("#payment_methods").css({'display': 'block'});
	                    $("#online_payment_hidden").val(1);

	                    $("#chk_pay").css({'display': 'block'});

	                }
	                else
	                {
	                    $("#dicsountMsg").html('');
	                    $("#dicsountMsg").html('Discount Code Applied.');
	                    $("#amount").html(data);
	                    //$("#payment_methods").css({'display': 'none'});
	                    $("#online_payment_hidden").val(0);

	                    $("#chk_pay").css({'display': 'none'});
	                    $("#payment_method_cheque").css({'display': 'none'});

	                //    alert('chk_pay. payment_method_cheque');
	                     // select online payment radio button // there is only one option for discount customer
	                    $('input:radio[name=payment_method]')[0].checked = true;


	                }
	            });

	            jqxhr.error(function (data)
	            {
	                $('#tet_loading_img').css({'display': 'none'});
	                alert('We are unable to load page,Please try again');

	            });


	        });

 $(document).on('click', '#place_order', function ()
	        {
	 		var selected = $("input[type='radio'][name='payment_method']:checked");
		    if (selected.length > 0) {
		        payment_method = selected.val();

		       // alert('methiod==='+payment_method);
		        if(payment_method==4) // sumbit form for online payment
		        	{
		        	 var url = localStorage.getItem("siteName");

		        	 $.mobile.changePage("profile.html");


		        	 var siteUrl = url + "/wp-content/plugins/tet-india/icici_gateway/ttOnlineTransaction.php";
		    		 $('#mobile_app_checkout').val(1);
		    		 var discountCode= $('#txtDiscountCode').val();
		    		 var exam= $('#category_id').val();
		    		 var dierctCheckout=1;
		    		 var plan= $('#plans').val();
		    		 var userId = localStorage.getItem("userId");
		    		 siteUrl= siteUrl+"?category_id="+exam+"&mobile_app_checkout=1&plans="+plan+"&user_id="+userId+
		    		 "&txt_discount_code="+discountCode;
		    	   // alert(siteUrl);
		    		 var ref = window.open(siteUrl, '_blank', 'location=yes');



		        	}
		        else // this is normal cheque payment
		        	{
		        	submitCheckoutForm('cheque');
		        	}
		    }
		    else
		    {
		    	alert('Please select payment method!');
		    }
	        });
 function submitCheckoutForm(type)
 {
	// alert('submit final');
	 var url = localStorage.getItem("siteName");

	 if(type=="online")
		 {


		 }
	 else
		 {
		 var siteUrl = url + "/wp-content/plugins/tet-india/m/ttSubmitCheckout.php";

		 }
	 var formData = $("#frmCheckout").serialize();


    // alert(formData);

	 //  alert(formData);
		$.ajax({
		  type: "POST",
		  url: siteUrl,
		  data: formData,
		  cache: false,
		  dataType: "text",
		  beforeSend: function () {
		      $.mobile.showPageLoadingMsg(true);
		  },
		  complete: function () {
		      $.mobile.hidePageLoadingMsg();
		  },
		  success: function (data, status)
		  {

		  	 dataT = $.trim(data);

		      $('#checkout_page').empty();

		      $('#checkout_page').append(dataT);
		      $('#checkout_page').trigger('create');
		  },
		  error: function (jqXHR, status, errorThrown)
		  {
		  	alert('Network error has occurred please try again!');

		  }

		});
 }

 $(document).on('change', '[type="radio"]#payment_method_online_trans', function()
{
	 $('#tt_payment_online_trans').css({'display':'block'});
     $('#tt_payment_cheque').css({'display':'none'});
});

 $(document).on('change', '[type="radio"]#payment_method_cheque', function()
{
		$('#tt_payment_online_trans').css({'display':'none'});
		$('#tt_payment_cheque').css({'display':'block'});
});

function startDemoTest(demoExamID)
{
	 var user_id= localStorage.getItem("userId");
     console.log('user ID : '+user_id);
// check if user is logged in if not send him to login page
	if(user_id!="")
		{
            //console.log('mock test');
		openMockTest(demoExamID);
		}
	else // redirect user to login page
		{
            

            //console.log('mock test login');
		 	localStorage.setItem("TT_DEMO_EXAM_ID", demoExamID);
		 	loadLoginPage();

		}
}
 function openMockTest(examID)
 {
     var siteName = localStorage.getItem("siteName");
     $.mobile.changePage("ttMockTest.html");

     var user_id= localStorage.getItem("userId");

     siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttMockTest.php";
     var formData = {'view':'Demo','user_id':user_id,'pCID':examID,'testType':'new'};

    // alert('user_id='+user_id+' pCID='+examID);

     $.ajax({
         type: "POST",
         url: siteUrl,
         data: formData,
         cache: false,
         dataType: "text",
         beforeSend: function () {
             $.mobile.showPageLoadingMsg(true);
         },
         complete: function () {
             $.mobile.hidePageLoadingMsg();
         },
         success: function (data, status)
         {
             dataT = $.trim(data);
             $('#mock_test_page').empty();

             $('#mock_test_page').append(dataT);
             $('#mock_test_page').trigger('create');
         },
         error: function (jqXHR, status, errorThrown)
         {
             alert('Network error has occurred please try again!');
         }

     });
 }

 function validateAccountForm()
 {
	 if ($('#userPwd').val() != $('#userCnfPwd').val())
	    {
		    alert("Password do not match");
	        return false;
	    }

	    if ($('#userEmail').val() == '')
	    {

	    	alert("Please Enter Email.");
	        return false;
	    }
	    else
	    	{
		    	if( !isValidEmailAddress( $('#userEmail').val() ) )
	    		{
		    		alert("Please Enter Valid Email.");
			        return false
	    		}
	    	}
  	    return true;
 }

 $(document).on('pagebeforeshow', '#my_plan_page', function ()
			{
			    var siteName = localStorage.getItem("siteName");
			    var userId = localStorage.getItem("userId");

			    var userList = {'user_id': userId};

			    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttMyPlans.php";

			    $.ajax({
			        type: "GET",
			        url: siteUrl,
			        data: userList,
			        cache: false,
			        dataType: "text",
			        beforeSend: function () {
			            $.mobile.showPageLoadingMsg(true);
			        },
			        complete: function () {
			            $.mobile.hidePageLoadingMsg();
			        },
			        success: function (data, status)
			        {
			            dataT = $.trim(data);
			            $('#my_plan_page').empty();

			            $('#my_plan_page').append(dataT);
			            $('#my_plan_page').trigger('create');
			        },
			        error: function (jqXHR, status, errorThrown)
			        {
			            alert('Network error has occurred please try again!');
			        }

			    });
			});

 $(document).on('pagebeforeshow', '#scratch_card_page', function ()
			{
			    var siteName = localStorage.getItem("siteName");
			    var userId = localStorage.getItem("userId");

			    var userList = {'user_id': userId};

			    siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttScratchCard.php";

			    $.ajax({
			        type: "GET",
			        url: siteUrl,
			        data: userList,
			        cache: false,
			        dataType: "text",
			        beforeSend: function () {
			            $.mobile.showPageLoadingMsg(true);
			        },
			        complete: function () {
			            $.mobile.hidePageLoadingMsg();
			        },
			        success: function (data, status)
			        {
			            dataT = $.trim(data);
			            $('#scratch_card_page').empty();

			            $('#scratch_card_page').append(dataT);
			            $('#scratch_card_page').trigger('create');
			        },
			        error: function (jqXHR, status, errorThrown)
			        {
			            alert('Network error has occurred please try again!');
			        }

			    });
			});

 $(document).on('click', '#btn_scratch_card', function ()
		 {

		     $.mobile.changePage("ttScratchCard.html");
		 });


 /* ----------------scratch card code  ----------------*/
 $(document).on('change', '#cmbCategoryms', function ()
 {

     updateExamms();


 });


 function updateExamms()
 {
     var categoryId = $('#cmbCategoryms').val();
     var medium = $('#cmbMedium').val();


       var siteName = localStorage.getItem("siteName");
     var url = siteName+"/wp-content/plugins/tet-india/m/tt_get_exams_one_subject.php?category=" + categoryId + "&medium=" + medium ;

     $.ajax({
         type: "GET",
         url: url,
         cache: false,
         dataType: "text",
        // jsonpCallback: 'successCallback',
         beforeSend: function () {
                $.mobile.showPageLoadingMsg(true);
            },
            complete: function () {
                $.mobile.hidePageLoadingMsg();
            },
         success: function (data)
         {


             var SuccessData=JSON.parse(data);
            //jQuery('#cmbExamsO').empty();
            //$('#cmbExamsms').empty();
             $("#cmbExamsms").find('option').remove();
             $("#cmbExamsms").append('<option value="">Select Exam </option>');
                for(i=0; i < SuccessData.length; i++){
                    console.log(SuccessData[i]);
                     $("#cmbExamsms").append('<option value="'+SuccessData[i].id+'">'+SuccessData[i].name+'</option>');
                 }

             
           

         },
         error: function onError(jqXHR, errorThrown) {
             //  alert('Network error has occurred please try again! ');
         }

     });
 }


 /* ----------------scratch card code  ----------------*/
 $(document).on('change', '#cmbCategorym', function ()
 {

     updateExamm();


 });


 function updateExamm()
 {
     var categoryId = $('#cmbCategorym').val();
     var medium = $('#cmbMedium').val();


       var siteName = localStorage.getItem("siteName");
     var url = siteName+"/wp-content/plugins/tet-india/m/tt_get_exams_one_subject.php?category=" + categoryId + "&medium=" + medium ;

     $.ajax({
         type: "GET",
         url: url,
         cache: false,
         dataType: "text",
        // jsonpCallback: 'successCallback',
         beforeSend: function () {
	            $.mobile.showPageLoadingMsg(true);
	        },
	        complete: function () {
	            $.mobile.hidePageLoadingMsg();
	        },
         success: function (data)
         {



             var SuccessData=JSON.parse(data);
            //jQuery('#cmbExamsO').empty();
            console.log(SuccessData);
            //$('#cmbExamsm').empty();
             $("#cmbExamsm").find('option').remove();
             $("#cmbExamsm").append('<option value="">Select Exam </option>');
                for(i=0; i < SuccessData.length; i++){
                    console.log(SuccessData[i]);
                     $("#cmbExamsm").append('<option value="'+SuccessData[i].id+'">'+SuccessData[i].name+'</option>');
                 }

          

         },
         error: function onError(jqXHR, errorThrown) {
             //  alert('Network error has occurred please try again! ');
         }

     });
 }


function successCallbackdis (data) {
  
  if (data == 'false')
                {
                    console.log('loop1');
                    jQuery("#txtDiscountCode").val('');
                    jQuery("#dicsountMsg").html('Invalid Scratch Code');
                    jQuery('#IfSSCSubjectPlanDiv').css({'display': 'none'});
                    jQuery('#IfMainPlanDiv').css({'display': 'none'});
                    jQuery('#IfOneSubjectPlanDiv').css({'display': 'none'});
                }
                else
                {
                       console.log('loop2');
                    var SuccessData=JSON.parse(data);
                    var PlanName=SuccessData[0].planName;
                    var planId=SuccessData[0].planId;
                    if(planId==11)
                    {
                    var exam_id=SuccessData[0].exam_id;
                    var category_name=SuccessData[0].category_name;
                    var medium_id=SuccessData[0].medium_id;
                    var parent_id=SuccessData[0].parent_id;
                    var main_cat_id=SuccessData[0].main_cat_id;
                    var main_cat_name=SuccessData[0].main_cat_name;
                            if(medium_id==1)
                            {
                                var medium_name='English';
                            }
                            else
                            {
                                var medium_name='Hindi';
                            }
                        jQuery('#IfSSCSubjectPlanDiv').css({'display': 'block'});
                        
                        jQuery("#disp11").text(medium_name);
                        jQuery("#disp22").text(main_cat_name);
                        jQuery("#disp33").text(category_name);
                        
                        jQuery("#cmbMedium1").val(medium_id);
                        jQuery("#cmbCategory1").val(main_cat_id);
                        jQuery("#cmbExams1").val(exam_id);
                        
                        jQuery('#IfMainPlanDiv').css({'display': 'none'});
                        jQuery('#IfOneSubjectPlanDiv').css({'display': 'none'});
                        
                        jQuery("#dicsountMsg").html('');
                        jQuery("#dicsountMsg").html('Scratch Code Applied.<br>This code is valid for '+category_name+' exam.');
                    }
                    else if(planId==6)
                    {
                        jQuery('#IfOneSubjectPlanDiv').css({'display': 'block'});
                        jQuery('#IfMainPlanDiv').css({'display': 'none'});
                        jQuery('#IfSSCSubjectPlanDiv').css({'display': 'none'});
                        
                        jQuery("#dicsountMsg").html('');
                        jQuery("#dicsountMsg").html('Scratch Code Applied.<br>This code is valid for '+PlanName+' plan.');
                    }
                    else
                    {
                        jQuery('#IfMainPlanDiv').css({'display': 'block'});
                        jQuery('#IfSSCSubjectPlanDiv').css({'display': 'none'});
                        jQuery('#IfOneSubjectPlanDiv').css({'display': 'none'});
                        
                        jQuery("#dicsountMsg").html('');
                        jQuery("#dicsountMsg").html('Scratch Code Applied.<br>This code is valid for '+PlanName+' plan.');
                    }
                    
                    
                    
                }
}

function callbackmodel(data) {
   
   //console.log(data);


}


/* ----------------Fetch subject on exam change for one subject plan  ----------------*/
jQuery(document).on('change', '#cmbExamsO', function ()
{
    var examId = $('#cmbExamsO').val();
   var siteName = localStorage.getItem("siteName");
     var siteUrl= siteName+"/wp-content/plugins/tet-india/m/tt_get_subjects.php?exam=" + examId;
     
    jQuery.ajax({
        type: "GET",
        url: siteUrl,
        cache: false,
        dataType: "text",
        success: function (data)
        {
             console.log(data);
             var SuccessData=JSON.parse(data);
            //jQuery('#cmbExamsO').empty();
             $("#cmbSubject").find('option').remove();
             $("#cmbSubject").append('<option value="">Select Exam </option>');
                for(i=0; i < SuccessData.length; i++){
                    console.log(SuccessData[i]);
                     $("#cmbSubject").append('<option value="'+SuccessData[i].id+'">'+SuccessData[i].name+'</option>');
                 }

        },
        error: function onError(jqXHR, errorThrown) {
        }
    });
})

/* ----------------Fetch exams on category change for one subject plan  ----------------*/
$(document).on('change', '#cmbCategoryO', function ()
{
    updateExamO();
});

function updateExamO()
{
    var categoryId = $('#cmbCategoryO').val();
    var medium = $('#cmbMediumO').val();
    var siteName = localStorage.getItem("siteName");
     var siteUrl= siteName+"/wp-content/plugins/tet-india/m/tt_get_exams_one_subject.php?category=" + categoryId + "&medium=" + medium ;
     
    jQuery.ajax({
        type: "GET",
        url: siteUrl,
        cache: false,
        dataType: "text",
        success: function (data)
        {
            //console.log(JSON.stringify(data));

            var SuccessData=JSON.parse(data);
            //jQuery('#cmbExamsO').empty();
             $("#cmbExamsO").find('option').remove();
             $("#cmbExamsO").append('<option value="">Select Exam </option>');
                for(i=0; i < SuccessData.length; i++){
                    console.log(SuccessData[i]);
                     $("#cmbExamsO").append('<option value="'+SuccessData[i].id+'">'+SuccessData[i].name+'</option>');
                 }

        },
        error: function onError(jqXHR, errorThrown) {
        }
    });
}


/* ----------------Fetch subject on exam change for one subject plan  ----------------*/
 $(document).on('click', '#submit_card', function ()
{

 if(validateScratchFormuser())
 {
     var userId = localStorage.getItem("userId");

     var userList = {'user_id': userId};
     var siteName = localStorage.getItem("siteName");
     var siteUrl= siteName+'/wp-content/plugins/tet-india/m/tt_scratch_card_loginusertest.php';

     var formData = $('#txtDiscountCode').val();
     


     console.log(formData);

      $.ajax({
          type: "POST",
          url:siteUrl,
          data: 'txtDiscountCode =' + formData+ '&userId =' + userId,
          async: true,
         dataType: "text",
         beforeSend: function () {
                $.mobile.showPageLoadingMsg(true);
            },
            complete: function () {
                $.mobile.hidePageLoadingMsg();
            },
          success: function (data)
          {
           
           
            var v = JSON.parse(data);
              console.log(v[0]);
             if ( v[0]  == 'false' )
                {
                    console.log('loop1');
                    jQuery("#txtDiscountCode").val('');
                    jQuery("#dicsountMsg").html('Invalid Scratch Code');
                    jQuery('#IfSSCSubjectPlanDiv').css({'display': 'none'});
                    jQuery('#IfMainPlanDiv').css({'display': 'none'});
                    jQuery('#IfOneSubjectPlanDiv').css({'display': 'none'});
                }
                else
                {
                     console.log('loop2');
                    var SuccessData=JSON.parse(data);
                    var PlanName=SuccessData[0].planName;
                    var planId=SuccessData[0].planId;
                    console.log(planId);
                    if(planId==11)
                    {
                        console.log('loop3');
                    var exam_id=SuccessData[0].exam_id;
                    var category_name=SuccessData[0].category_name;
                    var medium_id=SuccessData[0].medium_id;
                    var parent_id=SuccessData[0].parent_id;
                    var main_cat_id=SuccessData[0].main_cat_id;
                    var main_cat_name=SuccessData[0].main_cat_name;
                            if(medium_id==1)
                            {
                                var medium_name='English';
                            }
                            else
                            {
                                var medium_name='Hindi';
                            }
                        jQuery('#IfSSCSubjectPlanDiv').css({'display': 'block'});
                        
                        jQuery("#disp11").text(medium_name);
                        jQuery("#disp22").text(main_cat_name);
                        jQuery("#disp33").text(category_name);
                        
                        jQuery("#cmbMedium1").val(medium_id);
                        jQuery("#cmbCategory1").val(main_cat_id);
                        jQuery("#cmbExams1").val(exam_id);
                        
                        jQuery('#IfMainPlanDiv').css({'display': 'none'});
                        jQuery('#IfOneSubjectPlanDiv').css({'display': 'none'});
                        
                        jQuery("#dicsountMsg").html('');
                        jQuery("#dicsountMsg").html('Scratch Code Applied.<br>This code is valid for '+category_name+' exam.');
                    }
                    else if(planId==6)
                    {
                        console.log('loop4');
                        jQuery('#IfOneSubjectPlanDiv').css({'display': 'block'});
                        jQuery('#IfMainPlanDiv').css({'display': 'none'});
                        jQuery('#IfSSCSubjectPlanDiv').css({'display': 'none'});
                        
                        jQuery("#dicsountMsg").html('');
                        jQuery("#dicsountMsg").html('Scratch Code Applied.<br>This code is valid for '+PlanName+' plan.');
                    }
                    else
                    {
                        jQuery('#IfMainPlanDiv').css({'display': 'block'});
                        jQuery('#IfSSCSubjectPlanDiv').css({'display': 'none'});
                        jQuery('#IfOneSubjectPlanDiv').css({'display': 'none'});
                        
                        jQuery("#dicsountMsg").html('');
                        jQuery("#dicsountMsg").html('Scratch Code Applied.<br>This code is valid for '+PlanName+' plan.');
                    }
                    
                    
                    
                }
     },

          timeout: 5000,
          error:  function (jqXHR, status,errorThrown)
           {
              
              alert(errorThrown);
           }
      });
 }

});



/* ----------------Fetch subject on exam change for one subject plan  ----------------*/
 $(document).on('click', '#btnAplCode', function ()
{

 if(validateScratchFormuser())
 {
     var userId = localStorage.getItem("userId");

     var userList = {'user_id': userId};
     var siteName = localStorage.getItem("siteName");
     var siteUrl= siteName+'/wp-content/plugins/tet-india/m/tt_scratch_card_loginuser.php';

     var formData = $("#frmScratchFormc").serialize();
     


     console.log(formData);

      $.ajax({
          type: "POST",
          url:siteUrl,
          data: formData+ '&userId =' + userId,
          async: true,
         dataType: "text",
         beforeSend: function () {
                $.mobile.showPageLoadingMsg(true);
            },
            complete: function () {
                $.mobile.hidePageLoadingMsg();
            },
          success: function (data)
          {
           
           
            var v = JSON.parse(data);
              console.log(v[0]);
             if ( v[0]  == 'false' )
                {
                    console.log('loop1');
                    jQuery("#txtDiscountCode").val('');
                    jQuery("#dicsountMsg").html('Invalid Scratch Code');
                    jQuery('#IfSSCSubjectPlanDiv').css({'display': 'none'});
                    jQuery('#IfMainPlanDiv').css({'display': 'none'});
                    jQuery('#IfOneSubjectPlanDiv').css({'display': 'none'});
                }
                else
                {
                     console.log('loop2');
                    var SuccessData=JSON.parse(data);
                    var PlanName=SuccessData[0].planName;
                    var planId=SuccessData[0].planId;
                    if(planId==11)
                    {
                    var exam_id=SuccessData[0].exam_id;
                    var category_name=SuccessData[0].category_name;
                    var medium_id=SuccessData[0].medium_id;
                    var parent_id=SuccessData[0].parent_id;
                    var main_cat_id=SuccessData[0].main_cat_id;
                    var main_cat_name=SuccessData[0].main_cat_name;
                            if(medium_id==1)
                            {
                                var medium_name='English';
                            }
                            else
                            {
                                var medium_name='Hindi';
                            }
                        jQuery('#IfSSCSubjectPlanDiv').css({'display': 'block'});
                        
                        jQuery("#disp11").text(medium_name);
                        jQuery("#disp22").text(main_cat_name);
                        jQuery("#disp33").text(category_name);
                        
                        jQuery("#cmbMedium1").val(medium_id);
                        jQuery("#cmbCategory1").val(main_cat_id);
                        jQuery("#cmbExams1").val(exam_id);
                        
                        jQuery('#IfMainPlanDiv').css({'display': 'none'});
                        jQuery('#IfOneSubjectPlanDiv').css({'display': 'none'});
                        
                        jQuery("#dicsountMsg").html('');
                        jQuery("#dicsountMsg").html('Scratch Code Applied.<br>This code is valid for '+category_name+' exam.');
                    }
                    else if(planId==6)
                    {
                        jQuery('#IfOneSubjectPlanDiv').css({'display': 'block'});
                        jQuery('#IfMainPlanDiv').css({'display': 'none'});
                        jQuery('#IfSSCSubjectPlanDiv').css({'display': 'none'});
                        
                        jQuery("#dicsountMsg").html('');
                        jQuery("#dicsountMsg").html('Scratch Code Applied.<br>This code is valid for '+PlanName+' plan.');
                    }
                    else
                    {
                        jQuery('#IfMainPlanDiv').css({'display': 'block'});
                        jQuery('#IfSSCSubjectPlanDiv').css({'display': 'none'});
                        jQuery('#IfOneSubjectPlanDiv').css({'display': 'none'});
                        
                        jQuery("#dicsountMsg").html('');
                        jQuery("#dicsountMsg").html('Scratch Code Applied.<br>This code is valid for '+PlanName+' plan.');
                    }
                    
                    
                    
                }
     },

          timeout: 5000,
          error:  function (jqXHR, status,errorThrown)
           {
              
              alert(errorThrown);
           }
      });
 }

});


function validateScratchFormreg(upgrade) { 
    if(upgrade==0)
    {
        // alert('check validation!!');
  
        if (!jQuery.isNumeric(jQuery('#txtPhone').val()) && jQuery('#txtPhone').val() != "") {
            alert("Only numeric values allowed in Phone number.");
            jQuery('#txtPhone').val("");
            return false;
        }

        if (jQuery('#txtEmail').val() == "")
        {
            alert("Email should not be empty.");

            jQuery('#txtEmail').focus();
            return false;
        }
        else
        {
            if (!validateEmail(jQuery('#txtEmail').val()))
            {
                alert("Please enter a valid email.");
                jQuery('#txtEmail').focus();
                return false;
            }
        }
        if (jQuery('#txtPassword').val() == "")
        {
            alert("Password should not be empty.");
            jQuery('#txtPassword').focus();
            return false;
        }
        else if (jQuery('#txtRepeatPassword').val() == "")
        {
            alert("Repeat password field should not be empty.");
            jQuery('#txtRepeatPassword').focus();
            return false;
        }
        else
        {
            if (jQuery('#txtPassword').val() != jQuery('#txtRepeatPassword').val())
            {
                alert("Password does not match.");
                jQuery('#txtPassword').focus();
                return false;
            }
        }



        if (jQuery('#txtFirstName').val() == "")
        {
            alert("First Name should not be empty.");
            jQuery('#txtFirstName').focus();
            return false;
        }
        if (jQuery('#txtLastName').val() == "")
        {
            alert("Last name should not be empty.");
            jQuery('#txtLastName').focus();
            return false;
        }
        if (jQuery('#cmbGender').val() == "")
        {
            alert("Please select gender.");
            jQuery('#cmbGender').focus();
            return false;
        }
        
        if (jQuery('#cmbDOBDay').val() == "")
        {
            alert("Please select day of date of birth.");
            jQuery('#cmbDOBDay').focus();
            return false;
        }
        if (jQuery('#cmbDOBMonth').val() == "")
        {
            alert("Please select month of date of birth.");
            jQuery('#cmbDOBMonth').focus();
            return false;
        }
        if (jQuery('#cmbDOBYear').val() == "")
        {
            alert("Please select year of date of birth.");
            jQuery('#cmbDOBYear').focus();
            return false;
        }


        if (jQuery('#cmbState').val() == "")
        {
            alert("Please select State.");
            jQuery('#cmbState').focus();
            return false;
        }
        if (jQuery('#cmb_city').val() == "0")
        {
            alert("Please select City.");
            jQuery('#cmb_city').focus();
            return false;
        }


        if (jQuery('#txtPhone').val() == "")
        {
            alert("Phone number should not be empty.");
            jQuery('#txtPhone').focus();
            return false;
        }
        
    }
    if(jQuery('#txtDiscountCode').val() == "")
    {
          alert("Scratch Card Code should not be empty.");
        jQuery('#txtDiscountCode').focus();
        return false;
    }
    
    if(  document.getElementById('IfMainPlanDiv').style.display =='block')
    {
         if (jQuery('#cmbCategorym').val() == "")
        {
            alert("Please select exam category.");
            jQuery('#cmbCategorym').focus();
            return false;
        }
         
        if (jQuery('#cmbExamsm').val() == "")
        {
            alert("Please select your exam.");
            jQuery('#cmbExamsm').focus();
            return false;
        }
    }
    else if( document.getElementById('IfSSCSubjectPlanDiv').style.display =='block')
    {
        if (jQuery('#cmbCategoryms').val() == "")
        {
            alert("Please select one subject exam category.");
            jQuery('#cmbCategoryms').focus();
            return false;
        }
         
        if (jQuery('#cmbExamsms').val() ==  "")
        {
            alert("Please select one subject exam name.");
            jQuery('#cmbExamsms').focus();
            return false;
        }
    }
    else if( document.getElementById('IfOneSubjectPlanDiv').style.display =='block')
    {
         if (jQuery('#cmbCategoryO').val() == "")
        {
            alert("Please select exam category.");
            jQuery('#cmbCategoryO').focus();
            return false;
        }
        if (jQuery('#cmbExamsO').val() == "")
        {
            alert("Please select your exam.");
            jQuery('#cmbExamsO').focus();
            return false;
        }
        if (jQuery('#cmbSubject').val() == "")
        {
            alert("Please select your subject.");
            jQuery('#cmbSubject').focus();
            return false;
        }
    }
   
    
   

    return true;

}

 $(document).on('click', '#sc_registerloginuser', function ()
{

    var upgrade= jQuery("#upgrade").val();
  

 if(validateScratchFormreg(upgrade))
 {
     var userId = localStorage.getItem("userId");

     var userList = {'user_id': userId};

     var siteName = localStorage.getItem("siteName");
     var siteUrl= siteName+'/wp-content/plugins/tet-india/m/tt_scratch_card_submitloginuser.php';

     var formData = $("#frmScratchFormc").serialize();

     
      $.ajax({
          type: "POST",
          url:siteUrl,
          data: formData+ '&userId =' + userId,
          dataType: "text",
          async: true,
         beforeSend: function () {
                $.mobile.showPageLoadingMsg(true);
            },
            complete: function () {
                $.mobile.hidePageLoadingMsg();
            },
          success: function (result)
          {
            console.log(result);
            
                var v = JSON.parse(result);
            if (v[1]['section_title'] == 'success')
                 {
                     console.log('sucess'); 
                    alert('The Scratch Card is applied Successfully');
                    $.mobile.changePage("profile.html");
                     //$("#frmScratchFormc").html(row.html);

                 }
            /*   $.each(result, function (i, row)
             {
                 if (row.section_title == 'success')
                 {

                    alert('now you can see your exam list');
                    $.mobile.changePage("profile.html");
                     //$("#frmScratchFormc").html(row.html);

                 }
                 else
                 {

                     // $("#msgBox").html(row.section_title);
                      alert(row.section_title);
                 }
             }); */

    },

          timeout: 5000,
          error:  function (jqXHR, status,errorThrown)
           {
              alert('Network error has occurred please try again!');
           }
      });   
 }

});


 $(document).on('click', '#sc_register', function ()
{

      var check = 0;
    var cmbCategoryms = jQuery("#cmbCategoryms").val();
     
     if (cmbCategoryms != '') {
        check = 1;
     }

    var cmbCategorym = jQuery("#cmbCategorym").val();

    if (cmbCategorym != '') {
        check = 2;
     }

    var cmbCategory = jQuery("#cmbCategoryO").val();

     if (cmbCategory != '') {
        check = 3;
     }

     console.log(check);

 if(validateScratchForm())
 {
	 var siteName = localStorage.getItem("siteName");
     var siteUrl= siteName+'/wp-content/plugins/tet-india/m/tt_scratch_card_submit.php';

     var formData = $("#frmScratchForm").serialize();

      $.ajax({
          type: "POST",
          url:siteUrl,
          data: formData,
          dataType: "text",
          async: true,
         dataType: "jsonp",
         jsonpCallback: 'successCallback',
         beforeSend: function () {
	            $.mobile.showPageLoadingMsg(true);
	        },
	        complete: function () {
	            $.mobile.hidePageLoadingMsg();
	        },
          success: function (result)
          {
               $.each(result, function (i, row)
             {
                 if (row.section_title == 'success')
                 {
                	 $("#frmScratchForm").html(row.html);

                 }
                 else
                 {

                      $("#msgBox").html(row.section_title);
                      alert(row.section_title);
                 }
             });

     },

          timeout: 5000,
          error:  function (jqXHR, status,errorThrown)
           {
              alert('Network error has occurred please try again!');
           }
      });
 }

});

 $(document).on('change', '#cmbMedium', function ()
		 {

		     // update mm if user has selected category
		     var categoryId = $('#cmbCategory').val();

		     if (categoryId != 0 )
		     {
		         updateExam();

		     }
	});

 function validateScratchFormuser()
 {
    
    if ($('#txtDiscountCode').val() == "")
         {
             alert("Scratch Card should not be empty.");
             $('#txtDiscountCode').focus();
             return false;
         }

    return true;
  }
 function validateScratchForm()
 {

         // alert('check validation!!');
        
         if (!$.isNumeric($('#txtPhone').val()) && $('#txtPhone').val() != "") {
             alert("Only numeric values allowed in Phone number.");
             $('#txtPhone').val("");
             return false;
         }

         if ($('#txtEmail').val() == "")
         {
             alert("Email should not be empty.");

             $('#txtEmail').focus();
             return false;
         }
         else
         {
             if (!isValidEmailAddress($('#txtEmail').val()))
             {
                 alert("Please enter a valid email.");
                 $('#txtEmail').focus();
                 return false;
             }
         }
         if ($('#txtPassword').val() == "")
         {
             alert("Password should not be empty.");
             $('#txtPassword').focus();
             return false;
         }
         else if ($('#txtRepeatPassword').val() == "")
         {
             alert("Repeat password field should not be empty.");
             $('#txtRepeatPassword').focus();
             return false;
         }
         else
         {
             if ($('#txtPassword').val() != $('#txtRepeatPassword').val())
             {
                 alert("Password does not match.");
                 $('#txtPassword').focus();
                 return false;
             }
         }



         if ($('#txtFirstName').val() == "")
         {
             alert("First Name should not be empty.");
             $('#txtFirstName').focus();
             return false;
         }
         if ($('#txtLastName').val() == "")
         {
             alert("Last name should not be empty.");
             $('#txtLastName').focus();
             return false;
         }
         if ($('#cmbGender').val() == "")
         {
             alert("Please select gender.");
             $('#cmbGender').focus();
             return false;
         }



         if ($('#cmb_city').val() == "")
         {
             alert("Please select City.");
             $('#cmb_city').focus();
             return false;
         }


         if ($('#txtPhone').val() == "")
         {
             alert("Phone number should not be empty.");
             $('#txtPhone').focus();
             return false;
         }
         if ($('#cmbState').val() == "0")
         {
             alert("State should not be empty.");
             $('#cmbState').focus();
             return false;
         }

  

    /* if ($('#cmbExamsO').val() == "0")
     {
         alert("Please select your exam.");
         $('#cmbExams').focus();
         return false;
     }*/

     if($('#txtDiscountCode').val() == "")
     {
           alert("Discount Code should not be empty.");
         $('#txtDiscountCode').focus();
         return false;
     }
    

    if(document.getElementById('IfMainPlanDiv').style.display == 'block')
    {
         if (jQuery('#cmbCategorym').val() == "")
        {
            alert("Please select exam category.");
            jQuery('#cmbCategorym').focus();
            return false;
        }
         
        if (jQuery('#cmbExamsm').val() ==  "")
        {
            alert("Please select your exam.");
            jQuery('#cmbExamsm').focus();
            return false;
        }
    }
    else if( document.getElementById('IfSSCSubjectPlanDiv').style.display =='block')
    {
        if (jQuery('#cmbCategoryms').val() == "")
        {
            alert("Please select one subject exam category.");
            jQuery('#cmbCategoryms').focus();
            return false;
        }
         
        if (jQuery('#cmbExamsms').val() ==  "")
        {
            alert("Please select one subject exam name.");
            jQuery('#cmbExamsms').focus();
            return false;
        }
    }
    else if( document.getElementById('IfOneSubjectPlanDiv').style.display =='block')
    {
         if (jQuery('#cmbCategoryO').val() == "")
        {
            alert("Please select exam category.");
            jQuery('#cmbCategoryO').focus();
            return false;
        }
        if (jQuery('#cmbExamsO').val() ==  "")
        {
            alert("Please select your exam.");
            jQuery('#cmbExamsO').focus();
            return false;
        }
        if (jQuery('#cmbSubject').val() == "0")
        {
            alert("Please select your subject.");
            jQuery('#cmbSubject').focus();
            return false;
        }
    }

     return true;

 }

 function names(val, fieldId) {

	    if ($.isNumeric(val.slice(-1))) {
	        alert("Numeric values not allowed.");
	        $('#' + fieldId).val(val.substr(0, val.length - 1));
	    }
	    if (/^[a-zA-Z0-9- ]*$/.test(val) == false) {
	        alert("Special characters not allowed.");
	        $('#' + fieldId).val(val.substr(0, val.length - 1));
	    }


	}
 $(document).on('change', '[type="radio"]#b_rd_sc', function()
		 {
	 		$('#rd_scr_code_div').css({"display":"block"});
	 		$('#rd_online_div').css({"display":"none"});
	 		$('#rd_online_div1').css({"display":"none"});

		 });


 $(document).on('change', '[type="radio"]#b_rd_plans', function()
 		 {
	 		$('#rd_scr_code_div').css({"display":"none"});
	 		$('#rd_online_div').css({"display":"block"});
	 		$('#rd_online_div1').css({"display":"block"});
		 });

 /* ----------------scratch card code  ----------------*/

 /*------------------Pracrice test----------------------*/
 function startPractice(frm)
 {
	 var siteName = localStorage.getItem("siteName");
     var siteUrl= siteName+'/wp-content/plugins/tet-india/m/ttDiagnosticTest.php';

     $.mobile.changePage("ttPracticeTest.html");

     var formData = $("#"+frm).serialize();

      $.ajax({
          type: "POST",
          url:siteUrl,
          data: formData,
          dataType: "text",
          async: true,
          beforeSend: function () {
	            $.mobile.showPageLoadingMsg(true);
	        },
	        complete: function () {
	            $.mobile.hidePageLoadingMsg();
	        },
	        success: function (data, status)
	        {
	            dataT = $.trim(data);
	            $('#practice_test_page').empty();

	            $('#practice_test_page').append(dataT);
	            $('#practice_test_page').trigger('create');
	        },

          timeout: 5000,
          error:  function (jqXHR, status,errorThrown)
           {
        	  return false;
              alert('Network error has occurred please try again!');
           }
      });
 }

 $(document).on('click', '#submit_practice_test', function ()
		 {

		 	submitPracticeExam();

		 });


		  function submitPracticeExam()
		  {

		 	 $.mobile.changePage("practiceResult.html");
		      var siteName = localStorage.getItem("siteName");

		      siteUrl = siteName + "/wp-content/plugins/tet-india/m/ttDiagnosticResult.php";

		      var formData = $("#frmPracticeTest").serialize();

		 		        $.ajax({
		 		            url: siteUrl,
		 		            data: formData, // Convert a form to a JSON string representation
		 		            type: 'post',
		 		            cache: false,
		 		            dataType: "text",
		 		            beforeSend: function () {
		 		                $.mobile.showPageLoadingMsg(true);
		 		            },
		 		            complete: function () {
		 		                $.mobile.hidePageLoadingMsg();
		 		            },
		 		            success: function  (data, status)
		 		            {

		 		            	  dataT = $.trim(data);
		 				            $('#practice_result_page').empty();

		 				            $('#practice_result_page').append(dataT);
		 				            $('#practice_result_page').trigger('create');


		 		            },
		 		            error: function (x, t, m) {
		 		            	//$('#tet_loading_img').css({'display': 'none'});
		 		                alert('Network error has occurred please try again! ');
		 		            }
		 		        });
		  }


 /*------------------End of Pracrice test----------------------*/
