/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 */

$( document ).ready(function() {
    $("footer.Cart__Footer").addClass("mobile");
    $('.Cart__Footer.mobile span.Cart__NoteButton').click(function(){
     $( "textarea#cart-note" ).toggle(); 
	});
    $(window).scroll(function(){
      var sticky = $('footer.Cart__Footer'),
          scroll = $(window).scrollTop();

      if (scroll >= 100) sticky.addClass('fixed_bott');
      else sticky.removeClass('fixed_bott');
    });    
});


  $(document).ready(function(){
    //listen to the promo button click
    $('#redemDevPromo').on('click', function(event){
      //disable the button event
      event.preventDefault();
      //write the url format
      var theUrl = '/checkout?discount=';
      //grab the discount code from the input
      var theDiscount = $('#devPromo').val();
      //full url to redirect to checkout with promo code
      var toRedirect = theUrl+theDiscount;
      console.log(toRedirect);
      //redirect
      window.location.href = toRedirect;
    });
  });



  /*  gift for cart */


$(function() {
  $("input[name='attributes[Gift Message]']").click(function() {
      if ($("#yes-button3").is(":checked")) {
        $("#pers_meg").show();
        $("#pers_meg textarea").addClass('required');
        $("#pers_meg textarea").attr('required',true);
      } else {
        $("#pers_meg textarea").val('');
        $("#pers_meg").hide();
        $("#pers_meg textarea").removeClass('required');
        $("#pers_meg textarea").attr('required',false);
      }
    });
  $("input[name='attributes[Personalized Sticker]']").click(function() {
    var defaultSticker = $("#sticker1").attr('src');
      if ($("#yes-button4").is(":checked")) {
        $("#pers_stiker").show();
        $('#stickerUrl').val(defaultSticker);
      } else {
        $("#pers_stiker").hide();
        $('.main_selc img').attr('src', defaultSticker);
  		$('#stickerUrl').val('');
      }
    });
});


$('.img_selc img').click(function(){
file_url = $(this).attr('src');
$('.main_selc img').attr('src', file_url);
  $('#stickerUrl').val(file_url);
});

/*  gift for cart */