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
      function copyToClipboard(str) {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      };

      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });

      const getAndUseProductInfo = async () => {
        const variantParam = params.variant;
        const { origin, pathname } = location;
        const productJSONURL = \`\${ origin }\${ pathname }.json\`;
        const response = await fetch(productJSONURL);
        const data = await response.json();

        const variant = data.product.variants.find(v => v.id == variantParam);
        const { sku } = variant;
        console.log('SKU of current variant:', sku);
        copyToClipboard(sku);
      }

      getAndUseProductInfo();
    `
  }
];

const html = bookmarklets.map(b => {
  const { title, script } = b;
  return bookmarkletTemplate(title, script);
}).join('');

document.getElementById('bookmarkletContainer').innerHTML = html;