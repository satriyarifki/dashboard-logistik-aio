import {
  trigger,
  state,
  style,
  animate,
  transition,
  useAnimation,
} from '@angular/animations';
import {
  bounce,
  swing,
  slideInLeft,
  slideInDown,
  zoomIn,
  zoomOut,
} from 'ng-animate';

export const slideInRoute = trigger('routeAnimations', [
  transition(':enter', useAnimation(slideInLeft, { params: { timing: 0.25 } })),
  transition(':leave', useAnimation(slideInLeft, { params: { timing: 0.25 } })),
]);
