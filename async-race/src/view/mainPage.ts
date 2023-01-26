// import { UTILS } from '../components/constants';

export const mainPageHTML = `
<section class="main__game-block game-block">
  <section class="main__game-controls">
  <div class="game-block__create-car create-car">
    <form class="create-car__form">
    <input type="text" class="create-car__car-name" name="name" id="name" required> 
    <input type="color" class="create-car__car-color" name="color" id="color" required>
    <button type="submit" class="create-car__car-submit">Create</button>
    </form>
  </div>
  <div class="game-block__update-car update-car" >
    <form class="update-car__form">
    <input type="text" class="update-car__car-name" name="name" id="name" required disabled> 
    <input type="color" class="update-car__car-color" name="color" id="color" required disabled>
    <button type="submit" class="create-car__car-update">Update</button>
    </form>
  </div>
   <div class="game-block__game-controls game-controls">
    <button class="game-controls__race button">Race</button>
    <button class="game-controls__reset button">Reset</button>
    <button class="game-controls__generate button">Generate cars</button>
  </div>
  </section>
  <p class="garage__title"> Garage (<span class="garage__title-cars-count"></span>)</p>
  <span class="garage__page-number">Page #</span>
<section class="main__garage garage">
  <ul class="garage__car-list car-list"></ul>
  </section>
  <section class="main__winners" style="display: none;">
  <div class="main__winners__header">
  <span class="winners-list__header-index">№</span>
  <span class="winners-list__header-image">Car image</span>
  <span class="winners-list__header-name">Name</span>
  <span class="winners-list__header-wins wins desс">Wins</span>
  <span class="winners-list__header-time time desс">Best time</span>
  </div>
  <ul class="winners-list"></ul>
  </section>
  <button class="garage__button button prev">Prev</button>
  <button class="garage__button button next">Next</button>
  <div class="show-modal"></div>
`;
