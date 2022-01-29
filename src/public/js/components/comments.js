/* eslint-disable no-undef */

class Comments {
  constructor(base) {
    this._base = base;

    this._commentsWrapper = this._base.querySelector('.comments-list');
    this._formMessage = this._base.querySelector('#comment-form-message');

    this._submit = this._base.querySelector('.comment-add__submit');
    this._addCommentHandler = this._addComment.bind(this);

    this._deleteButtons = this._base.querySelectorAll('.comment__delete');
    this._deleteCommentHandler = this._deleteComment.bind(this);

    this._addEvents();
  }

  get newsId() {
    const urlParts = window.location.href.split('/');
    return urlParts[urlParts.length - 1];
  }

  _createMessage(text, node) {
    // eslint-disable-next-line no-param-reassign
    node.textContent = Array.isArray(text) ? text.join(' ') : text;
  }

  _createComment({ id, content, author }, node) {
    // eslint-disable-next-line no-param-reassign
    node.innerHTML += `
      <div class="comment" comment-id="${id}">
        <p class="comment__content">${content}</p>
        <p class="comment__author">Author:&nbsp;<span>${author}</span></p>
        <button class="comment__delete">Delete</button>
      </div>
    `;
  }

  _addEvents() {
    this._submit = this._base.querySelector('.comment-add__submit');
    this._deleteButtons = this._base.querySelectorAll('.comment__delete');

    if (this._submit) {
      this._submit.removeEventListener('click', this._addCommentHandler);
      this._submit.addEventListener('click', this._addCommentHandler);
    }
    if (this._deleteButtons) {
      this._deleteButtons.forEach((b) => b.removeEventListener('click', this._deleteCommentHandler));
      this._deleteButtons.forEach((b) => b.addEventListener('click', this._deleteCommentHandler));
    }
  }

  async _addComment(e) {
    e.preventDefault();
    const content = this._base.querySelector('#comment-content');
    const author = this._base.querySelector('#comment-author');

    const response = await api.post('comments/add', {
      newsId: this.newsId,
      content: content.value,
      author: author.value,
    });

    if (response.errors.length) {
      this._formMessage.classList.add('info--error');
      this._createMessage(response.errors, this._formMessage);
    } else {
      this._formMessage.classList.remove('info--error');
      this._createMessage(response.message, this._formMessage);
      this._createComment(response.data, this._commentsWrapper);

      content.value = '';
      if (!author.hasAttribute('disabled')) author.value = '';

      this._addEvents();

      setTimeout(() => {
        this._formMessage.textContent = '';
      }, 2000);
    }
  }

  async _deleteComment(e) {
    const currentComment = e.target.parentElement;
    const commentId = currentComment.getAttribute('comment-id');

    const response = await api.delete(`comments/remove/${commentId}`);

    if (response.errors.length) {
      // eslint-disable-next-line no-alert
      alert(response.errors.join(' '));
    } else {
      currentComment.remove();
      this._addEvents();
    }
  }
}

export default Comments;
