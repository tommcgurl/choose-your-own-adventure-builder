import { Cmd, loop } from 'redux-loop';
import listService from '../../services/listService';
import {
  fetchGenresSuccess,
  FETCH_GENRES,
  FETCH_GENRES_SUCCESS,
} from '../actions/listActions';
import initialState from '../initialState';

export default function listReducer(lists = initialState.lists, action) {
  switch (action.type) {
    case FETCH_GENRES:
      return loop(
        lists,
        Cmd.run(listService.fetchGenres, {
          successActionCreator: fetchGenresSuccess,
        })
      );
    case FETCH_GENRES_SUCCESS:
      return { ...lists, genres: action.genres };
    default:
      return lists;
  }
}
