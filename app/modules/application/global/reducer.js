import Immutable from 'immutable';

const initialState = new Immutable.fromJS({
    test: 1
});

export default function reducer(state = initialState, action) {
    return state;
}
