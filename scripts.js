const bookmarkletTemplate = (b) => {
  // Icon currently doesn't work in Chrome, so not bothering for the moment
  const { title, script, docs, version } = b;
  return `
    <a 
      id="${ title }" 
      class="bookmarklet" 
      href="javascript:${ encodeURIComponent(`(function(){${ script.toString().replace('() => {', '').slice(0, -1).trim() }})();`) }"
      ${ typeof icon === 'undefined' ? '' : `icon="${ icon }"` }
    >
      ${ typeof icon === 'undefined' ? '' : `<img src="${ icon }" />` }
      ${ title }
      <div class="bookmarklet_version">v${ version }</div>
      ${ docs ? `<button class="bookmarklet_docs" onClick="linkOut('${ docs }')">${ questionMarkIcon }</button>` : '' }
    </a>
  `;
}

const questionMarkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.601 21.5c0 1.38-1.116 2.5-2.499 2.5-1.378 0-2.499-1.12-2.499-2.5s1.121-2.5 2.499-2.5c1.383 0 2.499 1.119 2.499 2.5zm-2.42-21.5c-4.029 0-7.06 2.693-7.06 8h3.955c0-2.304.906-4.189 3.024-4.189 1.247 0 2.57.828 2.684 2.411.123 1.666-.767 2.511-1.892 3.582-2.924 2.78-2.816 4.049-2.816 7.196h3.943c0-1.452-.157-2.508 1.838-4.659 1.331-1.436 2.986-3.222 3.021-5.943.047-3.963-2.751-6.398-6.697-6.398z"/></svg>`;

