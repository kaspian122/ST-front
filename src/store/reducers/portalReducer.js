const defaultState = null;

const PortalModalTypes = {
  OPEN: 'PORTAL.OPEN',
  CLOSE: 'PORTAL.CLOSE',
  RESET: 'PORTAL.RESET',
};

export default function portalReducer(state = defaultState, action) {
  switch (action.type) {
    case PortalModalTypes.OPEN:
      return action.payload;
    case PortalModalTypes.CLOSE:
    case PortalModalTypes.RESET:
      return defaultState;
    default:
      return state;
  }
}
