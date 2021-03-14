import { HTMLLoader } from '../core/utils/html_loader';
import { Accordion } from './accordion';
import { doSomething } from './do-something';
import { HTMLContent, itemsToCache } from './html-imports';
import { Slideshow } from './slideshow';

// Put all function calls that need to be made on every page load inside the setupAll function body.
export function PutStudentPageLoadOperationsInsideThisStudentBody() {
    // TODO: Put all operations that you want to happen on ever page load in this function.
    // For example you could write: Sticky.setup()
    doSomething();
    var acc = document.getElementsByClassName("accordion");
    var i;
    console.log("different");
    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        console.log("something");
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
        } 
    });
    }
    
    function openTab(evt, cityName) {

        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        console.log("stuff ", cityName);
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += "active";
    }

    // var domElements = document.getElementsByClassName("tablinks");
    // console.log(domElements);
    // for (i=0; i<domElements.length; i++){
    //     var that = domElements[i].innerHTML;
    //     var elem = domElements[i];
    //     elem.onclick = function(event) {
    //         openTab(event, that);
    //     };
    // }
    // document.getElementById("social_tab").onclick = function(event) { openTab(event, "Social"); }
    // document.getElementById("Social").style.display = "block";
    // document.getElementById("intellect_tab").onclick = function(event) { openTab(event, "Intellect"); }

    document.getElementById("intellect_tab").onclick = function(event) { openTab(event, "Intellect"); }
    document.getElementById("Intellect").style.display = "block";
    document.getElementById("social_tab").onclick = function(event) { openTab(event, "social"); }

    document.getElementById("physical_tab").onclick = function(event) { openTab(event, "Physical"); }
    document.getElementById("visual_tab").onclick = function(event) { openTab(event, "Visual"); }
}

export async function setupAll() {
    await new Promise((r: any) => setTimeout(r, 100));
    console.log('reloading');
    Slideshow.setupAll();
    Accordion.setupAll();
    PutStudentPageLoadOperationsInsideThisStudentBody();
    console.log('reloaded');
}

itemsToCache.forEach((item: HTMLContent) => {
    HTMLLoader.cacheHTML(item.name, item.content);
});
(window as any).HTMLLoader = HTMLLoader;

console.log('dynamic-dom loaded');
// Do not touch this line, needed to reinitialize code in the dynamic-dom.ts setupAll function
window.addEventListener('newPageLoad', () => setupAll());
