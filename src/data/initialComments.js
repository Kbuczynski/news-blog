const { generateId } = require('../helpers/generateId');

// TODO: add added time

// function currentTime() {
//   const today = new Date();
//   const date =
//     today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
//   const time =
//     today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

//   return `${date} ${time}`;
// }

function generateInitialComments(newsId) {
  const id1 = generateId();
  const id2 = generateId();

  const comment1 = {
    id: id1,
    newsId,
    // parent_id: null,
    content: 'lorem ipsum comment tested',
    author: 'anna',
  };

  const comment2 = {
    id: id2,
    newsId,
    // parent_id: id1,
    content: 'lorem ipsum comment tested 2',
    author: 'admin',
  };

  return [comment1, comment2];
}

exports.generateInitialComments = generateInitialComments;
