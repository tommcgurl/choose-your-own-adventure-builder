import { Cmd, loop } from 'redux-loop';
import initialState from '../../../editor/store/initialState';
import listService from '../../services/listService';
import { fetchGenresSuccess, types } from '../actions/listActions';

export default function listReducer(lists = initialState.lists, action) {
  switch (action.type) {
    case types.FETCH_GENRES:
      return loop(
        lists,
        Cmd.run(listService.fetchGenres, {
          successActionCreator: fetchGenresSuccess,
        })
      );
    case types.FETCH_GENRES_SUCCESS:
      return { ...lists, genres: action.genres };
    default:
      return lists;
  }
}
