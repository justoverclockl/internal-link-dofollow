import { extend } from 'flarum/common/extend';
import app from 'flarum/forum/app';
import CommentPost from 'flarum/forum/components/CommentPost';

app.initializers.add('justoverclock/internal-link-dofollow', () => {
  extend(CommentPost.prototype, ['oncreate', 'onupdate'], function () {
    const baseUrl = app.forum.attribute('baseUrl');
    const postBody = this.element.querySelector('.Post-body');
    const linkTag = postBody.querySelectorAll('a');

    for (const link of linkTag) {
      if (link.classList.contains('PostMention')) {
        continue;
      }

      const href = link.href;

      if (href.startsWith(baseUrl)) {
        linkTag[0].attributes[1].nodeValue = 'dofollow';
      }
    }
  });
});
