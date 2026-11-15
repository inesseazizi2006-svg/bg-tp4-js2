"use strict"; // Mode strict : oblige à déclarer les variables avec let/const/var (cours slide 51)

// ================== Variables globales (portée globale, cours slides 50-51) ==================

// Au début de script.js : variable "lignes" initialisée à 0 (TP slide 26)
// let = variable dont la valeur va changer (cours slide 51) ; type primitif number (cours slide 37)
let lignes = 0;

// Variable "total_points" initialisée à 0 (TP slide 36)
let total_points = 0;

// Tableau d'objets "persons" (cours slides 38 à 40) :
// chaque objet "person" a 3 propriétés : nom, prenom, points
// let (et non const) car il peut être remplacé par les données sauvegardées (fonctionnalité 1)
let persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

// Clé utilisée pour sauvegarder persons dans le navigateur (fonctionnalité 1)
const STORAGE_KEY = "crud_persons";

// Appel de init() (TP slide 22) : placé après la déclaration des variables
init();

// Fonctionnalité 3 : recherche en direct.
// On attache l'événement "keyup" (touche relâchée) au champ de recherche
// avec addEventListener (cours slides 136 et 139). Le script est en "defer",
// donc le champ existe déjà dans le DOM (cours slide 27).
document.getElementById("search_field").addEventListener("keyup", filterRows);


/*
 * init() : charge les données sauvegardées s'il y en a (fonctionnalité 1),
 * puis parcourt le tableau persons et appelle doInsert pour chaque objet (TP slide 22)
 */
