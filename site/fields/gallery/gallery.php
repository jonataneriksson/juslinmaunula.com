<?php

class GalleryField extends InputField {

  static public $assets = array(
    'js' => array(
      'gallery.js'
    ),
    'css' => array(
      'gallery.css'   // /path/to/field/assets/css/styles.css
    )
  );
  
  public function input() {
  
    $input = parent::input();    

    if(isset($this->data)) {
    
      $input->data('url', html(json_encode($this->data), false));
      
    } else if($page = $this->page()):

        foreach($page->files() as $file):

            if($file->type() == 'image'):
                $media[$file->name()]['orientation'] = (string)$file->orientation();
                $media[$file->name()]['thumbnail'] = (string)$file->url();
                $media[$file->name()]['width'] = (string)$file->width(); 
                $media[$file->name()]['height'] = (string)$file->height();                                                   
            endif;
            
            if($media[$file->name()]['type'] != 'video'):
                $media[$file->name()]['type'] = (string)$file->type();
            endif;
                  
            $media[$file->name()][$file->extension()] = (string)$file->url();                    
            $media[$file->name()]['url'] = (string)$file->url();
            $media[$file->name()]['name'] = (string)$file->name();            
            
        endforeach;

        $mediajson = html(json_encode($media));
        
        $input->data(array('media' => $mediajson, 'field' => 'gallery' ));
        
    endif;

    //$input->tag('div');
    //$input->removeAttr('type');
    //$input->removeAttr('value');
    return $input;

  } 
  
  //public function content() { return 'This overrides input'; }   

  public function result() {
    // Convert all line-endings to UNIX format
    return str_replace(array("\r\n", "\r"), "\n", parent::result());
  }

  /*public function element() {

    $element = parent::element();
    $element->addClass('field-with-textarea');
    
    return $element;

  }*/

}
