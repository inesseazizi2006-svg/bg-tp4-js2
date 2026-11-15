"use strict"; // Mode strict : oblige à déclarer les variables avec let/const/var (cours slide 51)

// ================== Variables globales (portée globale, cours slides 50-51) ==================

// Au début de script.js : variable "lignes" initialisée à 0 (TP slide 26)
// let = variable dont la valeur va changer (cours slide 51) ; type primitif number (cours slide 37)
let lignes = 0;

// Variable "total_points" initialisée à 0 (TP slide 36)
let total_points = 0;

// Tableau d'objets "persons" (cours slides 38 à 40) :
// chaque objet "person" a 3 propriétés : nom, prenom, points
const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

// Appel de init() (TP slide 22) : placé après la déclaration des variables,
// sinon "lignes" ne serait pas encore initialisée au moment de l'appel
init();


/*
 * init() : parcourt le tableau persons et appelle doInsert pour chaque objet (TP slide 22)
 * Fonction sans paramètre (cours slide 45)
 */
function init() {
    // Boucle for...of pour parcourir les objets du tableau persons (cours slide 44)
    for (const person of persons) {
        // Accès aux propriétés d'un objet avec le point (cours slide 39)
        doInsert(person.nom, person.prenom, person.points);
    }
}


/*
 * doInsert(nom, prenom, points) : appelle doInsertRowTable avec le bon numéro de ligne,
 * met à jour lignes et total_points, puis le résumé (TP slides 26, 38 et 40)
 */
function doInsert(nom, prenom, points) {
    // Incrémenter la variable lignes de 1 (opérateur combiné +=, cours slide 41)
    lignes += 1;
    // puis l'affecter à num, au lieu de 99 (const, cours slide 51)
    const num = lignes;

    // Additionner les points à total_points (opérateur combiné +=, cours slide 41)
    total_points += points;

    // Appel de doInsertRowTable avec les paramètres appropriés (cours slide 45)
    doInsertRowTable(num, nom, prenom, points);

    // Appel de la fonction update_summary() définie plus bas (TP slide 40)
    // Les fonctions déclarées avec "function" sont hoistées : on peut les appeler avant leur définition (cours slide 46)
    update_summary();
}


/*
 * update_summary() : met à jour l'espace résumé (TP slide 42)
 */
function update_summary() {
    // Récupérer l'élément id = p1 : getElementById (cours slides 61-64)
    const element_lignes = document.getElementById("p1");

    // Récupérer l'élément id = p3 : getElementById (cours slides 61-64)
    const element_points = document.getElementById("p3");

    // Avec innerText, afficher le nombre de lignes (cours slide 91)
    // + entre une chaîne et un nombre = concaténation (cours slide 41)
    element_lignes.innerText = lignes + " ligne(s)";

    // Avec innerText, afficher le total des points (cours slide 91)
    element_points.innerText = "Total point(s)= " + total_points;
}


/*
 * consoleTableau() : affiche le contenu du tableau persons dans la console (TP slide 30)
 */
function consoleTableau() {
    // console.log : sortie dans la console du navigateur (cours slide 33)
    console.log(persons);
}


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
