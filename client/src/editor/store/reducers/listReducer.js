import { Cmd, loop } from 'redux-loop';
import * as types from '../../../shared/constants/actionTypes';
import listService from '../../services/listService';
import { fetchGenresSuccess } from '../actions/listActions';
import initialState from '../initialState';

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
