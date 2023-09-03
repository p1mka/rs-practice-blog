import { ACTION_TYPE } from "../actions";

const initialUserState = {
	wasLogout: false,
};

export const appReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		default:
			return state;
	}
};
