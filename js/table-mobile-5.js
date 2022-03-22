/* Accordion View or Stacked View */
accordionMobileView = true;
checkState = 'desktop';

let init = () => {
    
    if (document.getElementById('tfooter')) {
        document.getElementById('tfooter').setAttribute('aria-labelledby', 'footnote');    
    }

    document.querySelectorAll('sup').forEach((el) => {
        el.addEventListener('click', loopFootNote);
    });

    document.querySelectorAll('a, button, [role="button"], [type="button"], [type="submit"], [type="reset"]').forEach((el) => {
        el.addEventListener('keyup', ButtonEventHandler);
    });

    window.addEventListener("hashchange", () => {
        window.scrollTo(window.scrollX, window.scrollY - 24);
    });

    if (accordionMobileView) {
        if (window.matchMedia("(max-width: 1024px)").matches) {
            convertTableToMobile();
        }
        window.addEventListener('resize', checkWhenToConvertMobile);    
    }
    
    /* <html lang="fr"> */
    let pageLanguage = document.documentElement.lang;
    if (pageLanguage === 'fr') {
        footNote = `Note de bas de page`;
        footNoteReferrer = `Consulter la référence pour la note de bas de page`;
        captionInv = 'Footnotes for this table will appear below.';
    } else {
        footNote = `Footnote`;
        footNoteReferrer = `Go to reference for footnote`;
        captionInv = 'Footnotes for this table will appear below.';
    }
    document.querySelectorAll('.wb-inv').forEach((el) => {
        el.innerHTML = footNote;
    });
    document.querySelectorAll('.wb-inv-ref').forEach((el) => {
        el.innerHTML = footNoteReferrer;
    });
    document.querySelectorAll('.wb-inv-caption').forEach((el) => {
        el.innerHTML = captionInv;
    });

}

/* Set to Call Once */
let checkWhenToConvertMobile = () => {
    if (window.matchMedia("(max-width: 1024px)").matches && checkState === "desktop") {
        checkState = "mobile";
        convertTableToMobile();
    } else if (window.matchMedia("(min-width: 1024px)").matches && checkState === "mobile") {
        checkState = "desktop";
        convertTableToDesktop();
    }
}

let checkTabState = (sid) => {
    document.querySelectorAll('sup').forEach((el) => {
        if (el.firstElementChild && el.firstElementChild.id) {
            var getId = el.firstElementChild.id.split('-');
            if (document.getElementById(el.firstElementChild.id)) {
                document.getElementById(el.firstElementChild.id).classList.remove("by-keyboard");
                document.getElementById(el.firstElementChild.id).focus();
            }


            if (getId[0] === sid && getId[1] == '1') {
                var tabId = 'mobile-' + el.getAttribute('tab-id');
                if (document.getElementById(tabId)) {
                    document.getElementById(tabId).setAttribute('aria-expanded', 'true');
                    document.getElementById(tabId).classList.add('active');
                    if (document.getElementById(tabId).nextElementSibling) {
                        document.getElementById(tabId).nextElementSibling.setAttribute('aria-hidden', 'false');
                        document.getElementById(tabId).nextElementSibling.removeAttribute('style');
                    }
                }
            }   
        }
    });
}

let ButtonEventHandler = (event) => {
    var type = event.type;
    if (type === 'keyup') {
        if (event.keyCode === 13 || event.keyCode === 32) {
            event.target.classList.remove('by-keyboard');
        }
        else if (event.keyCode === 9) {
            event.target.classList.remove('by-keyboard');
        }
    } else if (type === 'click') {
        event.target.classList.add('by-keyboard');
    }
    else if (type === 'blur') {
        event.target.classList.add('by-keyboard');
    }
}

let loopFootNote = (event) => {
    console.log('Footnore')
    const anchorId = event.target.id.split('-');
    document.getElementById(anchorId[0]).setAttribute('href', '#' + event.target.id);
}

let expandCollapse = (el) => {
    el.target.setAttribute('aria-expanded', el.target.getAttribute('aria-expanded') == 'false' ? 'true' : 'false');
    el.target.nextElementSibling.setAttribute('aria-hidden', el.target.nextElementSibling.getAttribute('aria-hidden') == 'false' ? 'true' : 'false');
    'active'.split(' ').forEach((s) => {
        el.target.classList.toggle(s);
        slideToggle(el.target.nextElementSibling, 500);
    });
}

