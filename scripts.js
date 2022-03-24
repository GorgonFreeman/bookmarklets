const bookmarkletTemplate = (title, script) => {
  return `
    <a 
      id="${ title }" 
      class="bookmarklet" 
      href="javascript:${ encodeURIComponent(`(function(){${ script.trim() }})();`) }"
    >
      ${ title }
    </a>
  `;
}

// Scripts must have ` and $ escaped
const bookmarklets = [
  {
    title: 'Test',
    script: `
      console.log('Hi!');
    `
  }
];

const html = bookmarklets.map(b => {
  const { title, script } = b;
  return bookmarkletTemplate(title, script);
}).join('');

document.getElementById('bookmarkletContainer').innerHTML = html;