// import { Cmd, getCmd, getModel, loop } from 'redux-loop'
import * as types from '../../../shared/constants/actionTypes';
import draftsReducer from './draftsReducer';

const mockDraftsStore = {
  testDraft: {
    id: 'testDraft',
    mainStory: {
      firstPart: 'part1',
      storyParts: {
        part1: {
          plot: {
            blocks: [],
            entityMap: {},
          },
          prompt: {
            text:
              'Do you go through the door, or keep going and try to find another way out!?',
            choices: [
              {
                text: 'Open the Door!',
                nextBranch: 'otherPart',
              },
            ],
          },
        },
        otherPart: {
          plot: {
            blocks: [],
            entityMap: {},
          },
          prompt: {
            text:
              'Do you go through the door, or keep going and try to find another way out!?',
            choices: [
              {
                text: 'Open the Door!',
                nextBranch: 'part1',
              },
            ],
          },
        },
        walkInRoom: {
          plot: {
            blocks: [],
            entityMap: {},
          },
        },
      },
    },
  },
};

describe('drafts reducer', () => {
  it('should handle SELECT_STORY_PART_NEXT_BRANCH_ID', () => {
    const storyPartId = 'part1';
    const nextBranchId = 'part2';
    const draftId = 'testDraft';
    const expectedStoryPart = {
      ...mockDraftsStore[draftId].mainStory.storyParts[storyPartId],
      nextBranchId,
    };
    const [updatedDrafts, cmd] = draftsReducer(mockDraftsStore, {
      type: types.SELECT_STORY_PART_NEXT_BRANCH_ID,
      storyPartId,
      draftId,
      nextBranchId,
    });

    expect(updatedDrafts[draftId].mainStory.storyParts[storyPartId]).toEqual(
      expectedStoryPart
    );
  });

  it('should handle CHANGE_STORY_PART_KEY', () => {
    const oldKey = 'part1';
    const newKey = 'newPartKey';
    const draftId = 'testDraft';
    const [updatedDrafts, cmd] = draftsReducer(mockDraftsStore, {
      type: types.CHANGE_STORY_PART_KEY,
      oldKey,
      newKey,
      draftId,
    });
    expect(updatedDrafts[oldKey]).toEqual(undefined);
    expect(updatedDrafts[newKey]).toEqual(mockDraftsStore[oldKey]);
  });

  it('should handle CHANGE_STORY_PART_KEY and update any references to the old story part ID with the new story part ID', () => {
    const oldKey = 'part1';
    const newKey = 'newPartKey';
    const draftId = 'testDraft';
    const otherStoryPartId = 'otherPart';
    const expectedUpdatedStoryPart = {
      ...mockDraftsStore[draftId].mainStory.storyParts[otherStoryPartId],
      prompt: {
        text:
          'Do you go through the door, or keep going and try to find another way out!?',
        choices: [
          {
            text: 'Open the Door!',
            nextBranch: newKey,
          },
        ],
      },
    };
    const [updatedDrafts, cmd] = draftsReducer(mockDraftsStore, {
      type: types.CHANGE_STORY_PART_KEY,
      oldKey,
      newKey,
      draftId,
    });
    expect(
      updatedDrafts[draftId].mainStory.storyParts[otherStoryPartId]
    ).toEqual(expectedUpdatedStoryPart);
  });

  it('should handle ADD_STORY_PART', () => {
    const key = 'testStoryPart';
    const draftId = 'testDraft';
    const [updatedDrafts, cmd] = draftsReducer(mockDraftsStore, {
      type: types.ADD_STORY_PART,
      key,
      draftId,
    });

    expect(
      updatedDrafts[draftId].mainStory.storyParts[key] &&
        !!updatedDrafts[draftId].mainStory.storyParts[key]
    ).toEqual(true);
  });

  it('should handle ADD_USER_CHOICE', () => {
    const choiceText = 'Open door';
    const choiceBranchId = 'otherPart';
    const storyPartId = 'walkInRoom';
    const draftId = 'testDraft';
    const expectedStoryPart = {
      ...mockDraftsStore[draftId].mainStory.storyParts[storyPartId],
      prompt: {
        text: '',
        choices: [
          {
            text: choiceText,
            nextBranch: choiceBranchId,
          },
        ],
      },
    };

    const [updatedDrafts, cmd] = draftsReducer(mockDraftsStore, {
      type: types.ADD_USER_CHOICE,
      choiceText,
      choiceBranchId,
      storyPartId,
      draftId,
    });

    expect(updatedDrafts[draftId].mainStory.storyParts[storyPartId]).toEqual(
      expectedStoryPart
    );
  });
});
