// 1. DeepPartial<T>
// Итерируемся по ключам объекта T, если T по текущему ключу является объектом то рекурсивно применяем DeepPartial, иначе делаем его опциональным
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};


type Admin = {
    name: string;
    id: number;
    rights: {
        read: boolean;
        edit: boolean;
        remove: boolean;
    };
};
type MyAdmin = DeepPartial<Admin>;
const adminchik: MyAdmin = {
    id: 52,
    rights: {
        edit: true, remove: false
    }
};
console.log("1. DeepPartial: ", adminchik);


// 2. MyCapitalize
// T - должен являться StringType.
// Отделяем первую букву от остальной подстроки и преобразуем первую букву в заглавную, 
// если строка не соответсвует регулярке(либо пустая), то оставляем исходное
export type MyCapitalize<T extends string> = T extends `${infer F}${infer Rest}` ? `${Uppercase<F>}${Rest}` : T;


type CapitalizeName = MyCapitalize<'yakov'>;
const capedName : CapitalizeName = 'Yakov';
console.log('2. MyCapitalize:', capedName);

// 3. DeepMutable<T>
// Убираем модификатор readonly у всех ключей объекта T
// Далее принцип такой же как и у DeepPartial, если объект - то рекурсивно применяем Mutable. Иначе оставляем, убрав readonly
type DeepMutable<T> = {
    -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
  };

type User = {
    name: string
    readonly id: number;
    readonly rights: {
        readonly read: boolean;
        readonly edit: boolean;
        readonly remove: boolean;
    };
};

type MyUser = DeepMutable<User>;
const userOne: MyUser = {
    name: 'one',
    id: 52,
    rights: {
        edit: false, remove: false, read: true
    }
};
userOne.rights.edit = true
console.log("3. DeepMutable: ", userOne);


// 4. ParseURLParams<StringElem>
// StringElem должен являться строкой
// Если находим параметр - извлекаем, если он в конце строки то также его извлекаем. Когда параметры кончаются - возвращаем never
type ParseURLParams<StringElem extends string> = 
  StringElem extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ParseURLParams<`/${Rest}`>
    : StringElem extends `${infer _Start}:${infer Param}`
      ? Param
      : never;

type Params = ParseURLParams<'posts/:52225/:user'>;
const idParam: Params = '52225';
const typeOfUserParam: Params = 'user'
console.log('4. ParseURLParams: ', idParam, typeOfUserParam);
