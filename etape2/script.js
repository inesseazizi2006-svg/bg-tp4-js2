"use strict"; // Mode strict : oblige à déclarer les variables avec let/const/var (cours slide 51)

/*
 * Fonction doInsertRowTable (déclaration d'une fonction avec paramètres, cours slide 45)
 * Insère une nouvelle ligne <tr> à la fin du tableau.
 */
function doInsertRowTable(num, nom, prenom, points) {

    // Récupérer le corps du tableau par son identifiant : getElementById (cours slides 61-64)
    // const = constante, la référence ne change pas (cours slide 51)
    const tbody = document.getElementById("table_body");

    // Créer un élément de type tr (ligne de tableau) à partir de 0 : createElement (cours slide 104)
    const row = document.createElement("tr");

    // Affecter à row la valeur "row" à son attribut "class" : setAttribute (cours slide 107)
    row.setAttribute("class", "row");

    // Créer 5 éléments td (colonnes) : createElement (cours slide 104)
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    // Remplir le contenu de chaque colonne avec innerText (cours slide 91)
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    // La dernière colonne contient un élément input de type checkbox :
    // createElement (cours slide 104) + setAttribute (cours slide 107) + appendChild (cours slide 104)
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    col5.appendChild(checkbox);

    // Affecter les classes CSS à chaque colonne : setAttribute (cours slide 107)
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    // Rajouter les colonnes à la ligne row avec la méthode append() (cours slide 98)
    row.append(col1, col2, col3, col4, col5);

    // Rajouter la ligne row au tableau : appendChild (cours slide 104)
    tbody.appendChild(row);
}
