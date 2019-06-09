import { Cmd, loop } from 'redux-loop';
import { fetchGenresSuccess } from '../actions/listActions';
import { FETCH_GENRES, FETCH_GENRES_SUCCESS } from '../constants/actionTypes';
import * as listService from '../services/listService';
import initialState from '../store/initialState';

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
