import{a as y,i,S as p}from"./assets/vendor-BoHpxnX5.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const u="49070628-cf42e4c64cc07d7e6ab81af9e",g="https://pixabay.com/api/";async function f(s,r=1,a=40){try{const t=await y.get(g,{params:{key:u,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:a}});if(t.data.hits.length===0)throw new Error("Sorry, there are no images matching your search query. Please try again!");return t.data}catch(t){throw i.error({title:"Error",message:t.message||"Something went wrong. Please try again!",position:"topRight"}),t}}function h(s){const r=document.querySelector(".gallery"),a=s.hits.map(e=>`<li class="gallery-item">
        <a href="${e.largeImageURL}">
          <div class="gallery-top">
            <img class="gallery-img" src="${e.webformatURL}" alt="${e.tags}" />
          </div>
          <ul class="gallery-bottom">
            <li class="gallery-bottom-item">
              <p class="gallery-bottom-stat">Likes</p>
              <p class="gallery-bottom-value">${e.likes}</p>
            </li>
            <li class="gallery-bottom-item">
              <p class="gallery-bottom-stat">Views</p>
              <p class="gallery-bottom-value">${e.views}</p>
            </li>
            <li class="gallery-bottom-item">
              <p class="gallery-bottom-stat">Comments</p>
              <p class="gallery-bottom-value">${e.comments}</p>
            </li>
            <li class="gallery-bottom-item">
              <p class="gallery-bottom-stat">Downloads</p>
              <p class="gallery-bottom-value">${e.downloads}</p>
            </li>
          </ul>
          </a>
        </li>`).join("");r.insertAdjacentHTML("beforeend",a),new p(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}document.addEventListener("DOMContentLoaded",()=>{const s=document.querySelector("#search-form"),r=document.querySelector(".loader"),a=document.querySelector(".gallery"),t=document.createElement("button");t.textContent="Load more",t.classList.add("load-more"),document.body.appendChild(t),t.style.display="none";let e="",o=1;const l=40;s.addEventListener("submit",async n=>{if(n.preventDefault(),e=s.elements.searchQuery.value.trim(),!e){i.warning({title:"Warning",message:"Please enter a search term!",position:"topRight"});return}a.innerHTML="",o=1,t.style.display="none",await c()}),t.addEventListener("click",async()=>{o++,await c()});async function c(){r.style.display="block";try{const n=await f(e,o,l);h(n);const d=document.querySelectorAll(".gallery-item");if(d.length>0){const m=d[0].getBoundingClientRect().height;window.scrollBy({top:m*2,behavior:"smooth"})}o*l>=n.totalHits?(t.style.display="none",i.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):t.style.display="block"}catch(n){console.error(n)}r.style.display="none"}});
//# sourceMappingURL=index.js.map
