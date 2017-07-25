<?php echo($data->text()->value()); ?>
  <table>
    <tbody><tr>
      <td style="text-align: center;">
        <?php if ($data->leftside()->isNotEmpty()): ?>
        <?php foreach (explode(',',$data->leftside()->value()) as $image): ?>
        <img style="max-height: 500px; width: auto;" src="<?php echo $page->image($image)->url() ?>">
        <?php endforeach; ?>
        <?php endif ?>
      </td>
      <td style="text-align: center;">
        <?php if ($data->rightside()->isNotEmpty()): ?>
        <?php foreach (explode(',',$data->rightside()->value()) as $image): ?>
        <img style="max-height: 500px; width: auto;" src="<?php echo $page->image($image)->url() ?>">
        <?php endforeach; ?>
        <?php endif ?>
      </td>
    </tr></tbody>
  </table>
