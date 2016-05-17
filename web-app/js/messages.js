!function() {

  /**
   * @memberOf messages custom alert box for messages override standard alert
   *  display alert messages as footer slideUps. 
   * msg = message to display t = bootstrap alert type class e.g. alert-info
   * boolean autoClose = true | false ; if true then closes in millis int
   * closeMillis = millis til close
   */
  var custom_alert = function(msg, t, autoClose, closeMillis, slideDownMillis) {
    
    autoClose = autoClose || true;
    closeMillis = closeMillis || 3000;
    t = t || 'alert-info'; // bootstrap colors
    slideDownMillis = slideDownMillis || 200;

    // note: needs additional css to position.

    // get the template -- include in the layout template.
    $($('#alert-modal .alert-body').get(0)).html(msg);
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
  // override default browser alert. 
  window.alert = custom_alert;
  window.pop_msg = custom_alert;

}();