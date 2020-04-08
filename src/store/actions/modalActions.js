const entity = 'MODAL';

export const ModalActionTypes = {
  OPEN: `${entity}.OPEN`,
  CLOSE: `${entity}.CLOSE`,
  RESET: `${entity}.RESET`,
};

/**
 * Opens modal with specified identifier.
 * Example: ModalConstants[modalName]
 * @param identifier {string}
 * @param additionalProps {object?}
 */
const openModal = (identifier, additionalProps) => ({
  type: ModalActionTypes.OPEN,
  payload: { type: identifier, props: additionalProps },
});

/**
 * Closes an existing modal by specified identifier
 * @param identifier {string}
 */
const closeModalById = () => ({
  type: ModalActionTypes.CLOSE,
});

const resetModal = () => ({
  type: ModalActionTypes.RESET,
});

/**
 * Tries to close an existing modal.
 * If no modal exists, or it is presented by other identifier, the function will reset modal system and throw an error.
 * @param identifier {string}
 */
const closeModal = () => (dispatch, getState) => {
  const stateModal = getState().modal;
  if (!stateModal) {
    dispatch(resetModal());
    console.warn('Modals nof found');
  }
  dispatch(closeModalById());
};

const ModalActions = {
  openModal,
  closeModal,
};

export default ModalActions;
