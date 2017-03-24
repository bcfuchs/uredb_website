 ! function() {
  function Component(selector) {
 //   this.config = config || {};
    this.selector = selector;
    this.defaults = {
        cursor: "hand",
        scroll: "true",
        revert: "false",
 
        hoverClass: 'ui-droppable-hover'
    };
    this.scopedEls = {};
    
  }
  // TODO this should return something e.g. a listener
  Component.prototype.setDrag = function(dragSel,dropSel,scope,helper,drop,opts) {
    // TODO override defautls on opts
    // reset all elements TODO in the scope.
    console.log("setting drag...")
    if (!(scope in this.scopedEls)) {
      this.scopedEls[scope] = {}
      this.scopedEls[scope].drag = []
      this.scopedEls[scope].drop = []
    }
   
    
    $(dragSel).draggable({
         cursor : this.defaults.cursor,
         snapTolerance : this.defaults.snapTolerance,
         scroll:this.defaults.scroll,
         revert: false,
         scope : scope,
         helper : helper
       });
    
    $(dropSel).droppable({
      drop : drop,
      over: function(event, ui) {console.log($(this).data('ure-accnum'));
        console.log(ui.position)
        var x = event.clientX;     // Get the horizontal coordinate
        var y = event.clientY; 
        console.log(x +  " " + y)
      },
      scope : scope,
      hoverClass: this.defaults.hoverClass
    });
    this.scopedEls[scope].drag = $(dragSel);
    this.scopedEls[scope].drop = $(dropSel);
    
  }
  
  Component.prototype.zeroDrag = function(scope) {
    console.log("zeroing drag...")
    if (!(scope in this.scopedEls)) {
      this.scopedEls[scope] = {}
      this.scopedEls[scope].drag = []
      this.scopedEls[scope].drop = []
    }
    for (var i = 0,z= this.scopedEls[scope].drag.length; i < z ; i++){
      $(this.scopedEls[scope].drag[i]).removeClass('ui-draggable')
    }
    for (var i = 0,z= this.scopedEls[scope].drop.length; i < z ; i++){
      $(this.scopedEls[scope].drop[i]).removeClass('ui-droppable')
    }
    this.scopedEls[scope].drag = []
    this.scopedEls[scope].drop = []
  }
  
  window.ure_component = Component;
 }();