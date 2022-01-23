/* eslint-disable no-undef */

// TODO: refactor to class
// TODO: handle removing (show info message if 0 comments)

function createMessage(text, node) {
  // eslint-disable-next-line no-param-reassign
  node.textContent = Array.isArray(text) ? text.join(' ') : text;
}

function createComment(content, author, node) {
  const div = document.createElement('div');
  const pContent = document.createElement('p');
  const pAuthor = document.createElement('p');

  div.classList.add('comment');
  pContent.classList.add('comment__content');
  pAuthor.classList.add('comment__author');

  pContent.textContent = content;
  pAuthor.innerHTML = `Author:&nbsp;<span>${author}</span>`;
  div.append(pContent, pAuthor);

  return node.append(div);
}

async function addComment() {
  const content = document.querySelector('.addComment__content');
  const author = document.querySelector('.addComment__author');
  const submit = document.querySelector('.addComment__submit');
  const commentsWrapper = document.querySelector('.article__comments');
  const formResponse = document.querySelector('.form__response');
  const info = document.querySelector('.info');

  submit.addEventListener('click', async (e) => {
    e.preventDefault();
    formResponse.textContent = '';

    if (document.querySelector('p[temp-message=true]')) document.querySelector('p[temp-message=true]').remove();

    // TODO: validate

    const urlParts = window.location.href.split('/');
    const newsId = urlParts[urlParts.length - 1];

    const response = await api.post('comments/add', {
      newsId,
      content: content.value,
      author: author.value,
    });

    if (response.errors.length) {
      createMessage(response.errors, formResponse);
    } else {
      createMessage(response.message, formResponse);
      createComment(content.value, author.value, commentsWrapper);
      content.value = '';
      if (!author.hasAttribute('disabled')) author.value = '';
      info && info.classList.add('hide');
      setTimeout(() => {
        formResponse.textContent = '';
      }, 2000);
    }
  });
}

export default addComment;
