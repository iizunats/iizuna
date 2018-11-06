# Was muss es können?

- einzelne komponenten müssen einfach erzeugt werden können


- bestehendes html muss in die generierung von elementen einbezogen werden
z.B. haben wir folgendes vom Server gerendertes HTML:

```html
<ul>
  <li data-tc-product>
    Produkt <span data-tcv-title>A</span>
    <a href="/link/zur/produkt/seite/a/" data-tcv-href="/link/zur/produkt/seite/{{title}}/">Zum Produkt</a>
  </li>
</ul>
```

- Die Komponente muss wissen, was davon ein einzelnes Element ist (eine klasse mit attributen) -> data-tc-product
- Die Komponente muss wissen was eine variable ist -> data-tcv-title
- Die Komponente muss auch attribute dynmaisch mit variablen füllen -> data-tcv-[ATTR]
- **Was wenn keine komponente initial auf der seite ist, aber dann erzeugt wird? wo kommt das HTML her?**