let slideUp = (target, duration = 500) => {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        //alert("!");
    }, duration);
}

let slideDown = (target, duration = 500) => {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;

    if (display === 'none')
        display = 'block';

    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);
}

let slideToggle = (target, duration = 500) => {
    if (window.getComputedStyle(target).display === 'none') {
        return slideDown(target, duration);
    } else {
        return slideUp(target, duration);
    }
}
                          
let createDomElement = (ele, className='', text='', id='', attribute1='', html='', role='') => {
    let elementSemantic = document.createElement(ele);
    if (className) {
        let breakClassName = className.split(':');
        breakClassName.forEach((classToAdd) => {
            elementSemantic.classList.add(classToAdd);
        });
    }
    if (text) {
        elementSemantic.innerHTML = text;
    }
    if (id) {
        elementSemantic.setAttribute('id', id);
    }
    if (attribute1) {
        let getVal = attribute1.split(':');
        elementSemantic.setAttribute(getVal[0], getVal[1]);
    }
    if (html) {
        elementSemantic.innerHTML = html;
    }
    if (role) {
        elementSemantic.setAttribute('role', role);
    }
    return elementSemantic;
}

let convertTableToMobile = () => {

    if (document.querySelector('.parentContainer')) {
        var getTables = document.querySelectorAll('table.responsive-table');
        getTables.forEach((table) => {
            table.setAttribute('style', 'display:none;')
        });
        var getMobileTables = document.querySelectorAll('.parentContainer');
        getMobileTables.forEach((table) => {
            table.removeAttribute('style')
        });
        return;
    }

    var getTables = document.querySelectorAll('table.responsive-table');
    getTables.forEach((table) => {

        var fullTable = table;
        let $parentContainer = createDomElement(ele = 'div', className = 'parentContainer', '', 'mobile-container', 'aria-labelledby:mobile-caption', '', 'group');
        


        /* Getting Column names */
        var $tc = table.querySelectorAll('th[scope="col"]');
        var tc = Array.prototype.map.call($tc, (el) => {
            return el.innerHTML;
        });

        /* Getting Subheadinsg */
        var $th = table.querySelectorAll('td.subheading');
        var th = Array.prototype.map.call($th, (el) => {
            return el.innerHTML;
        });


        // Adding Caption if exists
        if (document.querySelector('caption')) {
            var $caption = document.querySelector('caption').innerHTML;
            let $captionContainer = createDomElement(ele = 'caption', className = 'block', text = $caption, id = "mobile-caption");
            $parentContainer.appendChild($captionContainer);    
        }
        

        $th.forEach((el) => {
            /* Heading for Table Row */
            let $headingContainer = createDomElement(ele = 'button', className = 'trigger:by-keyboard', text = el.innerHTML, id = 'mobile-' + el.id, attribute1 = 'aria-expanded:false');
            // let $arrow = createDomElement(ele = 'span', className = 'arrow');

            $parentContainer.appendChild($headingContainer);
            // $headingContainer.appendChild($arrow);

            /* Body container to contain all columns */
            let $bodyContainer = createDomElement(ele = 'div', className = 'toggle_container', text = '', id = '', attribute1 = 'aria-hidden:true');
            let $div = createDomElement(ele = 'div', className = 'inner');

            /* Appending Contents */
            $bodyContainer.appendChild($div);
            $parentContainer.appendChild($bodyContainer);

            /* Getting Row Records */
            if (el.id) { // If SUBHEADING EXISTS

                var $trow = fullTable.querySelectorAll('tr[aria-labelledby="' + el.id + '"]');
                $trow.forEach((trowEL) => {
                    var $tth = trowEL.querySelectorAll('th');
                    $tth.forEach((tthEL) => {
                        let $row = createDomElement(ele = 'div', className = 'main-heading');
                        let $rowSpan = createDomElement(ele = 'span', className = '', text = tthEL.innerHTML);

                        $row.appendChild($rowSpan);
                        $bodyContainer.appendChild($row);
                    });

                    var $ttd = trowEL.querySelectorAll('td');
                    $ttd.forEach((ttdEL, n) => {
                        var apClass = $ttd.length === (n + 1) ? "-last" : "";
                        let $row = createDomElement(ele = 'div', className = 'inner' + apClass);
                        let $rowSpan = createDomElement(ele = 'span', className = 'col-heading', text = '', id = '', attribute1 = '', html = tc[n + 1]);
                        $row.appendChild($rowSpan);
                        
                        $rowSpan = createDomElement(ele = 'span', className = 'col-text', text = '', id = '', attribute1 = '', html = ttdEL.innerHTML);
                        $row.appendChild($rowSpan);

                        $bodyContainer.appendChild($row);
                    });
                });
            }
        });

        /* Getting Rows without Sub Headings */
        var $trow = fullTable.querySelectorAll('tr[class="trow-nsh"]');
        $trow.forEach((trowEL, i) => {
            /* Getting Subheadinsg */
            var $th = trowEL.querySelectorAll('th.no-subheading');

            /* Heading for Table Row */
            let $headingContainer = createDomElement(ele = 'button', className = 'trigger', text = $th[0].innerHTML, id = 'mobile-' + trowEL.id, attribute1 = 'aria-expanded:false');
            // let $arrow = createDomElement(ele = 'span', className = 'arrow');

            $parentContainer.append($headingContainer)
            // $headingContainer.append($arrow)

            /* Body container to contain all columns */
            let $bodyContainer = createDomElement(ele = 'div', className = 'toggle_container', text = '', id = '', attribute1 = 'aria-hidden:true');
            let $div = createDomElement(ele = 'div', className = 'inner');

            $bodyContainer.appendChild($div);
            $parentContainer.appendChild($bodyContainer);

            var $ttd = trowEL.querySelectorAll('td[aria-labelledby="' + trowEL.id + '"]');
            $ttd.forEach((ttdEL, n) => {
                var apClass = $ttd.length === (n + 1) ? "-last" : "";
                let $row = createDomElement(ele = 'div', className = 'inner' + apClass);

                let $rowSpan = createDomElement(ele = 'span', className = 'col-heading', text = '', id = '', attribute1 = '', html = tc[n + 1]);
                $row.appendChild($rowSpan);

                $rowSpan = createDomElement(ele = 'span', className = 'col-text', text = '', id = '', attribute1 = '', html = ttdEL.innerHTML);
                $row.appendChild($rowSpan);

                $bodyContainer.appendChild($row);
            });
        });

        // table.replaceWith($parentContainer);
        table.setAttribute('style', 'display: none');
        table.insertAdjacentElement('afterEnd', $parentContainer);

        // Special case for SUP as IDs are duplicated so assigning random ids to make it work
        table.querySelectorAll('sup a').forEach((idToChange) => {
            if (idToChange.id) {
                getSupID = idToChange.id.split('-');
                replacedId = getSupID[0] + '-' + Math.floor(Math.random() * 99999) + '-' + getSupID[2];
                document.getElementById(idToChange.id).id = replacedId;   
            }
        });
    });
    
    
    // Get all containers and hide them
    let toggleContainers = document.querySelectorAll(".toggle_container");
    toggleContainers.forEach((el, key, toggleContainers) => {
        // Set Style for all containers
        el.style.display = 'none';

        // Set Style for the very last container
        if (Object.is(toggleContainers.length - 1, key)) {
            el.style.borderBottom = "2px solid #666666";
        }
    });
    
    document.querySelectorAll('button.trigger').forEach((el) => {
        el.addEventListener('click', expandCollapse);
    });

    document.querySelectorAll('a, button, [role="button"], [type="button"], [type="submit"], [type="reset"]').forEach((el) => {
        el.addEventListener('keyup', ButtonEventHandler);
        el.addEventListener('blur', ButtonEventHandler);
    });

    document.querySelectorAll('sup').forEach((el) => {
        el.addEventListener('click', loopFootNote);
    });
}

let convertTableToDesktop = () => {
    document.querySelectorAll('.parentContainer').forEach((rt) => {
        rt.setAttribute('style', 'display: none');
    });
        
    document.querySelectorAll('.responsive-table').forEach((rt) => {
        rt.removeAttribute('style');
    });
}

window.onload = init;