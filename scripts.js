const bookmarkletTemplate = (b) => {
  // Icon currently doesn't work in Chrome, so not bothering for the moment
  const { title, script } = b;
  return `
    <a 
      id="${ title }" 
      class="bookmarklet" 
      href="javascript:${ encodeURIComponent(`(function(){${ script.trim() }})();`) }"
      ${ icon ? `icon="${ icon }"` : '' }
    >
      ${ icon ? `<img src="${ icon }" />` : '' }
      ${ title }
    </a>
  `;
}

// Scripts must have ` and $ escaped
const bookmarklets = [
  {
    title: 'Get Date',
    script: `
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

      const formattedDate = \`\${ yyyy }-\${ mm }-\${ dd }\`;

      copyToClipboard(formattedDate);
    `,
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAARFQTFRF/////v7+1tbW5ubm6Ojo0tLSqKiocXFxT09POzs7JSUlIiIiJycnREREW1tbd3d3tLS019fX9PT0x8fHMzMzICAgCwsLAAAAERERmZmZ3d3dZmZmNDQ0CgoKCAgIOTk54+Pj+fn5pKSkWFhYISEhHBwcBgYGwcHBu7u7VVVVa2trqqqq7u7uYGBgFxcXFhYWQEBAiIiIY2Nj1dXVWlpaExMTHR0dKSkpxsbGQUFBR0dHQ0ND09PTEBAQl5eXNjY2bGxs8/PzPj4+LS0tf39/6+vrFBQUaWlp6urqjY2N8vLyr6+vh4eHLCwswMDAQkJCBAQEKCgojo6OODg4DAwMHx8fGBgYn5+f8fHxzMzMPz8/hYE+AgAAAddJREFUeJztlWtfgjAUh7WwLEXCjCMsbxQ0TDG0Uku7WJrd79fv/0EiMt3GFHtd/1fi73k8O9thhkL/+U545iuz4algITI3H11YjMXiYkJakpMBeHJZSq0oMEh6RVQjE3ENrWYyWSCi5KR8YSyvr62LCImGSSpptDFOwFZxUy6VZFy2SaOC8ly8gLccYdC4QxlQrfGEDTEq/3yWo9SqFKT5eW17Rx896btUiYoksLwgKfXG6LHRpARIq+yBLItQJ+pqe7QAbOOCBFAnziiyzwiGSgutFECb7GGREUyLFg4M90tyl7KMAIf0jByZXtnj76ekarA8KJjkw1GvbEf3di+pd0yfADo57TMLg585QaqKcoofBzjtksKwx3av1+bhAGekUIvxITKoT1b4tRAPForkkmbFYOH8gtzWRLBwSR3cVSWIv25Qws16kHBLz7cc1ISCKN6dnvRkIYVpIdSyJgv+dxTzBg7g7r7cyYJicS5Azki7yZS1hx48sgvy+kY8Idt5SLRtp8QRQvnqE8d4en6xX994vDuziHsaJ84Y3r07sGgztGlYjUn/Ee8O/brZlsq5JYkU8qr1MawSayLs239/NKyfniFUPL+chvYS7nb7/e5FMPhX8gmk6GyX55nw+QAAAABJRU5ErkJggg=='
  },
  {
    title: 'Config.yml Generator',
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
          const configCreateCommand = \`theme configure --password=\${ password } --store=\${ store } --themeid=\${ themeID }\`;
          copyToClipboard(configCreateCommand);
          console.log('Paste this in your terminal:', configCreateCommand);
        }
      } catch (error) {
        console.error(error);
        alert('Something went wrong - check your console for deets.');
      }
    `,
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAARFQTFRF/////v7+1tbW5ubm6Ojo0tLSqKiocXFxT09POzs7JSUlIiIiJycnREREW1tbd3d3tLS019fX9PT0x8fHMzMzICAgCwsLAAAAERERmZmZ3d3dZmZmNDQ0CgoKCAgIOTk54+Pj+fn5pKSkWFhYISEhHBwcBgYGwcHBu7u7VVVVa2trqqqq7u7uYGBgFxcXFhYWQEBAiIiIY2Nj1dXVWlpaExMTHR0dKSkpxsbGQUFBR0dHQ0ND09PTEBAQl5eXNjY2bGxs8/PzPj4+LS0tf39/6+vrFBQUaWlp6urqjY2N8vLyr6+vh4eHLCwswMDAQkJCBAQEKCgojo6OODg4DAwMHx8fGBgYn5+f8fHxzMzMPz8/hYE+AgAAAddJREFUeJztlWtfgjAUh7WwLEXCjCMsbxQ0TDG0Uku7WJrd79fv/0EiMt3GFHtd/1fi73k8O9thhkL/+U545iuz4algITI3H11YjMXiYkJakpMBeHJZSq0oMEh6RVQjE3ENrWYyWSCi5KR8YSyvr62LCImGSSpptDFOwFZxUy6VZFy2SaOC8ly8gLccYdC4QxlQrfGEDTEq/3yWo9SqFKT5eW17Rx896btUiYoksLwgKfXG6LHRpARIq+yBLItQJ+pqe7QAbOOCBFAnziiyzwiGSgutFECb7GGREUyLFg4M90tyl7KMAIf0jByZXtnj76ekarA8KJjkw1GvbEf3di+pd0yfADo57TMLg585QaqKcoofBzjtksKwx3av1+bhAGekUIvxITKoT1b4tRAPForkkmbFYOH8gtzWRLBwSR3cVSWIv25Qws16kHBLz7cc1ISCKN6dnvRkIYVpIdSyJgv+dxTzBg7g7r7cyYJicS5Azki7yZS1hx48sgvy+kY8Idt5SLRtp8QRQvnqE8d4en6xX994vDuziHsaJ84Y3r07sGgztGlYjUn/Ee8O/brZlsq5JYkU8qr1MawSayLs239/NKyfniFUPL+chvYS7nb7/e5FMPhX8gmk6GyX55nw+QAAAABJRU5ErkJggg=='
  },
  {
    title: 'Get SKU of Current Variant',
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
    `,
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAAXNSR0IB2cksfwAAAAlwSFlzAAALEwAACxMBAJqcGAAAARFQTFRF/////v7+1tbW5ubm6Ojo0tLSqKiocXFxT09POzs7JSUlIiIiJycnREREW1tbd3d3tLS019fX9PT0x8fHMzMzICAgCwsLAAAAERERmZmZ3d3dZmZmNDQ0CgoKCAgIOTk54+Pj+fn5pKSkWFhYISEhHBwcBgYGwcHBu7u7VVVVa2trqqqq7u7uYGBgFxcXFhYWQEBAiIiIY2Nj1dXVWlpaExMTHR0dKSkpxsbGQUFBR0dHQ0ND09PTEBAQl5eXNjY2bGxs8/PzPj4+LS0tf39/6+vrFBQUaWlp6urqjY2N8vLyr6+vh4eHLCwswMDAQkJCBAQEKCgojo6OODg4DAwMHx8fGBgYn5+f8fHxzMzMPz8/hYE+AgAAAddJREFUeJztlWtfgjAUh7WwLEXCjCMsbxQ0TDG0Uku7WJrd79fv/0EiMt3GFHtd/1fi73k8O9thhkL/+U545iuz4algITI3H11YjMXiYkJakpMBeHJZSq0oMEh6RVQjE3ENrWYyWSCi5KR8YSyvr62LCImGSSpptDFOwFZxUy6VZFy2SaOC8ly8gLccYdC4QxlQrfGEDTEq/3yWo9SqFKT5eW17Rx896btUiYoksLwgKfXG6LHRpARIq+yBLItQJ+pqe7QAbOOCBFAnziiyzwiGSgutFECb7GGREUyLFg4M90tyl7KMAIf0jByZXtnj76ekarA8KJjkw1GvbEf3di+pd0yfADo57TMLg585QaqKcoofBzjtksKwx3av1+bhAGekUIvxITKoT1b4tRAPForkkmbFYOH8gtzWRLBwSR3cVSWIv25Qws16kHBLz7cc1ISCKN6dnvRkIYVpIdSyJgv+dxTzBg7g7r7cyYJicS5Azki7yZS1hx48sgvy+kY8Idt5SLRtp8QRQvnqE8d4en6xX994vDuziHsaJ84Y3r07sGgztGlYjUn/Ee8O/brZlsq5JYkU8qr1MawSayLs239/NKyfniFUPL+chvYS7nb7/e5FMPhX8gmk6GyX55nw+QAAAABJRU5ErkJggg=='
  }
];

/*
  {
    title: 'Title',
    script: `
      console.log('hi!');

    `
  }
*/

const html = bookmarklets.map(b => {
  return bookmarkletTemplate(b);
}).join('');

document.getElementById('bookmarkletContainer').innerHTML = html;