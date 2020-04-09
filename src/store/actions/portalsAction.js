const entity = 'PORTAL';

export const PortalActionTypes = {
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
const openPortal = (identifier, additionalProps) => ({
  type: PortalActionTypes.OPEN,
  payload: { type: identifier, additionalProps },
});

/**
 * Closes an existing modal by specified identifier
 * @param identifier {string}
 */
const closePortalById = () => ({
  type: PortalActionTypes.CLOSE,
});
const resetPortal = () => ({
  type: PortalActionTypes.RESET,
});

/**
 * Tries to close an existing modal.
 * If no modal exists, or it is presented by other identifier, the function will reset modal system and throw an error.
 * @param identifier {string}
 */
const closePortal = () => (dispatch, getState) => {
  const statePortal = getState().portal;

  dispatch(closePortalById());
};

const PortalActions = {
  openPortal,
  closePortal,
};

export default PortalActions;