function init() {
    // Fonctionnalité 1 : lire les données sauvegardées dans le navigateur
    // localStorage fait partie des APIs natives "Storage" de JavaScript (cours slide 123)
    const saved = localStorage.getItem(STORAGE_KEY);

    // Condition if (cours slide 42) : null = rien n'a encore été sauvegardé (type null, cours slide 37)
    if (saved !== null) {
        // JSON.parse transforme le texte JSON en tableau d'objets (JSON, cours slide 40)
        persons = JSON.parse(saved);
    }

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
 * doNewData() : appelée au clic sur Ajouter (TP slides 51, 53 et 55)
 * Lit les champs de saisie, vérifie qu'ils ne sont pas vides, insère la personne
 * dans le tableau HTML et dans le tableau persons, puis vide les champs.
 */
function doNewData() {
    // Récupérer les champs de saisie par leur id : getElementById (cours slides 61-64)
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    // Accéder à l'attribut value de chaque champ (accès direct à un attribut, cours slide 93)
    // trim() enlève les espaces au début et à la fin (pour refuser un nom fait seulement d'espaces)
    const nom = elt_nom.value.trim();
    const prenom = elt_prenom.value.trim();
    // parseInt convertit le texte saisi en nombre entier (type number, cours slide 37)
    const points = parseInt(elt_points.value);

    // Saisie contrôlée : condition if...else (cours slide 42) avec l'opérateur logique || (cours slide 41)
    // Number.isNaN(points) vaut true si le champ Points est vide (ou n'est pas un nombre)
    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        // Méthode alert de l'objet window (BOM, cours slide 116)
        alert("Formulaire incomplet !");
    } else {
        // Appel de doInsert avec les nouvelles données (cours slide 45)
        doInsert(nom, prenom, points);

        // Insérer aussi la nouvelle personne dans le tableau persons :
        // méthode push = ajouter à la fin d'un tableau (cours slide 38), objet littéral (cours slide 39)
        persons.push({ nom: nom, prenom: prenom, points: points });

        // Fonctionnalité 1 : sauvegarder persons dans le navigateur
        saveData();

        // Remettre le contenu des champs à vide via l'attribut value (cours slide 93)
        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}


/*
 * consoleTableau() : affiche le contenu du tableau persons dans la console (TP slide 30)
 */
function consoleTableau() {
    // console.log : sortie dans la console du navigateur (cours slide 33)
    console.log(persons);
}


/*
 * deleteRow() : supprime les lignes cochées, du tableau HTML et du tableau persons (TP slide 61)
 */
function deleteRow() {

    // Étape 1 : vérifier si le tableau est vide (condition if, cours slide 42)
    if (lignes === 0) {
        alert("Le tableau est vide !");   // alert, méthode de window (BOM, cours slide 116)
        return;                            // return : on sort de la fonction (cours slide 45)
    }

    // Étape 2 : récupérer le tableau et la liste des checkbox cochées
    // querySelector / querySelectorAll avec un sélecteur CSS (cours slides 76-78)
    // ":checked" ne garde que les cases cochées, à l'intérieur de .col_chkbox
    const table = document.querySelector("#table_container table");
    const checked = table.querySelectorAll(".col_chkbox input:checked");

    // Étape 3 : vérifier si aucune checkbox n'est cochée
    if (checked.length === 0) {
        alert("Sélectionnez au moins une ligne !");
        return;
    }

    // Étape 4 : demander une confirmation ; confirm() est une méthode de window
    // comme alert() et prompt() (BOM, cours slide 116). Elle renvoie false si on clique sur "Annuler".
    // ! = opérateur logique NON (cours slide 41)
    if (!confirm("Voulez-vous supprimer " + checked.length + " ligne(s) ?")) {
        return;
    }

    // Étape 5 : récupérer toutes les lignes du tableau (les tr de classe "row", cours slides 76-78)
    const rows = table.querySelectorAll("tr.row");

    // Étape 6 : parcourir les lignes avec une boucle for (cours slide 44).
    // On parcourt À L'ENVERS (de la dernière à la première) : quand on supprime l'élément i
    // de persons, les indices des éléments suivants changent, mais pas ceux d'avant.
    // La ligne n°i du tableau HTML correspond à persons[i].
    for (let i = rows.length - 1; i >= 0; i--) {
        // checkbox de la ligne : querySelector (cours slides 76-78)
        const checkbox = rows[i].querySelector(".col_chkbox input");

        // Propriété checked : true si la case est cochée (accès direct à un attribut, cours slide 93)
        if (checkbox.checked) {
            // Récupérer les points dans la 4e cellule : propriété children (cours slide 89)
            // children[3] = 4e enfant (les indices commencent à 0, cours slide 38)
            const pts = parseInt(rows[i].children[3].innerText);

            total_points -= pts;   // soustraire de total_points (opérateur combiné, cours slide 41)
            lignes--;              // décrémenter lignes (cours slide 41)

            rows[i].remove();      // supprimer la ligne du DOM : remove() (cours slide 100)

            // Supprimer la même entrée dans persons : splice(indice, 1) retire 1 élément
            // à la position i (méthode des tableaux, voir les méthodes utiles cours slide 38)
            persons.splice(i, 1);
        }
    }

    // Renuméroter la colonne N° des lignes restantes (1, 2, 3...) pour éviter les doublons
    // forEach + fonction fléchée (cours slides 44 et 46)
    table.querySelectorAll("tr.row").forEach((row, index) => {
        row.children[0].innerText = index + 1;   // children (cours slide 89), innerText (cours slide 91)
    });

    saveData(); // fonctionnalité 1 : sauvegarder la nouvelle version de persons

    // Étape 7 : message de succès et mise à jour du résumé
    alert("Suppression effectuée !");
    update_summary();
}


// ======================= FONCTIONNALITÉS SUPPLÉMENTAIRES =======================

/*
 * FONCTIONNALITÉ 1 : sauvegarde automatique dans le navigateur (localStorage)
 * Problème constaté aux étapes 2 et 6 : après actualisation, les ajouts/suppressions sont perdus.
 * Solution : à chaque modification, on enregistre persons dans le localStorage
 * (API native Storage, cours slide 123). Au chargement, init() relit ces données.
 */
function saveData() {
    // JSON.stringify transforme le tableau d'objets en texte JSON (cours slide 40)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persons));
}


/*
 * FONCTIONNALITÉ 2 : modifier la personne de la ligne cochée (le "U" de CRUD = Update)
 * Une seule ligne doit être cochée ; on demande les nouvelles valeurs avec prompt().
 */
function editRow() {
    // Récupérer toutes les lignes (querySelectorAll, cours slides 76-78)
    const rows = document.querySelectorAll("#table_body tr.row");

    // Chercher l'indice de la ligne cochée et compter les lignes cochées (boucle for, cours slide 44)
    let index = -1;
    let nbChecked = 0;
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].querySelector(".col_chkbox input").checked) {
            index = i;
            nbChecked++;
        }
    }

    // Une et une seule ligne doit être sélectionnée (conditions if, cours slide 42)
    if (nbChecked !== 1) {
        alert("Cochez une seule ligne à modifier !");   // alert (cours slide 116)
        return;
    }

    const person = persons[index];   // accès par indice dans le tableau (cours slide 38)

    // prompt() affiche une boîte avec champ de saisie (BOM, cours slide 116).
    // Le 2e paramètre pré-remplit le champ avec la valeur actuelle.
    // prompt renvoie null si l'utilisateur clique sur "Annuler".
    const nom = prompt("Nouveau nom :", person.nom);
    if (nom === null) return;
    const prenom = prompt("Nouveau prénom :", person.prenom);
    if (prenom === null) return;
    const pointsText = prompt("Nouveaux points :", person.points);
    if (pointsText === null) return;
    const points = parseInt(pointsText);

    // Même contrôle de saisie qu'à l'étape 5 (if, opérateur ||, cours slides 41-42)
    if (nom.trim() === "" || prenom.trim() === "" || Number.isNaN(points)) {
        alert("Modification annulée : formulaire incomplet !");
        return;
    }

    // Mettre à jour le total : on retire les anciens points et on ajoute les nouveaux (cours slide 41)
    total_points = total_points - person.points + points;

    // Mettre à jour l'objet dans persons (modification des propriétés d'un objet, cours slide 39)
    person.nom = nom.trim();
    person.prenom = prenom.trim();
    person.points = points;

    // Mettre à jour les cellules de la ligne : children (cours slide 89) + innerText (cours slide 91)
    const cells = rows[index].children;
    cells[1].innerText = person.nom;
    cells[2].innerText = person.prenom;
    cells[3].innerText = person.points;

    // Décocher la case après modification (propriété checked, cours slide 93)
    cells[4].querySelector("input").checked = false;

    saveData();        // fonctionnalité 1
    update_summary();  // le total des points a pu changer
}


/*
 * FONCTIONNALITÉ 3 : recherche en direct
 * Appelée à chaque touche relâchée dans le champ de recherche (événement keyup, cours slide 139).
 * Les lignes dont le nom ou le prénom ne contient pas le texte saisi sont masquées.
 */
function filterRows() {
    // Texte recherché, en minuscules pour ignorer la casse (attribut value, cours slide 93)
    const search = document.getElementById("search_field").value.trim().toLowerCase();

    // Parcourir les lignes : forEach + fonction fléchée (cours slides 44 et 46)
    document.querySelectorAll("#table_body tr.row").forEach((row) => {
        const nom = row.children[1].innerText.toLowerCase();      // children (cours slide 89)
        const prenom = row.children[2].innerText.toLowerCase();

        // includes() : vrai si le texte contient la recherche (même idée que includes sur les tableaux, cours slide 38)
        if (nom.includes(search) || prenom.includes(search)) {
            row.style.display = "";       // afficher la ligne : propriété style (cours slide 95)
        } else {
            row.style.display = "none";   // masquer la ligne (cours slide 95)
        }
    });
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
