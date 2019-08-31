// import { Cmd, getCmd, getModel, loop } from 'redux-loop'
import { types } from '../actions';
import draftsReducer from './draftsReducer';

jest.mock('../../services/draftService', () => ({
  getDrafts: async () => [],
  getPublishedAdventures: async () => [],
  saveAdventure: async value => value,
  deleteDraft: async () => {},
  validateDraftReadyToPublish: () => {},
}));

const draftId = 'testDraft';

const mockDraftsStore = {
  [draftId]: {
    id: draftId,
    mainStory: {
      firstPart: 'part1',
      storyParts: {
        part1: {
          name: 'part1',
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
          name: 'otherPart',
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
          name: 'walkInRoom',
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
  it('should handle CHANGE_STORY_PART_NAME', () => {
    const storyPartKey = 'part1';
    const name = 'newPartKey';
    const draftId = 'testDraft';

    const [updatedDrafts, cmd] = draftsReducer(mockDraftsStore, {
      type: types.CHANGE_STORY_PART_NAME,
      name,
      storyPartKey,
      draftId,
    });

    expect(updatedDrafts[draftId].mainStory.storyParts[storyPartKey].name).toBe(
      name
    );
  });

  it('should handle ADD_STORY_PART', () => {
    const name = 'testStoryPart';
    const draftId = 'testDraft';
    const [updatedDrafts, cmd] = draftsReducer(mockDraftsStore, {
      type: types.ADD_STORY_PART,
      name,
      draftId,
    });

    expect(
      Object.values(updatedDrafts[draftId].mainStory.storyParts).find(
        part => part.name === name
      )
    ).toBeTruthy();
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
