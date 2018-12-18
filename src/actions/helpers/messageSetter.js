import { messages } from './tutorialMessages';
export const messageSetter = (state) => {
  if (state.currentUser.inventory.wheat >= 5 && state.currentUser.seenMessage < 1) {
    return {
      tutorialOn: true,
      message: messages[1],
      currentUser: {
        ...state.currentUser,
        seenMessage: 1,
      }
    }
  }
  else if (state.currentUser.inventory.eggs >= 5 && state.currentUser.seenMessage < 2) {
    return {
      tutorialOn: true,
      message: messages[2],
      currentUser: {
        ...state.currentUser,
        seenMessage: 2,
      }
    }
  } else if (state.currentUser.crops[0].count > 1 && state.currentUser.seenMessage < 3) {
    return {
      tutorialOn: true,
      message: messages[3],
      currentUser: {
        ...state.currentUser,
        seenMessage: 3,
        cash: state.currentUser.cash + 20,
        careerCash: state.currentUser.careerCash + 20,
      }
    }
  } else if (state.currentUser.cash >= 30 && state.currentUser.seenMessage < 4) {
    return {
      tutorialOn: true,
      message: messages[4],
      currentUser: {
        ...state.currentUser,
        seenMessage: 4,
      }
    }
  } else if ((state.currentUser.crops[0].manager || state.currentUser.animals[0].manager) && state.currentUser.seenMessage < 5) {
    return {
      tutorialOn: true,
      message: messages[5],
      currentUser: {
        ...state.currentUser,
        seenMessage: 5,
      }
    }
  } else if (state.currentUser.seenMessage === 5) {
    return {
      currentUser: {
        ...state.currentUser,
        seenMessage: 6,
      }
    }
  } else if (state.currentUser.seenMessage > 5) {
    return;
  }

}