export const RoleOptions = [
  {
    label: 'Administrator',
    subLabel:
      'Has full permissions to manage entire project in organization, can add/remove user to the organization',
    value: 'Administrator',
  },
  {
    label: 'Moderator',
    subLabel:
      'Has permissions to manage project that User must have a role in the project, can create project',
    value: 'Moderator',
  },
  {
    label: 'Reviewer',
    subLabel: 'Can view only project that User must have a role in the project',
    value: 'Reviewer',
  },
];
