import { allowedModalTypes, allowedPortalModalTypes } from '../../constants/modalConstants';

const entity = 'MODAL';

const ActionTypes = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
  RESET: 'RESET',
};

export const ModalActionTypes = {
  OPEN: `${entity}.OPEN`,
  CLOSE: `${entity}.CLOSE`,
  RESET: `${entity}.RESET`,
};

const getActionTypeById = (identifier, type) => {
  let mod;
  if (allowedModalTypes.includes(identifier)) mod = 'MODAL';
  if (allowedPortalModalTypes.includes(identifier)) mod = 'PORTAL';
  return `${mod}.${type}`;
};

/**
 * Opens modal with specified identifier.
 * Example: ModalConstants[modalName]
 * @param identifier {string}
 * @param additionalProps {object?}
 */
const openModal = (identifier, additionalProps) => ({
  type: getActionTypeById(identifier, ActionTypes.OPEN),
  payload: { type: identifier, props: additionalProps },
});

/**
 * Closes an existing modal by specified identifier
 * @param identifier {string}
 */
const closeModalById = identifier => ({
  type: getActionTypeById(identifier, ActionTypes.CLOSE),
});

const resetModal = identifier => ({
  type: getActionTypeById(identifier, ActionTypes.RESET),
});

/**
 * Tries to close an existing modal.
 * If no modal exists, or it is presented by other identifier, the function will reset modal system and throw an error.
 * @param identifier {string}
 */
const closeModal = identifier => (dispatch, getState) => {
  const stateModal = getState().modal;
  if (!stateModal) {
    dispatch(resetModal(identifier));
    console.warn('Modals nof found');
  }
  dispatch(closeModalById(identifier));
};

const ModalActions = {
  openModal,
  closeModal,
};

export default ModalActions;
