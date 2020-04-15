export const PortalTypes = {
  CORRECT_DISCIPLINE: 'CORRECT_DISCIPLINE',
  INCORRECT_DISCIPLINE: 'INCORRECT_DISCIPLINE',
};

export const PortalTitles = {
  [PortalTypes.CORRECT_DISCIPLINE]: 'СОЗДАНИЕ ДИСЦИПЛИНЫ',
  [PortalTypes.INCORRECT_DISCIPLINE]: 'СОЗДАНИЕ ДИСЦИПЛИНЫ',
};

export const PortalText = {
  [PortalTypes.INCORRECT_DISCIPLINE]:
    'Вы уверены, что хотите выйти из раздела? Изменения не сохранятся.',
  [PortalTypes.CORRECT_DISCIPLINE]:
    'Вы уверены, что хотите выйти из раздела? Дисциплина будет добавлена.',
};
export const PortalAcept = {
  [PortalTypes.CORRECT_DISCIPLINE]: 'Сохранить',
  [PortalTypes.INCORRECT_DISCIPLINE]: 'Удалить',
};
