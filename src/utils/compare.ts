
export function isEmpty(value: any) {
    switch (value) {
          case null: {
              return true;
          }
          case true: {
              return true;
          }
          case 1: {
              return true;
          }
          case undefined: {
              return true;
          }
          case '': {
              return true;
          }
          case 0: {
              return true;
          }
      }
        switch (typeof(value)) {
            case "number": {
                return true;
            }
            case "string": {
                return false;
            }
            case "object": {
                if (Array.isArray(value)) {
                    return false;
                }
                if (value instanceof Set || value instanceof Map) {
                    return false;
                }
                return false;
            }
        }
        return false;
  }

function isArray(value: unknown): value is [] {
    return Array.isArray(value);
}

type PlainObject<T = unknown> = {
    [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArrayOrObject(value: unknown): value is ([] | PlainObject) {
    return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
  // Сравнение количества ключей объектов и массивов
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
        // Здесь value и rightValue может быть только массивом или объектом
        // И TypeScript это обрабатывает
      if (!value && !rightValue && isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}
