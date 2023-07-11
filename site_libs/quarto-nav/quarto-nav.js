const headroomChanged=new CustomEvent("quarto-hrChanged",{detail:{},bubbles:true,cancelable:false,composed:false,});window.document.addEventListener("DOMContentLoaded",function(){let init=false;function throttle(func,wait){var timeout;return function(){const context=this;const args=arguments;const later=function(){clearTimeout(timeout);timeout=null;func.apply(context,args);};if(!timeout){timeout=setTimeout(later,wait);}};}
function headerOffset(){const headerEl=window.document.querySelector("header.fixed-top");if(headerEl){return headerEl.clientHeight;}else{return 0;}}
function footerOffset(){const footerEl=window.document.querySelector("footer.footer");if(footerEl){return footerEl.clientHeight;}else{return 0;}}
function updateDocumentOffsetWithoutAnimation(){updateDocumentOffset(false);}
function updateDocumentOffset(animated){const topOffset=headerOffset();const bodyOffset=topOffset+footerOffset();const bodyEl=window.document.body;bodyEl.setAttribute("data-bs-offset",topOffset);bodyEl.style.paddingTop=topOffset+"px";const sidebars=window.document.querySelectorAll(".sidebar, .headroom-target");sidebars.forEach((sidebar)=>{if(!animated){sidebar.classList.add("notransition");setTimeout(function(){sidebar.classList.remove("notransition");},201);}
if(window.Headroom&&sidebar.classList.contains("sidebar-unpinned")){sidebar.style.top="0";sidebar.style.maxHeight="100vh";}else{sidebar.style.top=topOffset+"px";sidebar.style.maxHeight="calc(100vh - "+topOffset+"px)";}});const mainContainer=window.document.querySelector(".quarto-container");if(mainContainer){mainContainer.style.minHeight="calc(100vh - "+bodyOffset+"px)";}
let linkStyle=window.document.querySelector("#quarto-target-style");if(!linkStyle){linkStyle=window.document.createElement("style");linkStyle.setAttribute("id","quarto-target-style");window.document.head.appendChild(linkStyle);}
while(linkStyle.firstChild){linkStyle.removeChild(linkStyle.firstChild);}
if(topOffset>0){linkStyle.appendChild(window.document.createTextNode(`
      section:target::before {
        content: "";
        display: block;
        height: ${topOffset}px;
        margin: -${topOffset}px 0 0;
      }`));}
if(init){window.dispatchEvent(headroomChanged);}
init=true;}
var header=window.document.querySelector("#quarto-header");if(header&&window.Headroom){const headroom=new window.Headroom(header,{tolerance:5,onPin:function(){const sidebars=window.document.querySelectorAll(".sidebar, .headroom-target");sidebars.forEach((sidebar)=>{sidebar.classList.remove("sidebar-unpinned");});updateDocumentOffset();},onUnpin:function(){const sidebars=window.document.querySelectorAll(".sidebar, .headroom-target");sidebars.forEach((sidebar)=>{sidebar.classList.add("sidebar-unpinned");});updateDocumentOffset();},});headroom.init();let frozen=false;window.quartoToggleHeadroom=function(){if(frozen){headroom.unfreeze();frozen=false;}else{headroom.freeze();frozen=true;}};}
const headerEl=window.document.querySelector("header.fixed-top");if(headerEl&&window.ResizeObserver){const observer=new window.ResizeObserver(updateDocumentOffsetWithoutAnimation);observer.observe(headerEl,{attributes:true,childList:true,characterData:true,});}else{window.addEventListener("resize",throttle(updateDocumentOffsetWithoutAnimation,50));}
setTimeout(updateDocumentOffsetWithoutAnimation,250);if(window.location.protocol!=="file:"){const links=window.document.querySelectorAll("a");for(let i=0;i<links.length;i++){links[i].href=links[i].href.replace(/\/index\.html/,"/");}
const sharingLinks=window.document.querySelectorAll("a.sidebar-tools-main-item");for(let i=0;i<sharingLinks.length;i++){const sharingLink=sharingLinks[i];const href=sharingLink.getAttribute("href");if(href){sharingLink.setAttribute("href",href.replace("|url|",window.location.href));}}
const navSidebar=window.document.querySelector("nav#quarto-sidebar");if(navSidebar){const activeItem=navSidebar.querySelector("li.sidebar-item a.active");if(activeItem){const resizeObserver=new ResizeObserver((_entries)=>{const elBottom=activeItem.offsetTop;const viewBottom=navSidebar.scrollTop+navSidebar.clientHeight;if(viewBottom!==navSidebar.scrollHeight){if(elBottom>=viewBottom){navSidebar.scrollTop=elBottom;}
resizeObserver.unobserve(navSidebar);}});resizeObserver.observe(navSidebar);}}}});