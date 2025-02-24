const ROUTES_NAME = {
  HOME: "/",
  PROPERTIES: "/properties",
  ABOUT: "/about",
  CONTACT: "/contact",
  LOGIN:'/login',
  POST_A_PROPERTY: '/post-property',
  POST_A_PROJECT: '/post-project',
  POST_PROPERTY: '/post_a_property',
  VIEW_PROPERTY: '/property/:id',
  VIEW_PROJECT: '/project/:id',
  VIEW_BROKER: '/broker/:id',

  ADMIN_LOGIN : '/admin/login',
  ADMIN_HOME : '/admin/dashboard',
  ADMIN_ALL_PROPERTIES: '/admin/properties/all',
  BROKER_ALL_PROPERTIES: '/admin/brokers/properties/all',
  USER_ALL_PROPERTIES: '/admin/users/properties/all',
  ADMIN_MANAGE_BROKERS: '/admin/brokers/manage',
  ADMIN_MANAGE_USERS: '/admin/users/manage',
  ADMIN_BROKERS_REQUESTS: '/admin/brokers/requests',
  ADMIN_ALL_PAYMENTS: '/admin/all/payments',
  ADMIN_MANAGE_SUBSCRIPTION : '/admin/subscription/manage',
  ADMIN_EDIT_SUBSCRIPTION : '/admin/subscription/edit',
  ADMIN_CHANGE_PASSWORD : '/admin/change-password',
  


  SALLER_HOME : '/saller/dashboard',
  SALLER_LOGIN : '/saller/login',
  SALLER_SIGNUP : '/saller/signup',
  SALLER_UPDATE_PROFILE : '/saller/update-profile',
  SALLER_CHANGE_PASSWORD : '/saller/change-password',
  SALLER_PROPERTY_ADD: '/saller/property/add',
  SALLER_MANAGE_QUERIES: '/saller/queries/manage',
  SALLER_ALLPROPERTIES: '/saller/properties',
};

export default ROUTES_NAME;
