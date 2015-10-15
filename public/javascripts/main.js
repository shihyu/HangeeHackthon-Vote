$(function(){
  //var player;

  // function onYouTubeIframeAPIReady() {
  //     player = new YT.Player('ytplayer', {
  //         events: {
  //             'onReady': onPlayerReady
  //         }
  //     });
  // }

  // function onPlayerReady(event) {
  //     player.setVolume(0);
  //     player.mute();
  //     player.playVideo();
  //     console.log('123123123');
  // }

  // $( "#creatTeam" ).submit(function( event ) {

  //   // Stop form from submitting normally
  //   event.preventDefault();

  //   // Get some values from elements on the page:
  //   var $form = $( this ),
  //     // console.log( $form, '123')
  //     term = $form.find( "#aaa" ).val(),
  //     url = $form.attr( "action" );
  //     console.log($form)
  //   // Send the data using post
  //   var posting = $.post( url, { aa: 'term' } );

  //   // Put the results in a div
  //   posting.done(function( data ) {
  //     var content = $( data ).find( "#content" );
  //     $( "#result" ).empty().append( content );
  //   });
  // });

  //$('#submitVote').click(function( event ){
  $('input[type=checkbox]').click(function( event ){

    //event.preventDefault();
    var count = $('input:checked').length;
    //console.log('votes Count ', count);

    if( count > 5  ){
      alert('只能五票謝謝');
      event.preventDefault();
    }
  });


  $('#submitVote').click(function( event ){


    // if(localStorage.hackathonVote){
    //   alert('投過票囉 QAQ');
    //   return ;
    // }

    //var data = ['55580d3ba4c4bf901e4fcdfb', '55580d47a4c4bf901e4fcdff'];
    var inputs = $('input:checked');
    var data = [''];

    for(var i = 0; i < inputs.length; i++){
       // console.log(data[i]);
       data.push($(inputs[i]).attr('data-id'));
    }

    //console.log('data-id', data);

    $.ajax({
      url: '/api/vote/s',
      type: 'PUT',
      data: {
        "id" : data
      },
      success: function(data){
        //console.log('vote success')
        window.location = "/results";

        localStorage.setItem("hackathonVote", "true");

      },
      error: function(err){
        console.log('err', err)
      }
    });
  });

  $( "#submitVotebanner" ).click(function() {
    console.log('scroll!!');
    $('html, body').animate({
        scrollTop: $("label[for=slideOne0]").offset().top -58
    }, 500);
  });

})
