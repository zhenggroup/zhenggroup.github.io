/* Slow light on the background facets; masks protect each scientific illustration. */
(() => {
  'use strict';
  const scenes = {
    electrochem: {
      background: 'M0 0H800V534H0Z',
      shield: '<path d="M520 22H758L800 101V119H747V180H757V432L791 443V534H344V449L414 425V180H443V127H489V180H558V135H598V180H687V143H721V180H744V120H521Z"/><path d="M466 135C464 103 536 84 604 69M578 144C578 107 626 101 644 69M704 161C706 112 686 97 683 72M601 70C395 69 329 265 421 313" fill="none" stroke="black" stroke-width="12"/>',
      facets: [
        '374,0 400,0 477,87 431,190',
        '205,0 305,0 429,191 372,164',
        '185,478 348,450 535,342 407,288',
        '447,0 516,0 431,95 412,65'
      ]
    },
    acse: {
      background: 'M0 0H800V280L0 260Z',
      shield: '<path d="M573 0H697L622 142L691 280H107L234 228L523 116L519 92Z"/><circle cx="91" cy="87" r="23"/><circle cx="258" cy="26" r="16"/><circle cx="351" cy="68" r="17"/><circle cx="142" cy="161" r="15"/><circle cx="247" cy="144" r="26"/><circle cx="408" cy="126" r="15"/><circle cx="665" cy="184" r="19"/><circle cx="708" cy="129" r="14"/><circle cx="736" cy="241" r="16"/><circle cx="36" cy="52" r="11"/><circle cx="87" cy="234" r="12"/><circle cx="162" cy="94" r="10"/><circle cx="192" cy="84" r="9"/><circle cx="201" cy="201" r="9"/><circle cx="317" cy="180" r="8"/><circle cx="326" cy="135" r="8"/><circle cx="484" cy="75" r="8"/>',
      facets: [
        '720,0 768,0 684,128 591,213',
        '347,0 377,0 534,167 443,177',
        '76,0 134,0 398,176 306,201',
        '20,101 85,177 86,272 47,266'
      ]
    },
    cm: {
      background: 'M0 0H800V195L420 173L0 167Z',
      shield: '<path d="M0 75L157 0H196L420 248L294 193Z"/><path d="M450 80L481 48L528 35L550 59L641 62L715 91L776 182L790 304H453L401 208L400 151L447 134Z"/>',
      facets: [
        '194,0 293,0 421,155 328,122',
        '332,0 420,0 420,139 352,50',
        '684,0 715,0 713,111 680,80',
        '0,55 74,15 74,111 0,158'
      ]
    },
    jpcc: {
      background: 'M0 0H800V340L0 178Z',
      shield: '<circle cx="173" cy="94" r="69"/><circle cx="335" cy="181" r="56"/><ellipse cx="515" cy="125" rx="73" ry="46"/><ellipse cx="669" cy="181" rx="64" ry="37"/>',
      facets: [
        '655,0 742,0 535,261 422,227',
        '484,0 582,0 350,170 272,129',
        '735,0 787,0 648,232 603,208',
        '0,13 78,103 200,201 131,195'
      ]
    },
    jacs: {
      background: 'M0 0H800V186L0 94Z',
      shield: '<circle cx="231" cy="105" r="20"/><circle cx="578" cy="124" r="13"/><circle cx="650" cy="123" r="23"/><path d="M450 119L479 121L506 142L513 180H411L420 141Z"/>',
      facets: [
        '361,90 415,89 557,150 511,139',
        '175,0 268,0 461,91 392,98',
        '613,0 662,0 541,108 468,107',
        '741,0 771,0 710,73 691,101'
      ]
    }
  };
  const start = () => {
    const hero = document.querySelector('.home-page #home');
    if (!hero) return;
    const compact = matchMedia('(max-width:1100px)');
    const layers = [];
    hero.querySelectorAll('.hero-background-slide').forEach(slide => {
      const scene = scenes[slide.dataset.scene];
      if (!scene || slide.querySelector('.hero-prism-lights')) return;
      const id = `prism-${slide.dataset.scene}`;
      const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.classList.add('hero-prism-lights');
      svg.setAttribute('viewBox','0 0 800 533.333');
      svg.setAttribute('aria-hidden','true');
      svg.setAttribute('focusable','false');
      svg.innerHTML = `<defs>
        <mask id="${id}-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="800" height="534" style="mask-type:luminance"><path d="${scene.background}" fill="white"/><g fill="black">${scene.shield}</g></mask>
        <linearGradient id="${id}-gold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f8dea1" stop-opacity=".08"/><stop offset=".45" stop-color="#f3d69b" stop-opacity=".42"/><stop offset="1" stop-color="#fff0ca" stop-opacity=".12"/></linearGradient>
        <linearGradient id="${id}-blue" x1="1" y1="0" x2="0" y2="1"><stop stop-color="#c5ddeb" stop-opacity=".08"/><stop offset=".5" stop-color="#c0d8ec" stop-opacity=".35"/><stop offset="1" stop-color="#92b8d2" stop-opacity=".1"/></linearGradient>
      </defs><g mask="url(#${id}-mask)">${scene.facets.map((points,i)=>`<polygon class="hero-prism-facet" points="${points}" fill="url(#${id}-${i % 2 ? 'blue' : 'gold'})" style="--prism-x:${[18,-14,12,-10][i]}px;--prism-y:${[-10,12,8,-8][i]}px;--prism-turn:${[1.4,-1.2,.8,-.9][i]}deg;--prism-duration:${[11,14,12,16][i]}s;--prism-delay:${[-3,-7,-4,-11][i]}s"/>`).join('')}</g>`;
      slide.querySelector('img').after(svg);
      layers.push({ svg, electrochem: slide.dataset.scene === 'electrochem' });
    });
    const align = () => layers.forEach(({svg,electrochem}) => {
      // Match the source image's responsive object-fit and object-position.
      svg.setAttribute('preserveAspectRatio',electrochem
        ? `xMaxYMid ${compact.matches ? 'slice' : 'meet'}`
        : `xMidYMid ${compact.matches ? 'meet' : 'slice'}`);
    });
    align();
    compact.addEventListener('change',align);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
})();
