export const statePropsEnum = {
    playerHp : "playerHp",
    maxPlayerHp : "maxPlayerHp",
    coins : "coins",
    playerInBossFight : "playerInBossFight",
    isBossDefeated : "isBossDefeated",
  }
  
 
  function initStateManager() {
    const state = {
      playerHp: 3,
      maxPlayerHp: 3,
      coins: 0,
      playerInBossFight: false,
      isBossDefeated: false,
    };
  
    return {
      construct(){
        state.playerHp = 3;
        state.maxPlayerHp = 3;
        state.coins = 0;
        state.playerInBossFight = false;
        state.isBossDefeated = false;
      },
      current() {
        return { ...state };
      },
      set(property, value){
        state[property] = value;
      },
    };
  }
  
  export const state = initStateManager();
  