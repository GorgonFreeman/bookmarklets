const bookmarkletTemplate = (b) => {
  // Icon currently doesn't work in Chrome, so not bothering for the moment
  const { title, script } = b;
  return `
    <a 
      id="${ title }" 
      class="bookmarklet" 
      href="javascript:${ encodeURIComponent(`(function(){${ script.toString().replace('() => {', '').slice(0, -1).trim() }})();`) }"
      ${ typeof icon === 'undefined' ? '' : `icon="${ icon }"` }
    >
      ${ typeof icon === 'undefined' ? '' : `<img src="${ icon }" />` }
      ${ title }
    </a>
  `;
}

// Scripts must have ` and $ escaped
const bookmarklets = [
  {
    title: 'Get Date in YYYY-MM-DD',
    script: () => {
      const copyToClipboard = str => {
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

      const today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear().toString();

      const formattedDate = `${ yyyy }-${ mm }-${ dd }`;

      copyToClipboard(formattedDate);
    },
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAARFQTFRF/////v7+1tbW5ubm6Ojo0tLSqKiocXFxT09POzs7JSUlIiIiJycnREREW1tbd3d3tLS019fX9PT0x8fHMzMzICAgCwsLAAAAERERmZmZ3d3dZmZmNDQ0CgoKCAgIOTk54+Pj+fn5pKSkWFhYISEhHBwcBgYGwcHBu7u7VVVVa2trqqqq7u7uYGBgFxcXFhYWQEBAiIiIY2Nj1dXVWlpaExMTHR0dKSkpxsbGQUFBR0dHQ0ND09PTEBAQl5eXNjY2bGxs8/PzPj4+LS0tf39/6+vrFBQUaWlp6urqjY2N8vLyr6+vh4eHLCwswMDAQkJCBAQEKCgojo6OODg4DAwMHx8fGBgYn5+f8fHxzMzMPz8/hYE+AgAAAddJREFUeJztlWtfgjAUh7WwLEXCjCMsbxQ0TDG0Uku7WJrd79fv/0EiMt3GFHtd/1fi73k8O9thhkL/+U545iuz4algITI3H11YjMXiYkJakpMBeHJZSq0oMEh6RVQjE3ENrWYyWSCi5KR8YSyvr62LCImGSSpptDFOwFZxUy6VZFy2SaOC8ly8gLccYdC4QxlQrfGEDTEq/3yWo9SqFKT5eW17Rx896btUiYoksLwgKfXG6LHRpARIq+yBLItQJ+pqe7QAbOOCBFAnziiyzwiGSgutFECb7GGREUyLFg4M90tyl7KMAIf0jByZXtnj76ekarA8KJjkw1GvbEf3di+pd0yfADo57TMLg585QaqKcoofBzjtksKwx3av1+bhAGekUIvxITKoT1b4tRAPForkkmbFYOH8gtzWRLBwSR3cVSWIv25Qws16kHBLz7cc1ISCKN6dnvRkIYVpIdSyJgv+dxTzBg7g7r7cyYJicS5Azki7yZS1hx48sgvy+kY8Idt5SLRtp8QRQvnqE8d4en6xX994vDuziHsaJ84Y3r07sGgztGlYjUn/Ee8O/brZlsq5JYkU8qr1MawSayLs239/NKyfniFUPL+chvYS7nb7/e5FMPhX8gmk6GyX55nw+QAAAABJRU5ErkJggg==',
    docs: 'https://gist.github.com/GorgonFreeman/f0e6d1e7f1dd9a333f81116654e1965e'
  },
  {
    title: 'Config.yml Generator',
    script: () => {
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

      try {
        const url = new URL(location.href);

        let themeID = localStorage.getItem('configThemeID');
        let password = localStorage.getItem('configPassword');
        let store = localStorage.getItem('configStore');

        const onAThemePage = url.href.indexOf('/admin/themes/') !== -1;
        const onAPrivateAppPage = url.href.indexOf('/admin/apps/private/') !== -1;
        const onAShopifyPage = url.href.indexOf('.myshopify') !== -1;
        
        if (onAShopifyPage) {
          store = url.host;
        }

        if (!themeID) {
          if (onAThemePage) {
            // We are on a theme page, and we need the theme ID. Seize it!
            themeID = url.href.split('themes/')[1].split('/')[0];

            window.localStorage.setItem('configThemeID', themeID);
            console.log('Theme ID ready to use! \( 0v0\)._/ Go to the private app for your password, or click again to enter manually!');

          } else {
            alert('Go to the Edit Theme page on the appropriate theme to get started');
          }
        } else if (!password) {
          if (onAPrivateAppPage) {
            // We are on a private app page. Take the password!
            password = $('[name="private_app_password"]').val();
          } else {
            password = prompt("Enter your Theme Kit password - this could be from a private app, an email from the Theme Kit Access app, or a custom app. If it's a private app, go to the private app page and click this bookmarklet again.");
          }
          window.localStorage.setItem('configPassword', password);
          console.log('Password ready to use! \( 0v0\)._/ Making your command now!');
        }

        if (themeID && password) {
          window.localStorage.removeItem('configThemeID');
          window.localStorage.removeItem('configPassword');
          window.localStorage.removeItem('configStore');
          console.log('Credentials used and destroyed! \(0w0\)9');
          const configCreateCommand = `theme configure --password=${ password } --store=${ store } --themeid=${ themeID }`;
          copyToClipboard(configCreateCommand);
          console.log('Paste this in your terminal:', configCreateCommand);
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong - check your console for deets.');
      }
    },
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAARFQTFRF/////v7+1tbW5ubm6Ojo0tLSqKiocXFxT09POzs7JSUlIiIiJycnREREW1tbd3d3tLS019fX9PT0x8fHMzMzICAgCwsLAAAAERERmZmZ3d3dZmZmNDQ0CgoKCAgIOTk54+Pj+fn5pKSkWFhYISEhHBwcBgYGwcHBu7u7VVVVa2trqqqq7u7uYGBgFxcXFhYWQEBAiIiIY2Nj1dXVWlpaExMTHR0dKSkpxsbGQUFBR0dHQ0ND09PTEBAQl5eXNjY2bGxs8/PzPj4+LS0tf39/6+vrFBQUaWlp6urqjY2N8vLyr6+vh4eHLCwswMDAQkJCBAQEKCgojo6OODg4DAwMHx8fGBgYn5+f8fHxzMzMPz8/hYE+AgAAAddJREFUeJztlWtfgjAUh7WwLEXCjCMsbxQ0TDG0Uku7WJrd79fv/0EiMt3GFHtd/1fi73k8O9thhkL/+U545iuz4algITI3H11YjMXiYkJakpMBeHJZSq0oMEh6RVQjE3ENrWYyWSCi5KR8YSyvr62LCImGSSpptDFOwFZxUy6VZFy2SaOC8ly8gLccYdC4QxlQrfGEDTEq/3yWo9SqFKT5eW17Rx896btUiYoksLwgKfXG6LHRpARIq+yBLItQJ+pqe7QAbOOCBFAnziiyzwiGSgutFECb7GGREUyLFg4M90tyl7KMAIf0jByZXtnj76ekarA8KJjkw1GvbEf3di+pd0yfADo57TMLg585QaqKcoofBzjtksKwx3av1+bhAGekUIvxITKoT1b4tRAPForkkmbFYOH8gtzWRLBwSR3cVSWIv25Qws16kHBLz7cc1ISCKN6dnvRkIYVpIdSyJgv+dxTzBg7g7r7cyYJicS5Azki7yZS1hx48sgvy+kY8Idt5SLRtp8QRQvnqE8d4en6xX994vDuziHsaJ84Y3r07sGgztGlYjUn/Ee8O/brZlsq5JYkU8qr1MawSayLs239/NKyfniFUPL+chvYS7nb7/e5FMPhX8gmk6GyX55nw+QAAAABJRU5ErkJggg==',
    docs: 'https://gist.github.com/GorgonFreeman/125a5730a525f14e34e959846ebdde59'
  },
  {
    title: 'Get SKU of Current Variant',
    script: () => {
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
        const productJSONURL = `${ origin }${ pathname }.json`;
        const response = await fetch(productJSONURL);
        const data = await response.json();

        const variant = data.product.variants.find(v => v.id == variantParam);
        const { sku } = variant;
        console.log('SKU of current variant:', sku);
        copyToClipboard(sku);
      }

      getAndUseProductInfo();
    },
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAARFQTFRF/////v7+1tbW5ubm6Ojo0tLSqKiocXFxT09POzs7JSUlIiIiJycnREREW1tbd3d3tLS019fX9PT0x8fHMzMzICAgCwsLAAAAERERmZmZ3d3dZmZmNDQ0CgoKCAgIOTk54+Pj+fn5pKSkWFhYISEhHBwcBgYGwcHBu7u7VVVVa2trqqqq7u7uYGBgFxcXFhYWQEBAiIiIY2Nj1dXVWlpaExMTHR0dKSkpxsbGQUFBR0dHQ0ND09PTEBAQl5eXNjY2bGxs8/PzPj4+LS0tf39/6+vrFBQUaWlp6urqjY2N8vLyr6+vh4eHLCwswMDAQkJCBAQEKCgojo6OODg4DAwMHx8fGBgYn5+f8fHxzMzMPz8/hYE+AgAAAddJREFUeJztlWtfgjAUh7WwLEXCjCMsbxQ0TDG0Uku7WJrd79fv/0EiMt3GFHtd/1fi73k8O9thhkL/+U545iuz4algITI3H11YjMXiYkJakpMBeHJZSq0oMEh6RVQjE3ENrWYyWSCi5KR8YSyvr62LCImGSSpptDFOwFZxUy6VZFy2SaOC8ly8gLccYdC4QxlQrfGEDTEq/3yWo9SqFKT5eW17Rx896btUiYoksLwgKfXG6LHRpARIq+yBLItQJ+pqe7QAbOOCBFAnziiyzwiGSgutFECb7GGREUyLFg4M90tyl7KMAIf0jByZXtnj76ekarA8KJjkw1GvbEf3di+pd0yfADo57TMLg585QaqKcoofBzjtksKwx3av1+bhAGekUIvxITKoT1b4tRAPForkkmbFYOH8gtzWRLBwSR3cVSWIv25Qws16kHBLz7cc1ISCKN6dnvRkIYVpIdSyJgv+dxTzBg7g7r7cyYJicS5Azki7yZS1hx48sgvy+kY8Idt5SLRtp8QRQvnqE8d4en6xX994vDuziHsaJ84Y3r07sGgztGlYjUn/Ee8O/brZlsq5JYkU8qr1MawSayLs239/NKyfniFUPL+chvYS7nb7/e5FMPhX8gmk6GyX55nw+QAAAABJRU5ErkJggg==',
    docs: 'https://gist.github.com/GorgonFreeman/86a4e60935c9834e7d9126fc51b5344c'
  },
  {
    title: 'Permalinkify',
    script: () => {
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

      const getCartAndPermalinkifyContents = async() => {
        const cartContents = await fetch('/cart.json').then(response => response.json());
        copyToClipboard(`${ window.location.origin }/cart/${ cartContents.items.map(i => i.price > 0 ? `${ i.variant_id }:${ i.quantity }` : null).filter(i => i !== null).join(',') }`);
      };

      getCartAndPermalinkifyContents();
    },
    docs: 'https://gist.github.com/GorgonFreeman/2cfedf9dbd1b693c13d7ea4c1a98be42'
  },
  {
    title: 'ClickUp Feature Branch Name Generator',
    script: () => {
      try {
        const url = new URL(window.location.href);
        const taskID = url.pathname.replace('/t/', '');

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
        
        copyToClipboard(`features/${ taskID }_`);
      } catch(err) {
        alert("An error occurred: \n\n" + err.message + "\n\n Make sure you're on a ClickUp task page. If you are, check the console for more details.");
        console.log(err);
      }
    },
    docs: 'https://gist.github.com/GorgonFreeman/696d916ff18ef2a10c8d365bd2c2d5ae'
  },
  {
    title: 'ClickUp Commit Message Generator',
    script: () => {
      try {
        const url = new URL(window.location.href);
        const taskID = url.pathname.replace('/t/', '');

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
        
        copyToClipboard(`#${ taskID } - `);
      } catch(err) {
        alert("An error occurred: \n\n" + err.message + "\n\n Make sure you're on a ClickUp task page. If you are, check the console for more details.");
        console.log(err);
      }
    },
    docs: 'https://gist.github.com/GorgonFreeman/cb775be72a476033b1eaa05a588f8cfe'
  },
  {
    title: 'Shopify Preview Link Generator',
    script: () => {
      try {
        var url = new URL(window.location.href);
        url.searchParams.set('preview_theme_id', window.Shopify.theme.id);

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
        
        copyToClipboard(url.href);
      } catch(err) {
        alert("An error occurred: \n\n" + err.message + "\n\n Make sure you're on a Shopify page. If you are, check the console for more details.");
        console.log(err);
      }
    },
    docs: 'https://gist.github.com/GorgonFreeman/3500783581b6100963921919a1073c1b'
  }
];

/*
  {
    title: 'Title',
    script: () => {
      console.log('hi!');
    },
    docs: ''
  }
*/

const html = bookmarklets.map(b => {
  return bookmarkletTemplate(b);
}).join('');

document.getElementById('bookmarkletContainer').innerHTML = html;