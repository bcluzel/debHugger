export const url = 'http://localhost:3030'
// export const url = 'https://api.ucoli.com'

const relations = {
  posts: {
    authors: {
      type: 'users',
      label: 'Auteurs',
      shared: 'posts'
    },
    events: {
      type: 'events',
      label: 'Événements',
      shared: 'posts'
    },
    assos: {
      type: 'assos',
      label: `Associations`,
      shared: 'posts'
    },
    extra: {
      type: 'schools',
      label: `Écoles supplémentaires`,
      shared: 'posts'
    }
  },
  assos: {
    followers: {
      type: 'users',
      label: 'Suiveurs',
      shared: 'following'
    },
    members: {
      type: 'users',
      label: `Membres`,
      shared: 'integrated'
    },
    managers: {
      type: 'users',
      label: 'Responsables',
      shared: 'managed'
    },
    posts: {
      type: 'posts',
      label: 'Publications',
      shared: 'assos'
    }
  },
  users: {
    following: {
      type: 'assos',
      label: 'Assos suivies',
      shared: 'followers'
    },
    integrated: {
      type: 'assos',
      label: 'Assos intégrées',
      shared: 'members'
    },
    managed: {
      type: 'assos',
      label: 'Assos gérées',
      shared: 'managers'
    },
    posts: {
      type: 'posts',
      label: 'Publications',
      shared: 'authors'
    },
    schools: {
      type: 'schools',
      label: 'Écoles intégrées',
      shared: 'users'
    },
    administered: {
      type: 'schools',
      label: 'Écoles administrées',
      shared: 'admins'
    }
  },
  events: {
    posts: {
      type: 'posts',
      label: 'Publications',
      shared: 'events'
    }
  },
  schools: {
    users: {
      type: 'users',
      label: 'Étudiants',
      shared: 'schools'
    },
    admins: {
      type: 'users',
      label: 'Administrateurs',
      shared: 'administered'
    }
  }
}

const entities = {
  posts: {
    title: {
      id: true,
      type: 'string',
      label: 'Titre de la publication'
    },
    date: {
      type: 'date',
      label: 'Date de publication'
    },
    time: {
      type: 'time',
      label: 'Heure de publication'
    },
    content: {
      type: 'rich',
      label: 'Contenu'
    }
  },
  assos: {
    img: {
      type: 'img',
      label: 'Logo'
    },
    name: {
      type: 'string',
      label: 'Nom',
      id: true
    },
    description: {
      type: 'rich',
      label: 'Description'
    }
  },
  users: {
    email: {
      type: 'email',
      label: 'Email',
      id: true
    }
  },
  events: {
    title: {
      id: true,
      type: 'string',
      label: `Titre de l'événement`
    },
    dateStart: {
      type: 'date',
      label: 'Date de début'
    },
    timeStart: {
      type: 'time',
      label: 'Heure de début'
    },
    dateEnd: {
      type: 'date',
      label: 'Date de fin'
    },
    timeEnd: {
      type: 'time',
      label: 'Heure de fin'
    },
    description: {
      type: 'textarea',
      label: 'Contenu'
    }
  },
  schools: {
    logo: {
      type: 'img',
      label: `Logo de l'école`
    },
    name: {
      id: true,
      type: 'string',
      label: `Nom de l'école`
    },
    description: {
      type: 'textarea',
      label: `Présentation de l'école`
    }
  }
}

/*
const roles = {
  visitor: [null, 'schools', null, null],
  user: ['~follower~author', 'assos,posts,events,self', null, '~follower'],
  member: ['posts,events', 'member,follower,author', 'assos,posts,events', 'posts,events'],
  manager: ['member,manager', 'manager', null, 'member,manager'],
  admin: ['a  ssos,users', 'admin,users', 'schools', 'assos,users'],
  owner: ['schools,admins', null, 'manager,follower,member,admin,author,user', 'admin,schools,~author']
}


Object.keys(roles).slice(1).forEach((role, i) => {
  roles[role] = roles[role].map((permissions, j) => (
    permissions
      ? `${permissions},${roles[Object.keys(roles)[i]][j]}`
      : permissions || roles[Object.keys(roles)[i]][j]
  ))
})
*/

const permissions = {
  assos: {
    C: '$ administered',
    R: '$ schools',
    U: '$ managed, $ administered',
    D: '$ administered'
  },
  users: {
    C: '$ administered',
    R: '$, $ administered',
    U: '$',
    D: '$, $ administered'
  },
  posts: {
    C: '$ integrated',
    R: '$ schools',
    U: '$ posts',
    D: '$ posts'
  },
  events: {
    C: '$ integrated',
    R: '$ schools',
    U: '$ integrated',
    D: '$ integrated'
  },
  schools: {
    C: false,
    R: true,
    U: '$ administered',
    D: false
  },
  '_posts-events': {
    C: '$ integrated',
    R: '$ schools',
    D: '$ integrated'
  },
  '_assos-posts': {
    C: '~posts',
    R: '$ schools',
    D: '~posts'
  },
  '_assos-events': {
    C: '~events',
    R: '$ schools',
    D: '~events'
  },
  '_posts-extra': {
    C: '$ posts',
    R: '$ schools',
    D: '$ posts'
  },
  '_schools-admins': {
    C: false,
    R: '$ administered',
    D: false
  },
  '_schools-users': {
    C: '~users',
    R: '$ schools',
    D: '~users'
  },
  '_posts-authors': {
    C: '~posts',
    R: '$ schools',
    D: '~posts'
  },
  '_assos-members': {
    C: '$ managed',
    R: '$ integrated',
    D: '$ managed'
  },
  '_assos-followers': {
    C: false,
    R: '$ managed',
    D: false
  },
  '_assos-managers': {
    C: '$ managed',
    R: '$ managed, $ administered',
    D: '$ managed'
  }
}

export default {
  entities,
  relations,
  permissions
}