const linkOut = (url) => {
  event.preventDefault();
  event.stopPropagation();
  window.open(url);
  return false;
}

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
    docs: 'https://gist.github.com/GorgonFreeman/f0e6d1e7f1dd9a333f81116654e1965e',
    version: '1.0',
    category: 1
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
    docs: 'https://gist.github.com/GorgonFreeman/125a5730a525f14e34e959846ebdde59',
    version: '3.0',
    category: 2
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
    docs: 'https://gist.github.com/GorgonFreeman/86a4e60935c9834e7d9126fc51b5344c',
    version: '1.0',
    category: 1
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
    docs: 'https://gist.github.com/GorgonFreeman/2cfedf9dbd1b693c13d7ea4c1a98be42',
    version: '2.0',
    category: 0
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
    docs: 'https://gist.github.com/GorgonFreeman/696d916ff18ef2a10c8d365bd2c2d5ae',
    version: '1.0',
    category: 2
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
    docs: 'https://gist.github.com/GorgonFreeman/cb775be72a476033b1eaa05a588f8cfe',
    version: '1.0',
    category: 2
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
    docs: 'https://gist.github.com/GorgonFreeman/3500783581b6100963921919a1073c1b',
    version: '2.0',
    category: 0
  },
  {
    title: 'JSON to CSV',
    script: () => {

      // ^['"`] Regex for first character if quote
      // ['"`]$ Regex for last character if quote
      const sanitise = input => {
        return input.replace(/^['"`]/, '').replace(/['"`]$/, '');
      };

      const dblQuoteEncasedRegex = new RegExp('^".*"$');
      const preserveCommas = input => {
        // Double-quote any values containing a comma
        // unless already double-quoted
        try {
          if (input.indexOf(',') && !dblQuoteEncasedRegex.test(input)) {
            return `"${ input }"`;
          }
          return input;
        } catch(err) {
          // Lazy way of handling non-string values
          return input;
        }
      };

      let arr = JSON.parse(sanitise(prompt('Paste your array of JSON objects here:')));
      console.log('Data', arr);
      const inputAsArr = Array.isArray(arr) ? arr : [arr];

      const cols = inputAsArr.map(item => Object.keys(item))
        .flat()
        // Make keys unique
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
      const headerRow = cols.map(val => preserveCommas(val)).join(',');
      // const rows = inputAsArr.map(item => Object.values(item).map(val => preserveCommas(val)).join(','));
      const rows = inputAsArr.map(item => cols.map(col => {
        const val = item?.[col] ?? '';
        return preserveCommas(val);
      }));
      console.log('Cols', cols);
      console.log('Header Row', headerRow);
      console.log('Rows', rows);

      const csvContent = [headerRow, ...rows].join('\n');

      const download = (filename, text) => {
        const el = document.createElement('a');
        el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        el.setAttribute('download', filename);

        el.style.display = 'none';
        document.body.appendChild(el);

        el.click();

        document.body.removeChild(el);
      }

      download('enjoy_your_csv.csv', csvContent);
    },
    docs: 'https://gist.github.com/GorgonFreeman/d174e3365c126363e6c401a8bd2a31f3',
    version: '1.2',
    category: 2
  },
  {
    title: 'Add All To Wishlist',
    script: () => {
      const wishlistButtons = Array.from(document.querySelectorAll('.iWishAddColl'));
      wishlistButtons.forEach(el => el.click());
    },
    docs: false,
    version: '1.0',
    category: 3
  },
  {
    title: 'Image Ripper',
    script: () => {
      // To Do: When digging for images and checking parents, check if the size of the image is similar to the clicked element, so we don't return something completely random.
      // To Do: Check for backgrounds
      // To Do: Get maximum sizes of images from known CDNs, e.g. master in Shopify
      // To Do: Constrain image search to area of click target

      const download = (filename, content, isImage) => {
        const el = document.createElement('a');
        el.setAttribute('href', isImage ? content : `data:text/plain;charset=utf-8,${ encodeURIComponent(content) }`);
        el.setAttribute('download', filename);

        el.style.display = 'none';
        document.body.appendChild(el);

        el.click();

        document.body.removeChild(el);
      }

      const srcToImageURL = async src => {
        const a = await fetch(src);
        const b = await a.blob();
        const c = URL.createObjectURL(b);
        return c;
      }

      const checkAndRipImage = async el => {
        // Get image src or similar
        const nodeName = el.nodeName.toLowerCase();

        // Check if what we clicked was an image, and get the src.
        if (nodeName === 'img') {
          // currentSrc eliminates any srcset weirdness.
          const src = el.currentSrc;
          const filename = src.split('?')[0];
          const imageURL = await srcToImageURL(src);
          download(filename, imageURL, true);
          return true;
        }

        // If it was an svg, download that.
        if (nodeName === 'svg') {
          let svgMarkup = el.outerHTML;
          if (!el.attributes.xmlns) {
            svgMarkup = svgMarkup.replace(/svg/, 'svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/2000/xlink"');
          }
          download('enjoy_your_svg.svg', svgMarkup, false);
          return true;
        }

        // If it's an element with a background image, download that.
        const backgroundImageFromCSS = window.getComputedStyle(el).getPropertyValue('background-image');
        if (backgroundImageFromCSS) {
          const extractBGRegex = /(?:\(['"]?)(.*?)(?:['"]?\))/;
          const src = extractBGRegex.exec(backgroundImageFromCSS)[1];
          const filename = src.split('?')[0];
          download(filename, src, true);
          return true;
        }

        // console.error('Unable to get the image');
        return false;
      }

      const digAndRip = async el => {
        const imagesBeneath = el.querySelectorAll('img, svg');
        // console.log(imagesBeneath, imagesBeneath.length);
        if (imagesBeneath.length > 0) {
          
          return await checkAndRipImage(imagesBeneath[0]);
        }

        return false;
      }

      document.addEventListener('click', async function(e) {
        e.preventDefault();
        e.stopPropagation(); 
        const { target } = e;

        let imageFound = false;

        imageFound = await checkAndRipImage(target);

        if (imageFound) {
          return;
        }
        
        imageFound = await digAndRip(target);

        if (imageFound) {
          return;
        }

        let node = target;
        let exhausted = false;

        while (!imageFound && !exhausted) {
          try {
            const { parentNode } = node;

            if (!parentNode) {
              throw 'Reached the top of the doc';
            }

            const siblings = Array.from(parentNode.children).filter(child => child !== node);
            for (let sibling of siblings) {
              imageFound = await checkAndRipImage(sibling);
              if (imageFound) {
                console.log('Found it!', sibling);
                return;
              }
              imageFound = await digAndRip(sibling);
              if (imageFound) {
                console.log('Found it inside!', sibling);
                return;
              }
            }

            node = parentNode;
          } catch(err) {
            console.warn(err);
            exhausted = true;
          }
        }

        console.error('Unable to get the image BIG TIME');
        return false;
      }, { once: true });
    },
    docs: false,
    version: '0.1',
    category: 4
  },
  // {
  //   title: 'Get Product Data in Staff Purchase Sheet Format',
  //   script: () => {
  //     function copyToClipboard(str) {
  //       const el = document.createElement('textarea');
  //       el.value = str;
  //       el.setAttribute('readonly', '');
  //       el.style.position = 'absolute';
  //       el.style.left = '-9999px';
  //       document.body.appendChild(el);
  //       el.select();
  //       document.execCommand('copy');
  //       document.body.removeChild(el);
  //     };

  //     const params = new Proxy(new URLSearchParams(window.location.search), {
  //       get: (searchParams, prop) => searchParams.get(prop),
  //     });

  //     const separator = ',';

  //     const capitaliseFirstLetter = string => {
  //       return string.charAt(0).toLocaleUpperCase() + string.slice(1);
  //     }

  //     const getAndUseProductInfo = async () => {
  //       const variantParam = params.variant;
  //       const { origin, pathname } = location;
  //       const productJSONURL = `${ origin }${ pathname }.json`;
  //       const response = await fetch(productJSONURL);
  //       const data = await response.json();

  //       console.log(data.product);
  //       // Title, colour, size, price

  //       const { product } = data;
  //       const { title, variants, options, tags } = product;

  //       const colourTag = tags.split(', ').find(tag => tag.indexOf('colour:') !== -1);
  //       const colour = colourTag ? capitaliseFirstLetter(colourTag.split(':')[1]) : '';

  //       const sizeOptionIndex = options.findIndex(o => o.name === 'Size') + 1;
  //       const sizeOptionProp = `option${ sizeOptionIndex }`;

  //       const variant = product.variants.find(v => v.id == variantParam);
  //       // Because -1 becomes 0, we can just use truthy
  //       const size = sizeOptionIndex ? capitaliseFirstLetter(variant[sizeOptionProp]) : '';

  //       const price = `$${ variant.price }`;

  //       copyToClipboard([title, colour, size, price].join(separator));
  //     }

  //     getAndUseProductInfo();
  //   },
  //   docs: '',
  //   version: '1.0',
  //   category: 1
  // },
  {
    title: 'Convert Cart to Staff Purchase Sheet Format',
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

      const separator = ',';

      const capitaliseFirstLetter = string => {
        return string.charAt(0).toLocaleUpperCase() + string.slice(1);
      }

      const getProductInfo = async (handle, variant_id) => {
        const { origin } = location;
        const productJSONURL = `${ origin }/products/${ handle }.json`;
        const response = await fetch(productJSONURL);
        const data = await response.json();

        const { product } = data;
        const { title, variants, options, tags } = product;

        const colourTag = tags.split(', ').find(tag => tag.indexOf('colour:') !== -1);
        const colour = colourTag ? capitaliseFirstLetter(colourTag.split(':')[1]) : '';

        const sizeOptionIndex = options.findIndex(o => o.name === 'Size') + 1;
        const sizeOptionProp = `option${ sizeOptionIndex }`;

        const variant = product.variants.find(v => v.id == variant_id);
        // Because -1 becomes 0, we can just use truthy
        const size = sizeOptionIndex ? capitaliseFirstLetter(variant[sizeOptionProp]) : '';

        const price = `$${ variant.price }`;

        return [title, colour, size, price].join(separator);
      }

      const getAndUseCart = async () => {
        const cartContents = await fetch('/cart.json').then(response => response.json());
        const results = await Promise.all(
          cartContents.items.map(async (item) => {
            const { handle, variant_id } = item;
            const itemInfo = await getProductInfo(handle, variant_id);
            return itemInfo;
          })
        );
        copyToClipboard(results.join('\n'));
        alert('Done!');
      }

      getAndUseCart();
    },
    docs: 'https://gist.github.com/GorgonFreeman/4aef91b13c7c0d88e4dcf28fe4983894',
    version: '1.0',
    category: 1
  },
  {
    title: 'Reddit Next Comment',
    script: () => {
      const firstLevelSpans = Array.from(document.querySelectorAll('span')).filter(
        el => el.textContent === 'level 1'
      );

      window.index = window.index || 0;

      const nextComment = firstLevelSpans[index];
      const nextCommentTop = nextComment.getBoundingClientRect().top + window.pageYOffset - 60;

      window.scrollTo({
        top: nextCommentTop,
        behavior: 'smooth',
      });

      index++;
    },
    docs: '',
    version: '1.0',
    category: 3
  },
  {
    title: 'Current px',
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

      copyToClipboard(`${ window.innerWidth }px:`);
    },
    docs: '',
    version: '1.0',
    category: 1
  },
  {
    title: 'Handleize',
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

      const handleize = str => str.toLowerCase().replace(/'/g, '').replace(/[^a-z0-9&]+/g, '-').replace(/-$/, '').replace(/^-/, '');

      const input = prompt('Please enter the text you want to handleize:');
      copyToClipboard(handleize(input));
    },
    docs: '',
    version: '0.2',
    category: 4
  },
  {
    title: 'Check Event Data',
    script: () => {
      if (window.location.pathname.indexOf('/flash_sales/') === -1) {
        alert(`Looks like you're not on a Launchpad event - go there to check the details.`);
      }

      try {
        const el = (id) => {
          return document.getElementById(id);
        };

        const startDate = el('sale_start_date');
        const startHour = el('sale_start_time_hour');
        const startMinute = el('sale_start_time_minute');
        const startPeriod = el('sale_start_time_period');
        const endDate = el('sale_end_date');
        const endHour = el('sale_end_time_hour');
        const endMinute = el('sale_end_time_minute');
        const endPeriod = el('sale_end_time_period');
        const saleTheme = el('sale_theme_id');
        const nextTheme = el('sale_next_event_theme_id');
        const themeSwitch = el('themeCheckbox');

        const saleThemeName = saleTheme.querySelector(`option[value="${ saleTheme.value }"]`).text;

        alert(`Sale starts: ${ new Date(`${ startDate.value } ${ startHour.value }:${ startMinute.value } ${ startPeriod.value }`).toLocaleString() }
        Sale ends: ${ new Date(`${ endDate.value } ${ endHour.value }:${ endMinute.value } ${ endPeriod.value }`).toLocaleString() }
        Sale theme: ${ saleTheme.querySelector(`option[value="${ saleTheme.value }"]`).text }`);

        if (themeSwitch.checked === false || saleThemeName.indexOf('(active)') !== -1) {
          alert('ISSUE: Theme will not change during sale.');
        }
        
      } catch(err) {
        console.error(err);
        alert(err);
      }
    },
    docs: '',
    version: '0.1',
    category: 4
  },
  {
    title: 'Download Current Google Sheet',
    script: () => {
      if (window.location.hostname !== 'docs.google.com') {
        alert(`I don't think you're on a Google Sheet?`);
      }
      const downloadSheetURL = window.location.href.replace('edit#', 'export?format=csv&');
      window.open(downloadSheetURL, '_self');
    },
    docs: '',
    version: '1.5',
    category: 1
  },
  {
    title: 'AU/US Region Switcher',
    script: () => {

      (async () => {

        try {
          const regionFlags = {
            au: 'white-fox-boutique-aus',
            us: 'white-fox-boutique-usa',
          };

          const { href, origin, pathname } = window.location;
          const baseURL = `${ origin }${ pathname }`;

          const fromRegionEntry = Object.entries(regionFlags).find(([k,v]) => window.location.href.includes(v));
          const [fromRegion, fromRegionFlag] = fromRegionEntry;
          const toRegionEntry = Object.entries(regionFlags).find(([k,v]) => k !== fromRegion);
          const [toRegion, toRegionFlag] = toRegionEntry;
          
          const oldSplitter = `${ fromRegionFlag }/admin/`;
          const newSplitter = `${ fromRegionFlag }/`;
          const splitters = [oldSplitter, newSplitter];
          
          let branch;
          for (const splitter of splitters) {
            if (!baseURL.includes(splitter)) {
              continue;
            }
            branch = baseURL.split(splitter)[1];
          }

          let switchURL = baseURL.replace(fromRegionFlag, toRegionFlag);

          const getSwitchURL = async (identifier, type) => {
            const result = await fetch('https://australia-southeast1-foxfunctions.cloudfunctions.net/ffSwitcher', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                identifier, 
                type, 
                from: fromRegion, 
                to: toRegion,
              }),
            });
            const data = await result.json();
            console.log(data);
            const { admin_url } = data;
            return admin_url;
          };

          const stringBetween = (string, before, after) => {
            let middleString = string;
            if (string.includes(before) && string.indexOf(before) < string.indexOf(after)) {
              middleString = middleString.split(before, 2)[1];
            }
            if (string.includes(after)) {
              middleString = middleString.split(after, 2)[0];
            }
            return middleString;
          };
          
          console.log(branch);
          if (branch.includes('products/inventory/')) {
            console.log(`We're on an inventory item`);
            const inventoryItemID = stringBetween(branch, 'products/inventory/', '/');
            console.log('inventoryItemID', inventoryItemID);
            switchURL = await getSwitchURL(inventoryItemID, 'inventory_item');
            console.log(switchURL);
          } else if (branch.includes('products/')) {
            const productID = stringBetween(branch, '/products/', '/');

            if (branch.includes('variants/')) {

              console.log(`We're on a variant`);
              const json = await fetch(`${ baseURL }.json`);
              const data = await json.json();
              console.log('data', data);
              const { sku } = data?.variant;
              console.log('sku', sku);
              // const variantID = stringBetween(branch, 'variants/', '/');
              switchURL = await getSwitchURL(sku, 'variant');
              console.log(switchURL);

            } else {
              console.log(`We're on a product`);
              const json = await fetch(`${ baseURL }.json`);
              const data = await json.json();
              console.log('data', data);
              const { handle } = data?.product;
              console.log('handle', handle);
              switchURL = await getSwitchURL(handle, 'product');
              console.log(switchURL);
            }
          }

          if (!switchURL || switchURL.error) {
            throw new Error('switchURL is not valid', switchURL);
          }

          window.open(switchURL.includes('://') ? switchURL : `https://${ switchURL }`);
        } catch(err) {
          console.error(err);
          alert(`Sorry, something went wrong, feel free to send your url to the dev team and see why it didn't work: ${ window.location.href }`);
        }
      })();
    },
    docs: 'https://gist.github.com/GorgonFreeman/b6339f408aaad4459110f04dcd594d52',
    version: '4.0',
    category: 5
  },
  {
    title: 'ASOS Order Info',
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

      const items = document.querySelectorAll('[data-auto-id="ItemSummaries"] > *');

      const itemsData = Array.from(items).map(item => {
        const name = item.querySelector('[data-auto-id="product-name"]').textContent;
        const price = item.querySelector('._2CxOL9PfSZNr6D56HYIQH9').textContent.replace('$', '');
        const colour = item.querySelector('._2qIKNi8zwcN4EZ7cEJ3G6 > div:nth-child(2)').textContent;
        const size = item.querySelector('._2qIKNi8zwcN4EZ7cEJ3G6 > div:nth-child(3)').textContent;
        return [`${ colour } ${ size } ${ name }`, price].join(',');
      });

      copyToClipboard(itemsData.join('\n'));
    },
    docs: '',
    version: '0.9',
    category: 4
  },
  {
    title: 'DoorDash Order Info',
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

      const items = document.querySelectorAll('.sc-gWDJhD.ljELnR > *');

      const itemsData = Array.from(items).map(item => {
        const title = item.dataset.testid.split('-')[0];
        const qty = item.querySelector('.sc-bIaGFe.hbJylf').textContent;
        const priceEl = item.querySelector('.hmcLQR.sc-fUCuFg.gWBpXS');
        const price = priceEl ? priceEl.textContent.replace('$', '') : '';
        
        return ['', '', title, qty, price].join(',');
      });

      copyToClipboard(itemsData.join('\n'));
    },
    docs: '',
    version: '0.2',
    category: 4
  },
  {
    title: 'Remove Blocking Popup',
    script: () => {
      document.addEventListener('click', e => { e.target.remove(); }, { once: true });

      const styles = '<style>.o_flo { overflow: auto !important; }</style>';
      document.head.innerHTML += styles;

      Array.from(document.querySelectorAll('html, body')).forEach(el => el.classList.add('o_flo'));
    },
    docs: '',
    version: '1.2',
    category: 1
  },
  {
    title: 'Lines > Array',
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

      const input = prompt('Paste your text in here, and a stringified array will be copied to your clipboard.');
      const linesArray = input.split('\n').filter(item => item);

      copyToClipboard(JSON.stringify(linesArray));
    },
    docs: '',
    version: '1.0',
    category: 2
  },
  {
    title: 'Lines > First Words',
    script: () => {
      const extractFirstWords = text => {
        const lines = text.split('\n');
        const firstWords = lines.map(line => line.trim().split(' ')[0]);
        return firstWords;
      }

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

      const input = prompt('Paste your data. This bookmarklet will return an array of the first words of each line.');
      const linesArray = extractFirstWords(input).filter(item => item);

      copyToClipboard(JSON.stringify(linesArray));
    },
    docs: '',
    version: '1.0',
    category: 3
  },
  {
    title: 'SKU Filler',
    script: () => {
      (async () => {
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

        const partialsLines = prompt('Partials, one per line:');
        const partialsArray = partialsLines.split('\n').filter(item => item);

        const result = await fetch('https://australia-southeast1-foxfunctions.cloudfunctions.net/ffSKUFiller', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            partialSKUs: partialsArray,
          }),
        });
        const data = await result.json();
        console.log(data);

        const fullSKUsArray = data;
        const fullSKUsLines = data.join('\n');
        copyToClipboard(fullSKUsLines);
        setTimeout(alert(`The full SKUs have been copied to your clipboard. Just in case, here they are:\n${ fullSKUsLines }`), 1500);
      })();
    },
    docs: '',
    version: '1.0',
    category: 5
  },
  {
    title: 'Sync Missed Orders',
    script: () => {
      (async () => {
        const shouldProceed = confirm(`You're about to find and automatically sync all missed orders on AU, US and Baddest.\n\nIf this is a peak sale period, there may be way too many to sync, and it may time out, so wait until after the peak to do this.\n\nAfter running this sync, run it again - orders can go missing while the sync is running.\n\nTo check if all missed orders have synced, look for orders tagged with Sync:Error in the Shopify admin. Any recent ones were identified but didn't sync.`);
        if (!shouldProceed) {
          return;
        }
        
        const result = await fetch('https://australia-southeast1-foxfunctions.cloudfunctions.net/ffSyncMissedOrders');
        const data = await result.json();
        console.log(data);

        alert(`Orders have been found and synced`);
      })();
    },
    docs: '',
    version: '1.0',
    category: 5
  },
  /*
  {
    title: 'Sync Inventory PVX > Shopify',
    script: () => {
      (async () => {
        const shouldProceed = confirm(`Do you have a list of complete SKUs? If you only have partials, use SKU Filler first. Otherwise, click OK.`);
        if (!shouldProceed) {
          return;
        }

        alert(`After these prompts are complete, you will get a Slack message in foxtron_fetch with links to your upload sheets and locations. This should not take more than 10 minutes.`);

        const skusLines = prompt('Enter the SKUs you want to sync inventory for, one per line:');
        const skusArray = skusLines.split('\n').filter(item => item);
        
        const result = await fetch('https://australia-southeast1-foxfunctions.cloudfunctions.net/ffSyncInventoryFromPVXtoShopify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            skus: skusArray,
          }),
        });
        
        const data = await result.json();
        console.log(data);

        // TO DO: Success and error reporting
        alert(`Your inventory sheets should be in foxtron_fetch.`);
      })();
    },
    docs: '',
    version: '1.0',
    category: 5
  },
  */
  {
    title: 'Populate PVX MIDs',
    script: () => {
      (async () => {
        const shouldProceed = confirm(`When you press OK, all items in PVX with no Attribute 7 (MID) and no Attribute 6 (Country of Origin) will be edited with an MID, and a Country of Origin = China`);
        if (!shouldProceed) {
          return;
        }
        
        const result = await fetch('https://australia-southeast1-foxfunctions.cloudfunctions.net/ffPopulatePVXMIDs');
        const data = await result.json();
        console.log(data);

        alert(`Done!`);
      })();
    },
    docs: '',
    version: '1.0',
    category: 5
  },
  {
    title: 'Report Double Line Items in PVX',
    script: () => {
      (async () => {
        const shouldProceed = confirm(`Wanna see if there are any double line items in PVX?`);
        if (!shouldProceed) {
          return;
        }

        const result = await fetch('https://australia-southeast1-foxfunctions.cloudfunctions.net/ffReportDoubles', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await result.json();
        console.log(data);

        if (data?.message) {
          alert(message);
          return;
        }

        if (data.length > 0) {
          alert([
            `I found ${ data.length > 1 ? 'some orders' : 'an order' } with double line items. Here are the order IDs:`,
            ...data,
          ].join('\r\n'));
          return;
        }

        alert('No doubles! Yay c:');
      })();
    },
    docs: '',
    version: '1.0',
    category: 5
  },
  {
    title: 'Fast Simon Fact Checker',
    script: () => {
      const shadowRoot = document.getElementById('fast-simon-serp-app').shadowRoot;
      const productTiles = Array.from(shadowRoot.querySelectorAll('[data-product-id]'));
      const handles = Array.from(new Set(productTiles.map(el => {
        return el.querySelector('.fs-product-main-image-wrapper')?.href?.split('/').pop();
      }))).filter(handle => handle);

      const extractInt = (inputString) => {
        const numbersOnly = inputString.replace(/\D/g, '');
        return parseInt(numbersOnly, 10);
      };

      (async () => {
        const productData = await Promise.all(handles.map(async handle => {
          const url = `/products/${ handle }.json`;
          const response = await fetch(url);
          const data = await response.json();
          return data?.product;
        }));
        console.log(1, productData);

        productTiles.forEach(tile => {
          // console.log(tile);

          const handle = tile.querySelector('.fs-product-main-image-wrapper')?.href?.split('/').pop();
          if (!handle) {
            return;
          }

          const dataItem = productData.find(item => item.handle === handle);
          const variant = dataItem.variants[0];
          const { price, compare_at_price } = variant;

          const priceEl = tile.querySelector('.price');
          const priceCents = extractInt(priceEl.innerHTML);
          const dataPrice = extractInt(price);
          console.log(priceCents, dataPrice);    

          if (priceCents !== dataPrice) {
            alert(`Price wrong on ${ handle }`);
            return;
          }

          const comparePriceEl = tile.querySelector('.compare');
          if (comparePriceEl) {

            const comparePriceCents = extractInt(comparePriceEl.innerHTML);
            const dataComparePrice = extractInt(compare_at_price);
            console.log(comparePriceCents, dataComparePrice);

            if (comparePriceCents !== dataComparePrice) {
              alert(`Compare at price wrong on ${ handle }`);
              return;
            }

            const percentOffEl = tile.querySelector('.isp-cstm-sale-off-badge');
            const percentOff = extractInt(percentOffEl.innerHTML);
            const dataPercentOff = Math.round(100 - (dataPrice / dataComparePrice) * 100);
            console.log(percentOff, dataPercentOff);

            if (percentOff !== dataPercentOff) {
              alert(`Percent off wrong on ${ handle }`);
              return;
            }

          }

          const promoTextEl = tile.querySelector('.isp-cstm-discount-message');
          if (!promoTextEl) {
            return;
          }

          const promoText = promoTextEl.innerHTML;
          if (!promoText) {
            return;
          }
          
          const dataPromoText = window.theme.discountMessageGenerator([window.theme.discountMessageTag], dataPrice);
          console.log(promoText, dataPromoText);
          console.log(promoText.length, dataPromoText.length);
          if (promoText !== dataPromoText) {
            alert(`Promo text wrong on ${ handle }`);
            return;
          }
        });
      })();
    },
    docs: '',
    version: '1.0',
    category: 3
  },
  {
    title: 'Set Yotpo Module Product Order',
    script: () => {
      alert(`1. Visit a Yotpo rewards page builder or whatever and open the "Select products" dropdown.
        2. With the inspector, inspect an option of the newly-opened dropdown. This sets the context to the document of the iframe the editor is housed in, so you can use its DOM.`);

      // Example order:
      /*
      Heart Eyes Tote Bag Cream
      Drink It Up Tumbler Clear
      Keep It Together Case Pink
      Beauty Sleep Set Pink Gingham
      Beauty Sleep Set Yellow Gingham
      */

      const findElementsWithText = (text, context = document) => {
        const xpathExpression = `//*[contains(text(), '${text}')]`;
        const result = document.evaluate(xpathExpression, context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        return result.singleNodeValue ? result.singleNodeValue : false;
      };

      const setTimeoutPromise = ms => new Promise((resolve, reject) => setTimeout(resolve, ms));

      (async () => {

        let productOrder = await prompt('Product order:');
        productOrder = productOrder.split('\n');

        const dropdown = document.querySelector('wadmin-select-dropdown');
        const options = dropdown.querySelectorAll('.option');
        const selectedOptions = dropdown.querySelectorAll('.option.selected');

        // If the first product is not selected, select it.
        const firstOption = findElementsWithText(`${ productOrder[0] } (`, dropdown);
        console.log(firstOption);
        if (firstOption.classList.contains('selected')) {
          console.log(`Already selected, nice`);
        } else {
          firstOption.click();
        }

        // Unselect all products that are not the first product.
        const selectedOptionsNotFirst = Array.from(selectedOptions).filter(el => el !== firstOption);
        for (const option of selectedOptionsNotFirst) {
          option.click();
          await setTimeoutPromise(500);
        }

        // Reselect the rest of the products in order.
        for (const product of productOrder.slice(1)) {
          const option = findElementsWithText(`${ product } (`, dropdown);
          option.click();
          await setTimeoutPromise(500);
        }

        alert('Done!');

      })();
    },
    docs: '',
    version: '1.0',
    category: 3
  },
  {
    title: 'Check SKUs Inventory',
    script: () => {
      (async () => {
        const shouldProceed = confirm(`You're about to check inventory for a list of SKUs. You can use partial or full SKUs. It'll be the lowest number between WF AU and US to try and account for recent orders. No Baddest atm due to split. Click OK to proceed.`);
        if (!shouldProceed) {
          return;
        }

        const skusLines = prompt('Please enter the SKUs/partials you want to check inventory for, one per line:');
        const skusArray = skusLines.split('\n').filter(item => item);
        
        const result = await fetch('https://australia-southeast1-foxfunctions.cloudfunctions.net/ffInventoryCheckSKUs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            partialSKUs: skusArray,
          }),
        });
        
        const data = await result.json();
        console.log(data);

        // TO DO: Success and error reporting
        alert(`I'll message in foxtron_fetch shortly!`);
      })();
    },
    docs: '',
    version: '1.0',
    category: 5
  },
  {
    title: 'SKUs to Custom Collection',
    script: () => {
      (async () => {
        try {
          const shouldProceed = confirm(`This bookmarklet will ask for a title and a list of SKUs, and generate a CSV to be uploaded into Matrixify. Click OK to proceed.`);
          if (!shouldProceed) {
            return;
          }

          const collectionTitle = prompt('Enter the title of your new collection:');
          if (!collectionTitle) {
            alert('No collection title entered. Try again.');
            return;
          }

          const skusLines = prompt('Enter the partial SKUs you want in your collection, one per line:');
          const skusArray = skusLines.split('\n').filter(item => item);

          const result = await fetch('https://australia-southeast1-foxtware.cloudfunctions.net/randoPartialsToCustomCollectionCsv', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              collectionTitle,
              partials: skusArray,
            }),
          });
          const data = await result.json();
          const { csv } = data;

          const download = (filename, text) => {
            const el = document.createElement('a');
            el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            el.setAttribute('download', filename);

            el.style.display = 'none';
            document.body.appendChild(el);

            el.click();

            document.body.removeChild(el);
          }
          download(`Custom Collection ${ collectionTitle }.csv`, csv);

          window.open('https://admin.shopify.com/store/white-fox-boutique-aus/apps/excel-export-import', '_blank');
        } catch(err) {
          alert(err);
        }
      })();
    },
    docs: 'https://gist.github.com/GorgonFreeman/340e12b6b62ab7c3f10879d14d7ce4f0',
    version: '1.0',
    category: 5,
  },
  {
    title: 'Sync Orders Shopify > PVX',
    script: () => {
      (async () => {
        try {
          const idsLines = prompt('Order IDs, one per line:');
          const idsArray = idsLines.split('\n').filter(item => item);

          const result = await fetch('https://australia-southeast1-foxtware.cloudfunctions.net/apexOrdersSyncShopifyToPvxById', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              orderIds: idsArray,
            }),
          });
          const data = await result.json();
          console.log(data);
          alert(`Done - probably successful, can't say for sure.`);
        } catch(err) {
          alert(err);
        }
      })();
    },
    docs: '',
    version: '2.0',
    category: 5
  },
  {
    title: 'Sync Orders PVX > Starshipit',
    script: () => {
      (async () => {
        const idsLines = prompt('Order IDs, one per line:');
        const idsArray = idsLines.split('\n').filter(item => item);
        
        const result = await fetch('https://australia-southeast1-foxfunctions.cloudfunctions.net/ffSyncPVXOrdersToStarshipit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            ids: idsArray,
          }),
        });
        
        const data = await result.json();
        console.log(data);

        // TO DO: Success and error reporting
        alert(`They've been sent to Starshipit, but sometimes Starshipit doesn't respond. Check if the first order is in, and if it isn't, run the bookmarklet again until it works. If you've already tried this a couple of times, it could be something else - send the IDs to the dev team and they'll sort it out.`);
      })();
    },
    docs: 'https://gist.github.com/GorgonFreeman/afb5105ae96fb8b90315a34b6c2b37d7',
    version: '1.0',
    category: 5
  },
  {
    title: 'Sync Inventory PVX > Shopify',
    script: () => {
      (async () => {
        try {
          const shouldProceed = confirm(`We're about to make some inventory sheets and upload them to Shopify. Press OK to proceed.`);
          if (!shouldProceed) {
            return;
          }

          const modeInput = prompt(`
            1: WF
            2: Baddest
          `);
          if (!modeInput) {
            alert('We out.');
            return;
          }

          const modeMap = {
            1: 'wf',
            2: 'baddest',
          };
          const modeKey = modeMap[modeInput];

          if (!modeKey) {
            alert('We out.');
            return;
          }

          const skusTypeInput = prompt(`
            1: Full SKUs
            2: Partial SKUs
          `);
          if (!skusTypeInput) {
            alert('We out.');
            return;
          }

          const skusTypeMap = {
            1: 'skus',
            2: 'partialSkus',
          };
          const skusType = skusTypeMap[skusTypeInput];

          if (!skusType) {
            alert('We out.');
            return;
          }

          let skus = prompt('SKUs, one per line:');
          skus = skus.split('\n').filter(item => item);

          console.log({ 
            modeKey,
            [skusType]: skus,
          });

          const doIt = async () => {
            const result = await fetch('https://australia-southeast1-foxtware.cloudfunctions.net/apexInventoryToImportSheets', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                modeKey,
                options: { 
                  [skusType]: skus,
                },
              }),
            });
            const data = await result.json();
            console.log(data);
          };

          doIt();

          alert(`Sheets are on their way, look our for a message in the foxtron_fetch Slack channel. It'll probably take about 15 mins for a big import - if it takes longer than that, might have been an error.`);
        } catch(err) {
          alert(err);
        }
      })();
    },
    docs: 'https://gist.github.com/GorgonFreeman/0d281a1a873768aea107aaf4e7274609',
    version: '3.1',
    category: 5,
  },
  {
    title: 'Run Inventory Check',
    script: () => {
      (async () => {
        try {
          const shouldProceed = confirm(`Want to check the inventory in Shopify? Press OK to proceed.`);
          if (!shouldProceed) {
            return;
          }


          const modeInput = prompt(`
            1: WF
            2: Baddest
          `);

          if (!modeInput) {
            alert('We out.');
            return;
          }

          const modeKey = {
            1: 'wf',
            2: 'baddest',
          }[modeInput];

          if (!modeKey) {
            alert('We out.');
            return;
          }

          const configs = {
            wf: ['au', 'us'], // 'uk'],
            baddest: ['baddest'],
          }[modeKey];

          let options = {
            pvxSite: {
              wf: 'PrimarySite',
              baddest: 'BaddestSite',
            }[modeKey],
          };


          const proceedInput = prompt(`
            1: Report on only published products, with a min "in-stock" diff of 3
            2: More options
          `);

          if (!proceedInput) {
            alert('We out.');
            return;
          }
          const proceedWithDefaultOptions = {
            1: true,
            2: false,
          }[proceedInput];

          if (![true, false].includes(proceedWithDefaultOptions)) {
            alert('We out.');
            return;
          }

          let additionalOptions = {
            silentZeros: true,
            onlyPublished: true,
            minInStockDiff: 3,
          };

          if (proceedWithDefaultOptions !== true) {

            const onlyPublishedInput = prompt(`
              1: Only report published products (faster)
              2: Report all products
            `);

            if (!onlyPublishedInput) {
              alert('We out.');
              return;
            }
            const onlyPublished = {
              1: true,
              2: false,
            }[onlyPublishedInput];

            if (![true, false].includes(onlyPublished)) {
              alert('We out.');
              return;
            }


            const minInStockDiffInput = prompt(`
              Enter the min in-stock diff. 
              Diffs less than this will not be reported, e.g. 
              - you may want to start at 2 to ignore cases where an order just hasn't synced yet
              - or a higher number like 5 during sales
              - or an even higher number like 8 to detect only restocks
              Diffs where the product is out of stock in Shopify will still be reported so we can sync returns.
            `);

            if (!minInStockDiffInput || isNaN(parseInt(minInStockDiffInput))) {
              alert('Nope.');
              return;
            }

            const minInStockDiff = parseInt(minInStockDiffInput);

            additionalOptions = { ...additionalOptions, ...{
              onlyPublished,
              minInStockDiff,
            } };

          }

          options = { ...options, ...additionalOptions };

          const args = { 
            configs,
            options,
          };
          console.log(args);
         
          const doIt = async () => {
            const result = await fetch('https://australia-southeast1-foxtware.cloudfunctions.net/apexInventoryReport', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(args),
            });
            const data = await result.json();
            console.log(data);
          };

          doIt();

          alert(`Ok, look out for my message in #foxtron_fetch.`);
          
        } catch(err) {
          alert(err);
        }
      })();
    },
    docs: 'https://gist.github.com/GorgonFreeman/0d281a1a873768aea107aaf4e7274609',
    version: '3.0',
    category: 5
  },
  {
    title: 'Set Store Credit Metafield',
    script: () => {
      (async () => {
        try {
          const configInput = prompt(`
            1: AU
            2: US
            3: UK
          `);
          if (!configInput) {
            alert('We out.');
            return;
          }

          const configMap = {
            1: 'au',
            2: 'us',
            3: 'uk',
          };
          const config = configMap[configInput];

          if (!config) {
            alert('We out.');
            return;
          }

          const email = prompt(`What's the customer's email?`);
          if (!email) {
            alert('No email provided.');
            return;
          }

          const result = await fetch('https://australia-southeast1-foxtware.cloudfunctions.net/shopifyCustomerSetStoreCreditBalanceMetafield', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              config,
              email,
            }),
          });
          const data = await result.json();
          console.log(data);

          if (data?.[0]?.data?.metafieldsSet?.metafields?.length > 0) {
            alert('Success');
          } else {
            alert(data);
          }
        } catch(err) {
          alert(err);
        }
      })();
    },
    docs: '',
    version: '1.1',
    category: 5,
  },
  {
    title: 'Pro',
    script: () => {
      (async () => {
        try {

          const send = async (url, data) => {
            const result = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            const resultJson = await result.json();
            console.log(resultJson);
            return resultJson;
          }

          const email = prompt(`Promoting to staff account. Work email (without @whitefoxboutique.com):`);
          if (!email) {
            alert(`We out`);
            return;
          }

          const emailOnlyResult = await send('https://australia-southeast1-foxtware.cloudfunctions.net/shopifyStaffCustomerPromote', { email });
          console.log('emailOnlyResult', emailOnlyResult);

          let askForNames = false;
          if (!emailOnlyResult?.success) {
            if (emailOnlyResult?.errors?.includes('No customer found')) {
              askForNames = true;
            }
          } else {

            const goToStoreCredit = confirm('Success - press ok to go to store credit, cancel to leave it.');
            if (goToStoreCredit) {
              const { info } = emailOnlyResult;
              const { storeCreditUrl } = info;
              window.open(storeCreditUrl);
            }
            
            return;
          }

          if (!askForNames) {
            alert(emailOnlyResult?.errors || 'Something went wrong, please try again');
            return;
          }

          alert(`${ email } doesn't currently have an account, so we'll make one. This will automatically send an email inviting the user to activate their account.`);

          const firstName = prompt(`First name:`);
          if (!firstName) {
            alert(`We out`);
            return;
          }

          const lastName = prompt(`Last name:`);
          if (!lastName) {
            alert(`We out`);
            return;
          }

          const accountCreateResult = await send('https://australia-southeast1-foxtware.cloudfunctions.net/shopifyStaffCustomerPromote', { 
            email, 
            options: { 
              firstName, 
              lastName,
            }, 
          });
          console.log('accountCreateResult', accountCreateResult);

          if (!accountCreateResult?.success) {
            alert(accountCreateResult?.errors || 'Something went wrong, please try again');
            return;
          }

          const goToStoreCredit = confirm('Success - press ok to go to store credit, cancel to leave it.');
          if (goToStoreCredit) {
            const { info } = accountCreateResult;
            const { storeCreditUrl } = info;
            window.open(storeCreditUrl);
          }
          return;

        } catch(err) {
          alert(err);
        }
      })();
    },
    docs: '',
    version: '1.0',
    category: 2,
  },
  {
    title: 'Dem',
    script: () => {
      (async () => {
        try {

          const send = async (url, data) => {
            const result = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            const resultJson = await result.json();
            console.log(resultJson);
            return resultJson;
          }

          const email = prompt(`Removing staff account. Work email (without @whitefoxboutique.com):`);
          if (!email) {
            alert(`We out`);
            return;
          }

          const demoteResult = await send('https://australia-southeast1-foxtware.cloudfunctions.net/shopifyStaffCustomerDemote', { email });
          console.log('demoteResult', demoteResult);

          if (!demoteResult?.success) {
            alert(demoteResult?.errors || 'Something went wrong, please try again');
            return;
          }

          const { info } = demoteResult;
          const { storeCreditUrl, storeCreditBalance, hasMultipleStoreCreditTags } = info;

          const goToStoreCredit = confirm(`Success - user has ${ hasMultipleStoreCreditTags ? `multiple store credit tags, which is weird` : `${ storeCreditBalance } store credit` }. Press ok to go to store credit, or cancel.`);
          if (goToStoreCredit) {
            window.open(storeCreditUrl);
          }
          return;

        } catch(err) {
          alert(err);
        }
      })();
    },
    docs: '',
    version: '1.0',
    category: 2,
  },
  {
    title: 'Customs Data Sweep',
    script: () => {
      (async () => {
        try {
          const shouldProceed = confirm(`Click OK to add HS codes and so on on all stores.`);
          if (!shouldProceed) {
            return;
          }

          const result = await fetch('https://australia-southeast1-foxtware.cloudfunctions.net/apexCustomsDataSweepWithSuffixes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              options: {
                overwrite: true,
              },
            }),
          });
          const data = await result.json();
          console.log(data);
        } catch(err) {
          alert(err);
        }
      })();
    },
    docs: '',
    version: '1.0',
    category: 5,
  },
  {
    title: 'Customs Data Audit (UK)',
    script: () => {
      (async () => {
        try {
          const shouldProceed = confirm(`Click OK to check the HS codes on the UK store.`);
          if (!shouldProceed) {
            return;
          }

          const result = await fetch('https://australia-southeast1-foxtware.cloudfunctions.net/randoCustomsDataAudit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              config: 'uk',
            }),
          });
          const data = await result.json();
          console.log(data);
        } catch(err) {
          alert(err);
        }
      })();
    },
    docs: '',
    version: '1.0',
    category: 5,
  },
  {
    title: 'Sync Product Style Arcade > 3Clicks',
    script: () => {
      (async () => {
        try {
          const shouldProceed = confirm(`We're going to sync a product from Style Arcade to 3Clicks. It'll take a while but check back in a couple of mins. Cool?`);
          if (!shouldProceed) {
            return;
          }

          const styleNumber = prompt(`Style number:`);
          if (!styleNumber) {
            alert('No style number');
            return;
          }

          const result = await fetch('https://australia-southeast1-foxtware.cloudfunctions.net/apexProductSyncStylearcadeToThreeclicks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              styleNumber,
            }),
          });
          const data = await result.json();
          console.log(data);
        } catch(err) {
          alert(err);
        }
      })();
    },
    docs: '',
    version: '1.0',
    category: 5,
  },
  {
    title: 'Log In As Customer',
    script: () => {
      (async () => {
        try {

          const passwordInput = prompt(`Password:`);
          if (passwordInput !== '!@#$%^&*') {
            alert('Sorryyy');
            return;
          }

          const send = async (url, data) => {
            const result = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            const resultJson = await result.json();
            console.log(resultJson);
            return resultJson;
          }

          const configInput = prompt(`
            1: AU
            2: US
            3: UK
          `);
          if (!configInput) {
            alert('We out.');
            return;
          }

          const configMap = {
            1: 'au',
            2: 'us',
            3: 'uk',
          };
          const config = configMap[configInput];

          if (!config) {
            alert('We out.');
            return;
          }

          const email = prompt(`What's the customer's email?`);
          if (!email) {
            alert('No email provided.');
            return;
          }

          const loginUrl = await send('https://australia-southeast1-foxtware.cloudfunctions.net/shopifyCustomerMultipassLoginUrlCreate', { config, email });

          window.open(loginUrl);

        } catch(err) {
          alert(err);
        }
      })();
    },
    docs: '',
    version: '1.0',
    category: 1,
  },
  {
    title: 'Get URL from SKU List',
    script: () => {
      (async () => {
        try {
      
          const configInput = prompt(`
            1: AU
            2: US
            3: UK
            4: CA
          `);
          if (!configInput) {
            alert('We out.');
            return;
          }
      
          const configMap = {
            1: 'au',
            2: 'us',
            3: 'uk',
            4: 'au',
          };
          const config = configMap[configInput];
      
          const storeMap = {
            1: 'au',
            2: 'us',
            3: 'uk',
            4: 'ca',
          };
          const store = storeMap[configInput];
      
          if (!config) {
            alert('Invalid input! We out.');
            return;
          }
      
          const skuListInput = prompt(`Paste the list of SKUs here:`);
          if (!skuListInput) {
            alert('No SKUs???? We out.');
            return;
          }
      
          const skuList = skuListInput.split('\n');
          if (!skuList || !Array.isArray(skuList) || skuList.length == 0 ) {
            alert('SKU list cannot be processed! We out.');
            return
          }
      
          const urlTypeInput = prompt(`Do you want admin or store urls?\n1: Admin URL\n2: Store URL`);
          if (!urlTypeInput) {
            alert('We out.');
            return;
          }
      
          const urlTypeMap = {
            1: 'admin',
            2: 'store',
          };
          const urlType = urlTypeMap[urlTypeInput];
          if (!urlType) {
            alert('Invalid input! We out.');
            return;
          }
      
          const payload = {
            config,
            store,
            skuList,
            urlType
          }
      
          alert(`Sending order to the kitchen(server).\nPlease press 'ok' to continue and wait for order...`);
      
          const result = await fetch('https://australia-southeast1-foxtware.cloudfunctions.net/shopifyProductsSkuListToUrl', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ payload }),
          });
          const urlList = await result.json();
          console.log("urlList", urlList);
          if (!urlList || urlList.length < 0) {
            alert(`Something went wrong with your order!! Check console...`)
          }
      
          alert(`Your order is here! Click 'ok' to copy the URL list into your clipboard`);
      
          javascript:(function() {
            const textToCopy = 'Your text here'; // Replace with the text you want to copy
            navigator.clipboard.writeText(urlList.join('\n')).then(function() {
              alert('Text copied to clipboard!');
            }).catch(function(err) {
              alert('Failed to copy text: ' + err);
            });
          })();
          
        } catch( err ) {
          alert(err);
        }
      })();
    },
    docs: '',
    version: '1.0',
    category: 1,
  },
  {
    title: 'Switch Sites AU/US/UK',
    script: () => {
      (async () => {
        try {
      
          // Fetch current URL
          const currentURL = window.location.href;
          // alert(`Current url: ${ currentURL }`);
      
          if ( !/shopify/.test(currentURL) ) {
            alert("Current URL is not a shopify URL");
            return;
          }
      
          const urlObject = new URL(currentURL);
          const params = urlObject.searchParams;
          const ignoreParams = [
            "location_id",
            "appLoadId",
            "before",
            "after",
          ];
          ignoreParams.forEach(param => params.delete(param));
          params.delete('location_id');
          params.delete('appLoadId');
          const queryString = params.toString() ? `?${params.toString()}` : '';
      
          const currentConfig = (() => {
            if (/white-fox-boutique-aus/.test(currentURL)) {
              return "au";
            } else if ( /white-fox-boutique-usa/.test(currentURL)) {
              return "us";
            } else if ( /white-fox-boutique-uk/.test(currentURL)) {
              return "uk";
            }
          })();
      
          // Ask what store user wants to open
          const configInput = prompt(`
            1: AU
            2: US
            3: UK
          `);
          if (!configInput) {
            alert('We out.');
            return;
          }
          const configTo = {
            1: 'au',
            2: 'us',
            3: 'uk',
          }[configInput];
          if (!configTo) {
            alert(`Invalid input ${ configInput }! We out.`);
            return;
          }
      
          if ( configTo == currentConfig ) {
            alert("Same store as you are at the moment. We out!");
            return;
          }
      
          const urlGenerateData = (() => {
      
            if ( /admin/.test(currentURL)) { // admin url
      
              if ( /\/products\?/.test(currentURL) ) { // product search page
      
                return {
                  "context": "admin_product_search",
                  "configFrom": currentConfig,
                  "configTo": configTo,
                  "queryString": queryString,
                };
      
              } else if ( /\/products\/\d*(?:\?\S*)*$/.test(currentURL) ) { // product page
      
                return {
                  "context": "admin_product",
                  "id": currentURL.split('/').pop().split('?').shift(),
                  "configFrom": currentConfig,
                  "configTo": configTo,
                  "queryString": queryString,
                };
      
              } else if ( /\/products\/\d*\/variants\/\d*(?:\?\S*)*$/.test(currentURL) ) { // product variant page
      
                return {
                  "context": "admin_product_variant",
                  "id": currentURL.split('/').pop().split('?').shift(),
                  "configFrom": currentConfig,
                  "configTo": configTo,
                  "queryString": queryString,
                }
      
              } else if ( /\/products\/inventory\/\d*\/inventory_history(?:\?\S*)*$/.test(currentURL) ) { // inventory page
      
                return {
                  "context": "admin_inventory_history",
                  "id": currentURL.split('/')[currentURL.split('/').indexOf('inventory') + 1],
                  "configFrom": currentConfig,
                  "configTo": configTo,
                  "queryString": queryString,
                }
      
              } else if ( /\/customers(?:\?\S*)*$/.test(currentURL) ) { // customer search page
      
                return {
                  "context": "admin_customer_search",
                  "configFrom": currentConfig,
                  "configTo": configTo,
                  "queryString": queryString,
                };
      
              } else if ( /\/customers\/\d*(?:\?\S*)*$/.test(currentURL) ) { // customer editor page
      
                return {
                  "context": "admin_customer",
                  "id": currentURL.split('/').pop().split('?').shift(),
                  "configFrom": currentConfig,
                  "configTo": configTo,
                  "queryString": queryString,
                };
      
              } else if ( /\/themes(?:\?\S*)*$/.test(currentURL) ) { // theme search page
      
                return {
                  "context": "admin_theme_search",
                  "configFrom": currentConfig,
                  "configTo": configTo,
                  "queryString": queryString,
                };
      
              } else if ( /\/themes\/\d*\/editor(?:\?\S*)*$/.test(currentURL) ) { // theme editor page
      
                return {
                  "context": "admin_theme",
                  "id": currentURL.split('/')[currentURL.split('/').indexOf('themes') + 1],
                  "configFrom": currentConfig,
                  "configTo": configTo,
                  "queryString": queryString,
                };
      
              } else if ( /\/discounts(?:\?\S*)*$/.test(currentURL) ) { // discount codes search page
      
                return {
                  "context": "admin_discount_search",
                  "configFrom": currentConfig,
                  "configTo": configTo,
                  "queryString": queryString,
                };
      
              } else if ( /\/discounts\/\d*(?:\?\S*)*$/.test(currentURL) ) { // discount code page
      
                return {
                  "context": "admin_discount",
                  "id": currentURL.split('/').pop().split('?').shift(),
                  "configFrom": currentConfig,
                  "configTo": configTo,
                  "queryString": queryString,
                };
      
              } else if ( /\/collections(?:\?\S*)*$/.test(currentURL) ) { // collections search page
      
                return {
                  "context": "admin_collection_search",
                  "configFrom": currentConfig,
                  "configTo": configTo,
                  "queryString": queryString,
                };
      
              } else if ( /\/collections\/\d*(?:\?\S*)*$/.test(currentURL) ) { // collection page
      
                return {
                  "context": "admin_collection",
                  "id": currentURL.split('/').pop().split('?').shift(),
                  "configFrom": currentConfig,
                  "configTo": configTo,
                  "queryString": queryString,
                };
      
              } else { // default case covering all other pages
      
                return {
                  "context": "admin_default",
                  "url": urlObject.origin + urlObject.pathname,
                  "configFrom": currentConfig,
                  "configTo": configTo,
                  "queryString": queryString,
                };
      
              }
            } else {
              alert("Is not admin url");
            }
            return null;
          })();
      
          // alert(`urlGenerateData: ${ JSON.stringify(urlGenerateData) }`);
          if (!urlGenerateData) {
            alert("Url generation error");
            return;
          }
      
          const result = await fetch("https://australia-southeast1-foxtware.cloudfunctions.net/shopifyCrossSiteUrlGenerate", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ urlGenerateData }),
          });
          const resultJson = await result.json();
          console.log("resultJson", resultJson);
          if (!resultJson.success) {
            alert(resultJson.message ? resultJson.message : "No cross site URL found!");
            return;
          }
          window.open(resultJson.result, "_blank", "noopener,noreferrer");
      
        } catch(err) {
          alert(err);
        }
      })();
    },
    docs: '',
    version: '1.0',
    category: 1,
  },
  {
    title: 'Schedule Publish from SKU List',
    script: () => {
      (async () => {
        try {
      
          const configInput = prompt(`
            1: AU
            2: US
            3: UK
            4: AU DEV
          `);
          if (!configInput) {
            alert('We out.');
            return;
          }
      
          const configMap = {
            1: 'au',
            2: 'us',
            3: 'uk',
            4: 'au-dev',
          };
          const config = configMap[configInput];
      
          if (!config) {
            alert('Invalid input! We out.');
            return;
          }
      
          const skuListInput = prompt(`Paste the list of SKUs here:`);
          if (!skuListInput) {
            alert('No SKUs???? We out.');
            return;
          }
      
          const skuList = skuListInput.split('\n');
          if (!skuList || !Array.isArray(skuList) || skuList.length <= 0 || skuList[0].includes(',') ) {
            alert('SKU list cannot be processed! We out.');
            return
          }
      
          let scheduledDateResult;
          const scheduledYear = prompt(`Enter year to schedule`);
          if (scheduledYear === null || scheduledYear.trim() === "" || isNaN(scheduledYear)) {
            alert(`Invalid year. We out.`);
            return;
          }
      
          const scheduledMonth = prompt(`Enter month (1-12) to schedule`);
          if (scheduledMonth === null || scheduledMonth.trim() === "" || isNaN(scheduledMonth) || scheduledMonth < 1 || scheduledMonth > 12) {
            alert(`Invalid month. We out.`);
            return;
          }
      
          const maxDays = new Date(scheduledYear, scheduledMonth, 0).getDate();
          const scheduledDay = prompt(`Enter day (1-${ maxDays }) to schedule`);
          if (scheduledDay === null || scheduledDay.trim() === "" || isNaN(scheduledDay) || scheduledDay < 0 || scheduledDay > maxDays) {
            alert(`Invalid day. We out.`);
            return;
          }
      
          const scheduledHour = prompt(`Enter hour (in 24 hour format) to schedule`);
          if (scheduledHour === null || scheduledHour.trim() === "" || isNaN(scheduledHour) || scheduledHour < 0 || scheduledHour > 23) {
            alert(`Invalid hour. We out.`);
            return;
          }
      
          const scheduledMinute = prompt(`Enter minute of the hour to schedule`);
          if (scheduledMinute === null || scheduledMinute.trim() === "" || isNaN(scheduledMinute) || scheduledMinute < 0 || scheduledMinute > 59) {
            alert(`Invalid minute of the hour. We out.`);
            return;
          }
      
          const currentDate = new Date();
          const scheduledDate = new Date(scheduledYear, scheduledMonth-1, scheduledDay, scheduledHour, scheduledMinute, 0);
          if (scheduledDate < currentDate) {
            alert(`Scheduled date must be in the future. We out.`);
            return;
          }
      
          const confirmSchedule = prompt(`Confirm the schedule "${ scheduledDate.toDateString() } ${ scheduledDate.toLocaleTimeString() }". Is this correct? (yes/no)`);
          if ( confirmSchedule !== 'yes' ) {
            alert(`Aborting. We out!`);
            return;
          }
      
          scheduledDateResult = scheduledDate.toISOString();
      
          const payload = { config, skuList };
          if ( scheduledDateResult ) {
            payload.options =  { "scheduledDate": scheduledDateResult };
          }
      
          console.log("scheduled publish", payload);
      
          const result = await fetch('https://australia-southeast1-foxtware.cloudfunctions.net/shopifyProductsPublishWithScheduleBySku', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify( payload ),
          });
          const resultJson = await result.json();
          console.log("resultJson", resultJson);
          if (resultJson?.success) {
            alert(`Successfully sent details for scheduled publish!\nPlease check one of the products to ensure successful scheduled publish!`)
          } else {
            alert(`Something went wrong with your scheduled publish. Please check console for details...`);
          }
          
        } catch(err) {
          alert(err);
        }
      })();
    },
    docs: '',
    version: '1.0',
    category: 3,
  },
  {
    title: '3Clicks Order Import',
    script: () => {
      (async () => {
        try {
      
          const send = async (url, data) => {
            const result = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            const resultJson = await result.json();
            console.log(resultJson);
            return resultJson;
          };
      
          const orderImportSheetConfig = {
            'BUY SHEET' : [
              'READY TO SEND',
            ],
            '3CLICKS IMPORT' : [
              'BUYERS',
              'MERCH',
            ],
            'MERCH - BUY SHEET' : [
              'READY TO SEND',
            ],
          };
      
          const orderImportFileList = []
          Object.entries(orderImportSheetConfig).forEach(([key, values]) => {
            orderImportFileList.push(key);
          });
      
          const fileToReadInput = prompt(`Select file to import 3Clicks orders from (please type a number and press enter):\n${ orderImportFileList.map((key, index) => `${ index + 1 } : ${ key }`).join('\n') }`);
          if (!fileToReadInput) {
            alert('We out.');
            return;
          }
      
          const fileToRead = orderImportFileList[fileToReadInput - 1] || null;
          if (!fileToRead) {
            alert('We out.');
            return;
          }
      
          const orderImportSheetList = [];
          orderImportSheetConfig[fileToRead].forEach(value => orderImportSheetList.push(value));
      
          const sheetToReadInput = prompt(`Select sheet to import 3Clicks orders from (please type a number and press enter):\n${ orderImportSheetList.map((key, index) => `${ index + 1 } : ${ key }`).join('\n') }`);
          if (!sheetToReadInput) {
            alert('We out.');
            return;
          }
      
          const sheetToRead = orderImportSheetList[sheetToReadInput -1] || null;
          if (!sheetToRead) {
            alert('We out.');
            return;
          }
      
          // console.log('fileToRead', fileToRead);
          // console.log('sheetToRead', sheetToRead);
      
          const shouldProceed = confirm(`Want to import orders from ${ fileToRead } > ${ sheetToRead } to ThreeClicks? We'll read your google sheet and create the orders. Click OK to proceed.`);
          if (!shouldProceed) {
            return;
          }
      
          alert('Please wait for the import to complete. You can check the alerts_threeclicks_sync Slack channel for updates on the import progress.');
      
          const result = await send('https://australia-southeast1-foxtware.cloudfunctions.net/threeclicksPurchaseOrdersImport', { fileToRead, sheetToRead });
      
          if (result.success) {
            alert(`Import complete!`);
          } else {
            alert(`Import failed. Check the alerts_threeclicks_sync Slack channel for errors.`);
          }
      
        } catch(err) {
          alert(err);
          console.error(err);
        }
      })();
    },
    docs: '',
    version: '1.0',
    category: 5,
  },
  {
    title: '3Clicks Shipment Import',
    script: () => {
      (async () => {
        try {
      
          const send = async (url, data) => {
            const result = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            const resultJson = await result.json();
            console.log(resultJson);
            return resultJson;
          };
      
          const shipmentImportSheetConfig = {
            'SHIPMENT IMPORT (CHRIS)' : [
              'IMPORT',
            ],
            'SHIPMENT IMPORT (KAI)' : [
              'IMPORT',
            ],
            'SHIPMENT IMPORT (PEPPER)' : [
              'IMPORT',
            ],
          };
      
          const shipmentImportFileList = []
          Object.entries(shipmentImportSheetConfig).forEach(([key, values]) => {
            shipmentImportFileList.push(key);
          });
      
          const fileToReadInput = prompt(`Select file to import 3Clicks shipments from (please type a number and press enter):\n${ shipmentImportFileList.map((key, index) => `${ index + 1 } : ${ key }`).join('\n') }`);
          if (!fileToReadInput) {
            alert('We out.');
            return;
          }
      
          const fileToRead = shipmentImportFileList[fileToReadInput - 1] || null;
          if (!fileToRead) {
            alert('We out.');
            return;
          }
      
          const shipmentImportSheetList = [];
          shipmentImportSheetConfig[fileToRead].forEach(value => shipmentImportSheetList.push(value));
      
          const sheetToReadInput = prompt(`Select sheet to import 3Clicks shipments from (please type a number and press enter):\n${ shipmentImportSheetList.map((key, index) => `${ index + 1 } : ${ key }`).join('\n') }`);
          if (!sheetToReadInput) {
            alert('We out.');
            return;
          }
      
          const sheetToRead = shipmentImportSheetList[sheetToReadInput -1] || null;
          if (!sheetToRead) {
            alert('We out.');
            return;
          }
      
          // console.log('fileToRead', fileToRead);
          // console.log('sheetToRead', sheetToRead);
      
          const shouldProceed = confirm(`Want to import shipments from ${ fileToRead } > ${ sheetToRead } to ThreeClicks? We'll read your google sheet and create the shipments. Click OK to proceed.`);
          if (!shouldProceed) {
            return;
          }
      
          alert('Please wait for the import to complete. You can check the alerts_threeclicks_sync Slack channel for updates on the import progress.');
      
          const result = await send('https://australia-southeast1-foxtware.cloudfunctions.net/threeclicksShipmentsImport', { fileToRead, sheetToRead });
      
          if (result.success) {
            alert(`Import complete!`);
          } else {
            alert(`Import failed. Check the alerts_threeclicks_sync Slack channel for errors.`);
          }
      
        } catch(err) {
          alert(err);
          console.error(err);
        }
      })();
    },
    docs: '',
    version: '1.0',
    category: 5,
  },
  {
    title: 'UK Inventory Hold',
    script: () => {
      (async () => {
        try {
      
          // Added for extra validation that this bookmarklet will only work for UK
          const configInput = prompt(`
            1: UK
          `);
          if (!configInput) {
            alert('We out.');
            return;
          }
      
          const configMap = {
            1: 'uk',
          };
          const config = configMap[configInput];
      
          if (!config) {
            alert('Invalid input! We out.');
            return;
          }
      
          const skuListInput = prompt(`Paste the list of SKUs here:`);
          if (!skuListInput) {
            alert('No SKUs???? We out.');
            return;
          }
      
          const skuList = skuListInput.split('\n');
          if (!skuList || !Array.isArray(skuList) || skuList.length <=1 ) {
            alert('SKU list cannot be processed! We out.');
            return;
          }
      
          // TODO: Add request to GCloud hosted function for inventory hold
          const result = await fetch('https://australia-southeast1-foxtware.cloudfunctions.net/shopifyProductsUKInventoryHold', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ skuList }),
          });
      
          const resultJson = await result.json();
          console.log(resultJson);
      
          if (resultJson.success) {
            alert(`Inventory hold set successfully!`);
          } else {
            alert(`Inventory hold errored! ${ resultJson.errors.join(', ') }`);
          }
      
        } catch(err) {
          alert(err);
        }
      })();
    },
    docs: '',
    version: '1.0',
    category: 1,
  },
  {
    title: 'Generate BDay Discount',
    script: () => {
      (async () => {
        try {
      
          const send = async (url, data) => {
            const result = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            const resultJson = await result.json();
            console.log(resultJson);
            return resultJson;
          }
      
          const configInput = prompt(`
            1: AU
            2: US
            3: UK
          `);
          if (!configInput) {
            alert('We out.');
            return;
          }
      
          const configMap = {
            1: 'au',
            2: 'us',
            3: 'uk',
          };
          const config = configMap[configInput];
      
          const email = prompt(`What's the customer's email?`);
          if (!email) {
            alert('No email provided.');
            return;
          }
      
          const result = await fetch(`https://australia-southeast1-foxtware.cloudfunctions.net/randoShopifyBirthdayDiscountCodeGenerate`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ config, email }),
          });
          const resultJson = await result.json();
      
          if (!resultJson || !resultJson.success) {
            alert(`Discount code creation failed: ${ resultJson.message }`);
            return;
          }
      
          alert(`Discount code created: ${ resultJson.object.discountCode }`);
          alert(`Please ensure you've copied the discount code here: ${ resultJson.object.discountCode }`);
          
        } catch(err) {
          alert(err);
        }
      })();
    },
    docs: '',
    version: '1.0',
    category: 1,
  },
  {
    title: 'Check all app permissions checkboxes',
    script: () => {
      // Select all elements with the class 'Polaris-LegacyCard__Section'
      const sections = document.querySelectorAll('.Polaris-LegacyCard__Section');
  
      // Convert the NodeList to an array and iterate over each section
      Array.from(sections).forEach(section => {
        // Find a checkbox input inside the section
        const checkbox = section.querySelector('input[type="checkbox"]');
  
        // If a checkbox exists, click it
        if (checkbox && !checkbox.checked) {
          checkbox.click();
        }
      });
    },
    docs: '',
    version: '1.0',
    category: 3,
  },
  {
    title: 'SKU List > Inventory Import Sheet',
    script: () => {
      (async () => {
        try {
      
          const send = async (url, data) => {
            const result = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            const resultJson = await result.json();
            console.log(resultJson);
            return resultJson;
          }
      
          const configInput = prompt(`
            1: AU
            2: US
            3: BADDEST
          `);
          if (!configInput) {
            alert('We out.');
            return;
          }
      
          const configMap = {
            1: 'au',
            2: 'us',
            3: 'baddest',
          };
          const config = configMap[configInput];
      
          if (!config) {
            alert('Invalid input! We out.');
            return;
          }
      
          const skusTypeInput = prompt(`
            1: Full SKUs
            2: Partial SKUs
          `);
          if (!skusTypeInput) {
            alert('We out.');
            return;
          }
      
          const skusTypeMap = {
            1: 'fullSkus',
            2: 'partialSkus',
          };
          const skusType = skusTypeMap[skusTypeInput];
      
          if (!skusType) {
            alert('We out.');
            return;
          }
      
          const skuListInput = prompt(`Paste the list of SKUs here (One SKU per line):`);
          if (!skuListInput) {
            alert('No SKUs???? We out.');
            return;
          }
      
          const skuList = skuListInput.split('\n');
          if (!skuList || !Array.isArray(skuList) || skuList.length <= 0 || skuList[0].includes(',') ) {
            alert('SKU list cannot be processed! We out.');
            return;
          }
      
          const payload = { config, options: { [skusType]: skuList } };
      
          const result = await send('https://australia-southeast1-foxtware.cloudfunctions.net/apexInventoryToImportSheetsV2', payload);
          console.log('result', result);
      
          if (result?.success) {
            alert(`Inventory import sheet generated. \nPlease check foxtron_fetch for the import sheet link.`);
          } else {
            alert(`Inventory import sheet generation failed. ${ result?.message }`);
          }
          
        } catch(err) {
          alert(err);
        }
      })();
    },
    docs: '',
    version: '1.0',
    category: 5,
  },
];

/*
  {
    title: 'Title',
    script: () => {
      console.log('hi!');
    },
    docs: '',
    version: '1.0',
    category: 1,
  },
*/

const categories = [
  'Super useful',         // 0
  'Useful',               // 1
  'Just for development', // 2
  'Very niche',           // 3
  'Under construction',   // 4
  'Fox Functions',        // 5
];

const html = categories.map((c, index) => {
  categoryBookmarklets = bookmarklets.filter(b => b.category === index);

  const categoryBookmarkletsHTML = categoryBookmarklets.map(b => {
    return bookmarkletTemplate(b);
  }).join('');

  const categoryHTML = `
    <div class="category">
      <h2>${ c }</h2>
      ${ categoryBookmarkletsHTML }
    </div>
  `;

  return categoryHTML;
}).join('');

document.getElementById('bookmarkletContainer').innerHTML = html;