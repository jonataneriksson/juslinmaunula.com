<?php echo $topbar ?>

<div class="bars bars-with-sidebar-left cf">

<aside class="sidebar">

    <?php foreach($widgets as $widget): ?>
    <?php if(!$widget) continue; ?>
    <div class="sidebar-content section">

      <h2 class="hgroup<?php e(@$widget['title']['compressed'] == true, ' hgroup-compressed') ?> hgroup-single-line cf">
        <?php if(is_array($widget['title']) and $title = $widget['title']): ?>
        <span class="hgroup-title">
          <?php if(!empty($title['link'])): ?>
          <a<?php e(a::get($title, 'target'), ' target="' . a::get($title, 'target') . '"') ?> href="<?php __($title['link']) ?>"><?php __(a::get($title, 'text')) ?></a>
          <?php else: ?>
          <?php __(a::get($title, 'text')) ?>
          <?php endif ?>
        </span>
        <?php else: ?>
        <span class="hgroup-title">
          <?php __($widget['title']) ?>
        </span>
        <?php endif ?>

        <?php if(!empty($widget['options']) and is_array($widget['options'])): ?>
        <span class="hgroup-options shiv shiv-dark shiv-left">
          <span class="hgroup-option-right">
            <?php foreach($widget['options'] as $option): ?>
            <?php if(!empty($option['key'])): ?>
            <a title="<?php __($option['key']) ?>" data-shortcut="<?php __($option['key']) ?>" href="<?php __($option['link']) ?>">
            <?php else: ?>
            <a title="<?php __($option['text']) ?>" href="<?php __($option['link']) ?>">            
            <?php endif ?>
              <?php i($option['icon'], 'left') ?><span><?php __($option['text']) ?></span>
            </a>
            <?php endforeach ?>
          </span>
        </span>
        <?php endif ?>

      </h2>

      <?php echo $widget['html']() ?>

    </div>
    <?php endforeach ?>

</div>

</div>