const acl = {
  user: {
    create: false,
    edit: false,
    delete: false,
  },
  admin: {
    create: true,
    edit: true,
    delete: true,
  },
  system: {
    create: true,
    edit: true,
    delete: true,
  },
};

const getAccess = role => acl[role];

export default getAccess;
