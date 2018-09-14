<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="css/normalize.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
  <title>Кексобукинг</title>
</head>
<body>

  <main>
    <div class="promo">
      <h1 class="promo__title visually-hidden">Keksobooking. Кексы по соседству</h1>
      <img src="img/keksobooking.svg" alt="Keksobooking. Кексы по соседству" width="215" height="45">
    </div>

    <!-- Карта объявлений -->
    <section class="map map--faded">

      <!-- Метки объявлений -->
      <div class="map__pins">
        <div class="map__overlay">
          <h2 class="map__title">И снова Токио!</h2>
        </div>
        <button class="map__pin map__pin--main" style="left: 570px; top: 375px;">
          <img src="img/muffin-red.svg" width="40" height="44" draggable="false" alt="Метка объявления">
          <svg viewBox="0 0 70 70" width="156" height="156" aria-label="Метка для поиска жилья">
            <defs>
              <path d="M35,35m-23,0a23,23 0 1,1 46,0a23,23 0 1,1 -46,0" id="tophalf" />
            </defs>
            <ellipse cx="35" cy="35" rx="35" ry="35" fill="rgba(255, 86, 53, 0.7)" />
            <text><textPath xlink:href="#tophalf" startOffset="0">Поставь меня куда-нибудь</textPath></text>
          </svg>
        </button>
      </div>

      <!-- Фильтрация объявлений -->
      <div class="map__filters-container">
        <form action="#" class="map__filters" autocomplete="off">
          <select name="housing-type" id="housing-type" class="map__filter">
            <option value="any" selected>Любой тип жилья</option>
            <option value="palace">Дворец</option>
            <option value="flat">Квартира</option>
            <option value="house">Дом</option>
            <option value="bungalo">Бунгало</option>
          </select>
          <select name="housing-price" id="housing-price" class="map__filter">
            <option value="any" selected>Любая</option>
            <option value="middle">10000 - 50000&#x20bd;</option>
            <option value="low">до 10000&#x20bd;</option>
            <option value="high">от 50000&#x20bd;</option>
          </select>
          <select name="housing-rooms" id="housing-rooms" class="map__filter">
            <option value="any" selected>Любое число комнат</option>
            <option value="1">Одна комната</option>
            <option value="2">Две комнаты</option>
            <option value="3">Три комнаты</option>
          </select>
          <select name="housing-guests" id="housing-guests" class="map__filter">
            <option value="any" selected>Любое число гостей</option>
            <option value="2">Два гостя</option>
            <option value="1">Один гость</option>
            <option value="0">Не для гостей</option>
          </select>
          <fieldset id="housing-features" class="map__features">
            <input type="checkbox" name="features" value="wifi" id="filter-wifi" class="map__checkbox visually-hidden">
            <label class="map__feature map__feature--wifi" for="filter-wifi">Wi-Fi</label>
            <input type="checkbox" name="features" value="dishwasher" id="filter-dishwasher" class="map__checkbox visually-hidden">
            <label class="map__feature map__feature--dishwasher" for="filter-dishwasher">Посудомоечная машина</label>
            <input type="checkbox" name="features" value="parking" id="filter-parking" class="map__checkbox visually-hidden">
            <label class="map__feature map__feature--parking" for="filter-parking">Парковка</label>
            <input type="checkbox" name="features" value="washer" id="filter-washer" class="map__checkbox visually-hidden">
            <label class="map__feature map__feature--washer" for="filter-washer">Стиральная машина</label>
            <input type="checkbox" name="features" value="elevator" id="filter-elevator" class="map__checkbox visually-hidden">
            <label class="map__feature map__feature--elevator" for="filter-elevator">Лифт</label>
            <input type="checkbox" name="features" value="conditioner" id="filter-conditioner" class="map__checkbox visually-hidden">
            <label class="map__feature map__feature--conditioner" for="filter-conditioner">Кондиционер</label>
           </fieldset>
        </form>
      </div>
    </section>

    <!-- Форма объявления -->
    <section class="notice">
      <h2 class="notice__title">Ваше объявление</h2>
      <form class="ad-form ad-form--disabled" method="post" enctype="multipart/form-data" autocomplete="off">
        <fieldset class="ad-form-header">
          <legend class="ad-form-header__title">Ваша фотография (для карты)</legend>
          <div class="ad-form-header__upload">
            <div class="ad-form-header__preview">
              <img src="img/muffin-grey.svg" alt="Аватар пользователя" width="40" height="44">
            </div>
            <div class="ad-form__field">
              <input type="file" id="avatar" name="avatar" class="ad-form-header__input visually-hidden">
              <label class="ad-form-header__drop-zone" for="avatar">Загрузите или&nbsp;перетащите сюда фото</label>
            </div>
            <p class="ad-form-header__info">Заполните все обязательные поля, назначьте цену, загрузите фотографии. Придумайте интересное описание. Оно сделает объявление более живым и привлекательным. Получившееся объявление должно давать гостям полное представление о вашем жилье.</p>
          </div>
        </fieldset>
        <fieldset class="ad-form__element ad-form__element--wide">
          <label class="ad-form__label" for="title">Заголовок объявления</label>
          <input id="title" name="title" type="text" placeholder="Милая, уютная квартирка в центре Токио">
        </fieldset>
        <fieldset class="ad-form__element ad-form__element--wide">
          <label class="ad-form__label" for="address">Адрес</label>
          <input id="address" name="address" type="text">
        </fieldset>
        <fieldset class="ad-form__element">
          <label class="ad-form__label" for="type">Тип жилья</label>
          <select id="type" name="type">
            <option value="bungalo">Бунгало</option>
            <option value="flat" selected>Квартира</option>
            <option value="house">Дом</option>
            <option value="palace">Дворец</option>
          </select>
        </fieldset>
        <fieldset class="ad-form__element">
          <label class="ad-form__label" for="price">Цена за ночь, руб.</label>
          <input id="price" name="price" type="number" placeholder="5000">
        </fieldset>
        <fieldset class="ad-form__element ad-form__element--time">
          <label class="ad-form__label" for="timein">Время заезда и выезда</label>
          <select id="timein" name="timein">
            <option value="12:00" selected>После 12</option>
            <option value="13:00">После 13</option>
            <option value="14:00">После 14</option>
          </select>
          <select id="timeout" name="timeout" title="Time to go out">
            <option value="12:00" selected>Выезд до 12</option>
            <option value="13:00">Выезд до 13</option>
            <option value="14:00">Выезд до 14</option>
          </select>
        </fieldset>
        <fieldset class="ad-form__element">
          <label class="ad-form__label" for="room_number">Кол-во комнат</label>
          <select id="room_number" name="rooms">
            <option value="1" selected>1 комната</option>
            <option value="2">2 комнаты</option>
            <option value="3">3 комнаты</option>
            <option value="100">100 комнат</option>
          </select>
        </fieldset>
        <fieldset class="ad-form__element">
          <label class="ad-form__label" for="capacity">Количество мест</label>
          <select id="capacity" name="capacity">
            <option value="3" selected>для 3 гостей</option>
            <option value="2">для 2 гостей</option>
            <option value="1">для 1 гостя</option>
            <option value="0">не для гостей</option>
          </select>
        </fieldset>
        <fieldset class="ad-form__element ad-form__element--wide features">
          <legend>Удобства: Wi-Fi, кухня, парковка, стиралка, лифт, кондиционер</legend>
          <input type="checkbox" name="features" value="wifi" id="feature-wifi" class="feature__checkbox visually-hidden">
          <label class="feature feature--wifi" for="feature-wifi">Wi-Fi</label>
          <input type="checkbox" name="features" value="dishwasher" id="feature-dishwasher" class="feature__checkbox visually-hidden">
          <label class="feature feature--dishwasher" for="feature-dishwasher">Посудомоечная машина</label>
          <input type="checkbox" name="features" value="parking" id="feature-parking" class="feature__checkbox visually-hidden">
          <label class="feature feature--parking" for="feature-parking">Парковка</label>
          <input type="checkbox" name="features" value="washer" id="feature-washer" class="feature__checkbox visually-hidden">
          <label class="feature feature--washer" for="feature-washer">Стиральная машина</label>
          <input type="checkbox" name="features" value="elevator" id="feature-elevator" class="feature__checkbox visually-hidden">
          <label class="feature feature--elevator" for="feature-elevator">Лифт</label>
          <input type="checkbox" name="features" value="conditioner" id="feature-conditioner" class="feature__checkbox visually-hidden">
          <label class="feature feature--conditioner" for="feature-conditioner">Кондиционер</label>
        </fieldset>
        <fieldset class="ad-form__element ad-form__element--wide">
          <label class="ad-form__label" for="description">Описание (не обязательно)</label>
          <textarea id="description" name="description" placeholder="Здесь расскажите о том, какое ваше жилье замечательное и вообще"></textarea>
        </fieldset>
        <fieldset class="ad-form__element ad-form__element--wide">
          <label class="ad-form__label">Фотографии жилья</label>
          <div class="ad-form__photo-container">
            <div class="ad-form__upload">
              <input type="file" id="images" name="images" class="ad-form__input visually-hidden">
              <label for="images" class="ad-form__drop-zone">Загрузите или&nbsp;перетащите сюда фото</label>
            </div>
            <div class="ad-form__photo"></div>
          </div>
        </fieldset>
        <fieldset class="ad-form__element ad-form__element--submit">
          <button class="ad-form__submit" type="submit">Опубликовать</button>
          или <button class="ad-form__reset" type="reset">очистить</button>
        </fieldset>
      </form>
    </section>
  </main>

  <footer class="footer container">
    <div class="footer__copyright copyright">
      <a class="copyright__link copyright__link--image" href="https://htmlacademy.ru/intensive/javascript">
        <img src="img/htmla-logo.svg" width="130" height="45" alt="HTML Academy" class="copyright__logo">
      </a>
      <p>Сделано в <a class="copyright__link copyright__link--text" href="https://htmlacademy.ru/intensive/javascript">HTMLAcademy</a> &copy; 2018</p>
    </div>
    <ul class="footer__contacts contacts">
      <li><a href="https://twitter.com/htmlacademy_ru" class="contacts__link contacts__link--twitter">Twitter</a></li>
      <li><a href="https://www.instagram.com/htmlacademy/" class="contacts__link contacts__link--instagram">Instagtam</a></li>
      <li><a href="https://www.facebook.com/htmlacademy" class="contacts__link contacts__link--facebook">Facebook</a></li>
      <li><a href="https://vk.com/htmlacademy" class="contacts__link contacts__link--vk">VK</a></li>
    </ul>
  </footer>

  <!-- Модальное окно с информацией об объявлении -->
  <template id="card">
    <article class="map__card popup">
      <img src="img/avatars/user01.png" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
      <button type="button" class="popup__close">Закрыть</button>
      <h3 class="popup__title">Уютное гнездышко для молодоженов</h3>
      <p class="popup__text popup__text--address">102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3</p>
      <p class="popup__text popup__text--price">5200&#x20bd;<span>/ночь</span></p>
      <h4 class="popup__type">Квартира</h4>
      <p class="popup__text popup__text--capacity">2 комнаты для 3 гостей</p>
      <p class="popup__text popup__text--time">Заезд после 14:00, выезд до 10:00</p>
      <ul class="popup__features">
        <li class="popup__feature popup__feature--wifi"></li>
        <li class="popup__feature popup__feature--dishwasher"></li>
        <li class="popup__feature popup__feature--parking"></li>
        <li class="popup__feature popup__feature--washer"></li>
        <li class="popup__feature popup__feature--elevator"></li>
        <li class="popup__feature popup__feature--conditioner"></li>
      </ul>
      <p class="popup__description">Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.</p>
      <div class="popup__photos">
      </div>
    </article>
  </template>

  <!-- Метка объявления -->
  <template id="pin">
    <button type="button" class="map__pin" style="left: 200px; top: 400px;"><img src="img/avatars/user07.png" width="40" height="40" draggable="false" alt="Метка объявления"></button>
  </template>

  <!-- Сообщение об успешном создании объявления -->
  <template id="success">
    <div class="success">
      <p class="success__message">Ваше объявление<br>успешно размещено!</p>
    </div>
  </template>

  <!-- Сообщение об ошибке создания объеявления -->
  <template id="error">
    <div class="error">
      <p class="error__message">Ошибка загрузки объявления</p>
      <button class="error__button" href="#">Попробовать снова</button>
    </div>
  </template>

  <script src="js/map.js"></script>
</body>
</html>
