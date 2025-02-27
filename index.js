import{a as p,S as L,i as m}from"./assets/vendor-BlV6sHEg.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const v="49070628-cf42e4c64cc07d7e6ab81af9e",w="https://pixabay.com/api/";p.defaults.baseURL=w;const P={key:v,image_type:"photo",orientation:"horizontal",safesearch:!0,page:1,per_page:40};async function y(t,o){try{return(await p.get("",{params:{...P,q:t,page:o}})).data}catch(s){console.log(s)}}function S(t=[]){return t.map((o={})=>{const{webformatURL:s,largeImageURL:a,tags:e,likes:r,views:l,comments:h,downloads:b}=o;return`<li class="gallery-item">
        <a href="${a}">
          <div class="gallery-top">
            <img class="gallery-img" src="${s}" alt="${e}" />
          </div>
          <ul class="gallery-bottom">
            <li class="gallery-bottom-item">
              <p class="gallery-bottom-stat">Likes</p>
              <p class="gallery-bottom-value">${r}</p>
            </li>
            <li class="gallery-bottom-item">
              <p class="gallery-bottom-stat">Views</p>
              <p class="gallery-bottom-value">${l}</p>
            </li>
            <li class="gallery-bottom-item">
              <p class="gallery-bottom-stat">Comments</p>
              <p class="gallery-bottom-value">${h}</p>
            </li>
            <li class="gallery-bottom-item">
              <p class="gallery-bottom-stat">Downloads</p>
              <p class="gallery-bottom-value">${b}</p>
            </li>
          </ul>
          </a>
        </li>`}).join("")}const E=document.querySelector(".search-form"),d=document.querySelector(".gallery"),u=document.querySelector(".loader"),g=document.querySelector(".load-more-btn"),M=40;let n="",i=1,c=0;E.addEventListener("submit",q);g.addEventListener("click",$);const R=new L(".gallery a",{});async function q(t){t.preventDefault();const o=t.currentTarget;if(n=o.elements.searchField.value.trim(),n===""){console.log("Query cannot be empty"),m.error({message:"Query cannot be empty",position:"topRight"});return}d.innerHTML="",i=1,u.classList.remove("is-hidden");try{const{hits:s,totalHits:a}=await y(n,i);if(c=Math.ceil(a/M),console.log("totalPages ="+c),console.log("totalHits ="+Math.ceil(a)),s.length===0){m.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}f(s),c!==1&&g.classList.remove("is-hidden")}catch(s){console.log(s)}finally{u.classList.add("is-hidden"),setTimeout(()=>{o.reset()},3e3)}}async function $(){i+=1,u.classList.remove("is-hidden");try{const{hits:t}=await y(n,i);f(t),i>=c&&(g.classList.add("is-hidden"),m.warning({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})),O(d.firstElementChild)}catch(t){console.log(t)}finally{u.classList.add("is-hidden")}}function O(t){if(!t)return;const{height:o}=t.getBoundingClientRect();window.scrollBy({top:o*2,left:0,behavior:"smooth"})}function f(t){const o=S(t);d.insertAdjacentHTML("beforeend",o),R.refresh()}
//# sourceMappingURL=index.js.map
