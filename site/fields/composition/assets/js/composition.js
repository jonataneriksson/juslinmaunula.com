(function($) {

    var Composition = function(element) {
    
        var self = this;

        // basic elements and stuff
        this.source       = $(element);
        this.mediainspector = $('<ul />');
        this.composition  = $('<ul />');
        this.input        = $('<input class="composition-input" type="text"/>');
        this.media        = this.source.data('media'); 
        this.order        = [];
        this.hashes       = [];        
        this.store        = JSON.parse(self.source.val());
        
        $.each(self.store, function() {
            self.hashes.push(this.hash);
        })       
        
        /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
        /* !Initialize */
        /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
        
        self.init = function() {
                
            if(self.media){       
                $.each(self.media, function() {
                    var item = {};
                    item.wrapper = $('<li />');
                    item.name = this.name;
                    item.wrapper.attr('class', 'item');                
                    item.type = this.type;
                    item.data = this;
                    item.wrapper.attr('data-item', JSON.stringify(item.data));
                    item.element = $('<img />');
                    item.element.attr('src', this.url);
                    item.wrapper.append(item.element);
                    item.wrapper.bind('click', function() {
                        $(this).toggleClass('small');
                        self.update();
                    });
                    
                    //Deal out the item
                    
                    //Whats it's index?
                    item.storeindex = self.hashes.indexOf(this.hash)
                    
                    //Is it included in the order?
                    if(-1 < item.storeindex){
                        storeditem = self.store[item.storeindex];
                        item.wrapper.attr('class', storeditem.className); 
                        self.order[item.storeindex] = item;
                    } else {
                        self.mediainspector.append(item.wrapper);
                    }
                });
                
                $.each(self.order, function(i) {
                    self.composition.append(this.wrapper);
                });
            }
                                    
        }        
        
        /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
        /* !Update */
        /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        self.update = function(event, ui) {
            ui.helper.removeClass('item-template').addClass('item');        
            self.order = [];
            $.each(self.composition[0].children, function(order) {
                data = JSON.parse(this.dataset.item);
                data.className = this.className;
                data.order = order;
                self.order.push(data);
            });
            //console.log(self.order);
            self.source.val(JSON.stringify(self.order));
        }
        
        self.start = function(event, ui) {
            event.target.firstChild.addClass('active');
        }
        
        self.stop = function(event, ui) {
            //event.target.removeClass('dragging');
        }        

        self.mediainspector.attr('class', 'composition');
        self.mediainspector.attr('id', 'Mediainspector');
        self.mediainspector.sortable({connectWith: self.composition, update: self.update});
        self.mediainspector.disableSelection(); 
        self.source.before(self.mediainspector);          
        
        self.composition.attr('class', 'composition');
        self.composition.attr('id', 'Composition');
        self.composition.sortable({connectWith: self.mediainspector, update: self.update, scroll: false, start: self.start, stop: self.stop});
        self.composition.disableSelection();
        self.source.before(self.composition);                           
                
        // start the plugin
        return this.init();            
        
    }
    
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* !Change */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  
    
    $.fn.composition = function() {

        return this.each(function() {
        
          if($(this).data('composition')) {
            return $(this).data('composition');
          } else {
            var composition = new Composition(this);
            $(this).data('composition', composition);
            return composition;
          }
          
        });
    
    }; 
    
})(jQuery);