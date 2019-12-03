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
 */
const openModal = identifier => ({
  type: ModalActionTypes.OPEN,
  payload: identifier,
});

/**
 * Closes an existing modal by specified identifier
 * @param identifier {string}
 */
const closeModalById = identifier => ({
  type: ModalActionTypes.CLOSE,
  payload: identifier,
});

const resetModal = () => ({
  type: ModalActionTypes.RESET,
});

/**
 * Tries to close an existing modal.
 * If no modal exists, or it is presented by other identifier, the function will reset modal system and throw an error.
 * @param identifier {string}
 */
const closeModal = identifier => (dispatch, getState) => {
  const stateModal = getState().modal;
  if (!stateModal || stateModal !== identifier) {
    dispatch(resetModal());
    throw new Error(
      `Attempt to close modal with id "${identifier}", which does not exist. The modal system has been reset.`
    );
  }
  dispatch(closeModalById(identifier));
};

const ModalActions = {
  openModal,
  closeModal,
};

export default ModalActions;
