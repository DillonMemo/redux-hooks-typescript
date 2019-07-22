import { combineReducers/*여러 리듀서를 하나로 묶어줌*/ } from 'redux';
import { reducer as todo} from './todo';

const rootReducer = combineReducers({
    todo
});

export type AppState = ReturnType<typeof rootReducer>; 
export default rootReducer;   