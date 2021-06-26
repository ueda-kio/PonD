import {dom, library} from '@fortawesome/fontawesome-svg-core';
import {faAngleRight, faExternalLinkAlt, faAngleDoubleRight, faThumbsUp, faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faTwitter, faLine} from '@fortawesome/free-brands-svg-icons';

export const importFontAwesome = () => {

  library.
    add(
      faAngleRight,
      faExternalLinkAlt,
      faAngleDoubleRight, faThumbsUp,
      faFacebook,
      faTwitter,
      faLine,
      faChevronLeft,
      faChevronRight
    );

  dom.i2svg();
};