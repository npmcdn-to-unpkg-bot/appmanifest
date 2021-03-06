//
//
// Based on the algorithm defined in the spec
// http://w3c.github.io/manifest/#dfn-steps-for-processing-the-type-member-of-an-image
//
//
import contentType from 'content-type';

export default function image_type ({image, logger: _logger, key}) {

  const logger = _logger(key, "image_type");

  // step 1
  const descriptor = Object.getOwnPropertyDescriptor(image, "type");
  if (typeof descriptor === "undefined") {
    logger.warn(`image type is not defined for "${image.src}"`);
    // step 3.2
    return void 0;
  }
  const {value} = descriptor;

  // step 2
  const type = typeof value;

  // step 3
  if (type !== "string") {
    // step 3.1
    if (type !== "undefined")
      logger.warn(`Type ${type} is not supported`);
    // step 3.2
    return void 0;
  }

  // step 4
  const trimmedValue = String.prototype.trim.call(value);

  // step 5
  try {
    contentType.parse(trimmedValue);
  } catch(e) {
    logger.error(`${trimmedValue} is not a valid MIME Type`);
    return void 0;
  }

  return trimmedValue;

}
