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
      let arr = JSON.parse(prompt('Paste your array of JSON objects here:'));
      console.log('Data', arr);

      const cols = arr.map(item => Object.keys(item))
        .flat()
        // Make keys unique
        .filter((value, index, self) => {
          return self.indexOf(value) === index;
        })
        .join(',');

      const rows = arr.map(item => Object.values(item).join(','));
      console.log('Cols', cols);
      console.log('Rows', rows);

      const csvContent = [cols, ...rows].join('\n');

      const download = (filename, text) => {
        const el = document.createElement('a');
        el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        el.setAttribute('download', filename);

        el.style.display = 'none';
        document.body.appendChild(el);

        el.click();

        document.body.removeChild(el);
      }
    },
    docs: 'https://gist.github.com/GorgonFreeman/d174e3365c126363e6c401a8bd2a31f3',
    version: '1.0',
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
  {
    title: 'Pizza Hut Form Filler J1',
    script: () => {

      // Pizza Hut Form Filler
      const data = {
        firstName: 'John',
        lastName: 'Martin',
        email: 'bindiiboy@yahoo.com.au',
        mobile: '0430026467',
        'Re-enter Phone Number': '0430026467',
        'Re-enter Phone': '0430026467',
        'Re-enter Email': 'bindiiboy@yahoo.com.au',
      };

      Object.entries(data).forEach(([k,v]) => {
        try {
          const input = document.querySelector(`[name="${ k }"]`);
          input.value = v;
          input.dispatchEvent(new Event('input'));  
        } catch(err) {
          console.warn(err);
        }
      });

      document.querySelector('[id="T&C Agreement-agreement"]').click();
    },
    docs: false,
    version: '1.1',
    category: 4
  },
  {
    title: 'Pizza Hut Form Filler J2',
    script: () => {

      // Pizza Hut Form Filler
      const data = {
        firstName: 'Lucien',
        lastName: 'Martin',
        email: 'mechaniz3d_ac@yahoo.com.au',
        mobile: '0404414692',
        'Re-enter Phone Number': '0404414692',
        'Re-enter Phone': '0404414692',
        'Re-enter Email': 'mechaniz3d_ac@yahoo.com.au',
      };

      Object.entries(data).forEach(([k,v]) => {
        try {
          const input = document.querySelector(`[name="${ k }"]`);
          input.value = v;
          input.dispatchEvent(new Event('input'));  
        } catch(err) {
          console.warn(err);
        }
      });

      document.querySelector('[id="T&C Agreement-agreement"]').click();
    },
    docs: false,
    version: '1.1',
    category: 4
  },
  {
    title: 'Pizza Hut Form Filler S1',
    script: () => {

      // Pizza Hut Form Filler
      const data = {
        firstName: 'Joy',
        lastName: 'Chin',
        email: 'joyinthemiddle@gmail.com',
        mobile: '0479187849',
        'Re-enter Phone Number': '0479187849',
        'Re-enter Phone': '0479187849',
        'Re-enter Email': 'joyinthemiddle@gmail.com',
      };

      Object.entries(data).forEach(([k,v]) => {
        try {
          const input = document.querySelector(`[name="${ k }"]`);
          input.value = v;
          input.dispatchEvent(new Event('input'));  
        } catch(err) {
          console.warn(err);
        }
      });

      document.querySelector('[id="T&C Agreement-agreement"]').click();
    },
    docs: false,
    version: '1.1',
    category: 4
  },
  {
    title: 'Pizza Hut Form Filler S2',
    script: () => {

      // Pizza Hut Form Filler
      const data = {
        firstName: 'Sharon',
        lastName: 'Chin',
        email: 'sharonjoychin@gmail.com',
        mobile: '0404438432',
        'Re-enter Phone Number': '0404438432',
        'Re-enter Phone': '0404438432',
        'Re-enter Email': 'sharonjoychin@gmail.com',
      };

      Object.entries(data).forEach(([k,v]) => {
        try {
          const input = document.querySelector(`[name="${ k }"]`);
          input.value = v;
          input.dispatchEvent(new Event('input'));  
        } catch(err) {
          console.warn(err);
        }
      });

      document.querySelector('[id="T&C Agreement-agreement"]').click();
    },
    docs: false,
    version: '1.1',
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
];

/*
  {
    title: 'Title',
    script: () => {
      console.log('hi!');
    },
    docs: '',
    version: '1.0',
    category: 1
  }
*/

const categories = [
  'Super useful',
  'Useful',
  'Just for development',
  'Very niche',
  'Under construction',
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