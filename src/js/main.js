import '../scss/app.scss';
import { init } from './init.mjs';
import './modules/Class/_FormValidation.mjs'
import './modules/Class/_Modal.mjs'
import './modules/Class/_FocusLoop.mjs'
import { GlobalMenu } from './modules/_globalMenu.mjs';
import { headerStyleChanger } from './modules/_l-header-styleChange.mjs';
import { swiper } from './modules/_swiper.js';
import { btnPressToDisabled } from './modules/_btnPressToDisabled.mjs';

init()

headerStyleChanger();

GlobalMenu();

swiper();

btnPressToDisabled();
