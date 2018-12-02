<?php

use Featherwebs\Mari\Models\Post;

function estimated_reading_time(Post $post)
{
  $word = str_word_count(strip_tags($post->content));
  $m = floor($word / 50);
  $m = $m < 1 ? 1: $m;
  $est = $m . ' minute' . ($m == 1 ? '' : 's');

  return $est;
}