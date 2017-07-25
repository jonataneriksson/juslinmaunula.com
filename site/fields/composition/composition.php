<?php

class CompositionField extends InputField {

  static public $assets = array(
    'js' => array(
      'composition.js'
    ),
    'css' => array(
      'composition.css'   // /path/to/field/assets/css/styles.css
    )
  );
  
  public function input() {
  
    $input = parent::input();
        
    function loopThroughLevels($collection,&$everything) {
        foreach($collection as $item):
            //echo($item->title());
            $files = $item->images()->toArray();
            foreach($files as $file):
                $file['permalink'] = $item->uri();
                $everything[] = $file;
            endforeach;
            if($item->hasChildren()) loopThroughLevels($item->children(),$everything);
        endforeach;
        return $everything;
    }
    
    $everything = loopThroughLevels(kirby()->site()->children(), $everything = []);

    $mediajson = html(json_encode($everything));
        
    $input->data(array('media' => $mediajson, 'field' => 'composition' ));

    //This needs to be here...
    return $input;

  } 
  
  //public function content() { return 'This overrides input'; }   

  public function result() {
    // Convert all line-endings to UNIX format
    return str_replace(array("\r\n", "\r"), "\n", parent::result());
  }

}
