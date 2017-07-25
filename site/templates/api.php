<?php

$json = (object) '';

    if($name = get('name')):
    $object = (object) '';	
	$project = $pages->find('archive')->find($name);
	$object->title = (string)$project->title();
	$object->url = (string)$project->url();
	$object->uid = (string)$project->uid();
    $object->description = (string)$project->description()->markdown();	
	$object->gallery = json_decode($project->gallery());    
    /* foreach($project->files() as $file):
        $media[$file->name()]['url'] = (string)$file->url();
        $media[$file->name()]['name'] = (string)$file->name();
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
    endforeach;
    $object->media = $media;*/
    endif;

	foreach($pages->visible() as $current):
       $item = (object) '';
	   $item->title = (string)$current->title();
	   $item->url = (string)$current->url();
	   $item->uid = (string)$current->uid();
	   foreach($current->children()->visible() as $child):
	       $children[] = array(
		      'url'  => (string)$child->url(),
		      'title'  => (string)$child->title(),
		      'thumbnail'  => (string)$child->images()->first()->url(),
		      'width'  => (string)$child->images()->first()->width(),		      
		      'height'  => (string)$child->images()->first()->height(),		      		      
		      'orientation'  => (string)$child->images()->first()->orientation()		            
		    );
	   endforeach;
	   $item->items = $children;
	   $items[$current->uid()] = $item;
	   
	   if($current->link()):
            $item->link = (string)$current->link();
       else:
            $item->link = 'none';
	   endif;
	   
	   if($current->uid() == 'about'):
            $item->description = (string)$current->description()->markdown();            
            $item->contact = (string)$current->contact()->markdown();
            $item->laurabio = (string)$current->laurabio()->markdown();
            $item->lillibio = (string)$current->lillibio()->markdown();
	   endif;
	   
	endforeach;
    if($cover = $pages->find('cover')):
        $json->cover = json_decode($cover->cover());
    endif;
    
$json->pages = $items;
$json->project = $object;

echo json_encode($json);
?>