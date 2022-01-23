/* eslint-disable no-undef */

// TODO: refactor to class
// TODO: handle removing

function createMessage(text, node) {
  // eslint-disable-next-line no-param-reassign
  node.textContent = Array.isArray(text) ? text.join(' ') : text;
}

function createComment(content, author, node) {
  const newComment = `
    <div class="comment">
      <p class="comment__content">${content}</p>
      <p class="comment__author">Author:&nbsp;<span>${author}</span></p>
    </div>
  `;

  // eslint-disable-next-line no-param-reassign
  node.innerHTML += newComment;
}

async function addComment() {
  const content = document.querySelector('#comment-content');
  const author = document.querySelector('#comment-author');
  const submit = document.querySelector('.comment-add__submit');
  const commentsWrapper = document.querySelector('.comments-list');
  const formMessage = document.querySelector('#comment-form-message');

  submit.addEventListener('click', async (e) => {
    e.preventDefault();
    const urlParts = window.location.href.split('/');
    const newsId = urlParts[urlParts.length - 1];

    const response = await api.post('comments/add', {
      newsId,
      content: content.value,
      author: author.value,
    });

    if (response.errors.length) {
      createMessage(response.errors, formMessage);
      formMessage.classList.add('info--error');
    } else {
      formMessage.classList.remove('info--error');
      createMessage(response.message, formMessage);
      createComment(content.value, author.value, commentsWrapper);
      content.value = '';
      if (!author.hasAttribute('disabled')) author.value = '';
      document.querySelector('#comment-message').textContent = '';
      setTimeout(() => {
        formMessage.textContent = '';
      }, 2000);
    }
  });
}

export default addComment;
