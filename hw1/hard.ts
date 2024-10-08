// 1. Camelize

  // Итерируемся по ключам T и проверяем их на то, являются ли они строкой
  // Если да - преобразуем из snake_case в camelCase, используя CamelCase<String>
  // Если значение по ключу является объект, применяем Camelize рекурсивно
export type Camelize<T> = T extends object
    ? {
        [K in keyof T as K extends string
            ? CamelCase<K>
            : K]:
        
        T[K] extends object ? Camelize<T[K]> : T[K];
    }
    : T;

  // snake_case to camelCase
  // Берем подстроку First до первого символа '_' и преобразуем ее к нижнему регистру
  // Остальную часть строки Rest делаем с заглавной буквы и продолжаем рекурсию 
type CamelCase<StringElement extends string> = StringElement extends `${infer First}_${infer Rest}`
    ? `${Lowercase<First>}${Capitalize<CamelCase<Rest>>}`
    : StringElement;


type SnakeCaseExample = {
    name_of_parent : string,
    children_of_parent: {
        girls_names : string,
        boys_names : string
    }
};

const snake : SnakeCaseExample = {
    name_of_parent: "alexey_navalniy",
    children_of_parent: {
        boys_names: "Zahar",
        girls_names: "Darya"
    }
}

type CamelizeExample = Camelize<SnakeCaseExample>;

const camel : CamelizeExample = {
    nameOfParent: "Alexey Navalniy",
    childrenOfParent: {
        boysNames: "Zahar", girlsNames: "Darya"
    }
}
console.log('Snake case object:', snake);
console.log('Camelized object:', camel);


//2. DeepPick
  // Разбиваем строку (если она является шаблоном "K.Rest") на первую часть - K (до точки) и остальное (Rest)
  // Далее продолжаем рекурсивное разбиение и если ключ P не имеет вложенности, возвращаем значение по этому ключу
export type DeepPick<T, P extends string> = P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
        ? { [Key in K]: DeepPick<T[K], Rest> }
        : never
    : P extends keyof T
        ? { [K in P]: T[K] }
        : never;



type PickMe = {
  name: string,
  age: number,
  adress : {
    country: {
      location: {
        city: string,
        street: string,
        numOfHouse: number
      }
    }
  }
}

type PickedFromPickMe = DeepPick<PickMe, 'name'| 'adress.country.location.street'>;
const pickNickAndStreet: PickedFromPickMe = {
    name: 'Vladimir',
    adress : {
    country: {
      location: {
        street: 'Mayakovskaya Street'
      }
    }
  }
};

console.log('2. DeepPick', pickNickAndStreet);
