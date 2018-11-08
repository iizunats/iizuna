### struktur:


#### TypeScript
Beinhaltet FE betriebslogiken wie z.B:

- to top button
    - event listeners (click)
    - scroll smooth auslösen (top 0)    
- scroll to element (z.b. CTA mit link zu h1)
    - event listener (click)
    - scroll smooth (to target)
- akkordion
    - event listeners (click)
    - klassen von elementen tauschen (aktiv, open, closed, inaktiv)
    - animationen auf akkordion ermöglichen
- slider
    - externe lib
- menüs
    - TODO
- ajax
    - anfrage an api
    - rückgabe in DOM einfügen
    - loader anzeigen
- tabs
    (siehe akkordions)
- modals
    - event listeners (click)
    - klassen von elementen tauschen
    - ESC zum schließen
- input autocomplete
    - event listenrs (onkeydown)
    - debounce
    - dynamisch liste mit werten füllen
    - click listeners auf erzeugte elemente setzen
    - pfeilaktionen des keyboards mit einbeziehen
    
    
#### Fluid

##### Variante 1
- Fluid templates können über api angefragt werden und werden minimal bereinigt ausgeliefert
- fluid marker werden von framework interprätiert und so kann ein template gemacht werden

##### Variante 2
- fluid wird um ux-direktiven erweitert, welche automatisiert das jeweilige element um funktionalitäten erweitern ... oder so

Beispiel:

```html

<ul>
  <f:for each="items" as="item">
    <tc:productListItem product="item">
      <f:if condition="true">
        <span>{description}</span>
      </f:if>
    </tc:productListItem>
  </f:for>
</ul>

```

