(function($) {

    //Kirby magically knows how to call this

    var Composition = function(element) {

        //Basic elements and stuff
        var self = this;        
        this.source       = $(element);
        this.mediainspector = $('<ul id="Mediainspector" class="composition"/>');
        this.composition  = $('<ul id="Composition" class="composition"/>');
        this.input        = $('<input class="composition-input" type="text"/>');
        this.media        = this.source.data('media'); //We've stored the media JSON here from PHP
        this.order        = [];
        this.hashes       = [];
        this.value        = this.source.val();   
        this.store        = JSON.parse(this.value);
        
        //Go through the array of items stored in the input and create array of hashes
        $.each(self.store, function() {
            self.hashes.push(this.hash);
        })       
        
        /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
        /* !Initialize */
        /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
        
        self.init = function() {
                
            if(self.media){       
                $.each(self.media, function() {
                    
                    //Initialize
                    var item = {};
                    item.name = this.name;
                    item.type = this.type;
                    item.data = this;
                    
                    //Create the wrapper element
                    item.wrapper = $('<li />');
                    item.wrapper.attr('class', 'item');                
                    item.wrapper.attr('data-item', JSON.stringify(item.data));
                    
                    //Create image tag
                    item.element = $('<img />');
                    item.element.attr('src', this.url);
                    
                    //Add the image to our wrapper
                    item.wrapper.append(item.element);
                    
                    //Click the item and it will get small
                    item.wrapper.bind('click', function() {
                        $(this).toggleClass('small');
                        self.update();
                    });
                                        
                    //Whats it's index?
                    item.storeindex = self.hashes.indexOf(this.hash)
                    
                    //Is it included in the order?
                    if(-1 < item.storeindex){
                        
                        //If it's listed add it to ordered list
                        storeditem = self.store[item.storeindex];
                        item.wrapper.attr('class', storeditem.className); 
                        self.order[item.storeindex] = item;
                        
                    } else {
                    
                        //Else add it to the mediainspector
                        self.mediainspector.append(item.wrapper);
                        
                    }
                    
                    //End looping items
                });
                
                //Add the composition
                $.each(self.order, function(i) {
                    self.composition.append(this.wrapper);
                });
            }
                                    
        }   

        //Configure sortable
        self.mediainspector.sortable({connectWith: self.composition, update: self.update});
        self.composition.sortable({connectWith: self.mediainspector, update: self.update, scroll: false, start: self.start, stop: self.stop});
        
        //Disable selection
        self.mediainspector.disableSelection(); 
        self.composition.disableSelection();
        
        //Add to the panel
        self.source.before(self.mediainspector);
        self.source.before(self.composition);
        
        //Update function
        self.update = function(event, ui) {
            self.order = [];
            $.each(self.composition[0].children, function(order) {
                data = JSON.parse(this.dataset.item);
                data.className = this.className;
                data.order = order;
                self.order.push(data);
            });
            console.log(self.order);
            self.source.val(JSON.stringify(self.order));
        }                                   
                
        // start the plugin
        return this.init();            
        
    }
    
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* !The magic function */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  
    
    $.fn.composition = function() {

        return this.each(function() {
          
          //This was from the original
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