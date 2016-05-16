;!function() {
  $(document).ready(function() {

  
    /**
     * @memberOf messages
     * custom alert box for messages
     * override standard alert
     * 
     * m = message to display
     * t = bootstrap alert type class   e.g. alert-info
     * boolean autoClose = true | false  ; if true then closes in millis
     * int closeMillis = millis til close
     */
    var custom_alert = function(m, t, autoClose,closeMillis) {
      autoClose = autoClose || true;
      closeMillis = closeMillis || 3000;
      t = t || 'alert-info'
      var slideDownMillis = 200;
      
      $($('#alert-modal .alert-body').get(0)).html(m);
      $('#alert-modal').attr("class", "");
      $('#alert-modal').addClass("alert " + t);
      $('#alert-modal').css({
        width : $(window).width(),

      });
      $("#back-button").toggle();
      /**
       * @memberOf messages
       * @private
       */
      var closer = function() {
        $('#alert-modal').fadeOut(closeMillis, function() {
          $("#back-button").toggle();
        });
      }
      
      $('#alert-modal').slideDown(slideDownMillis, function() {
        if (autoClose) {
          setTimeout(closer, closeMillis);
        } else {
          $("#alert-modal-close").click(closer);
        }
      });

    }
    window.alert = custom_alert;
    window.pop_msg = custom_alert;
  });
}();