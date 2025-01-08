export const projectsBoardHeaders = {
    list: [
        'Nom du projet', 'Domaine', 'IV', 'IV', 
        'Statut', 'Page positionée', 'Catégorie', `Date d'ajout`, 
        
    ],
    admin_options: ['Voir', 'Modifier', 'Supprimer'],
    client_options: ['Voir']
}


export const domainUrlsHeaders = {
    urls_list: [
        'Url', 'Type de page', 'IV', 'Code Statut', 'Indexée',
        'PR', 'BL', 'Mots positionnés', 'GG Hits', 'Impressions', 
        'Clics', 'Position Moyenne'
    ],
    url_details: {
        url_concurrent: ['Url', 'Mot clé concurrent 1', 'VI concurrent 1'],
        mot_cle: ['Vol', 'Kgr', 'All in title', 'Impression', 'Clics', 'Position'],
        note: ['Nom', 'Type', 'Date']
    }
}

export const authForm = {
    title: 'Se Connecter',
    input: [
        {label: 'Email', name: 'email', type: 'email'},
        {label: 'Mot de passe', name: 'password', type: 'password'},
    ],
    btn: 'Connexion'
}

export const passwordForm = {
    title: 'Changement de mot de passe',
    input: [
        {label: 'Nouveau mot de passe', name: 'password', type: 'password'},
    ],
    btn: 'Valider'
}

export const newProjectForm = {
    title: 'Nouveau projet',
    input: [
        {label: 'Nom du projet', name: 'project_name', type: 'text'},
        {label: 'Identifiant', name: 'id', type: 'text'},
        {label: 'Domaine', name: 'domain', type: 'text'},
        {label: 'Statut', name: 'status', type: 'text'},
        {label: 'Catégorie', name: 'category', type: 'text'}
    ],
    btn: 'Ajouter'
}

export const modifyProjectForm = {
    title: 'Modifier un projet',
    input: [
        {label: 'Nom du projet', name: 'project_name', type: 'text'},
        {label: 'Domaine', name: 'domain', type: 'text'},
        {label: 'Statut', name: 'status', type: 'text'},
        {label: 'Catégorie', name: 'category', type: 'text'}
    ],
    btn: 'Modifier'
}

export const dates = [ 
    '7 jours avant', 
    '28 jours avant', 
    '56 jours avant',
    '84 jours avant'
]