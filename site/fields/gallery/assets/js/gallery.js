(function($) {

    var Gallery = function(element) {
    
        var self = this;

        // basic elements and stuff
        this.source       = $(element);
        this.element      = $('<ul />');
        this.input        = $('<input class="gallery-input" type="text"/>');
        this.media        = this.source.data('media'); 
        this.order        = [];                  
        
        /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
        /* !Initialize */
        /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
        
        self.init = function() {
            
            media = self.source.val() ? JSON.parse(self.source.val()) : self.media;
            
            if(media){   
            
                self.order = [];                 
        
                $.each(media, function() {
                
                    var item = {};
                    item.wrapper = $('<li />');
                    item.name = this.name;
                    item.wrapper.attr('class', 'gallery-item');                
                    item.type = this.type;
                    item.data = JSON.stringify(this);
                    item.wrapper.attr('data-item', item.data);
                
                    switch(item.type) {
                    
                        /* ~~ Images ~~ */
                        case "image":
                            item.element = $('<img />');
                            item.element.attr('src', this.thumbnail);
                            //item.element.attr('width', this.width);  
                            //item.element.attr('height', this.height);
                            item.wrapper.append(item.element);
                            break;

                        /* ~~ Videos ~~ */
                        case "video":
                            item.element = $('<video controls/>');
                            item.element.attr('poster', this.thumbnail);
                            item.mp4 = $('<source src="'+this.mp4+'" type="video/mp4">');
                            item.webm = $('<source src="'+this.webm+'" type="video/webm">');  
                            item.jpg = $('<img src="'+this.jpg+'">');
                            item.element.append(item.mp4).append(item.webm).append(item.jpg);                                                                                
                            item.wrapper.append(item.element);
                            break;                        
                        
                        break;
                    }
                    self.order.push(this);
                    self.element.append(item.wrapper);
                });
                
                self.source.val(JSON.stringify(self.order));
            
            }
            
            self.source.before(self.element);
            
        }        
        
        /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
        /* !Update */
        /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

        self.update = function(event, ui) {
            self.order = [];
            $.each(self.element[0].children, function() {
                self.order.push(JSON.parse(this.dataset.item));
            });
            console.log(self.order);
            self.source.val(JSON.stringify(self.order));
        }

        self.element.attr('class', 'gallery');
        self.element.sortable({update: self.update});
        self.element.disableSelection();                
                
        // start the plugin
        return this.init();            
        
    }
    
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
    /* !Change */
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
  
    
    $.fn.gallery = function() {

        return this.each(function() {
        
          if($(this).data('gallery')) {
            return $(this).data('gallery');
          } else {
            var gallery = new Gallery(this);
            $(this).data('gallery', gallery);
            return gallery;
          }
          
        });
    
    }; 
    
})(jQuery);