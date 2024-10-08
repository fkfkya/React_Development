// MyPick<T,K>
// Выбираем ключи из K, принадлежащие T. Для каждого ключа берём его значение из T
export type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
}


type PickMe = {
  count: number;
  name: string;
  adress: string;
}

type x = MyPick<PickMe, 'adress' | 'name'>;
const person: x = {name: "Wolf", adress: "Wall Street"};
console.log("1. MyPick", person);

// NOfArray<ArrayObj, N>
// Исходный массив - ArrayObj; выбираем  N-й элемент этого массива, возвращаем тип этого элемента
export type NOfArray<ArrayObj extends any[], N extends number> = ArrayObj[N];

type MyArray = [number, string, boolean];
type MyElement = NOfArray<MyArray, 0>;
const element: MyElement = 42;
console.log("2. NOfArray",element);


// Unshift<ArrayType, Element> 
// Присваиваем массиву, в котором первый элемент - Elem, далее ArrayType 
export type Unshift<ArrayType extends any[], Elem> = [Elem, ...ArrayType];

const newArray: Unshift<[string, boolean], number> = [42, "19", false];
console.log('3. Unshift', newArray);

// MyExclude<T, U>
// U принадлежит T? -> исключаем U, иначе - оставляем T
export type MyExclude<T, U> = T extends U ? never : T;

type Excluded = MyExclude<string | number | boolean, string | number>;
const excluded: Excluded = false;
console.log('4. MyExclude', typeof excluded);
