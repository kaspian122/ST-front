export const PortalTypes = {
  CLOSE_CORRECT_DISCIPLINE: 'CORRECT_DISCIPLINE',
  CLOSE_INCORRECT_DISCIPLINE: 'INCORRECT_DISCIPLINE',
};

export const PortalTitles = {
  [PortalTypes.CLOSE_CORRECT_DISCIPLINE]: 'СОЗДАНИЕ ДИСЦИПЛИНЫ',
  [PortalTypes.CLOSE_INCORRECT_DISCIPLINE]: 'СОЗДАНИЕ ДИСЦИПЛИНЫ',
};

export const PortalText = {
  [PortalTypes.CLOSE_INCORRECT_DISCIPLINE]:
    'Вы уверены, что хотите выйти из раздела? Изменения не сохранятся.',
  [PortalTypes.CLOSE_CORRECT_DISCIPLINE]:
    'Вы уверены, что хотите выйти из раздела? Дисциплина будет добавлена.',
};
export const PortalAcept = {
  [PortalTypes.CLOSE_CORRECT_DISCIPLINE]: 'Сохранить',
  [PortalTypes.CLOSE_INCORRECT_DISCIPLINE]: 'Удалить',
};
