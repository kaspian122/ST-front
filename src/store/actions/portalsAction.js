const entity = 'PORTAL';

export const PortalActionTypes = {
  OPEN: `${entity}.OPEN`,
  CLOSE: `${entity}.CLOSE`,
  CANCEL: `${entity}.CANCEL`,
};

/**
 * Opens modal with specified identifier.
 * Example: ModalConstants[modalName]
 * @param identifier {string}
 */
const openPortal = identifier => ({
  type: PortalActionTypes.OPEN,
  payload: { type: identifier },
});

/**
 * Closes an existing modal by specified identifier
 * @param identifier {string}
 */
const cancelPortal = () => ({
  type: PortalActionTypes.CANCEL,
});

/**
 * Tries to close an existing modal.
 * If no modal exists, or it is presented by other identifier, the function will reset modal system and throw an error.
 * @param identifier {string}
 */
const closePortal = () => ({
  type: PortalActionTypes.CLOSE,
});

const PortalActions = {
  openPortal,
  cancelPortal,
};

export default PortalActions;
