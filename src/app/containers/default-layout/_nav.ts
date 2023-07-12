import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Tableau de bord',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },

  {
    title: true,
    name: 'Configurations'
  },
  {
    name: 'Structures',
    url: '/theme/colors',
    iconComponent: { name: 'cil-drop' },
    children: [
      {
        name: 'Magasins',
        url: '/structures/magasins'
      },
      {
        name: 'Catégories',
        url: '/structures/categories'
      },
      {
        name: 'Marques',
        url: '/structures/marques',
      },
      {
        name: 'Articles',
        url: '/structures/articles'
      }
    ]
  },
  {
    name: 'Tiers',
    url: '/theme/colors',
    iconComponent: { name: 'cil-drop' },
    children: [
      {
        name: 'Clients',
        url: '/tiers/clients'
      },
      {
        name: 'Fournisseurs',
        url: '/tiers/fournisseurs'
      },
    ]
  },
  {
    name: 'Paramètres',
    url: '/theme/colors',
    iconComponent: { name: 'cil-drop' },
    children: [
      {
        name: 'Informations Société',
        url: '/parametres/informations-societe',
      },
      {
        name: 'Gestion Utilisateurs',
        url: '/parametres/gestion-utilisateurs'
      }
    ]
  },

  {
    title: true,
    name: 'Gestions'
  },
  {
    name: 'Gestion des Stocks',
    url: '/theme/colors',
    iconComponent: { name: 'cil-drop' },
    children: [
      {
        name: 'Entrées de Stocks',
        url: '/gestions-stocks/entrees',
      },
      {
        name: 'Sorties de Stocks',
        url: '/gestions-stocks/sorties',
      },
      {
        name: 'Mouvements de  Stocks',
        url: '/gestions-stocks/mouvements',
      },
      {
        name: 'Stock Disponible',
        url: '/gestions-stocks/sotock-disponible',
      },
      {
        name: 'Analyse du Stock',
        url: '/gestions-stocks/analyse-du-stock',
      },
    ]
  },
  {
    name: 'Gestion de la caisse',
    url: '/theme/colors',
    iconComponent: { name: 'cil-drop' },
    children: [
      {
        name: 'Commandes Clients',
        url: '/gestions-caisse/commandes-clients',
      },
      {
        name: 'Commandes Fournisseurs',
        url: '/gestions-caisse/commandes-fournisseurs',
      },
      {
        name: 'Livraisons Clients',
        url: '/gestions-caisse/livraisons-clients',
      },
      {
        name: 'Livraisons Fournisseurs',
        url: '/gestions-caisse/livraisons-fournisseurs',
      },
      {
        name: 'Ventes',
        url: '/gestions-caisse/ventes',
      },
      {
        name: 'Dépenses',
        url: '/gestions-caisse/depenses',
      },
    ]
  },

  {
    title: true,
    name: 'États'
  },
  {
    name: 'Exports',
    url: '/theme/colors',
    iconComponent: { name: 'cil-drop' },
    children: [
      {
        name: 'État Déclarations Clients',
        url: '/exports/declarations-clients',
      }
    ]
  },






  {
    name: 'Components',
    title: true
  },
  {
    name: 'Base',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Accordion',
        url: '/base/accordion'
      },
      {
        name: 'Breadcrumbs',
        url: '/base/breadcrumbs'
      },
      {
        name: 'Cards',
        url: '/base/cards'
      },
      {
        name: 'Carousel',
        url: '/base/carousel'
      },
      {
        name: 'Collapse',
        url: '/base/collapse'
      },
      {
        name: 'List Group',
        url: '/base/list-group'
      },
      {
        name: 'Navs & Tabs',
        url: '/base/navs'
      },
      {
        name: 'Pagination',
        url: '/base/pagination'
      },
      {
        name: 'Placeholder',
        url: '/base/placeholder'
      },
      {
        name: 'Popovers',
        url: '/base/popovers'
      },
      {
        name: 'Progress',
        url: '/base/progress'
      },
      {
        name: 'Spinners',
        url: '/base/spinners'
      },
      {
        name: 'Tables',
        url: '/base/tables'
      },
      {
        name: 'Tabs',
        url: '/base/tabs'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips'
      }
    ]
  },
  {
    name: 'Buttons',
    url: '/buttons',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons'
      },
      {
        name: 'Button groups',
        url: '/buttons/button-groups'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns'
      },
    ]
  },
  {
    name: 'Forms',
    url: '/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Form Control',
        url: '/forms/form-control'
      },
      {
        name: 'Select',
        url: '/forms/select'
      },
      {
        name: 'Checks & Radios',
        url: '/forms/checks-radios'
      },
      {
        name: 'Range',
        url: '/forms/range'
      },
      {
        name: 'Input Group',
        url: '/forms/input-group'
      },
      {
        name: 'Floating Labels',
        url: '/forms/floating-labels'
      },
      {
        name: 'Layout',
        url: '/forms/layout'
      },
      {
        name: 'Validation',
        url: '/forms/validation'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    iconComponent: { name: 'cil-chart-pie' }
  },
  {
    name: 'Icons',
    iconComponent: { name: 'cil-star' },
    url: '/icons',
    children: [
      {
        name: 'CoreUI Free',
        url: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'FREE'
        }
      },
      {
        name: 'CoreUI Flags',
        url: '/icons/flags'
      },
      {
        name: 'CoreUI Brands',
        url: '/icons/brands'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    iconComponent: { name: 'cil-bell' },
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts'
      },
      {
        name: 'Badges',
        url: '/notifications/badges'
      },
      {
        name: 'Modal',
        url: '/notifications/modal'
      },
      {
        name: 'Toast',
        url: '/notifications/toasts'
      }
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    iconComponent: { name: 'cil-calculator' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Extras'
  },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login'
      },
      {
        name: 'Register',
        url: '/register'
      },
      {
        name: 'Error 404',
        url: '/404'
      },
      {
        name: 'Error 500',
        url: '/500'
      }
    ]
  },
];
