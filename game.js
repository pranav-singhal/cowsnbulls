$("document").ready(function(){

  $(".inputs").keyup(function () {
if (this.value.length == this.maxLength) {
var $next = $(this).next('.inputs');
if ($next.length)
    $(this).next('.inputs').focus();
else
    $(this).blur();
}
});
  game_ready=false;
  four_letter_words=[];

  function select_word(array){
    var index=Math.random()*4310
    index= Math.ceil(index);
    return array[index]
  }
  function check_validity(word){
    if(word.length<4){
      alert("this word is too short, maybe you need to see the rules again");
      return false;
    }else{

      return true;
    }

  }
  function score_word(player_word,game_word){
    bull_count=0;
    cow_count=0;

    for(i=0;i<4;i++){
      if(player_word.includes(game_word[i])){
        if(player_word[i]==game_word[i]){
          bull_count=bull_count+1;
        }
        else{
          cow_count= cow_count+1;
        }
      }
    }
    donkey_count=4-(bull_count+cow_count);
    return {bull_count: bull_count, cow_count: cow_count, donkey_count: donkey_count}
  }
  $.ajax({
    url: 'https://singhal-pranav.herokuapp.com/game_words.txt',
    crossDomain: true,
    success: function(data){
    data=  data.replace( /\n/g, " " ).split( " " );
    for(var i=0;i <data.length;i++){
          four_letter_words.push(data[i]);
    }
      game_ready = true;
      $('#preloader').css('display','none');
      $('#start_game').css('display','block');
      $('#show_rules').css('display','block');


    }
  });
  $('span').click(function(){
    $(this).toggleClass('stroked');
  });

  $('#start_game').click(function(){
    $('#rules').css('display','none')
    $('#aplphabet').css('display','block');
    $('#end_game').css('display','block');
    $(this).css('display','none')
    $('#input_form').css('display','block');
    console.log(game_ready);
            if(game_ready==true){
              game_word=select_word(four_letter_words);

              console.log("game word is");
              console.log(game_word);
              $('#submit_word').click(function(event){
                event.preventDefault();
                player_word="";
                $('.inputs').each(function(){
                  player_word= player_word+ $(this).val();
                  player_word=player_word.toLowerCase();
                  $(this).val('');
                })
                console.log("player word is:");
                console.log(player_word);
                if(check_validity(player_word)){
                  if(four_letter_words.indexOf(player_word) > -1){
                    console.log("this word is good");
                    var score= score_word(player_word,game_word)
                    console.log(score_word(player_word, game_word));
                    player_word_array = player_word.split("");
                    node =""
                    for(var i=0; i< player_word_array.length;i++){
                      node = node + "<span>" + player_word_array[i] + "</span>"
                    }
                    console.log(node);

                    $('ol').append("<li>"+node +" : "+score.bull_count+ "Bulls,"+score.cow_count+"Cows,"+score.donkey_count+"donkeys"+ "</li>");

                    if(score.bull_count==4){
                      alert("you win!")
                      window.location.reload();
                    }
                  }
                  else{
                    alert("this word is bad");
                  }
                }

              })
            }
  })

  $('#end_game').click(function(){
    alert('the game word was ' + game_word + ". Thanks for playing!!");
    if (window.confirm('if you think this word is not a real word,press OK to learn its definition, else press cancel to start again')){
      window.location.href='https://en.oxforddictionaries.com/definition/'+ game_word;
    }else{
        window.location.reload();
    };

  })

});
