import {
	FLOW_SET_SOCIAL_NETWORK
} from 'Constants/actionTypes';

const INIT_STATE = {
	socialNetwork: ""
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {

		case FLOW_SET_SOCIAL_NETWORK:
			return Object.assign({}, state, {
				socialNetwork: action.payload.socialNetwork
			})

		default: return { ...state };
	}
}
