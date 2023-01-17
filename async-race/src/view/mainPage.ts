export const mainPageHTML = `
<section class="main__game-block game-block">
  <section class="game-block__create-car create-car">
    <form action="" method="post">
    <input type="text" class="create-car__car-name"> 
    <input type="color" class="create-car__car-color">
    <button type="submit" class="create-car__car-submit">Create</button>
    </form>
  </section>
  <div class="game-block__update-car update-car">
    <form action="" method="post">
    <input type="text" class="create-car__car-name"> 
    <input type="color" class="create-car__car-color">
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
  <button class="garage__button button">Prev</button>
  <button class="garage__button button">Next</button>
</section>
`