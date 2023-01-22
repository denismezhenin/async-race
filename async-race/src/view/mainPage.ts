// import { UTILS } from '../components/constants';

export const mainPageHTML = `
<section class="main__game-block game-block">
  <section class="game-block__create-car create-car">
    <form class="create-car__form">
    <input type="text" class="create-car__car-name" name="name" id="name" required> 
    <input type="color" class="create-car__car-color" name="color" id="color">
    <button type="submit" class="create-car__car-submit">Create</button>
    </form>
  </section>
  <div class="game-block__update-car update-car" >
    <form class="update-car__form">
    <input type="text" class="update-car__car-name" name="name" id="name" required disabled> 
    <input type="color" class="update-car__car-color" name="color" id="color" required disabled>
    <button type="submit" class="create-car__car-submit">Update</button>
    </form>
  </div>
  <div class="game-block__game-controls game-controls">
  <button class="game-controls__race button">Race</button>
  <button class="game-controls__reset button">Reset</button>
  <button class="game-controls__generate button">Generate cars</button>
  </div>
</section>
<section class="main__garage garage">
  <p class="garage__title"> Garage (
    <span class="garage__title-cars-count"></span>
    )
  </p>
  <span class="garage__page-number">Page #</span>
  <ul class="garage__car-list car-list"></ul>
  <button class="garage__button button prev">Prev</button>
  <button class="garage__button button next">Next</button>
</section>
`;
