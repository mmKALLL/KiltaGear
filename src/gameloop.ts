import * as kiltagear from './kiltagear'
import { render } from './render'
import { Player, ActiveAttack, InputStatus } from './types';

// As a developer, I want this file to be indented with 2 spaces. -- Esa

const FRAMES_PER_SECOND = 60

export type GameState = (TitleScreenState | CharacterSelectionState | InGameState)

export type CharacterSelectionState = {
  screen: 'character-select'
}

export type TitleScreenState = {
  screen: 'title-screen'
}

export type InGameState = {
  screen: 'in-game'
  players: Player[],
  activeAttacks: ActiveAttack[],
}

let currentState: GameState = {
  screen: 'title-screen',
}

export const startGameLoop = () => {
  const interval = window.setInterval(() => {
    currentState = nextState(currentState, kiltagear.keys)
    render(currentState)
  }, 1000 / FRAMES_PER_SECOND)
}

// Functional loop: return next state from current state and inputs
const nextState = (currentState: GameState, inputs: InputStatus): GameState => {
  // console.log('advance frame:\n  currentState:', currentState, '\n  inputs: ', inputs)

  switch (currentState.screen) {
    case 'in-game':
      // TODO
      if (inputs[' '] && inputs[' '].isDown) {
        return {
          ...currentState,
          screen: 'title-screen',
        }
      }
      break
    case 'character-select':
      if (inputs[' '] && inputs[' '].isDown) {
        return {
          ...currentState,
          screen: 'in-game',
          players: kiltagear.players,
          activeAttacks: []
        }
      }
      break
    case 'title-screen':
      if (inputs[' '] && inputs[' '].isDown) {
        return {
          ...currentState,
          screen: 'character-select',
        }
      }
      break
    default:
      throw new Error(`unknown game state when pressing key\n  state: ${currentState}\n  key event: ${event}`)
  }
  return currentState
}
