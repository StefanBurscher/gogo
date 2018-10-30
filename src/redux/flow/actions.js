import {
    FLOW_SET_SOCIAL_NETWORK
} from 'Constants/actionTypes';

export const setCurrentSocialNetwork = (socialNetwork) => {
    return (
        {
            type: FLOW_SET_SOCIAL_NETWORK,
            payload: { socialNetwork }
        }
    )
}