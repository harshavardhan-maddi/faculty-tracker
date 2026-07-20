
/**
 * Client
**/

import * as runtime from './runtime/binary.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Classroom
 * 
 */
export type Classroom = $Result.DefaultSelection<Prisma.$ClassroomPayload>
/**
 * Model Faculty
 * 
 */
export type Faculty = $Result.DefaultSelection<Prisma.$FacultyPayload>
/**
 * Model Timetable
 * 
 */
export type Timetable = $Result.DefaultSelection<Prisma.$TimetablePayload>
/**
 * Model FacultyLog
 * 
 */
export type FacultyLog = $Result.DefaultSelection<Prisma.$FacultyLogPayload>
/**
 * Model SystemSetting
 * 
 */
export type SystemSetting = $Result.DefaultSelection<Prisma.$SystemSettingPayload>
/**
 * Model Fingerprint
 * 
 */
export type Fingerprint = $Result.DefaultSelection<Prisma.$FingerprintPayload>
/**
 * Model FingerprintAuditLog
 * 
 */
export type FingerprintAuditLog = $Result.DefaultSelection<Prisma.$FingerprintAuditLogPayload>
/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Attendance
 * 
 */
export type Attendance = $Result.DefaultSelection<Prisma.$AttendancePayload>
/**
 * Model AbsenteeCallLog
 * 
 */
export type AbsenteeCallLog = $Result.DefaultSelection<Prisma.$AbsenteeCallLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  HOD: 'HOD',
  SUB_ADMIN: 'SUB_ADMIN',
  CR: 'CR',
  ABSENT_CONTROLLER: 'ABSENT_CONTROLLER',
  FACULTY: 'FACULTY'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => $Utils.JsPromise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.classroom`: Exposes CRUD operations for the **Classroom** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classrooms
    * const classrooms = await prisma.classroom.findMany()
    * ```
    */
  get classroom(): Prisma.ClassroomDelegate<ExtArgs>;

  /**
   * `prisma.faculty`: Exposes CRUD operations for the **Faculty** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Faculties
    * const faculties = await prisma.faculty.findMany()
    * ```
    */
  get faculty(): Prisma.FacultyDelegate<ExtArgs>;

  /**
   * `prisma.timetable`: Exposes CRUD operations for the **Timetable** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Timetables
    * const timetables = await prisma.timetable.findMany()
    * ```
    */
  get timetable(): Prisma.TimetableDelegate<ExtArgs>;

  /**
   * `prisma.facultyLog`: Exposes CRUD operations for the **FacultyLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FacultyLogs
    * const facultyLogs = await prisma.facultyLog.findMany()
    * ```
    */
  get facultyLog(): Prisma.FacultyLogDelegate<ExtArgs>;

  /**
   * `prisma.systemSetting`: Exposes CRUD operations for the **SystemSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SystemSettings
    * const systemSettings = await prisma.systemSetting.findMany()
    * ```
    */
  get systemSetting(): Prisma.SystemSettingDelegate<ExtArgs>;

  /**
   * `prisma.fingerprint`: Exposes CRUD operations for the **Fingerprint** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fingerprints
    * const fingerprints = await prisma.fingerprint.findMany()
    * ```
    */
  get fingerprint(): Prisma.FingerprintDelegate<ExtArgs>;

  /**
   * `prisma.fingerprintAuditLog`: Exposes CRUD operations for the **FingerprintAuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FingerprintAuditLogs
    * const fingerprintAuditLogs = await prisma.fingerprintAuditLog.findMany()
    * ```
    */
  get fingerprintAuditLog(): Prisma.FingerprintAuditLogDelegate<ExtArgs>;

  /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs>;

  /**
   * `prisma.attendance`: Exposes CRUD operations for the **Attendance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Attendances
    * const attendances = await prisma.attendance.findMany()
    * ```
    */
  get attendance(): Prisma.AttendanceDelegate<ExtArgs>;

  /**
   * `prisma.absenteeCallLog`: Exposes CRUD operations for the **AbsenteeCallLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AbsenteeCallLogs
    * const absenteeCallLogs = await prisma.absenteeCallLog.findMany()
    * ```
    */
  get absenteeCallLog(): Prisma.AbsenteeCallLogDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Classroom: 'Classroom',
    Faculty: 'Faculty',
    Timetable: 'Timetable',
    FacultyLog: 'FacultyLog',
    SystemSetting: 'SystemSetting',
    Fingerprint: 'Fingerprint',
    FingerprintAuditLog: 'FingerprintAuditLog',
    Student: 'Student',
    Attendance: 'Attendance',
    AbsenteeCallLog: 'AbsenteeCallLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "classroom" | "faculty" | "timetable" | "facultyLog" | "systemSetting" | "fingerprint" | "fingerprintAuditLog" | "student" | "attendance" | "absenteeCallLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Classroom: {
        payload: Prisma.$ClassroomPayload<ExtArgs>
        fields: Prisma.ClassroomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassroomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassroomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          findFirst: {
            args: Prisma.ClassroomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassroomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          findMany: {
            args: Prisma.ClassroomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>[]
          }
          create: {
            args: Prisma.ClassroomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          createMany: {
            args: Prisma.ClassroomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClassroomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>[]
          }
          delete: {
            args: Prisma.ClassroomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          update: {
            args: Prisma.ClassroomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          deleteMany: {
            args: Prisma.ClassroomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassroomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClassroomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassroomPayload>
          }
          aggregate: {
            args: Prisma.ClassroomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClassroom>
          }
          groupBy: {
            args: Prisma.ClassroomGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassroomGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassroomCountArgs<ExtArgs>
            result: $Utils.Optional<ClassroomCountAggregateOutputType> | number
          }
        }
      }
      Faculty: {
        payload: Prisma.$FacultyPayload<ExtArgs>
        fields: Prisma.FacultyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FacultyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FacultyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyPayload>
          }
          findFirst: {
            args: Prisma.FacultyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FacultyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyPayload>
          }
          findMany: {
            args: Prisma.FacultyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyPayload>[]
          }
          create: {
            args: Prisma.FacultyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyPayload>
          }
          createMany: {
            args: Prisma.FacultyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FacultyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyPayload>[]
          }
          delete: {
            args: Prisma.FacultyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyPayload>
          }
          update: {
            args: Prisma.FacultyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyPayload>
          }
          deleteMany: {
            args: Prisma.FacultyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FacultyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FacultyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyPayload>
          }
          aggregate: {
            args: Prisma.FacultyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFaculty>
          }
          groupBy: {
            args: Prisma.FacultyGroupByArgs<ExtArgs>
            result: $Utils.Optional<FacultyGroupByOutputType>[]
          }
          count: {
            args: Prisma.FacultyCountArgs<ExtArgs>
            result: $Utils.Optional<FacultyCountAggregateOutputType> | number
          }
        }
      }
      Timetable: {
        payload: Prisma.$TimetablePayload<ExtArgs>
        fields: Prisma.TimetableFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TimetableFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimetablePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TimetableFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimetablePayload>
          }
          findFirst: {
            args: Prisma.TimetableFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimetablePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TimetableFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimetablePayload>
          }
          findMany: {
            args: Prisma.TimetableFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimetablePayload>[]
          }
          create: {
            args: Prisma.TimetableCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimetablePayload>
          }
          createMany: {
            args: Prisma.TimetableCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TimetableCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimetablePayload>[]
          }
          delete: {
            args: Prisma.TimetableDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimetablePayload>
          }
          update: {
            args: Prisma.TimetableUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimetablePayload>
          }
          deleteMany: {
            args: Prisma.TimetableDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TimetableUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TimetableUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TimetablePayload>
          }
          aggregate: {
            args: Prisma.TimetableAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTimetable>
          }
          groupBy: {
            args: Prisma.TimetableGroupByArgs<ExtArgs>
            result: $Utils.Optional<TimetableGroupByOutputType>[]
          }
          count: {
            args: Prisma.TimetableCountArgs<ExtArgs>
            result: $Utils.Optional<TimetableCountAggregateOutputType> | number
          }
        }
      }
      FacultyLog: {
        payload: Prisma.$FacultyLogPayload<ExtArgs>
        fields: Prisma.FacultyLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FacultyLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FacultyLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyLogPayload>
          }
          findFirst: {
            args: Prisma.FacultyLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FacultyLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyLogPayload>
          }
          findMany: {
            args: Prisma.FacultyLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyLogPayload>[]
          }
          create: {
            args: Prisma.FacultyLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyLogPayload>
          }
          createMany: {
            args: Prisma.FacultyLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FacultyLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyLogPayload>[]
          }
          delete: {
            args: Prisma.FacultyLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyLogPayload>
          }
          update: {
            args: Prisma.FacultyLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyLogPayload>
          }
          deleteMany: {
            args: Prisma.FacultyLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FacultyLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FacultyLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FacultyLogPayload>
          }
          aggregate: {
            args: Prisma.FacultyLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFacultyLog>
          }
          groupBy: {
            args: Prisma.FacultyLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<FacultyLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.FacultyLogCountArgs<ExtArgs>
            result: $Utils.Optional<FacultyLogCountAggregateOutputType> | number
          }
        }
      }
      SystemSetting: {
        payload: Prisma.$SystemSettingPayload<ExtArgs>
        fields: Prisma.SystemSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SystemSettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SystemSettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          findFirst: {
            args: Prisma.SystemSettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SystemSettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          findMany: {
            args: Prisma.SystemSettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[]
          }
          create: {
            args: Prisma.SystemSettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          createMany: {
            args: Prisma.SystemSettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SystemSettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>[]
          }
          delete: {
            args: Prisma.SystemSettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          update: {
            args: Prisma.SystemSettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          deleteMany: {
            args: Prisma.SystemSettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SystemSettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SystemSettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SystemSettingPayload>
          }
          aggregate: {
            args: Prisma.SystemSettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSystemSetting>
          }
          groupBy: {
            args: Prisma.SystemSettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SystemSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SystemSettingCountArgs<ExtArgs>
            result: $Utils.Optional<SystemSettingCountAggregateOutputType> | number
          }
        }
      }
      Fingerprint: {
        payload: Prisma.$FingerprintPayload<ExtArgs>
        fields: Prisma.FingerprintFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FingerprintFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FingerprintFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintPayload>
          }
          findFirst: {
            args: Prisma.FingerprintFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FingerprintFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintPayload>
          }
          findMany: {
            args: Prisma.FingerprintFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintPayload>[]
          }
          create: {
            args: Prisma.FingerprintCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintPayload>
          }
          createMany: {
            args: Prisma.FingerprintCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FingerprintCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintPayload>[]
          }
          delete: {
            args: Prisma.FingerprintDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintPayload>
          }
          update: {
            args: Prisma.FingerprintUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintPayload>
          }
          deleteMany: {
            args: Prisma.FingerprintDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FingerprintUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FingerprintUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintPayload>
          }
          aggregate: {
            args: Prisma.FingerprintAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFingerprint>
          }
          groupBy: {
            args: Prisma.FingerprintGroupByArgs<ExtArgs>
            result: $Utils.Optional<FingerprintGroupByOutputType>[]
          }
          count: {
            args: Prisma.FingerprintCountArgs<ExtArgs>
            result: $Utils.Optional<FingerprintCountAggregateOutputType> | number
          }
        }
      }
      FingerprintAuditLog: {
        payload: Prisma.$FingerprintAuditLogPayload<ExtArgs>
        fields: Prisma.FingerprintAuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FingerprintAuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintAuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FingerprintAuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintAuditLogPayload>
          }
          findFirst: {
            args: Prisma.FingerprintAuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintAuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FingerprintAuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintAuditLogPayload>
          }
          findMany: {
            args: Prisma.FingerprintAuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintAuditLogPayload>[]
          }
          create: {
            args: Prisma.FingerprintAuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintAuditLogPayload>
          }
          createMany: {
            args: Prisma.FingerprintAuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FingerprintAuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintAuditLogPayload>[]
          }
          delete: {
            args: Prisma.FingerprintAuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintAuditLogPayload>
          }
          update: {
            args: Prisma.FingerprintAuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintAuditLogPayload>
          }
          deleteMany: {
            args: Prisma.FingerprintAuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FingerprintAuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FingerprintAuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FingerprintAuditLogPayload>
          }
          aggregate: {
            args: Prisma.FingerprintAuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFingerprintAuditLog>
          }
          groupBy: {
            args: Prisma.FingerprintAuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<FingerprintAuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.FingerprintAuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<FingerprintAuditLogCountAggregateOutputType> | number
          }
        }
      }
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Attendance: {
        payload: Prisma.$AttendancePayload<ExtArgs>
        fields: Prisma.AttendanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttendanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttendanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findFirst: {
            args: Prisma.AttendanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttendanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          findMany: {
            args: Prisma.AttendanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          create: {
            args: Prisma.AttendanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          createMany: {
            args: Prisma.AttendanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttendanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>[]
          }
          delete: {
            args: Prisma.AttendanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          update: {
            args: Prisma.AttendanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          deleteMany: {
            args: Prisma.AttendanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttendanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AttendanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttendancePayload>
          }
          aggregate: {
            args: Prisma.AttendanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttendance>
          }
          groupBy: {
            args: Prisma.AttendanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttendanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttendanceCountArgs<ExtArgs>
            result: $Utils.Optional<AttendanceCountAggregateOutputType> | number
          }
        }
      }
      AbsenteeCallLog: {
        payload: Prisma.$AbsenteeCallLogPayload<ExtArgs>
        fields: Prisma.AbsenteeCallLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AbsenteeCallLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsenteeCallLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AbsenteeCallLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsenteeCallLogPayload>
          }
          findFirst: {
            args: Prisma.AbsenteeCallLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsenteeCallLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AbsenteeCallLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsenteeCallLogPayload>
          }
          findMany: {
            args: Prisma.AbsenteeCallLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsenteeCallLogPayload>[]
          }
          create: {
            args: Prisma.AbsenteeCallLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsenteeCallLogPayload>
          }
          createMany: {
            args: Prisma.AbsenteeCallLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AbsenteeCallLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsenteeCallLogPayload>[]
          }
          delete: {
            args: Prisma.AbsenteeCallLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsenteeCallLogPayload>
          }
          update: {
            args: Prisma.AbsenteeCallLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsenteeCallLogPayload>
          }
          deleteMany: {
            args: Prisma.AbsenteeCallLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AbsenteeCallLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AbsenteeCallLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsenteeCallLogPayload>
          }
          aggregate: {
            args: Prisma.AbsenteeCallLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAbsenteeCallLog>
          }
          groupBy: {
            args: Prisma.AbsenteeCallLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AbsenteeCallLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AbsenteeCallLogCountArgs<ExtArgs>
            result: $Utils.Optional<AbsenteeCallLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ClassroomCountOutputType
   */

  export type ClassroomCountOutputType = {
    timetables: number
    logs: number
  }

  export type ClassroomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timetables?: boolean | ClassroomCountOutputTypeCountTimetablesArgs
    logs?: boolean | ClassroomCountOutputTypeCountLogsArgs
  }

  // Custom InputTypes
  /**
   * ClassroomCountOutputType without action
   */
  export type ClassroomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassroomCountOutputType
     */
    select?: ClassroomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClassroomCountOutputType without action
   */
  export type ClassroomCountOutputTypeCountTimetablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimetableWhereInput
  }

  /**
   * ClassroomCountOutputType without action
   */
  export type ClassroomCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FacultyLogWhereInput
  }


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    attendance: number
    callLogs: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance?: boolean | StudentCountOutputTypeCountAttendanceArgs
    callLogs?: boolean | StudentCountOutputTypeCountCallLogsArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountAttendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountCallLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AbsenteeCallLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    userId: string | null
    password: string | null
    role: $Enums.Role | null
    className: string | null
    createdAt: Date | null
    fingerprintEnabled: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    userId: string | null
    password: string | null
    role: $Enums.Role | null
    className: string | null
    createdAt: Date | null
    fingerprintEnabled: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    userId: number
    password: number
    role: number
    className: number
    createdAt: number
    fingerprintEnabled: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    password?: true
    role?: true
    className?: true
    createdAt?: true
    fingerprintEnabled?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    password?: true
    role?: true
    className?: true
    createdAt?: true
    fingerprintEnabled?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    password?: true
    role?: true
    className?: true
    createdAt?: true
    fingerprintEnabled?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    userId: string
    password: string
    role: $Enums.Role
    className: string | null
    createdAt: Date
    fingerprintEnabled: boolean
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    password?: boolean
    role?: boolean
    className?: boolean
    createdAt?: boolean
    fingerprintEnabled?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    password?: boolean
    role?: boolean
    className?: boolean
    createdAt?: boolean
    fingerprintEnabled?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    userId?: boolean
    password?: boolean
    role?: boolean
    className?: boolean
    createdAt?: boolean
    fingerprintEnabled?: boolean
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      userId: string
      password: string
      role: $Enums.Role
      className: string | null
      createdAt: Date
      fingerprintEnabled: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly userId: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly className: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly fingerprintEnabled: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
  }


  /**
   * Model Classroom
   */

  export type AggregateClassroom = {
    _count: ClassroomCountAggregateOutputType | null
    _avg: ClassroomAvgAggregateOutputType | null
    _sum: ClassroomSumAggregateOutputType | null
    _min: ClassroomMinAggregateOutputType | null
    _max: ClassroomMaxAggregateOutputType | null
  }

  export type ClassroomAvgAggregateOutputType = {
    id: number | null
  }

  export type ClassroomSumAggregateOutputType = {
    id: number | null
  }

  export type ClassroomMinAggregateOutputType = {
    id: number | null
    roomNumber: string | null
    className: string | null
    createdAt: Date | null
  }

  export type ClassroomMaxAggregateOutputType = {
    id: number | null
    roomNumber: string | null
    className: string | null
    createdAt: Date | null
  }

  export type ClassroomCountAggregateOutputType = {
    id: number
    roomNumber: number
    className: number
    createdAt: number
    _all: number
  }


  export type ClassroomAvgAggregateInputType = {
    id?: true
  }

  export type ClassroomSumAggregateInputType = {
    id?: true
  }

  export type ClassroomMinAggregateInputType = {
    id?: true
    roomNumber?: true
    className?: true
    createdAt?: true
  }

  export type ClassroomMaxAggregateInputType = {
    id?: true
    roomNumber?: true
    className?: true
    createdAt?: true
  }

  export type ClassroomCountAggregateInputType = {
    id?: true
    roomNumber?: true
    className?: true
    createdAt?: true
    _all?: true
  }

  export type ClassroomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classroom to aggregate.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Classrooms
    **/
    _count?: true | ClassroomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClassroomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClassroomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassroomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassroomMaxAggregateInputType
  }

  export type GetClassroomAggregateType<T extends ClassroomAggregateArgs> = {
        [P in keyof T & keyof AggregateClassroom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClassroom[P]>
      : GetScalarType<T[P], AggregateClassroom[P]>
  }




  export type ClassroomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassroomWhereInput
    orderBy?: ClassroomOrderByWithAggregationInput | ClassroomOrderByWithAggregationInput[]
    by: ClassroomScalarFieldEnum[] | ClassroomScalarFieldEnum
    having?: ClassroomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassroomCountAggregateInputType | true
    _avg?: ClassroomAvgAggregateInputType
    _sum?: ClassroomSumAggregateInputType
    _min?: ClassroomMinAggregateInputType
    _max?: ClassroomMaxAggregateInputType
  }

  export type ClassroomGroupByOutputType = {
    id: number
    roomNumber: string
    className: string
    createdAt: Date
    _count: ClassroomCountAggregateOutputType | null
    _avg: ClassroomAvgAggregateOutputType | null
    _sum: ClassroomSumAggregateOutputType | null
    _min: ClassroomMinAggregateOutputType | null
    _max: ClassroomMaxAggregateOutputType | null
  }

  type GetClassroomGroupByPayload<T extends ClassroomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassroomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassroomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassroomGroupByOutputType[P]>
            : GetScalarType<T[P], ClassroomGroupByOutputType[P]>
        }
      >
    >


  export type ClassroomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomNumber?: boolean
    className?: boolean
    createdAt?: boolean
    timetables?: boolean | Classroom$timetablesArgs<ExtArgs>
    logs?: boolean | Classroom$logsArgs<ExtArgs>
    _count?: boolean | ClassroomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["classroom"]>

  export type ClassroomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomNumber?: boolean
    className?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["classroom"]>

  export type ClassroomSelectScalar = {
    id?: boolean
    roomNumber?: boolean
    className?: boolean
    createdAt?: boolean
  }

  export type ClassroomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    timetables?: boolean | Classroom$timetablesArgs<ExtArgs>
    logs?: boolean | Classroom$logsArgs<ExtArgs>
    _count?: boolean | ClassroomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClassroomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClassroomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Classroom"
    objects: {
      timetables: Prisma.$TimetablePayload<ExtArgs>[]
      logs: Prisma.$FacultyLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      roomNumber: string
      className: string
      createdAt: Date
    }, ExtArgs["result"]["classroom"]>
    composites: {}
  }

  type ClassroomGetPayload<S extends boolean | null | undefined | ClassroomDefaultArgs> = $Result.GetResult<Prisma.$ClassroomPayload, S>

  type ClassroomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClassroomFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClassroomCountAggregateInputType | true
    }

  export interface ClassroomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Classroom'], meta: { name: 'Classroom' } }
    /**
     * Find zero or one Classroom that matches the filter.
     * @param {ClassroomFindUniqueArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassroomFindUniqueArgs>(args: SelectSubset<T, ClassroomFindUniqueArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Classroom that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ClassroomFindUniqueOrThrowArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassroomFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassroomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Classroom that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomFindFirstArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassroomFindFirstArgs>(args?: SelectSubset<T, ClassroomFindFirstArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Classroom that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomFindFirstOrThrowArgs} args - Arguments to find a Classroom
     * @example
     * // Get one Classroom
     * const classroom = await prisma.classroom.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassroomFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassroomFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Classrooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classrooms
     * const classrooms = await prisma.classroom.findMany()
     * 
     * // Get first 10 Classrooms
     * const classrooms = await prisma.classroom.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const classroomWithIdOnly = await prisma.classroom.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClassroomFindManyArgs>(args?: SelectSubset<T, ClassroomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Classroom.
     * @param {ClassroomCreateArgs} args - Arguments to create a Classroom.
     * @example
     * // Create one Classroom
     * const Classroom = await prisma.classroom.create({
     *   data: {
     *     // ... data to create a Classroom
     *   }
     * })
     * 
     */
    create<T extends ClassroomCreateArgs>(args: SelectSubset<T, ClassroomCreateArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Classrooms.
     * @param {ClassroomCreateManyArgs} args - Arguments to create many Classrooms.
     * @example
     * // Create many Classrooms
     * const classroom = await prisma.classroom.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassroomCreateManyArgs>(args?: SelectSubset<T, ClassroomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Classrooms and returns the data saved in the database.
     * @param {ClassroomCreateManyAndReturnArgs} args - Arguments to create many Classrooms.
     * @example
     * // Create many Classrooms
     * const classroom = await prisma.classroom.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Classrooms and only return the `id`
     * const classroomWithIdOnly = await prisma.classroom.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClassroomCreateManyAndReturnArgs>(args?: SelectSubset<T, ClassroomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Classroom.
     * @param {ClassroomDeleteArgs} args - Arguments to delete one Classroom.
     * @example
     * // Delete one Classroom
     * const Classroom = await prisma.classroom.delete({
     *   where: {
     *     // ... filter to delete one Classroom
     *   }
     * })
     * 
     */
    delete<T extends ClassroomDeleteArgs>(args: SelectSubset<T, ClassroomDeleteArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Classroom.
     * @param {ClassroomUpdateArgs} args - Arguments to update one Classroom.
     * @example
     * // Update one Classroom
     * const classroom = await prisma.classroom.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassroomUpdateArgs>(args: SelectSubset<T, ClassroomUpdateArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Classrooms.
     * @param {ClassroomDeleteManyArgs} args - Arguments to filter Classrooms to delete.
     * @example
     * // Delete a few Classrooms
     * const { count } = await prisma.classroom.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassroomDeleteManyArgs>(args?: SelectSubset<T, ClassroomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classrooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classrooms
     * const classroom = await prisma.classroom.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassroomUpdateManyArgs>(args: SelectSubset<T, ClassroomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Classroom.
     * @param {ClassroomUpsertArgs} args - Arguments to update or create a Classroom.
     * @example
     * // Update or create a Classroom
     * const classroom = await prisma.classroom.upsert({
     *   create: {
     *     // ... data to create a Classroom
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Classroom we want to update
     *   }
     * })
     */
    upsert<T extends ClassroomUpsertArgs>(args: SelectSubset<T, ClassroomUpsertArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Classrooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomCountArgs} args - Arguments to filter Classrooms to count.
     * @example
     * // Count the number of Classrooms
     * const count = await prisma.classroom.count({
     *   where: {
     *     // ... the filter for the Classrooms we want to count
     *   }
     * })
    **/
    count<T extends ClassroomCountArgs>(
      args?: Subset<T, ClassroomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassroomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Classroom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClassroomAggregateArgs>(args: Subset<T, ClassroomAggregateArgs>): Prisma.PrismaPromise<GetClassroomAggregateType<T>>

    /**
     * Group by Classroom.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassroomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClassroomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassroomGroupByArgs['orderBy'] }
        : { orderBy?: ClassroomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClassroomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassroomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Classroom model
   */
  readonly fields: ClassroomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Classroom.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassroomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    timetables<T extends Classroom$timetablesArgs<ExtArgs> = {}>(args?: Subset<T, Classroom$timetablesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimetablePayload<ExtArgs>, T, "findMany"> | Null>
    logs<T extends Classroom$logsArgs<ExtArgs> = {}>(args?: Subset<T, Classroom$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacultyLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Classroom model
   */ 
  interface ClassroomFieldRefs {
    readonly id: FieldRef<"Classroom", 'Int'>
    readonly roomNumber: FieldRef<"Classroom", 'String'>
    readonly className: FieldRef<"Classroom", 'String'>
    readonly createdAt: FieldRef<"Classroom", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Classroom findUnique
   */
  export type ClassroomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom findUniqueOrThrow
   */
  export type ClassroomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom findFirst
   */
  export type ClassroomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classrooms.
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classrooms.
     */
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * Classroom findFirstOrThrow
   */
  export type ClassroomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classroom to fetch.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classrooms.
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classrooms.
     */
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * Classroom findMany
   */
  export type ClassroomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter, which Classrooms to fetch.
     */
    where?: ClassroomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classrooms to fetch.
     */
    orderBy?: ClassroomOrderByWithRelationInput | ClassroomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Classrooms.
     */
    cursor?: ClassroomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classrooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classrooms.
     */
    skip?: number
    distinct?: ClassroomScalarFieldEnum | ClassroomScalarFieldEnum[]
  }

  /**
   * Classroom create
   */
  export type ClassroomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * The data needed to create a Classroom.
     */
    data: XOR<ClassroomCreateInput, ClassroomUncheckedCreateInput>
  }

  /**
   * Classroom createMany
   */
  export type ClassroomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Classrooms.
     */
    data: ClassroomCreateManyInput | ClassroomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Classroom createManyAndReturn
   */
  export type ClassroomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Classrooms.
     */
    data: ClassroomCreateManyInput | ClassroomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Classroom update
   */
  export type ClassroomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * The data needed to update a Classroom.
     */
    data: XOR<ClassroomUpdateInput, ClassroomUncheckedUpdateInput>
    /**
     * Choose, which Classroom to update.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom updateMany
   */
  export type ClassroomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Classrooms.
     */
    data: XOR<ClassroomUpdateManyMutationInput, ClassroomUncheckedUpdateManyInput>
    /**
     * Filter which Classrooms to update
     */
    where?: ClassroomWhereInput
  }

  /**
   * Classroom upsert
   */
  export type ClassroomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * The filter to search for the Classroom to update in case it exists.
     */
    where: ClassroomWhereUniqueInput
    /**
     * In case the Classroom found by the `where` argument doesn't exist, create a new Classroom with this data.
     */
    create: XOR<ClassroomCreateInput, ClassroomUncheckedCreateInput>
    /**
     * In case the Classroom was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassroomUpdateInput, ClassroomUncheckedUpdateInput>
  }

  /**
   * Classroom delete
   */
  export type ClassroomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
    /**
     * Filter which Classroom to delete.
     */
    where: ClassroomWhereUniqueInput
  }

  /**
   * Classroom deleteMany
   */
  export type ClassroomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classrooms to delete
     */
    where?: ClassroomWhereInput
  }

  /**
   * Classroom.timetables
   */
  export type Classroom$timetablesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timetable
     */
    select?: TimetableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimetableInclude<ExtArgs> | null
    where?: TimetableWhereInput
    orderBy?: TimetableOrderByWithRelationInput | TimetableOrderByWithRelationInput[]
    cursor?: TimetableWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TimetableScalarFieldEnum | TimetableScalarFieldEnum[]
  }

  /**
   * Classroom.logs
   */
  export type Classroom$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacultyLog
     */
    select?: FacultyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacultyLogInclude<ExtArgs> | null
    where?: FacultyLogWhereInput
    orderBy?: FacultyLogOrderByWithRelationInput | FacultyLogOrderByWithRelationInput[]
    cursor?: FacultyLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FacultyLogScalarFieldEnum | FacultyLogScalarFieldEnum[]
  }

  /**
   * Classroom without action
   */
  export type ClassroomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classroom
     */
    select?: ClassroomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassroomInclude<ExtArgs> | null
  }


  /**
   * Model Faculty
   */

  export type AggregateFaculty = {
    _count: FacultyCountAggregateOutputType | null
    _avg: FacultyAvgAggregateOutputType | null
    _sum: FacultySumAggregateOutputType | null
    _min: FacultyMinAggregateOutputType | null
    _max: FacultyMaxAggregateOutputType | null
  }

  export type FacultyAvgAggregateOutputType = {
    id: number | null
  }

  export type FacultySumAggregateOutputType = {
    id: number | null
  }

  export type FacultyMinAggregateOutputType = {
    id: number | null
    facultyName: string | null
    phoneNumber: string | null
  }

  export type FacultyMaxAggregateOutputType = {
    id: number | null
    facultyName: string | null
    phoneNumber: string | null
  }

  export type FacultyCountAggregateOutputType = {
    id: number
    facultyName: number
    phoneNumber: number
    _all: number
  }


  export type FacultyAvgAggregateInputType = {
    id?: true
  }

  export type FacultySumAggregateInputType = {
    id?: true
  }

  export type FacultyMinAggregateInputType = {
    id?: true
    facultyName?: true
    phoneNumber?: true
  }

  export type FacultyMaxAggregateInputType = {
    id?: true
    facultyName?: true
    phoneNumber?: true
  }

  export type FacultyCountAggregateInputType = {
    id?: true
    facultyName?: true
    phoneNumber?: true
    _all?: true
  }

  export type FacultyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Faculty to aggregate.
     */
    where?: FacultyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Faculties to fetch.
     */
    orderBy?: FacultyOrderByWithRelationInput | FacultyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FacultyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Faculties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Faculties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Faculties
    **/
    _count?: true | FacultyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FacultyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FacultySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FacultyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FacultyMaxAggregateInputType
  }

  export type GetFacultyAggregateType<T extends FacultyAggregateArgs> = {
        [P in keyof T & keyof AggregateFaculty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFaculty[P]>
      : GetScalarType<T[P], AggregateFaculty[P]>
  }




  export type FacultyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FacultyWhereInput
    orderBy?: FacultyOrderByWithAggregationInput | FacultyOrderByWithAggregationInput[]
    by: FacultyScalarFieldEnum[] | FacultyScalarFieldEnum
    having?: FacultyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FacultyCountAggregateInputType | true
    _avg?: FacultyAvgAggregateInputType
    _sum?: FacultySumAggregateInputType
    _min?: FacultyMinAggregateInputType
    _max?: FacultyMaxAggregateInputType
  }

  export type FacultyGroupByOutputType = {
    id: number
    facultyName: string
    phoneNumber: string | null
    _count: FacultyCountAggregateOutputType | null
    _avg: FacultyAvgAggregateOutputType | null
    _sum: FacultySumAggregateOutputType | null
    _min: FacultyMinAggregateOutputType | null
    _max: FacultyMaxAggregateOutputType | null
  }

  type GetFacultyGroupByPayload<T extends FacultyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FacultyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FacultyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FacultyGroupByOutputType[P]>
            : GetScalarType<T[P], FacultyGroupByOutputType[P]>
        }
      >
    >


  export type FacultySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    facultyName?: boolean
    phoneNumber?: boolean
  }, ExtArgs["result"]["faculty"]>

  export type FacultySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    facultyName?: boolean
    phoneNumber?: boolean
  }, ExtArgs["result"]["faculty"]>

  export type FacultySelectScalar = {
    id?: boolean
    facultyName?: boolean
    phoneNumber?: boolean
  }


  export type $FacultyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Faculty"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      facultyName: string
      phoneNumber: string | null
    }, ExtArgs["result"]["faculty"]>
    composites: {}
  }

  type FacultyGetPayload<S extends boolean | null | undefined | FacultyDefaultArgs> = $Result.GetResult<Prisma.$FacultyPayload, S>

  type FacultyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FacultyFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FacultyCountAggregateInputType | true
    }

  export interface FacultyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Faculty'], meta: { name: 'Faculty' } }
    /**
     * Find zero or one Faculty that matches the filter.
     * @param {FacultyFindUniqueArgs} args - Arguments to find a Faculty
     * @example
     * // Get one Faculty
     * const faculty = await prisma.faculty.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FacultyFindUniqueArgs>(args: SelectSubset<T, FacultyFindUniqueArgs<ExtArgs>>): Prisma__FacultyClient<$Result.GetResult<Prisma.$FacultyPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Faculty that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FacultyFindUniqueOrThrowArgs} args - Arguments to find a Faculty
     * @example
     * // Get one Faculty
     * const faculty = await prisma.faculty.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FacultyFindUniqueOrThrowArgs>(args: SelectSubset<T, FacultyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FacultyClient<$Result.GetResult<Prisma.$FacultyPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Faculty that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacultyFindFirstArgs} args - Arguments to find a Faculty
     * @example
     * // Get one Faculty
     * const faculty = await prisma.faculty.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FacultyFindFirstArgs>(args?: SelectSubset<T, FacultyFindFirstArgs<ExtArgs>>): Prisma__FacultyClient<$Result.GetResult<Prisma.$FacultyPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Faculty that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacultyFindFirstOrThrowArgs} args - Arguments to find a Faculty
     * @example
     * // Get one Faculty
     * const faculty = await prisma.faculty.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FacultyFindFirstOrThrowArgs>(args?: SelectSubset<T, FacultyFindFirstOrThrowArgs<ExtArgs>>): Prisma__FacultyClient<$Result.GetResult<Prisma.$FacultyPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Faculties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacultyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Faculties
     * const faculties = await prisma.faculty.findMany()
     * 
     * // Get first 10 Faculties
     * const faculties = await prisma.faculty.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const facultyWithIdOnly = await prisma.faculty.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FacultyFindManyArgs>(args?: SelectSubset<T, FacultyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacultyPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Faculty.
     * @param {FacultyCreateArgs} args - Arguments to create a Faculty.
     * @example
     * // Create one Faculty
     * const Faculty = await prisma.faculty.create({
     *   data: {
     *     // ... data to create a Faculty
     *   }
     * })
     * 
     */
    create<T extends FacultyCreateArgs>(args: SelectSubset<T, FacultyCreateArgs<ExtArgs>>): Prisma__FacultyClient<$Result.GetResult<Prisma.$FacultyPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Faculties.
     * @param {FacultyCreateManyArgs} args - Arguments to create many Faculties.
     * @example
     * // Create many Faculties
     * const faculty = await prisma.faculty.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FacultyCreateManyArgs>(args?: SelectSubset<T, FacultyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Faculties and returns the data saved in the database.
     * @param {FacultyCreateManyAndReturnArgs} args - Arguments to create many Faculties.
     * @example
     * // Create many Faculties
     * const faculty = await prisma.faculty.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Faculties and only return the `id`
     * const facultyWithIdOnly = await prisma.faculty.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FacultyCreateManyAndReturnArgs>(args?: SelectSubset<T, FacultyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacultyPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Faculty.
     * @param {FacultyDeleteArgs} args - Arguments to delete one Faculty.
     * @example
     * // Delete one Faculty
     * const Faculty = await prisma.faculty.delete({
     *   where: {
     *     // ... filter to delete one Faculty
     *   }
     * })
     * 
     */
    delete<T extends FacultyDeleteArgs>(args: SelectSubset<T, FacultyDeleteArgs<ExtArgs>>): Prisma__FacultyClient<$Result.GetResult<Prisma.$FacultyPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Faculty.
     * @param {FacultyUpdateArgs} args - Arguments to update one Faculty.
     * @example
     * // Update one Faculty
     * const faculty = await prisma.faculty.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FacultyUpdateArgs>(args: SelectSubset<T, FacultyUpdateArgs<ExtArgs>>): Prisma__FacultyClient<$Result.GetResult<Prisma.$FacultyPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Faculties.
     * @param {FacultyDeleteManyArgs} args - Arguments to filter Faculties to delete.
     * @example
     * // Delete a few Faculties
     * const { count } = await prisma.faculty.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FacultyDeleteManyArgs>(args?: SelectSubset<T, FacultyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Faculties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacultyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Faculties
     * const faculty = await prisma.faculty.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FacultyUpdateManyArgs>(args: SelectSubset<T, FacultyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Faculty.
     * @param {FacultyUpsertArgs} args - Arguments to update or create a Faculty.
     * @example
     * // Update or create a Faculty
     * const faculty = await prisma.faculty.upsert({
     *   create: {
     *     // ... data to create a Faculty
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Faculty we want to update
     *   }
     * })
     */
    upsert<T extends FacultyUpsertArgs>(args: SelectSubset<T, FacultyUpsertArgs<ExtArgs>>): Prisma__FacultyClient<$Result.GetResult<Prisma.$FacultyPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Faculties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacultyCountArgs} args - Arguments to filter Faculties to count.
     * @example
     * // Count the number of Faculties
     * const count = await prisma.faculty.count({
     *   where: {
     *     // ... the filter for the Faculties we want to count
     *   }
     * })
    **/
    count<T extends FacultyCountArgs>(
      args?: Subset<T, FacultyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FacultyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Faculty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacultyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FacultyAggregateArgs>(args: Subset<T, FacultyAggregateArgs>): Prisma.PrismaPromise<GetFacultyAggregateType<T>>

    /**
     * Group by Faculty.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacultyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FacultyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FacultyGroupByArgs['orderBy'] }
        : { orderBy?: FacultyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FacultyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFacultyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Faculty model
   */
  readonly fields: FacultyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Faculty.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FacultyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Faculty model
   */ 
  interface FacultyFieldRefs {
    readonly id: FieldRef<"Faculty", 'Int'>
    readonly facultyName: FieldRef<"Faculty", 'String'>
    readonly phoneNumber: FieldRef<"Faculty", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Faculty findUnique
   */
  export type FacultyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Faculty
     */
    select?: FacultySelect<ExtArgs> | null
    /**
     * Filter, which Faculty to fetch.
     */
    where: FacultyWhereUniqueInput
  }

  /**
   * Faculty findUniqueOrThrow
   */
  export type FacultyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Faculty
     */
    select?: FacultySelect<ExtArgs> | null
    /**
     * Filter, which Faculty to fetch.
     */
    where: FacultyWhereUniqueInput
  }

  /**
   * Faculty findFirst
   */
  export type FacultyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Faculty
     */
    select?: FacultySelect<ExtArgs> | null
    /**
     * Filter, which Faculty to fetch.
     */
    where?: FacultyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Faculties to fetch.
     */
    orderBy?: FacultyOrderByWithRelationInput | FacultyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Faculties.
     */
    cursor?: FacultyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Faculties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Faculties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Faculties.
     */
    distinct?: FacultyScalarFieldEnum | FacultyScalarFieldEnum[]
  }

  /**
   * Faculty findFirstOrThrow
   */
  export type FacultyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Faculty
     */
    select?: FacultySelect<ExtArgs> | null
    /**
     * Filter, which Faculty to fetch.
     */
    where?: FacultyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Faculties to fetch.
     */
    orderBy?: FacultyOrderByWithRelationInput | FacultyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Faculties.
     */
    cursor?: FacultyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Faculties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Faculties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Faculties.
     */
    distinct?: FacultyScalarFieldEnum | FacultyScalarFieldEnum[]
  }

  /**
   * Faculty findMany
   */
  export type FacultyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Faculty
     */
    select?: FacultySelect<ExtArgs> | null
    /**
     * Filter, which Faculties to fetch.
     */
    where?: FacultyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Faculties to fetch.
     */
    orderBy?: FacultyOrderByWithRelationInput | FacultyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Faculties.
     */
    cursor?: FacultyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Faculties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Faculties.
     */
    skip?: number
    distinct?: FacultyScalarFieldEnum | FacultyScalarFieldEnum[]
  }

  /**
   * Faculty create
   */
  export type FacultyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Faculty
     */
    select?: FacultySelect<ExtArgs> | null
    /**
     * The data needed to create a Faculty.
     */
    data: XOR<FacultyCreateInput, FacultyUncheckedCreateInput>
  }

  /**
   * Faculty createMany
   */
  export type FacultyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Faculties.
     */
    data: FacultyCreateManyInput | FacultyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Faculty createManyAndReturn
   */
  export type FacultyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Faculty
     */
    select?: FacultySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Faculties.
     */
    data: FacultyCreateManyInput | FacultyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Faculty update
   */
  export type FacultyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Faculty
     */
    select?: FacultySelect<ExtArgs> | null
    /**
     * The data needed to update a Faculty.
     */
    data: XOR<FacultyUpdateInput, FacultyUncheckedUpdateInput>
    /**
     * Choose, which Faculty to update.
     */
    where: FacultyWhereUniqueInput
  }

  /**
   * Faculty updateMany
   */
  export type FacultyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Faculties.
     */
    data: XOR<FacultyUpdateManyMutationInput, FacultyUncheckedUpdateManyInput>
    /**
     * Filter which Faculties to update
     */
    where?: FacultyWhereInput
  }

  /**
   * Faculty upsert
   */
  export type FacultyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Faculty
     */
    select?: FacultySelect<ExtArgs> | null
    /**
     * The filter to search for the Faculty to update in case it exists.
     */
    where: FacultyWhereUniqueInput
    /**
     * In case the Faculty found by the `where` argument doesn't exist, create a new Faculty with this data.
     */
    create: XOR<FacultyCreateInput, FacultyUncheckedCreateInput>
    /**
     * In case the Faculty was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FacultyUpdateInput, FacultyUncheckedUpdateInput>
  }

  /**
   * Faculty delete
   */
  export type FacultyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Faculty
     */
    select?: FacultySelect<ExtArgs> | null
    /**
     * Filter which Faculty to delete.
     */
    where: FacultyWhereUniqueInput
  }

  /**
   * Faculty deleteMany
   */
  export type FacultyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Faculties to delete
     */
    where?: FacultyWhereInput
  }

  /**
   * Faculty without action
   */
  export type FacultyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Faculty
     */
    select?: FacultySelect<ExtArgs> | null
  }


  /**
   * Model Timetable
   */

  export type AggregateTimetable = {
    _count: TimetableCountAggregateOutputType | null
    _avg: TimetableAvgAggregateOutputType | null
    _sum: TimetableSumAggregateOutputType | null
    _min: TimetableMinAggregateOutputType | null
    _max: TimetableMaxAggregateOutputType | null
  }

  export type TimetableAvgAggregateOutputType = {
    id: number | null
    classroomId: number | null
    periodNo: number | null
  }

  export type TimetableSumAggregateOutputType = {
    id: number | null
    classroomId: number | null
    periodNo: number | null
  }

  export type TimetableMinAggregateOutputType = {
    id: number | null
    classroomId: number | null
    day: string | null
    periodNo: number | null
    startTime: string | null
    endTime: string | null
    facultyName: string | null
    subjectName: string | null
  }

  export type TimetableMaxAggregateOutputType = {
    id: number | null
    classroomId: number | null
    day: string | null
    periodNo: number | null
    startTime: string | null
    endTime: string | null
    facultyName: string | null
    subjectName: string | null
  }

  export type TimetableCountAggregateOutputType = {
    id: number
    classroomId: number
    day: number
    periodNo: number
    startTime: number
    endTime: number
    facultyName: number
    subjectName: number
    _all: number
  }


  export type TimetableAvgAggregateInputType = {
    id?: true
    classroomId?: true
    periodNo?: true
  }

  export type TimetableSumAggregateInputType = {
    id?: true
    classroomId?: true
    periodNo?: true
  }

  export type TimetableMinAggregateInputType = {
    id?: true
    classroomId?: true
    day?: true
    periodNo?: true
    startTime?: true
    endTime?: true
    facultyName?: true
    subjectName?: true
  }

  export type TimetableMaxAggregateInputType = {
    id?: true
    classroomId?: true
    day?: true
    periodNo?: true
    startTime?: true
    endTime?: true
    facultyName?: true
    subjectName?: true
  }

  export type TimetableCountAggregateInputType = {
    id?: true
    classroomId?: true
    day?: true
    periodNo?: true
    startTime?: true
    endTime?: true
    facultyName?: true
    subjectName?: true
    _all?: true
  }

  export type TimetableAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Timetable to aggregate.
     */
    where?: TimetableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timetables to fetch.
     */
    orderBy?: TimetableOrderByWithRelationInput | TimetableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TimetableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timetables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timetables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Timetables
    **/
    _count?: true | TimetableCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TimetableAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TimetableSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TimetableMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TimetableMaxAggregateInputType
  }

  export type GetTimetableAggregateType<T extends TimetableAggregateArgs> = {
        [P in keyof T & keyof AggregateTimetable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTimetable[P]>
      : GetScalarType<T[P], AggregateTimetable[P]>
  }




  export type TimetableGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TimetableWhereInput
    orderBy?: TimetableOrderByWithAggregationInput | TimetableOrderByWithAggregationInput[]
    by: TimetableScalarFieldEnum[] | TimetableScalarFieldEnum
    having?: TimetableScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TimetableCountAggregateInputType | true
    _avg?: TimetableAvgAggregateInputType
    _sum?: TimetableSumAggregateInputType
    _min?: TimetableMinAggregateInputType
    _max?: TimetableMaxAggregateInputType
  }

  export type TimetableGroupByOutputType = {
    id: number
    classroomId: number
    day: string
    periodNo: number
    startTime: string
    endTime: string
    facultyName: string
    subjectName: string
    _count: TimetableCountAggregateOutputType | null
    _avg: TimetableAvgAggregateOutputType | null
    _sum: TimetableSumAggregateOutputType | null
    _min: TimetableMinAggregateOutputType | null
    _max: TimetableMaxAggregateOutputType | null
  }

  type GetTimetableGroupByPayload<T extends TimetableGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TimetableGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TimetableGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TimetableGroupByOutputType[P]>
            : GetScalarType<T[P], TimetableGroupByOutputType[P]>
        }
      >
    >


  export type TimetableSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    classroomId?: boolean
    day?: boolean
    periodNo?: boolean
    startTime?: boolean
    endTime?: boolean
    facultyName?: boolean
    subjectName?: boolean
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timetable"]>

  export type TimetableSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    classroomId?: boolean
    day?: boolean
    periodNo?: boolean
    startTime?: boolean
    endTime?: boolean
    facultyName?: boolean
    subjectName?: boolean
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["timetable"]>

  export type TimetableSelectScalar = {
    id?: boolean
    classroomId?: boolean
    day?: boolean
    periodNo?: boolean
    startTime?: boolean
    endTime?: boolean
    facultyName?: boolean
    subjectName?: boolean
  }

  export type TimetableInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
  }
  export type TimetableIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
  }

  export type $TimetablePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Timetable"
    objects: {
      classroom: Prisma.$ClassroomPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      classroomId: number
      day: string
      periodNo: number
      startTime: string
      endTime: string
      facultyName: string
      subjectName: string
    }, ExtArgs["result"]["timetable"]>
    composites: {}
  }

  type TimetableGetPayload<S extends boolean | null | undefined | TimetableDefaultArgs> = $Result.GetResult<Prisma.$TimetablePayload, S>

  type TimetableCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<TimetableFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: TimetableCountAggregateInputType | true
    }

  export interface TimetableDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Timetable'], meta: { name: 'Timetable' } }
    /**
     * Find zero or one Timetable that matches the filter.
     * @param {TimetableFindUniqueArgs} args - Arguments to find a Timetable
     * @example
     * // Get one Timetable
     * const timetable = await prisma.timetable.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TimetableFindUniqueArgs>(args: SelectSubset<T, TimetableFindUniqueArgs<ExtArgs>>): Prisma__TimetableClient<$Result.GetResult<Prisma.$TimetablePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Timetable that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {TimetableFindUniqueOrThrowArgs} args - Arguments to find a Timetable
     * @example
     * // Get one Timetable
     * const timetable = await prisma.timetable.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TimetableFindUniqueOrThrowArgs>(args: SelectSubset<T, TimetableFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TimetableClient<$Result.GetResult<Prisma.$TimetablePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Timetable that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimetableFindFirstArgs} args - Arguments to find a Timetable
     * @example
     * // Get one Timetable
     * const timetable = await prisma.timetable.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TimetableFindFirstArgs>(args?: SelectSubset<T, TimetableFindFirstArgs<ExtArgs>>): Prisma__TimetableClient<$Result.GetResult<Prisma.$TimetablePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Timetable that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimetableFindFirstOrThrowArgs} args - Arguments to find a Timetable
     * @example
     * // Get one Timetable
     * const timetable = await prisma.timetable.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TimetableFindFirstOrThrowArgs>(args?: SelectSubset<T, TimetableFindFirstOrThrowArgs<ExtArgs>>): Prisma__TimetableClient<$Result.GetResult<Prisma.$TimetablePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Timetables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimetableFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Timetables
     * const timetables = await prisma.timetable.findMany()
     * 
     * // Get first 10 Timetables
     * const timetables = await prisma.timetable.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const timetableWithIdOnly = await prisma.timetable.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TimetableFindManyArgs>(args?: SelectSubset<T, TimetableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimetablePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Timetable.
     * @param {TimetableCreateArgs} args - Arguments to create a Timetable.
     * @example
     * // Create one Timetable
     * const Timetable = await prisma.timetable.create({
     *   data: {
     *     // ... data to create a Timetable
     *   }
     * })
     * 
     */
    create<T extends TimetableCreateArgs>(args: SelectSubset<T, TimetableCreateArgs<ExtArgs>>): Prisma__TimetableClient<$Result.GetResult<Prisma.$TimetablePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Timetables.
     * @param {TimetableCreateManyArgs} args - Arguments to create many Timetables.
     * @example
     * // Create many Timetables
     * const timetable = await prisma.timetable.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TimetableCreateManyArgs>(args?: SelectSubset<T, TimetableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Timetables and returns the data saved in the database.
     * @param {TimetableCreateManyAndReturnArgs} args - Arguments to create many Timetables.
     * @example
     * // Create many Timetables
     * const timetable = await prisma.timetable.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Timetables and only return the `id`
     * const timetableWithIdOnly = await prisma.timetable.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TimetableCreateManyAndReturnArgs>(args?: SelectSubset<T, TimetableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TimetablePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Timetable.
     * @param {TimetableDeleteArgs} args - Arguments to delete one Timetable.
     * @example
     * // Delete one Timetable
     * const Timetable = await prisma.timetable.delete({
     *   where: {
     *     // ... filter to delete one Timetable
     *   }
     * })
     * 
     */
    delete<T extends TimetableDeleteArgs>(args: SelectSubset<T, TimetableDeleteArgs<ExtArgs>>): Prisma__TimetableClient<$Result.GetResult<Prisma.$TimetablePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Timetable.
     * @param {TimetableUpdateArgs} args - Arguments to update one Timetable.
     * @example
     * // Update one Timetable
     * const timetable = await prisma.timetable.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TimetableUpdateArgs>(args: SelectSubset<T, TimetableUpdateArgs<ExtArgs>>): Prisma__TimetableClient<$Result.GetResult<Prisma.$TimetablePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Timetables.
     * @param {TimetableDeleteManyArgs} args - Arguments to filter Timetables to delete.
     * @example
     * // Delete a few Timetables
     * const { count } = await prisma.timetable.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TimetableDeleteManyArgs>(args?: SelectSubset<T, TimetableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Timetables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimetableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Timetables
     * const timetable = await prisma.timetable.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TimetableUpdateManyArgs>(args: SelectSubset<T, TimetableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Timetable.
     * @param {TimetableUpsertArgs} args - Arguments to update or create a Timetable.
     * @example
     * // Update or create a Timetable
     * const timetable = await prisma.timetable.upsert({
     *   create: {
     *     // ... data to create a Timetable
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Timetable we want to update
     *   }
     * })
     */
    upsert<T extends TimetableUpsertArgs>(args: SelectSubset<T, TimetableUpsertArgs<ExtArgs>>): Prisma__TimetableClient<$Result.GetResult<Prisma.$TimetablePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Timetables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimetableCountArgs} args - Arguments to filter Timetables to count.
     * @example
     * // Count the number of Timetables
     * const count = await prisma.timetable.count({
     *   where: {
     *     // ... the filter for the Timetables we want to count
     *   }
     * })
    **/
    count<T extends TimetableCountArgs>(
      args?: Subset<T, TimetableCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TimetableCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Timetable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimetableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TimetableAggregateArgs>(args: Subset<T, TimetableAggregateArgs>): Prisma.PrismaPromise<GetTimetableAggregateType<T>>

    /**
     * Group by Timetable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TimetableGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TimetableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TimetableGroupByArgs['orderBy'] }
        : { orderBy?: TimetableGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TimetableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTimetableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Timetable model
   */
  readonly fields: TimetableFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Timetable.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TimetableClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    classroom<T extends ClassroomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassroomDefaultArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Timetable model
   */ 
  interface TimetableFieldRefs {
    readonly id: FieldRef<"Timetable", 'Int'>
    readonly classroomId: FieldRef<"Timetable", 'Int'>
    readonly day: FieldRef<"Timetable", 'String'>
    readonly periodNo: FieldRef<"Timetable", 'Int'>
    readonly startTime: FieldRef<"Timetable", 'String'>
    readonly endTime: FieldRef<"Timetable", 'String'>
    readonly facultyName: FieldRef<"Timetable", 'String'>
    readonly subjectName: FieldRef<"Timetable", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Timetable findUnique
   */
  export type TimetableFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timetable
     */
    select?: TimetableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimetableInclude<ExtArgs> | null
    /**
     * Filter, which Timetable to fetch.
     */
    where: TimetableWhereUniqueInput
  }

  /**
   * Timetable findUniqueOrThrow
   */
  export type TimetableFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timetable
     */
    select?: TimetableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimetableInclude<ExtArgs> | null
    /**
     * Filter, which Timetable to fetch.
     */
    where: TimetableWhereUniqueInput
  }

  /**
   * Timetable findFirst
   */
  export type TimetableFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timetable
     */
    select?: TimetableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimetableInclude<ExtArgs> | null
    /**
     * Filter, which Timetable to fetch.
     */
    where?: TimetableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timetables to fetch.
     */
    orderBy?: TimetableOrderByWithRelationInput | TimetableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Timetables.
     */
    cursor?: TimetableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timetables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timetables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Timetables.
     */
    distinct?: TimetableScalarFieldEnum | TimetableScalarFieldEnum[]
  }

  /**
   * Timetable findFirstOrThrow
   */
  export type TimetableFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timetable
     */
    select?: TimetableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimetableInclude<ExtArgs> | null
    /**
     * Filter, which Timetable to fetch.
     */
    where?: TimetableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timetables to fetch.
     */
    orderBy?: TimetableOrderByWithRelationInput | TimetableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Timetables.
     */
    cursor?: TimetableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timetables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timetables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Timetables.
     */
    distinct?: TimetableScalarFieldEnum | TimetableScalarFieldEnum[]
  }

  /**
   * Timetable findMany
   */
  export type TimetableFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timetable
     */
    select?: TimetableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimetableInclude<ExtArgs> | null
    /**
     * Filter, which Timetables to fetch.
     */
    where?: TimetableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Timetables to fetch.
     */
    orderBy?: TimetableOrderByWithRelationInput | TimetableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Timetables.
     */
    cursor?: TimetableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Timetables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Timetables.
     */
    skip?: number
    distinct?: TimetableScalarFieldEnum | TimetableScalarFieldEnum[]
  }

  /**
   * Timetable create
   */
  export type TimetableCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timetable
     */
    select?: TimetableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimetableInclude<ExtArgs> | null
    /**
     * The data needed to create a Timetable.
     */
    data: XOR<TimetableCreateInput, TimetableUncheckedCreateInput>
  }

  /**
   * Timetable createMany
   */
  export type TimetableCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Timetables.
     */
    data: TimetableCreateManyInput | TimetableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Timetable createManyAndReturn
   */
  export type TimetableCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timetable
     */
    select?: TimetableSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Timetables.
     */
    data: TimetableCreateManyInput | TimetableCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimetableIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Timetable update
   */
  export type TimetableUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timetable
     */
    select?: TimetableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimetableInclude<ExtArgs> | null
    /**
     * The data needed to update a Timetable.
     */
    data: XOR<TimetableUpdateInput, TimetableUncheckedUpdateInput>
    /**
     * Choose, which Timetable to update.
     */
    where: TimetableWhereUniqueInput
  }

  /**
   * Timetable updateMany
   */
  export type TimetableUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Timetables.
     */
    data: XOR<TimetableUpdateManyMutationInput, TimetableUncheckedUpdateManyInput>
    /**
     * Filter which Timetables to update
     */
    where?: TimetableWhereInput
  }

  /**
   * Timetable upsert
   */
  export type TimetableUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timetable
     */
    select?: TimetableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimetableInclude<ExtArgs> | null
    /**
     * The filter to search for the Timetable to update in case it exists.
     */
    where: TimetableWhereUniqueInput
    /**
     * In case the Timetable found by the `where` argument doesn't exist, create a new Timetable with this data.
     */
    create: XOR<TimetableCreateInput, TimetableUncheckedCreateInput>
    /**
     * In case the Timetable was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TimetableUpdateInput, TimetableUncheckedUpdateInput>
  }

  /**
   * Timetable delete
   */
  export type TimetableDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timetable
     */
    select?: TimetableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimetableInclude<ExtArgs> | null
    /**
     * Filter which Timetable to delete.
     */
    where: TimetableWhereUniqueInput
  }

  /**
   * Timetable deleteMany
   */
  export type TimetableDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Timetables to delete
     */
    where?: TimetableWhereInput
  }

  /**
   * Timetable without action
   */
  export type TimetableDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Timetable
     */
    select?: TimetableSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TimetableInclude<ExtArgs> | null
  }


  /**
   * Model FacultyLog
   */

  export type AggregateFacultyLog = {
    _count: FacultyLogCountAggregateOutputType | null
    _avg: FacultyLogAvgAggregateOutputType | null
    _sum: FacultyLogSumAggregateOutputType | null
    _min: FacultyLogMinAggregateOutputType | null
    _max: FacultyLogMaxAggregateOutputType | null
  }

  export type FacultyLogAvgAggregateOutputType = {
    id: number | null
    classroomId: number | null
    periodNo: number | null
  }

  export type FacultyLogSumAggregateOutputType = {
    id: number | null
    classroomId: number | null
    periodNo: number | null
  }

  export type FacultyLogMinAggregateOutputType = {
    id: number | null
    classroomId: number | null
    facultyName: string | null
    periodNo: number | null
    entryTime: Date | null
    status: string | null
    createdAt: Date | null
  }

  export type FacultyLogMaxAggregateOutputType = {
    id: number | null
    classroomId: number | null
    facultyName: string | null
    periodNo: number | null
    entryTime: Date | null
    status: string | null
    createdAt: Date | null
  }

  export type FacultyLogCountAggregateOutputType = {
    id: number
    classroomId: number
    facultyName: number
    periodNo: number
    entryTime: number
    status: number
    createdAt: number
    _all: number
  }


  export type FacultyLogAvgAggregateInputType = {
    id?: true
    classroomId?: true
    periodNo?: true
  }

  export type FacultyLogSumAggregateInputType = {
    id?: true
    classroomId?: true
    periodNo?: true
  }

  export type FacultyLogMinAggregateInputType = {
    id?: true
    classroomId?: true
    facultyName?: true
    periodNo?: true
    entryTime?: true
    status?: true
    createdAt?: true
  }

  export type FacultyLogMaxAggregateInputType = {
    id?: true
    classroomId?: true
    facultyName?: true
    periodNo?: true
    entryTime?: true
    status?: true
    createdAt?: true
  }

  export type FacultyLogCountAggregateInputType = {
    id?: true
    classroomId?: true
    facultyName?: true
    periodNo?: true
    entryTime?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type FacultyLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FacultyLog to aggregate.
     */
    where?: FacultyLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacultyLogs to fetch.
     */
    orderBy?: FacultyLogOrderByWithRelationInput | FacultyLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FacultyLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacultyLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacultyLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FacultyLogs
    **/
    _count?: true | FacultyLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FacultyLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FacultyLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FacultyLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FacultyLogMaxAggregateInputType
  }

  export type GetFacultyLogAggregateType<T extends FacultyLogAggregateArgs> = {
        [P in keyof T & keyof AggregateFacultyLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFacultyLog[P]>
      : GetScalarType<T[P], AggregateFacultyLog[P]>
  }




  export type FacultyLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FacultyLogWhereInput
    orderBy?: FacultyLogOrderByWithAggregationInput | FacultyLogOrderByWithAggregationInput[]
    by: FacultyLogScalarFieldEnum[] | FacultyLogScalarFieldEnum
    having?: FacultyLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FacultyLogCountAggregateInputType | true
    _avg?: FacultyLogAvgAggregateInputType
    _sum?: FacultyLogSumAggregateInputType
    _min?: FacultyLogMinAggregateInputType
    _max?: FacultyLogMaxAggregateInputType
  }

  export type FacultyLogGroupByOutputType = {
    id: number
    classroomId: number
    facultyName: string
    periodNo: number
    entryTime: Date | null
    status: string
    createdAt: Date
    _count: FacultyLogCountAggregateOutputType | null
    _avg: FacultyLogAvgAggregateOutputType | null
    _sum: FacultyLogSumAggregateOutputType | null
    _min: FacultyLogMinAggregateOutputType | null
    _max: FacultyLogMaxAggregateOutputType | null
  }

  type GetFacultyLogGroupByPayload<T extends FacultyLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FacultyLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FacultyLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FacultyLogGroupByOutputType[P]>
            : GetScalarType<T[P], FacultyLogGroupByOutputType[P]>
        }
      >
    >


  export type FacultyLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    classroomId?: boolean
    facultyName?: boolean
    periodNo?: boolean
    entryTime?: boolean
    status?: boolean
    createdAt?: boolean
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["facultyLog"]>

  export type FacultyLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    classroomId?: boolean
    facultyName?: boolean
    periodNo?: boolean
    entryTime?: boolean
    status?: boolean
    createdAt?: boolean
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["facultyLog"]>

  export type FacultyLogSelectScalar = {
    id?: boolean
    classroomId?: boolean
    facultyName?: boolean
    periodNo?: boolean
    entryTime?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type FacultyLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
  }
  export type FacultyLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    classroom?: boolean | ClassroomDefaultArgs<ExtArgs>
  }

  export type $FacultyLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FacultyLog"
    objects: {
      classroom: Prisma.$ClassroomPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      classroomId: number
      facultyName: string
      periodNo: number
      entryTime: Date | null
      status: string
      createdAt: Date
    }, ExtArgs["result"]["facultyLog"]>
    composites: {}
  }

  type FacultyLogGetPayload<S extends boolean | null | undefined | FacultyLogDefaultArgs> = $Result.GetResult<Prisma.$FacultyLogPayload, S>

  type FacultyLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FacultyLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FacultyLogCountAggregateInputType | true
    }

  export interface FacultyLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FacultyLog'], meta: { name: 'FacultyLog' } }
    /**
     * Find zero or one FacultyLog that matches the filter.
     * @param {FacultyLogFindUniqueArgs} args - Arguments to find a FacultyLog
     * @example
     * // Get one FacultyLog
     * const facultyLog = await prisma.facultyLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FacultyLogFindUniqueArgs>(args: SelectSubset<T, FacultyLogFindUniqueArgs<ExtArgs>>): Prisma__FacultyLogClient<$Result.GetResult<Prisma.$FacultyLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FacultyLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FacultyLogFindUniqueOrThrowArgs} args - Arguments to find a FacultyLog
     * @example
     * // Get one FacultyLog
     * const facultyLog = await prisma.facultyLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FacultyLogFindUniqueOrThrowArgs>(args: SelectSubset<T, FacultyLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FacultyLogClient<$Result.GetResult<Prisma.$FacultyLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FacultyLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacultyLogFindFirstArgs} args - Arguments to find a FacultyLog
     * @example
     * // Get one FacultyLog
     * const facultyLog = await prisma.facultyLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FacultyLogFindFirstArgs>(args?: SelectSubset<T, FacultyLogFindFirstArgs<ExtArgs>>): Prisma__FacultyLogClient<$Result.GetResult<Prisma.$FacultyLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FacultyLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacultyLogFindFirstOrThrowArgs} args - Arguments to find a FacultyLog
     * @example
     * // Get one FacultyLog
     * const facultyLog = await prisma.facultyLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FacultyLogFindFirstOrThrowArgs>(args?: SelectSubset<T, FacultyLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__FacultyLogClient<$Result.GetResult<Prisma.$FacultyLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FacultyLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacultyLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FacultyLogs
     * const facultyLogs = await prisma.facultyLog.findMany()
     * 
     * // Get first 10 FacultyLogs
     * const facultyLogs = await prisma.facultyLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const facultyLogWithIdOnly = await prisma.facultyLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FacultyLogFindManyArgs>(args?: SelectSubset<T, FacultyLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacultyLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FacultyLog.
     * @param {FacultyLogCreateArgs} args - Arguments to create a FacultyLog.
     * @example
     * // Create one FacultyLog
     * const FacultyLog = await prisma.facultyLog.create({
     *   data: {
     *     // ... data to create a FacultyLog
     *   }
     * })
     * 
     */
    create<T extends FacultyLogCreateArgs>(args: SelectSubset<T, FacultyLogCreateArgs<ExtArgs>>): Prisma__FacultyLogClient<$Result.GetResult<Prisma.$FacultyLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FacultyLogs.
     * @param {FacultyLogCreateManyArgs} args - Arguments to create many FacultyLogs.
     * @example
     * // Create many FacultyLogs
     * const facultyLog = await prisma.facultyLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FacultyLogCreateManyArgs>(args?: SelectSubset<T, FacultyLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FacultyLogs and returns the data saved in the database.
     * @param {FacultyLogCreateManyAndReturnArgs} args - Arguments to create many FacultyLogs.
     * @example
     * // Create many FacultyLogs
     * const facultyLog = await prisma.facultyLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FacultyLogs and only return the `id`
     * const facultyLogWithIdOnly = await prisma.facultyLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FacultyLogCreateManyAndReturnArgs>(args?: SelectSubset<T, FacultyLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FacultyLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FacultyLog.
     * @param {FacultyLogDeleteArgs} args - Arguments to delete one FacultyLog.
     * @example
     * // Delete one FacultyLog
     * const FacultyLog = await prisma.facultyLog.delete({
     *   where: {
     *     // ... filter to delete one FacultyLog
     *   }
     * })
     * 
     */
    delete<T extends FacultyLogDeleteArgs>(args: SelectSubset<T, FacultyLogDeleteArgs<ExtArgs>>): Prisma__FacultyLogClient<$Result.GetResult<Prisma.$FacultyLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FacultyLog.
     * @param {FacultyLogUpdateArgs} args - Arguments to update one FacultyLog.
     * @example
     * // Update one FacultyLog
     * const facultyLog = await prisma.facultyLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FacultyLogUpdateArgs>(args: SelectSubset<T, FacultyLogUpdateArgs<ExtArgs>>): Prisma__FacultyLogClient<$Result.GetResult<Prisma.$FacultyLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FacultyLogs.
     * @param {FacultyLogDeleteManyArgs} args - Arguments to filter FacultyLogs to delete.
     * @example
     * // Delete a few FacultyLogs
     * const { count } = await prisma.facultyLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FacultyLogDeleteManyArgs>(args?: SelectSubset<T, FacultyLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FacultyLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacultyLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FacultyLogs
     * const facultyLog = await prisma.facultyLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FacultyLogUpdateManyArgs>(args: SelectSubset<T, FacultyLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FacultyLog.
     * @param {FacultyLogUpsertArgs} args - Arguments to update or create a FacultyLog.
     * @example
     * // Update or create a FacultyLog
     * const facultyLog = await prisma.facultyLog.upsert({
     *   create: {
     *     // ... data to create a FacultyLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FacultyLog we want to update
     *   }
     * })
     */
    upsert<T extends FacultyLogUpsertArgs>(args: SelectSubset<T, FacultyLogUpsertArgs<ExtArgs>>): Prisma__FacultyLogClient<$Result.GetResult<Prisma.$FacultyLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FacultyLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacultyLogCountArgs} args - Arguments to filter FacultyLogs to count.
     * @example
     * // Count the number of FacultyLogs
     * const count = await prisma.facultyLog.count({
     *   where: {
     *     // ... the filter for the FacultyLogs we want to count
     *   }
     * })
    **/
    count<T extends FacultyLogCountArgs>(
      args?: Subset<T, FacultyLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FacultyLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FacultyLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacultyLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FacultyLogAggregateArgs>(args: Subset<T, FacultyLogAggregateArgs>): Prisma.PrismaPromise<GetFacultyLogAggregateType<T>>

    /**
     * Group by FacultyLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacultyLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FacultyLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FacultyLogGroupByArgs['orderBy'] }
        : { orderBy?: FacultyLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FacultyLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFacultyLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FacultyLog model
   */
  readonly fields: FacultyLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FacultyLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FacultyLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    classroom<T extends ClassroomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassroomDefaultArgs<ExtArgs>>): Prisma__ClassroomClient<$Result.GetResult<Prisma.$ClassroomPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FacultyLog model
   */ 
  interface FacultyLogFieldRefs {
    readonly id: FieldRef<"FacultyLog", 'Int'>
    readonly classroomId: FieldRef<"FacultyLog", 'Int'>
    readonly facultyName: FieldRef<"FacultyLog", 'String'>
    readonly periodNo: FieldRef<"FacultyLog", 'Int'>
    readonly entryTime: FieldRef<"FacultyLog", 'DateTime'>
    readonly status: FieldRef<"FacultyLog", 'String'>
    readonly createdAt: FieldRef<"FacultyLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FacultyLog findUnique
   */
  export type FacultyLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacultyLog
     */
    select?: FacultyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacultyLogInclude<ExtArgs> | null
    /**
     * Filter, which FacultyLog to fetch.
     */
    where: FacultyLogWhereUniqueInput
  }

  /**
   * FacultyLog findUniqueOrThrow
   */
  export type FacultyLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacultyLog
     */
    select?: FacultyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacultyLogInclude<ExtArgs> | null
    /**
     * Filter, which FacultyLog to fetch.
     */
    where: FacultyLogWhereUniqueInput
  }

  /**
   * FacultyLog findFirst
   */
  export type FacultyLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacultyLog
     */
    select?: FacultyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacultyLogInclude<ExtArgs> | null
    /**
     * Filter, which FacultyLog to fetch.
     */
    where?: FacultyLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacultyLogs to fetch.
     */
    orderBy?: FacultyLogOrderByWithRelationInput | FacultyLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FacultyLogs.
     */
    cursor?: FacultyLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacultyLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacultyLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FacultyLogs.
     */
    distinct?: FacultyLogScalarFieldEnum | FacultyLogScalarFieldEnum[]
  }

  /**
   * FacultyLog findFirstOrThrow
   */
  export type FacultyLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacultyLog
     */
    select?: FacultyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacultyLogInclude<ExtArgs> | null
    /**
     * Filter, which FacultyLog to fetch.
     */
    where?: FacultyLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacultyLogs to fetch.
     */
    orderBy?: FacultyLogOrderByWithRelationInput | FacultyLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FacultyLogs.
     */
    cursor?: FacultyLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacultyLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacultyLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FacultyLogs.
     */
    distinct?: FacultyLogScalarFieldEnum | FacultyLogScalarFieldEnum[]
  }

  /**
   * FacultyLog findMany
   */
  export type FacultyLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacultyLog
     */
    select?: FacultyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacultyLogInclude<ExtArgs> | null
    /**
     * Filter, which FacultyLogs to fetch.
     */
    where?: FacultyLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacultyLogs to fetch.
     */
    orderBy?: FacultyLogOrderByWithRelationInput | FacultyLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FacultyLogs.
     */
    cursor?: FacultyLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacultyLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacultyLogs.
     */
    skip?: number
    distinct?: FacultyLogScalarFieldEnum | FacultyLogScalarFieldEnum[]
  }

  /**
   * FacultyLog create
   */
  export type FacultyLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacultyLog
     */
    select?: FacultyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacultyLogInclude<ExtArgs> | null
    /**
     * The data needed to create a FacultyLog.
     */
    data: XOR<FacultyLogCreateInput, FacultyLogUncheckedCreateInput>
  }

  /**
   * FacultyLog createMany
   */
  export type FacultyLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FacultyLogs.
     */
    data: FacultyLogCreateManyInput | FacultyLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FacultyLog createManyAndReturn
   */
  export type FacultyLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacultyLog
     */
    select?: FacultyLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FacultyLogs.
     */
    data: FacultyLogCreateManyInput | FacultyLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacultyLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FacultyLog update
   */
  export type FacultyLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacultyLog
     */
    select?: FacultyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacultyLogInclude<ExtArgs> | null
    /**
     * The data needed to update a FacultyLog.
     */
    data: XOR<FacultyLogUpdateInput, FacultyLogUncheckedUpdateInput>
    /**
     * Choose, which FacultyLog to update.
     */
    where: FacultyLogWhereUniqueInput
  }

  /**
   * FacultyLog updateMany
   */
  export type FacultyLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FacultyLogs.
     */
    data: XOR<FacultyLogUpdateManyMutationInput, FacultyLogUncheckedUpdateManyInput>
    /**
     * Filter which FacultyLogs to update
     */
    where?: FacultyLogWhereInput
  }

  /**
   * FacultyLog upsert
   */
  export type FacultyLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacultyLog
     */
    select?: FacultyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacultyLogInclude<ExtArgs> | null
    /**
     * The filter to search for the FacultyLog to update in case it exists.
     */
    where: FacultyLogWhereUniqueInput
    /**
     * In case the FacultyLog found by the `where` argument doesn't exist, create a new FacultyLog with this data.
     */
    create: XOR<FacultyLogCreateInput, FacultyLogUncheckedCreateInput>
    /**
     * In case the FacultyLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FacultyLogUpdateInput, FacultyLogUncheckedUpdateInput>
  }

  /**
   * FacultyLog delete
   */
  export type FacultyLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacultyLog
     */
    select?: FacultyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacultyLogInclude<ExtArgs> | null
    /**
     * Filter which FacultyLog to delete.
     */
    where: FacultyLogWhereUniqueInput
  }

  /**
   * FacultyLog deleteMany
   */
  export type FacultyLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FacultyLogs to delete
     */
    where?: FacultyLogWhereInput
  }

  /**
   * FacultyLog without action
   */
  export type FacultyLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FacultyLog
     */
    select?: FacultyLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FacultyLogInclude<ExtArgs> | null
  }


  /**
   * Model SystemSetting
   */

  export type AggregateSystemSetting = {
    _count: SystemSettingCountAggregateOutputType | null
    _avg: SystemSettingAvgAggregateOutputType | null
    _sum: SystemSettingSumAggregateOutputType | null
    _min: SystemSettingMinAggregateOutputType | null
    _max: SystemSettingMaxAggregateOutputType | null
  }

  export type SystemSettingAvgAggregateOutputType = {
    id: number | null
  }

  export type SystemSettingSumAggregateOutputType = {
    id: number | null
  }

  export type SystemSettingMinAggregateOutputType = {
    id: number | null
    key: string | null
    value: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemSettingMaxAggregateOutputType = {
    id: number | null
    key: string | null
    value: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SystemSettingCountAggregateOutputType = {
    id: number
    key: number
    value: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SystemSettingAvgAggregateInputType = {
    id?: true
  }

  export type SystemSettingSumAggregateInputType = {
    id?: true
  }

  export type SystemSettingMinAggregateInputType = {
    id?: true
    key?: true
    value?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemSettingMaxAggregateInputType = {
    id?: true
    key?: true
    value?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SystemSettingCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SystemSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemSetting to aggregate.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SystemSettings
    **/
    _count?: true | SystemSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SystemSettingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SystemSettingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SystemSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SystemSettingMaxAggregateInputType
  }

  export type GetSystemSettingAggregateType<T extends SystemSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSystemSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSystemSetting[P]>
      : GetScalarType<T[P], AggregateSystemSetting[P]>
  }




  export type SystemSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SystemSettingWhereInput
    orderBy?: SystemSettingOrderByWithAggregationInput | SystemSettingOrderByWithAggregationInput[]
    by: SystemSettingScalarFieldEnum[] | SystemSettingScalarFieldEnum
    having?: SystemSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SystemSettingCountAggregateInputType | true
    _avg?: SystemSettingAvgAggregateInputType
    _sum?: SystemSettingSumAggregateInputType
    _min?: SystemSettingMinAggregateInputType
    _max?: SystemSettingMaxAggregateInputType
  }

  export type SystemSettingGroupByOutputType = {
    id: number
    key: string
    value: string
    createdAt: Date
    updatedAt: Date
    _count: SystemSettingCountAggregateOutputType | null
    _avg: SystemSettingAvgAggregateOutputType | null
    _sum: SystemSettingSumAggregateOutputType | null
    _min: SystemSettingMinAggregateOutputType | null
    _max: SystemSettingMaxAggregateOutputType | null
  }

  type GetSystemSettingGroupByPayload<T extends SystemSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SystemSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SystemSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SystemSettingGroupByOutputType[P]>
            : GetScalarType<T[P], SystemSettingGroupByOutputType[P]>
        }
      >
    >


  export type SystemSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemSetting"]>

  export type SystemSettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["systemSetting"]>

  export type SystemSettingSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $SystemSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SystemSetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      key: string
      value: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["systemSetting"]>
    composites: {}
  }

  type SystemSettingGetPayload<S extends boolean | null | undefined | SystemSettingDefaultArgs> = $Result.GetResult<Prisma.$SystemSettingPayload, S>

  type SystemSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SystemSettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SystemSettingCountAggregateInputType | true
    }

  export interface SystemSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SystemSetting'], meta: { name: 'SystemSetting' } }
    /**
     * Find zero or one SystemSetting that matches the filter.
     * @param {SystemSettingFindUniqueArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SystemSettingFindUniqueArgs>(args: SelectSubset<T, SystemSettingFindUniqueArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one SystemSetting that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SystemSettingFindUniqueOrThrowArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SystemSettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SystemSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first SystemSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindFirstArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SystemSettingFindFirstArgs>(args?: SelectSubset<T, SystemSettingFindFirstArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first SystemSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindFirstOrThrowArgs} args - Arguments to find a SystemSetting
     * @example
     * // Get one SystemSetting
     * const systemSetting = await prisma.systemSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SystemSettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SystemSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more SystemSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SystemSettings
     * const systemSettings = await prisma.systemSetting.findMany()
     * 
     * // Get first 10 SystemSettings
     * const systemSettings = await prisma.systemSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const systemSettingWithIdOnly = await prisma.systemSetting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SystemSettingFindManyArgs>(args?: SelectSubset<T, SystemSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a SystemSetting.
     * @param {SystemSettingCreateArgs} args - Arguments to create a SystemSetting.
     * @example
     * // Create one SystemSetting
     * const SystemSetting = await prisma.systemSetting.create({
     *   data: {
     *     // ... data to create a SystemSetting
     *   }
     * })
     * 
     */
    create<T extends SystemSettingCreateArgs>(args: SelectSubset<T, SystemSettingCreateArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many SystemSettings.
     * @param {SystemSettingCreateManyArgs} args - Arguments to create many SystemSettings.
     * @example
     * // Create many SystemSettings
     * const systemSetting = await prisma.systemSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SystemSettingCreateManyArgs>(args?: SelectSubset<T, SystemSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SystemSettings and returns the data saved in the database.
     * @param {SystemSettingCreateManyAndReturnArgs} args - Arguments to create many SystemSettings.
     * @example
     * // Create many SystemSettings
     * const systemSetting = await prisma.systemSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SystemSettings and only return the `id`
     * const systemSettingWithIdOnly = await prisma.systemSetting.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SystemSettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SystemSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a SystemSetting.
     * @param {SystemSettingDeleteArgs} args - Arguments to delete one SystemSetting.
     * @example
     * // Delete one SystemSetting
     * const SystemSetting = await prisma.systemSetting.delete({
     *   where: {
     *     // ... filter to delete one SystemSetting
     *   }
     * })
     * 
     */
    delete<T extends SystemSettingDeleteArgs>(args: SelectSubset<T, SystemSettingDeleteArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one SystemSetting.
     * @param {SystemSettingUpdateArgs} args - Arguments to update one SystemSetting.
     * @example
     * // Update one SystemSetting
     * const systemSetting = await prisma.systemSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SystemSettingUpdateArgs>(args: SelectSubset<T, SystemSettingUpdateArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more SystemSettings.
     * @param {SystemSettingDeleteManyArgs} args - Arguments to filter SystemSettings to delete.
     * @example
     * // Delete a few SystemSettings
     * const { count } = await prisma.systemSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SystemSettingDeleteManyArgs>(args?: SelectSubset<T, SystemSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SystemSettings
     * const systemSetting = await prisma.systemSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SystemSettingUpdateManyArgs>(args: SelectSubset<T, SystemSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SystemSetting.
     * @param {SystemSettingUpsertArgs} args - Arguments to update or create a SystemSetting.
     * @example
     * // Update or create a SystemSetting
     * const systemSetting = await prisma.systemSetting.upsert({
     *   create: {
     *     // ... data to create a SystemSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SystemSetting we want to update
     *   }
     * })
     */
    upsert<T extends SystemSettingUpsertArgs>(args: SelectSubset<T, SystemSettingUpsertArgs<ExtArgs>>): Prisma__SystemSettingClient<$Result.GetResult<Prisma.$SystemSettingPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of SystemSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingCountArgs} args - Arguments to filter SystemSettings to count.
     * @example
     * // Count the number of SystemSettings
     * const count = await prisma.systemSetting.count({
     *   where: {
     *     // ... the filter for the SystemSettings we want to count
     *   }
     * })
    **/
    count<T extends SystemSettingCountArgs>(
      args?: Subset<T, SystemSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SystemSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SystemSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SystemSettingAggregateArgs>(args: Subset<T, SystemSettingAggregateArgs>): Prisma.PrismaPromise<GetSystemSettingAggregateType<T>>

    /**
     * Group by SystemSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SystemSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SystemSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SystemSettingGroupByArgs['orderBy'] }
        : { orderBy?: SystemSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SystemSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SystemSetting model
   */
  readonly fields: SystemSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SystemSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SystemSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SystemSetting model
   */ 
  interface SystemSettingFieldRefs {
    readonly id: FieldRef<"SystemSetting", 'Int'>
    readonly key: FieldRef<"SystemSetting", 'String'>
    readonly value: FieldRef<"SystemSetting", 'String'>
    readonly createdAt: FieldRef<"SystemSetting", 'DateTime'>
    readonly updatedAt: FieldRef<"SystemSetting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SystemSetting findUnique
   */
  export type SystemSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting findUniqueOrThrow
   */
  export type SystemSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting findFirst
   */
  export type SystemSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }

  /**
   * SystemSetting findFirstOrThrow
   */
  export type SystemSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSetting to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SystemSettings.
     */
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }

  /**
   * SystemSetting findMany
   */
  export type SystemSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter, which SystemSettings to fetch.
     */
    where?: SystemSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SystemSettings to fetch.
     */
    orderBy?: SystemSettingOrderByWithRelationInput | SystemSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SystemSettings.
     */
    cursor?: SystemSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SystemSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SystemSettings.
     */
    skip?: number
    distinct?: SystemSettingScalarFieldEnum | SystemSettingScalarFieldEnum[]
  }

  /**
   * SystemSetting create
   */
  export type SystemSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * The data needed to create a SystemSetting.
     */
    data: XOR<SystemSettingCreateInput, SystemSettingUncheckedCreateInput>
  }

  /**
   * SystemSetting createMany
   */
  export type SystemSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SystemSettings.
     */
    data: SystemSettingCreateManyInput | SystemSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemSetting createManyAndReturn
   */
  export type SystemSettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many SystemSettings.
     */
    data: SystemSettingCreateManyInput | SystemSettingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SystemSetting update
   */
  export type SystemSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * The data needed to update a SystemSetting.
     */
    data: XOR<SystemSettingUpdateInput, SystemSettingUncheckedUpdateInput>
    /**
     * Choose, which SystemSetting to update.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting updateMany
   */
  export type SystemSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SystemSettings.
     */
    data: XOR<SystemSettingUpdateManyMutationInput, SystemSettingUncheckedUpdateManyInput>
    /**
     * Filter which SystemSettings to update
     */
    where?: SystemSettingWhereInput
  }

  /**
   * SystemSetting upsert
   */
  export type SystemSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * The filter to search for the SystemSetting to update in case it exists.
     */
    where: SystemSettingWhereUniqueInput
    /**
     * In case the SystemSetting found by the `where` argument doesn't exist, create a new SystemSetting with this data.
     */
    create: XOR<SystemSettingCreateInput, SystemSettingUncheckedCreateInput>
    /**
     * In case the SystemSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SystemSettingUpdateInput, SystemSettingUncheckedUpdateInput>
  }

  /**
   * SystemSetting delete
   */
  export type SystemSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
    /**
     * Filter which SystemSetting to delete.
     */
    where: SystemSettingWhereUniqueInput
  }

  /**
   * SystemSetting deleteMany
   */
  export type SystemSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SystemSettings to delete
     */
    where?: SystemSettingWhereInput
  }

  /**
   * SystemSetting without action
   */
  export type SystemSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SystemSetting
     */
    select?: SystemSettingSelect<ExtArgs> | null
  }


  /**
   * Model Fingerprint
   */

  export type AggregateFingerprint = {
    _count: FingerprintCountAggregateOutputType | null
    _avg: FingerprintAvgAggregateOutputType | null
    _sum: FingerprintSumAggregateOutputType | null
    _min: FingerprintMinAggregateOutputType | null
    _max: FingerprintMaxAggregateOutputType | null
  }

  export type FingerprintAvgAggregateOutputType = {
    id: number | null
    counter: number | null
  }

  export type FingerprintSumAggregateOutputType = {
    id: number | null
    counter: number | null
  }

  export type FingerprintMinAggregateOutputType = {
    id: number | null
    userId: string | null
    credentialId: string | null
    publicKey: string | null
    counter: number | null
    transports: string | null
    createdAt: Date | null
  }

  export type FingerprintMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    credentialId: string | null
    publicKey: string | null
    counter: number | null
    transports: string | null
    createdAt: Date | null
  }

  export type FingerprintCountAggregateOutputType = {
    id: number
    userId: number
    credentialId: number
    publicKey: number
    counter: number
    transports: number
    createdAt: number
    _all: number
  }


  export type FingerprintAvgAggregateInputType = {
    id?: true
    counter?: true
  }

  export type FingerprintSumAggregateInputType = {
    id?: true
    counter?: true
  }

  export type FingerprintMinAggregateInputType = {
    id?: true
    userId?: true
    credentialId?: true
    publicKey?: true
    counter?: true
    transports?: true
    createdAt?: true
  }

  export type FingerprintMaxAggregateInputType = {
    id?: true
    userId?: true
    credentialId?: true
    publicKey?: true
    counter?: true
    transports?: true
    createdAt?: true
  }

  export type FingerprintCountAggregateInputType = {
    id?: true
    userId?: true
    credentialId?: true
    publicKey?: true
    counter?: true
    transports?: true
    createdAt?: true
    _all?: true
  }

  export type FingerprintAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fingerprint to aggregate.
     */
    where?: FingerprintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fingerprints to fetch.
     */
    orderBy?: FingerprintOrderByWithRelationInput | FingerprintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FingerprintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fingerprints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fingerprints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Fingerprints
    **/
    _count?: true | FingerprintCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FingerprintAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FingerprintSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FingerprintMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FingerprintMaxAggregateInputType
  }

  export type GetFingerprintAggregateType<T extends FingerprintAggregateArgs> = {
        [P in keyof T & keyof AggregateFingerprint]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFingerprint[P]>
      : GetScalarType<T[P], AggregateFingerprint[P]>
  }




  export type FingerprintGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FingerprintWhereInput
    orderBy?: FingerprintOrderByWithAggregationInput | FingerprintOrderByWithAggregationInput[]
    by: FingerprintScalarFieldEnum[] | FingerprintScalarFieldEnum
    having?: FingerprintScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FingerprintCountAggregateInputType | true
    _avg?: FingerprintAvgAggregateInputType
    _sum?: FingerprintSumAggregateInputType
    _min?: FingerprintMinAggregateInputType
    _max?: FingerprintMaxAggregateInputType
  }

  export type FingerprintGroupByOutputType = {
    id: number
    userId: string
    credentialId: string
    publicKey: string
    counter: number
    transports: string | null
    createdAt: Date
    _count: FingerprintCountAggregateOutputType | null
    _avg: FingerprintAvgAggregateOutputType | null
    _sum: FingerprintSumAggregateOutputType | null
    _min: FingerprintMinAggregateOutputType | null
    _max: FingerprintMaxAggregateOutputType | null
  }

  type GetFingerprintGroupByPayload<T extends FingerprintGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FingerprintGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FingerprintGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FingerprintGroupByOutputType[P]>
            : GetScalarType<T[P], FingerprintGroupByOutputType[P]>
        }
      >
    >


  export type FingerprintSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    credentialId?: boolean
    publicKey?: boolean
    counter?: boolean
    transports?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["fingerprint"]>

  export type FingerprintSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    credentialId?: boolean
    publicKey?: boolean
    counter?: boolean
    transports?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["fingerprint"]>

  export type FingerprintSelectScalar = {
    id?: boolean
    userId?: boolean
    credentialId?: boolean
    publicKey?: boolean
    counter?: boolean
    transports?: boolean
    createdAt?: boolean
  }


  export type $FingerprintPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Fingerprint"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      credentialId: string
      publicKey: string
      counter: number
      transports: string | null
      createdAt: Date
    }, ExtArgs["result"]["fingerprint"]>
    composites: {}
  }

  type FingerprintGetPayload<S extends boolean | null | undefined | FingerprintDefaultArgs> = $Result.GetResult<Prisma.$FingerprintPayload, S>

  type FingerprintCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FingerprintFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FingerprintCountAggregateInputType | true
    }

  export interface FingerprintDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Fingerprint'], meta: { name: 'Fingerprint' } }
    /**
     * Find zero or one Fingerprint that matches the filter.
     * @param {FingerprintFindUniqueArgs} args - Arguments to find a Fingerprint
     * @example
     * // Get one Fingerprint
     * const fingerprint = await prisma.fingerprint.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FingerprintFindUniqueArgs>(args: SelectSubset<T, FingerprintFindUniqueArgs<ExtArgs>>): Prisma__FingerprintClient<$Result.GetResult<Prisma.$FingerprintPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Fingerprint that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FingerprintFindUniqueOrThrowArgs} args - Arguments to find a Fingerprint
     * @example
     * // Get one Fingerprint
     * const fingerprint = await prisma.fingerprint.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FingerprintFindUniqueOrThrowArgs>(args: SelectSubset<T, FingerprintFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FingerprintClient<$Result.GetResult<Prisma.$FingerprintPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Fingerprint that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FingerprintFindFirstArgs} args - Arguments to find a Fingerprint
     * @example
     * // Get one Fingerprint
     * const fingerprint = await prisma.fingerprint.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FingerprintFindFirstArgs>(args?: SelectSubset<T, FingerprintFindFirstArgs<ExtArgs>>): Prisma__FingerprintClient<$Result.GetResult<Prisma.$FingerprintPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Fingerprint that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FingerprintFindFirstOrThrowArgs} args - Arguments to find a Fingerprint
     * @example
     * // Get one Fingerprint
     * const fingerprint = await prisma.fingerprint.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FingerprintFindFirstOrThrowArgs>(args?: SelectSubset<T, FingerprintFindFirstOrThrowArgs<ExtArgs>>): Prisma__FingerprintClient<$Result.GetResult<Prisma.$FingerprintPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Fingerprints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FingerprintFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fingerprints
     * const fingerprints = await prisma.fingerprint.findMany()
     * 
     * // Get first 10 Fingerprints
     * const fingerprints = await prisma.fingerprint.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fingerprintWithIdOnly = await prisma.fingerprint.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FingerprintFindManyArgs>(args?: SelectSubset<T, FingerprintFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FingerprintPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Fingerprint.
     * @param {FingerprintCreateArgs} args - Arguments to create a Fingerprint.
     * @example
     * // Create one Fingerprint
     * const Fingerprint = await prisma.fingerprint.create({
     *   data: {
     *     // ... data to create a Fingerprint
     *   }
     * })
     * 
     */
    create<T extends FingerprintCreateArgs>(args: SelectSubset<T, FingerprintCreateArgs<ExtArgs>>): Prisma__FingerprintClient<$Result.GetResult<Prisma.$FingerprintPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Fingerprints.
     * @param {FingerprintCreateManyArgs} args - Arguments to create many Fingerprints.
     * @example
     * // Create many Fingerprints
     * const fingerprint = await prisma.fingerprint.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FingerprintCreateManyArgs>(args?: SelectSubset<T, FingerprintCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Fingerprints and returns the data saved in the database.
     * @param {FingerprintCreateManyAndReturnArgs} args - Arguments to create many Fingerprints.
     * @example
     * // Create many Fingerprints
     * const fingerprint = await prisma.fingerprint.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Fingerprints and only return the `id`
     * const fingerprintWithIdOnly = await prisma.fingerprint.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FingerprintCreateManyAndReturnArgs>(args?: SelectSubset<T, FingerprintCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FingerprintPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Fingerprint.
     * @param {FingerprintDeleteArgs} args - Arguments to delete one Fingerprint.
     * @example
     * // Delete one Fingerprint
     * const Fingerprint = await prisma.fingerprint.delete({
     *   where: {
     *     // ... filter to delete one Fingerprint
     *   }
     * })
     * 
     */
    delete<T extends FingerprintDeleteArgs>(args: SelectSubset<T, FingerprintDeleteArgs<ExtArgs>>): Prisma__FingerprintClient<$Result.GetResult<Prisma.$FingerprintPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Fingerprint.
     * @param {FingerprintUpdateArgs} args - Arguments to update one Fingerprint.
     * @example
     * // Update one Fingerprint
     * const fingerprint = await prisma.fingerprint.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FingerprintUpdateArgs>(args: SelectSubset<T, FingerprintUpdateArgs<ExtArgs>>): Prisma__FingerprintClient<$Result.GetResult<Prisma.$FingerprintPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Fingerprints.
     * @param {FingerprintDeleteManyArgs} args - Arguments to filter Fingerprints to delete.
     * @example
     * // Delete a few Fingerprints
     * const { count } = await prisma.fingerprint.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FingerprintDeleteManyArgs>(args?: SelectSubset<T, FingerprintDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fingerprints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FingerprintUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fingerprints
     * const fingerprint = await prisma.fingerprint.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FingerprintUpdateManyArgs>(args: SelectSubset<T, FingerprintUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Fingerprint.
     * @param {FingerprintUpsertArgs} args - Arguments to update or create a Fingerprint.
     * @example
     * // Update or create a Fingerprint
     * const fingerprint = await prisma.fingerprint.upsert({
     *   create: {
     *     // ... data to create a Fingerprint
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Fingerprint we want to update
     *   }
     * })
     */
    upsert<T extends FingerprintUpsertArgs>(args: SelectSubset<T, FingerprintUpsertArgs<ExtArgs>>): Prisma__FingerprintClient<$Result.GetResult<Prisma.$FingerprintPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Fingerprints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FingerprintCountArgs} args - Arguments to filter Fingerprints to count.
     * @example
     * // Count the number of Fingerprints
     * const count = await prisma.fingerprint.count({
     *   where: {
     *     // ... the filter for the Fingerprints we want to count
     *   }
     * })
    **/
    count<T extends FingerprintCountArgs>(
      args?: Subset<T, FingerprintCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FingerprintCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Fingerprint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FingerprintAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FingerprintAggregateArgs>(args: Subset<T, FingerprintAggregateArgs>): Prisma.PrismaPromise<GetFingerprintAggregateType<T>>

    /**
     * Group by Fingerprint.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FingerprintGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FingerprintGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FingerprintGroupByArgs['orderBy'] }
        : { orderBy?: FingerprintGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FingerprintGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFingerprintGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Fingerprint model
   */
  readonly fields: FingerprintFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Fingerprint.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FingerprintClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Fingerprint model
   */ 
  interface FingerprintFieldRefs {
    readonly id: FieldRef<"Fingerprint", 'Int'>
    readonly userId: FieldRef<"Fingerprint", 'String'>
    readonly credentialId: FieldRef<"Fingerprint", 'String'>
    readonly publicKey: FieldRef<"Fingerprint", 'String'>
    readonly counter: FieldRef<"Fingerprint", 'Int'>
    readonly transports: FieldRef<"Fingerprint", 'String'>
    readonly createdAt: FieldRef<"Fingerprint", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Fingerprint findUnique
   */
  export type FingerprintFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fingerprint
     */
    select?: FingerprintSelect<ExtArgs> | null
    /**
     * Filter, which Fingerprint to fetch.
     */
    where: FingerprintWhereUniqueInput
  }

  /**
   * Fingerprint findUniqueOrThrow
   */
  export type FingerprintFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fingerprint
     */
    select?: FingerprintSelect<ExtArgs> | null
    /**
     * Filter, which Fingerprint to fetch.
     */
    where: FingerprintWhereUniqueInput
  }

  /**
   * Fingerprint findFirst
   */
  export type FingerprintFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fingerprint
     */
    select?: FingerprintSelect<ExtArgs> | null
    /**
     * Filter, which Fingerprint to fetch.
     */
    where?: FingerprintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fingerprints to fetch.
     */
    orderBy?: FingerprintOrderByWithRelationInput | FingerprintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fingerprints.
     */
    cursor?: FingerprintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fingerprints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fingerprints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fingerprints.
     */
    distinct?: FingerprintScalarFieldEnum | FingerprintScalarFieldEnum[]
  }

  /**
   * Fingerprint findFirstOrThrow
   */
  export type FingerprintFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fingerprint
     */
    select?: FingerprintSelect<ExtArgs> | null
    /**
     * Filter, which Fingerprint to fetch.
     */
    where?: FingerprintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fingerprints to fetch.
     */
    orderBy?: FingerprintOrderByWithRelationInput | FingerprintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fingerprints.
     */
    cursor?: FingerprintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fingerprints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fingerprints.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fingerprints.
     */
    distinct?: FingerprintScalarFieldEnum | FingerprintScalarFieldEnum[]
  }

  /**
   * Fingerprint findMany
   */
  export type FingerprintFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fingerprint
     */
    select?: FingerprintSelect<ExtArgs> | null
    /**
     * Filter, which Fingerprints to fetch.
     */
    where?: FingerprintWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fingerprints to fetch.
     */
    orderBy?: FingerprintOrderByWithRelationInput | FingerprintOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Fingerprints.
     */
    cursor?: FingerprintWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fingerprints from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fingerprints.
     */
    skip?: number
    distinct?: FingerprintScalarFieldEnum | FingerprintScalarFieldEnum[]
  }

  /**
   * Fingerprint create
   */
  export type FingerprintCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fingerprint
     */
    select?: FingerprintSelect<ExtArgs> | null
    /**
     * The data needed to create a Fingerprint.
     */
    data: XOR<FingerprintCreateInput, FingerprintUncheckedCreateInput>
  }

  /**
   * Fingerprint createMany
   */
  export type FingerprintCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Fingerprints.
     */
    data: FingerprintCreateManyInput | FingerprintCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Fingerprint createManyAndReturn
   */
  export type FingerprintCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fingerprint
     */
    select?: FingerprintSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Fingerprints.
     */
    data: FingerprintCreateManyInput | FingerprintCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Fingerprint update
   */
  export type FingerprintUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fingerprint
     */
    select?: FingerprintSelect<ExtArgs> | null
    /**
     * The data needed to update a Fingerprint.
     */
    data: XOR<FingerprintUpdateInput, FingerprintUncheckedUpdateInput>
    /**
     * Choose, which Fingerprint to update.
     */
    where: FingerprintWhereUniqueInput
  }

  /**
   * Fingerprint updateMany
   */
  export type FingerprintUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Fingerprints.
     */
    data: XOR<FingerprintUpdateManyMutationInput, FingerprintUncheckedUpdateManyInput>
    /**
     * Filter which Fingerprints to update
     */
    where?: FingerprintWhereInput
  }

  /**
   * Fingerprint upsert
   */
  export type FingerprintUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fingerprint
     */
    select?: FingerprintSelect<ExtArgs> | null
    /**
     * The filter to search for the Fingerprint to update in case it exists.
     */
    where: FingerprintWhereUniqueInput
    /**
     * In case the Fingerprint found by the `where` argument doesn't exist, create a new Fingerprint with this data.
     */
    create: XOR<FingerprintCreateInput, FingerprintUncheckedCreateInput>
    /**
     * In case the Fingerprint was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FingerprintUpdateInput, FingerprintUncheckedUpdateInput>
  }

  /**
   * Fingerprint delete
   */
  export type FingerprintDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fingerprint
     */
    select?: FingerprintSelect<ExtArgs> | null
    /**
     * Filter which Fingerprint to delete.
     */
    where: FingerprintWhereUniqueInput
  }

  /**
   * Fingerprint deleteMany
   */
  export type FingerprintDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fingerprints to delete
     */
    where?: FingerprintWhereInput
  }

  /**
   * Fingerprint without action
   */
  export type FingerprintDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fingerprint
     */
    select?: FingerprintSelect<ExtArgs> | null
  }


  /**
   * Model FingerprintAuditLog
   */

  export type AggregateFingerprintAuditLog = {
    _count: FingerprintAuditLogCountAggregateOutputType | null
    _avg: FingerprintAuditLogAvgAggregateOutputType | null
    _sum: FingerprintAuditLogSumAggregateOutputType | null
    _min: FingerprintAuditLogMinAggregateOutputType | null
    _max: FingerprintAuditLogMaxAggregateOutputType | null
  }

  export type FingerprintAuditLogAvgAggregateOutputType = {
    id: number | null
  }

  export type FingerprintAuditLogSumAggregateOutputType = {
    id: number | null
  }

  export type FingerprintAuditLogMinAggregateOutputType = {
    id: number | null
    userId: string | null
    action: string | null
    details: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type FingerprintAuditLogMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    action: string | null
    details: string | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type FingerprintAuditLogCountAggregateOutputType = {
    id: number
    userId: number
    action: number
    details: number
    ipAddress: number
    createdAt: number
    _all: number
  }


  export type FingerprintAuditLogAvgAggregateInputType = {
    id?: true
  }

  export type FingerprintAuditLogSumAggregateInputType = {
    id?: true
  }

  export type FingerprintAuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    details?: true
    ipAddress?: true
    createdAt?: true
  }

  export type FingerprintAuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    details?: true
    ipAddress?: true
    createdAt?: true
  }

  export type FingerprintAuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    action?: true
    details?: true
    ipAddress?: true
    createdAt?: true
    _all?: true
  }

  export type FingerprintAuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FingerprintAuditLog to aggregate.
     */
    where?: FingerprintAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FingerprintAuditLogs to fetch.
     */
    orderBy?: FingerprintAuditLogOrderByWithRelationInput | FingerprintAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FingerprintAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FingerprintAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FingerprintAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FingerprintAuditLogs
    **/
    _count?: true | FingerprintAuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FingerprintAuditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FingerprintAuditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FingerprintAuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FingerprintAuditLogMaxAggregateInputType
  }

  export type GetFingerprintAuditLogAggregateType<T extends FingerprintAuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateFingerprintAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFingerprintAuditLog[P]>
      : GetScalarType<T[P], AggregateFingerprintAuditLog[P]>
  }




  export type FingerprintAuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FingerprintAuditLogWhereInput
    orderBy?: FingerprintAuditLogOrderByWithAggregationInput | FingerprintAuditLogOrderByWithAggregationInput[]
    by: FingerprintAuditLogScalarFieldEnum[] | FingerprintAuditLogScalarFieldEnum
    having?: FingerprintAuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FingerprintAuditLogCountAggregateInputType | true
    _avg?: FingerprintAuditLogAvgAggregateInputType
    _sum?: FingerprintAuditLogSumAggregateInputType
    _min?: FingerprintAuditLogMinAggregateInputType
    _max?: FingerprintAuditLogMaxAggregateInputType
  }

  export type FingerprintAuditLogGroupByOutputType = {
    id: number
    userId: string
    action: string
    details: string | null
    ipAddress: string | null
    createdAt: Date
    _count: FingerprintAuditLogCountAggregateOutputType | null
    _avg: FingerprintAuditLogAvgAggregateOutputType | null
    _sum: FingerprintAuditLogSumAggregateOutputType | null
    _min: FingerprintAuditLogMinAggregateOutputType | null
    _max: FingerprintAuditLogMaxAggregateOutputType | null
  }

  type GetFingerprintAuditLogGroupByPayload<T extends FingerprintAuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FingerprintAuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FingerprintAuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FingerprintAuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], FingerprintAuditLogGroupByOutputType[P]>
        }
      >
    >


  export type FingerprintAuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["fingerprintAuditLog"]>

  export type FingerprintAuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["fingerprintAuditLog"]>

  export type FingerprintAuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    action?: boolean
    details?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }


  export type $FingerprintAuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FingerprintAuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      action: string
      details: string | null
      ipAddress: string | null
      createdAt: Date
    }, ExtArgs["result"]["fingerprintAuditLog"]>
    composites: {}
  }

  type FingerprintAuditLogGetPayload<S extends boolean | null | undefined | FingerprintAuditLogDefaultArgs> = $Result.GetResult<Prisma.$FingerprintAuditLogPayload, S>

  type FingerprintAuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FingerprintAuditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FingerprintAuditLogCountAggregateInputType | true
    }

  export interface FingerprintAuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FingerprintAuditLog'], meta: { name: 'FingerprintAuditLog' } }
    /**
     * Find zero or one FingerprintAuditLog that matches the filter.
     * @param {FingerprintAuditLogFindUniqueArgs} args - Arguments to find a FingerprintAuditLog
     * @example
     * // Get one FingerprintAuditLog
     * const fingerprintAuditLog = await prisma.fingerprintAuditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FingerprintAuditLogFindUniqueArgs>(args: SelectSubset<T, FingerprintAuditLogFindUniqueArgs<ExtArgs>>): Prisma__FingerprintAuditLogClient<$Result.GetResult<Prisma.$FingerprintAuditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FingerprintAuditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FingerprintAuditLogFindUniqueOrThrowArgs} args - Arguments to find a FingerprintAuditLog
     * @example
     * // Get one FingerprintAuditLog
     * const fingerprintAuditLog = await prisma.fingerprintAuditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FingerprintAuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, FingerprintAuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FingerprintAuditLogClient<$Result.GetResult<Prisma.$FingerprintAuditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FingerprintAuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FingerprintAuditLogFindFirstArgs} args - Arguments to find a FingerprintAuditLog
     * @example
     * // Get one FingerprintAuditLog
     * const fingerprintAuditLog = await prisma.fingerprintAuditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FingerprintAuditLogFindFirstArgs>(args?: SelectSubset<T, FingerprintAuditLogFindFirstArgs<ExtArgs>>): Prisma__FingerprintAuditLogClient<$Result.GetResult<Prisma.$FingerprintAuditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FingerprintAuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FingerprintAuditLogFindFirstOrThrowArgs} args - Arguments to find a FingerprintAuditLog
     * @example
     * // Get one FingerprintAuditLog
     * const fingerprintAuditLog = await prisma.fingerprintAuditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FingerprintAuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, FingerprintAuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__FingerprintAuditLogClient<$Result.GetResult<Prisma.$FingerprintAuditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FingerprintAuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FingerprintAuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FingerprintAuditLogs
     * const fingerprintAuditLogs = await prisma.fingerprintAuditLog.findMany()
     * 
     * // Get first 10 FingerprintAuditLogs
     * const fingerprintAuditLogs = await prisma.fingerprintAuditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fingerprintAuditLogWithIdOnly = await prisma.fingerprintAuditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FingerprintAuditLogFindManyArgs>(args?: SelectSubset<T, FingerprintAuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FingerprintAuditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FingerprintAuditLog.
     * @param {FingerprintAuditLogCreateArgs} args - Arguments to create a FingerprintAuditLog.
     * @example
     * // Create one FingerprintAuditLog
     * const FingerprintAuditLog = await prisma.fingerprintAuditLog.create({
     *   data: {
     *     // ... data to create a FingerprintAuditLog
     *   }
     * })
     * 
     */
    create<T extends FingerprintAuditLogCreateArgs>(args: SelectSubset<T, FingerprintAuditLogCreateArgs<ExtArgs>>): Prisma__FingerprintAuditLogClient<$Result.GetResult<Prisma.$FingerprintAuditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FingerprintAuditLogs.
     * @param {FingerprintAuditLogCreateManyArgs} args - Arguments to create many FingerprintAuditLogs.
     * @example
     * // Create many FingerprintAuditLogs
     * const fingerprintAuditLog = await prisma.fingerprintAuditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FingerprintAuditLogCreateManyArgs>(args?: SelectSubset<T, FingerprintAuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FingerprintAuditLogs and returns the data saved in the database.
     * @param {FingerprintAuditLogCreateManyAndReturnArgs} args - Arguments to create many FingerprintAuditLogs.
     * @example
     * // Create many FingerprintAuditLogs
     * const fingerprintAuditLog = await prisma.fingerprintAuditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FingerprintAuditLogs and only return the `id`
     * const fingerprintAuditLogWithIdOnly = await prisma.fingerprintAuditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FingerprintAuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, FingerprintAuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FingerprintAuditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FingerprintAuditLog.
     * @param {FingerprintAuditLogDeleteArgs} args - Arguments to delete one FingerprintAuditLog.
     * @example
     * // Delete one FingerprintAuditLog
     * const FingerprintAuditLog = await prisma.fingerprintAuditLog.delete({
     *   where: {
     *     // ... filter to delete one FingerprintAuditLog
     *   }
     * })
     * 
     */
    delete<T extends FingerprintAuditLogDeleteArgs>(args: SelectSubset<T, FingerprintAuditLogDeleteArgs<ExtArgs>>): Prisma__FingerprintAuditLogClient<$Result.GetResult<Prisma.$FingerprintAuditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FingerprintAuditLog.
     * @param {FingerprintAuditLogUpdateArgs} args - Arguments to update one FingerprintAuditLog.
     * @example
     * // Update one FingerprintAuditLog
     * const fingerprintAuditLog = await prisma.fingerprintAuditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FingerprintAuditLogUpdateArgs>(args: SelectSubset<T, FingerprintAuditLogUpdateArgs<ExtArgs>>): Prisma__FingerprintAuditLogClient<$Result.GetResult<Prisma.$FingerprintAuditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FingerprintAuditLogs.
     * @param {FingerprintAuditLogDeleteManyArgs} args - Arguments to filter FingerprintAuditLogs to delete.
     * @example
     * // Delete a few FingerprintAuditLogs
     * const { count } = await prisma.fingerprintAuditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FingerprintAuditLogDeleteManyArgs>(args?: SelectSubset<T, FingerprintAuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FingerprintAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FingerprintAuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FingerprintAuditLogs
     * const fingerprintAuditLog = await prisma.fingerprintAuditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FingerprintAuditLogUpdateManyArgs>(args: SelectSubset<T, FingerprintAuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FingerprintAuditLog.
     * @param {FingerprintAuditLogUpsertArgs} args - Arguments to update or create a FingerprintAuditLog.
     * @example
     * // Update or create a FingerprintAuditLog
     * const fingerprintAuditLog = await prisma.fingerprintAuditLog.upsert({
     *   create: {
     *     // ... data to create a FingerprintAuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FingerprintAuditLog we want to update
     *   }
     * })
     */
    upsert<T extends FingerprintAuditLogUpsertArgs>(args: SelectSubset<T, FingerprintAuditLogUpsertArgs<ExtArgs>>): Prisma__FingerprintAuditLogClient<$Result.GetResult<Prisma.$FingerprintAuditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FingerprintAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FingerprintAuditLogCountArgs} args - Arguments to filter FingerprintAuditLogs to count.
     * @example
     * // Count the number of FingerprintAuditLogs
     * const count = await prisma.fingerprintAuditLog.count({
     *   where: {
     *     // ... the filter for the FingerprintAuditLogs we want to count
     *   }
     * })
    **/
    count<T extends FingerprintAuditLogCountArgs>(
      args?: Subset<T, FingerprintAuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FingerprintAuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FingerprintAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FingerprintAuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FingerprintAuditLogAggregateArgs>(args: Subset<T, FingerprintAuditLogAggregateArgs>): Prisma.PrismaPromise<GetFingerprintAuditLogAggregateType<T>>

    /**
     * Group by FingerprintAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FingerprintAuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FingerprintAuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FingerprintAuditLogGroupByArgs['orderBy'] }
        : { orderBy?: FingerprintAuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FingerprintAuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFingerprintAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FingerprintAuditLog model
   */
  readonly fields: FingerprintAuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FingerprintAuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FingerprintAuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FingerprintAuditLog model
   */ 
  interface FingerprintAuditLogFieldRefs {
    readonly id: FieldRef<"FingerprintAuditLog", 'Int'>
    readonly userId: FieldRef<"FingerprintAuditLog", 'String'>
    readonly action: FieldRef<"FingerprintAuditLog", 'String'>
    readonly details: FieldRef<"FingerprintAuditLog", 'String'>
    readonly ipAddress: FieldRef<"FingerprintAuditLog", 'String'>
    readonly createdAt: FieldRef<"FingerprintAuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FingerprintAuditLog findUnique
   */
  export type FingerprintAuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FingerprintAuditLog
     */
    select?: FingerprintAuditLogSelect<ExtArgs> | null
    /**
     * Filter, which FingerprintAuditLog to fetch.
     */
    where: FingerprintAuditLogWhereUniqueInput
  }

  /**
   * FingerprintAuditLog findUniqueOrThrow
   */
  export type FingerprintAuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FingerprintAuditLog
     */
    select?: FingerprintAuditLogSelect<ExtArgs> | null
    /**
     * Filter, which FingerprintAuditLog to fetch.
     */
    where: FingerprintAuditLogWhereUniqueInput
  }

  /**
   * FingerprintAuditLog findFirst
   */
  export type FingerprintAuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FingerprintAuditLog
     */
    select?: FingerprintAuditLogSelect<ExtArgs> | null
    /**
     * Filter, which FingerprintAuditLog to fetch.
     */
    where?: FingerprintAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FingerprintAuditLogs to fetch.
     */
    orderBy?: FingerprintAuditLogOrderByWithRelationInput | FingerprintAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FingerprintAuditLogs.
     */
    cursor?: FingerprintAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FingerprintAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FingerprintAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FingerprintAuditLogs.
     */
    distinct?: FingerprintAuditLogScalarFieldEnum | FingerprintAuditLogScalarFieldEnum[]
  }

  /**
   * FingerprintAuditLog findFirstOrThrow
   */
  export type FingerprintAuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FingerprintAuditLog
     */
    select?: FingerprintAuditLogSelect<ExtArgs> | null
    /**
     * Filter, which FingerprintAuditLog to fetch.
     */
    where?: FingerprintAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FingerprintAuditLogs to fetch.
     */
    orderBy?: FingerprintAuditLogOrderByWithRelationInput | FingerprintAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FingerprintAuditLogs.
     */
    cursor?: FingerprintAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FingerprintAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FingerprintAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FingerprintAuditLogs.
     */
    distinct?: FingerprintAuditLogScalarFieldEnum | FingerprintAuditLogScalarFieldEnum[]
  }

  /**
   * FingerprintAuditLog findMany
   */
  export type FingerprintAuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FingerprintAuditLog
     */
    select?: FingerprintAuditLogSelect<ExtArgs> | null
    /**
     * Filter, which FingerprintAuditLogs to fetch.
     */
    where?: FingerprintAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FingerprintAuditLogs to fetch.
     */
    orderBy?: FingerprintAuditLogOrderByWithRelationInput | FingerprintAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FingerprintAuditLogs.
     */
    cursor?: FingerprintAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FingerprintAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FingerprintAuditLogs.
     */
    skip?: number
    distinct?: FingerprintAuditLogScalarFieldEnum | FingerprintAuditLogScalarFieldEnum[]
  }

  /**
   * FingerprintAuditLog create
   */
  export type FingerprintAuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FingerprintAuditLog
     */
    select?: FingerprintAuditLogSelect<ExtArgs> | null
    /**
     * The data needed to create a FingerprintAuditLog.
     */
    data: XOR<FingerprintAuditLogCreateInput, FingerprintAuditLogUncheckedCreateInput>
  }

  /**
   * FingerprintAuditLog createMany
   */
  export type FingerprintAuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FingerprintAuditLogs.
     */
    data: FingerprintAuditLogCreateManyInput | FingerprintAuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FingerprintAuditLog createManyAndReturn
   */
  export type FingerprintAuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FingerprintAuditLog
     */
    select?: FingerprintAuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FingerprintAuditLogs.
     */
    data: FingerprintAuditLogCreateManyInput | FingerprintAuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FingerprintAuditLog update
   */
  export type FingerprintAuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FingerprintAuditLog
     */
    select?: FingerprintAuditLogSelect<ExtArgs> | null
    /**
     * The data needed to update a FingerprintAuditLog.
     */
    data: XOR<FingerprintAuditLogUpdateInput, FingerprintAuditLogUncheckedUpdateInput>
    /**
     * Choose, which FingerprintAuditLog to update.
     */
    where: FingerprintAuditLogWhereUniqueInput
  }

  /**
   * FingerprintAuditLog updateMany
   */
  export type FingerprintAuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FingerprintAuditLogs.
     */
    data: XOR<FingerprintAuditLogUpdateManyMutationInput, FingerprintAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which FingerprintAuditLogs to update
     */
    where?: FingerprintAuditLogWhereInput
  }

  /**
   * FingerprintAuditLog upsert
   */
  export type FingerprintAuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FingerprintAuditLog
     */
    select?: FingerprintAuditLogSelect<ExtArgs> | null
    /**
     * The filter to search for the FingerprintAuditLog to update in case it exists.
     */
    where: FingerprintAuditLogWhereUniqueInput
    /**
     * In case the FingerprintAuditLog found by the `where` argument doesn't exist, create a new FingerprintAuditLog with this data.
     */
    create: XOR<FingerprintAuditLogCreateInput, FingerprintAuditLogUncheckedCreateInput>
    /**
     * In case the FingerprintAuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FingerprintAuditLogUpdateInput, FingerprintAuditLogUncheckedUpdateInput>
  }

  /**
   * FingerprintAuditLog delete
   */
  export type FingerprintAuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FingerprintAuditLog
     */
    select?: FingerprintAuditLogSelect<ExtArgs> | null
    /**
     * Filter which FingerprintAuditLog to delete.
     */
    where: FingerprintAuditLogWhereUniqueInput
  }

  /**
   * FingerprintAuditLog deleteMany
   */
  export type FingerprintAuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FingerprintAuditLogs to delete
     */
    where?: FingerprintAuditLogWhereInput
  }

  /**
   * FingerprintAuditLog without action
   */
  export type FingerprintAuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FingerprintAuditLog
     */
    select?: FingerprintAuditLogSelect<ExtArgs> | null
  }


  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    id: number | null
  }

  export type StudentSumAggregateOutputType = {
    id: number | null
  }

  export type StudentMinAggregateOutputType = {
    id: number | null
    rollNumber: string | null
    name: string | null
    section: string | null
    studentMobile: string | null
    parentMobile: string | null
    preExcusedStart: string | null
    preExcusedEnd: string | null
    preExcusedReason: string | null
    createdAt: Date | null
  }

  export type StudentMaxAggregateOutputType = {
    id: number | null
    rollNumber: string | null
    name: string | null
    section: string | null
    studentMobile: string | null
    parentMobile: string | null
    preExcusedStart: string | null
    preExcusedEnd: string | null
    preExcusedReason: string | null
    createdAt: Date | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    rollNumber: number
    name: number
    section: number
    studentMobile: number
    parentMobile: number
    preExcusedStart: number
    preExcusedEnd: number
    preExcusedReason: number
    createdAt: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    id?: true
  }

  export type StudentSumAggregateInputType = {
    id?: true
  }

  export type StudentMinAggregateInputType = {
    id?: true
    rollNumber?: true
    name?: true
    section?: true
    studentMobile?: true
    parentMobile?: true
    preExcusedStart?: true
    preExcusedEnd?: true
    preExcusedReason?: true
    createdAt?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    rollNumber?: true
    name?: true
    section?: true
    studentMobile?: true
    parentMobile?: true
    preExcusedStart?: true
    preExcusedEnd?: true
    preExcusedReason?: true
    createdAt?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    rollNumber?: true
    name?: true
    section?: true
    studentMobile?: true
    parentMobile?: true
    preExcusedStart?: true
    preExcusedEnd?: true
    preExcusedReason?: true
    createdAt?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: number
    rollNumber: string
    name: string
    section: string
    studentMobile: string
    parentMobile: string
    preExcusedStart: string | null
    preExcusedEnd: string | null
    preExcusedReason: string | null
    createdAt: Date
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rollNumber?: boolean
    name?: boolean
    section?: boolean
    studentMobile?: boolean
    parentMobile?: boolean
    preExcusedStart?: boolean
    preExcusedEnd?: boolean
    preExcusedReason?: boolean
    createdAt?: boolean
    attendance?: boolean | Student$attendanceArgs<ExtArgs>
    callLogs?: boolean | Student$callLogsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rollNumber?: boolean
    name?: boolean
    section?: boolean
    studentMobile?: boolean
    parentMobile?: boolean
    preExcusedStart?: boolean
    preExcusedEnd?: boolean
    preExcusedReason?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    id?: boolean
    rollNumber?: boolean
    name?: boolean
    section?: boolean
    studentMobile?: boolean
    parentMobile?: boolean
    preExcusedStart?: boolean
    preExcusedEnd?: boolean
    preExcusedReason?: boolean
    createdAt?: boolean
  }

  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attendance?: boolean | Student$attendanceArgs<ExtArgs>
    callLogs?: boolean | Student$callLogsArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      attendance: Prisma.$AttendancePayload<ExtArgs>[]
      callLogs: Prisma.$AbsenteeCallLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      rollNumber: string
      name: string
      section: string
      studentMobile: string
      parentMobile: string
      preExcusedStart: string | null
      preExcusedEnd: string | null
      preExcusedReason: string | null
      createdAt: Date
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attendance<T extends Student$attendanceArgs<ExtArgs> = {}>(args?: Subset<T, Student$attendanceArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany"> | Null>
    callLogs<T extends Student$callLogsArgs<ExtArgs> = {}>(args?: Subset<T, Student$callLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AbsenteeCallLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */ 
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'Int'>
    readonly rollNumber: FieldRef<"Student", 'String'>
    readonly name: FieldRef<"Student", 'String'>
    readonly section: FieldRef<"Student", 'String'>
    readonly studentMobile: FieldRef<"Student", 'String'>
    readonly parentMobile: FieldRef<"Student", 'String'>
    readonly preExcusedStart: FieldRef<"Student", 'String'>
    readonly preExcusedEnd: FieldRef<"Student", 'String'>
    readonly preExcusedReason: FieldRef<"Student", 'String'>
    readonly createdAt: FieldRef<"Student", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
  }

  /**
   * Student.attendance
   */
  export type Student$attendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    cursor?: AttendanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Student.callLogs
   */
  export type Student$callLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AbsenteeCallLog
     */
    select?: AbsenteeCallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenteeCallLogInclude<ExtArgs> | null
    where?: AbsenteeCallLogWhereInput
    orderBy?: AbsenteeCallLogOrderByWithRelationInput | AbsenteeCallLogOrderByWithRelationInput[]
    cursor?: AbsenteeCallLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AbsenteeCallLogScalarFieldEnum | AbsenteeCallLogScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Attendance
   */

  export type AggregateAttendance = {
    _count: AttendanceCountAggregateOutputType | null
    _avg: AttendanceAvgAggregateOutputType | null
    _sum: AttendanceSumAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  export type AttendanceAvgAggregateOutputType = {
    id: number | null
    studentId: number | null
    markedBy: number | null
  }

  export type AttendanceSumAggregateOutputType = {
    id: number | null
    studentId: number | null
    markedBy: number | null
  }

  export type AttendanceMinAggregateOutputType = {
    id: number | null
    studentId: number | null
    date: string | null
    status: string | null
    markedBy: number | null
    isLateComer: boolean | null
    updatedAt: Date | null
  }

  export type AttendanceMaxAggregateOutputType = {
    id: number | null
    studentId: number | null
    date: string | null
    status: string | null
    markedBy: number | null
    isLateComer: boolean | null
    updatedAt: Date | null
  }

  export type AttendanceCountAggregateOutputType = {
    id: number
    studentId: number
    date: number
    status: number
    markedBy: number
    isLateComer: number
    updatedAt: number
    _all: number
  }


  export type AttendanceAvgAggregateInputType = {
    id?: true
    studentId?: true
    markedBy?: true
  }

  export type AttendanceSumAggregateInputType = {
    id?: true
    studentId?: true
    markedBy?: true
  }

  export type AttendanceMinAggregateInputType = {
    id?: true
    studentId?: true
    date?: true
    status?: true
    markedBy?: true
    isLateComer?: true
    updatedAt?: true
  }

  export type AttendanceMaxAggregateInputType = {
    id?: true
    studentId?: true
    date?: true
    status?: true
    markedBy?: true
    isLateComer?: true
    updatedAt?: true
  }

  export type AttendanceCountAggregateInputType = {
    id?: true
    studentId?: true
    date?: true
    status?: true
    markedBy?: true
    isLateComer?: true
    updatedAt?: true
    _all?: true
  }

  export type AttendanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendance to aggregate.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Attendances
    **/
    _count?: true | AttendanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AttendanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AttendanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttendanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttendanceMaxAggregateInputType
  }

  export type GetAttendanceAggregateType<T extends AttendanceAggregateArgs> = {
        [P in keyof T & keyof AggregateAttendance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttendance[P]>
      : GetScalarType<T[P], AggregateAttendance[P]>
  }




  export type AttendanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttendanceWhereInput
    orderBy?: AttendanceOrderByWithAggregationInput | AttendanceOrderByWithAggregationInput[]
    by: AttendanceScalarFieldEnum[] | AttendanceScalarFieldEnum
    having?: AttendanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttendanceCountAggregateInputType | true
    _avg?: AttendanceAvgAggregateInputType
    _sum?: AttendanceSumAggregateInputType
    _min?: AttendanceMinAggregateInputType
    _max?: AttendanceMaxAggregateInputType
  }

  export type AttendanceGroupByOutputType = {
    id: number
    studentId: number
    date: string
    status: string
    markedBy: number
    isLateComer: boolean
    updatedAt: Date
    _count: AttendanceCountAggregateOutputType | null
    _avg: AttendanceAvgAggregateOutputType | null
    _sum: AttendanceSumAggregateOutputType | null
    _min: AttendanceMinAggregateOutputType | null
    _max: AttendanceMaxAggregateOutputType | null
  }

  type GetAttendanceGroupByPayload<T extends AttendanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttendanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttendanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
            : GetScalarType<T[P], AttendanceGroupByOutputType[P]>
        }
      >
    >


  export type AttendanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    date?: boolean
    status?: boolean
    markedBy?: boolean
    isLateComer?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>

  export type AttendanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    date?: boolean
    status?: boolean
    markedBy?: boolean
    isLateComer?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attendance"]>

  export type AttendanceSelectScalar = {
    id?: boolean
    studentId?: boolean
    date?: boolean
    status?: boolean
    markedBy?: boolean
    isLateComer?: boolean
    updatedAt?: boolean
  }

  export type AttendanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type AttendanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $AttendancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Attendance"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: number
      date: string
      status: string
      markedBy: number
      isLateComer: boolean
      updatedAt: Date
    }, ExtArgs["result"]["attendance"]>
    composites: {}
  }

  type AttendanceGetPayload<S extends boolean | null | undefined | AttendanceDefaultArgs> = $Result.GetResult<Prisma.$AttendancePayload, S>

  type AttendanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AttendanceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AttendanceCountAggregateInputType | true
    }

  export interface AttendanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Attendance'], meta: { name: 'Attendance' } }
    /**
     * Find zero or one Attendance that matches the filter.
     * @param {AttendanceFindUniqueArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttendanceFindUniqueArgs>(args: SelectSubset<T, AttendanceFindUniqueArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Attendance that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AttendanceFindUniqueOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttendanceFindUniqueOrThrowArgs>(args: SelectSubset<T, AttendanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Attendance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttendanceFindFirstArgs>(args?: SelectSubset<T, AttendanceFindFirstArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Attendance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindFirstOrThrowArgs} args - Arguments to find a Attendance
     * @example
     * // Get one Attendance
     * const attendance = await prisma.attendance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttendanceFindFirstOrThrowArgs>(args?: SelectSubset<T, AttendanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Attendances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Attendances
     * const attendances = await prisma.attendance.findMany()
     * 
     * // Get first 10 Attendances
     * const attendances = await prisma.attendance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attendanceWithIdOnly = await prisma.attendance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttendanceFindManyArgs>(args?: SelectSubset<T, AttendanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Attendance.
     * @param {AttendanceCreateArgs} args - Arguments to create a Attendance.
     * @example
     * // Create one Attendance
     * const Attendance = await prisma.attendance.create({
     *   data: {
     *     // ... data to create a Attendance
     *   }
     * })
     * 
     */
    create<T extends AttendanceCreateArgs>(args: SelectSubset<T, AttendanceCreateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Attendances.
     * @param {AttendanceCreateManyArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendance = await prisma.attendance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttendanceCreateManyArgs>(args?: SelectSubset<T, AttendanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Attendances and returns the data saved in the database.
     * @param {AttendanceCreateManyAndReturnArgs} args - Arguments to create many Attendances.
     * @example
     * // Create many Attendances
     * const attendance = await prisma.attendance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Attendances and only return the `id`
     * const attendanceWithIdOnly = await prisma.attendance.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttendanceCreateManyAndReturnArgs>(args?: SelectSubset<T, AttendanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Attendance.
     * @param {AttendanceDeleteArgs} args - Arguments to delete one Attendance.
     * @example
     * // Delete one Attendance
     * const Attendance = await prisma.attendance.delete({
     *   where: {
     *     // ... filter to delete one Attendance
     *   }
     * })
     * 
     */
    delete<T extends AttendanceDeleteArgs>(args: SelectSubset<T, AttendanceDeleteArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Attendance.
     * @param {AttendanceUpdateArgs} args - Arguments to update one Attendance.
     * @example
     * // Update one Attendance
     * const attendance = await prisma.attendance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttendanceUpdateArgs>(args: SelectSubset<T, AttendanceUpdateArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Attendances.
     * @param {AttendanceDeleteManyArgs} args - Arguments to filter Attendances to delete.
     * @example
     * // Delete a few Attendances
     * const { count } = await prisma.attendance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttendanceDeleteManyArgs>(args?: SelectSubset<T, AttendanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Attendances
     * const attendance = await prisma.attendance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttendanceUpdateManyArgs>(args: SelectSubset<T, AttendanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Attendance.
     * @param {AttendanceUpsertArgs} args - Arguments to update or create a Attendance.
     * @example
     * // Update or create a Attendance
     * const attendance = await prisma.attendance.upsert({
     *   create: {
     *     // ... data to create a Attendance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Attendance we want to update
     *   }
     * })
     */
    upsert<T extends AttendanceUpsertArgs>(args: SelectSubset<T, AttendanceUpsertArgs<ExtArgs>>): Prisma__AttendanceClient<$Result.GetResult<Prisma.$AttendancePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Attendances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceCountArgs} args - Arguments to filter Attendances to count.
     * @example
     * // Count the number of Attendances
     * const count = await prisma.attendance.count({
     *   where: {
     *     // ... the filter for the Attendances we want to count
     *   }
     * })
    **/
    count<T extends AttendanceCountArgs>(
      args?: Subset<T, AttendanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttendanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AttendanceAggregateArgs>(args: Subset<T, AttendanceAggregateArgs>): Prisma.PrismaPromise<GetAttendanceAggregateType<T>>

    /**
     * Group by Attendance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttendanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AttendanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttendanceGroupByArgs['orderBy'] }
        : { orderBy?: AttendanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AttendanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttendanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Attendance model
   */
  readonly fields: AttendanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Attendance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttendanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Attendance model
   */ 
  interface AttendanceFieldRefs {
    readonly id: FieldRef<"Attendance", 'Int'>
    readonly studentId: FieldRef<"Attendance", 'Int'>
    readonly date: FieldRef<"Attendance", 'String'>
    readonly status: FieldRef<"Attendance", 'String'>
    readonly markedBy: FieldRef<"Attendance", 'Int'>
    readonly isLateComer: FieldRef<"Attendance", 'Boolean'>
    readonly updatedAt: FieldRef<"Attendance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Attendance findUnique
   */
  export type AttendanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findUniqueOrThrow
   */
  export type AttendanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance findFirst
   */
  export type AttendanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findFirstOrThrow
   */
  export type AttendanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendance to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Attendances.
     */
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance findMany
   */
  export type AttendanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter, which Attendances to fetch.
     */
    where?: AttendanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Attendances to fetch.
     */
    orderBy?: AttendanceOrderByWithRelationInput | AttendanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Attendances.
     */
    cursor?: AttendanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Attendances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Attendances.
     */
    skip?: number
    distinct?: AttendanceScalarFieldEnum | AttendanceScalarFieldEnum[]
  }

  /**
   * Attendance create
   */
  export type AttendanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to create a Attendance.
     */
    data: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
  }

  /**
   * Attendance createMany
   */
  export type AttendanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Attendances.
     */
    data: AttendanceCreateManyInput | AttendanceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Attendance createManyAndReturn
   */
  export type AttendanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Attendances.
     */
    data: AttendanceCreateManyInput | AttendanceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Attendance update
   */
  export type AttendanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The data needed to update a Attendance.
     */
    data: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
    /**
     * Choose, which Attendance to update.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance updateMany
   */
  export type AttendanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Attendances.
     */
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyInput>
    /**
     * Filter which Attendances to update
     */
    where?: AttendanceWhereInput
  }

  /**
   * Attendance upsert
   */
  export type AttendanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * The filter to search for the Attendance to update in case it exists.
     */
    where: AttendanceWhereUniqueInput
    /**
     * In case the Attendance found by the `where` argument doesn't exist, create a new Attendance with this data.
     */
    create: XOR<AttendanceCreateInput, AttendanceUncheckedCreateInput>
    /**
     * In case the Attendance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttendanceUpdateInput, AttendanceUncheckedUpdateInput>
  }

  /**
   * Attendance delete
   */
  export type AttendanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
    /**
     * Filter which Attendance to delete.
     */
    where: AttendanceWhereUniqueInput
  }

  /**
   * Attendance deleteMany
   */
  export type AttendanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Attendances to delete
     */
    where?: AttendanceWhereInput
  }

  /**
   * Attendance without action
   */
  export type AttendanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Attendance
     */
    select?: AttendanceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttendanceInclude<ExtArgs> | null
  }


  /**
   * Model AbsenteeCallLog
   */

  export type AggregateAbsenteeCallLog = {
    _count: AbsenteeCallLogCountAggregateOutputType | null
    _avg: AbsenteeCallLogAvgAggregateOutputType | null
    _sum: AbsenteeCallLogSumAggregateOutputType | null
    _min: AbsenteeCallLogMinAggregateOutputType | null
    _max: AbsenteeCallLogMaxAggregateOutputType | null
  }

  export type AbsenteeCallLogAvgAggregateOutputType = {
    id: number | null
    studentId: number | null
    calledById: number | null
  }

  export type AbsenteeCallLogSumAggregateOutputType = {
    id: number | null
    studentId: number | null
    calledById: number | null
  }

  export type AbsenteeCallLogMinAggregateOutputType = {
    id: number | null
    studentId: number | null
    date: string | null
    answered: boolean | null
    reason: string | null
    calledById: number | null
    createdAt: Date | null
    callType: string | null
    recipient: string | null
  }

  export type AbsenteeCallLogMaxAggregateOutputType = {
    id: number | null
    studentId: number | null
    date: string | null
    answered: boolean | null
    reason: string | null
    calledById: number | null
    createdAt: Date | null
    callType: string | null
    recipient: string | null
  }

  export type AbsenteeCallLogCountAggregateOutputType = {
    id: number
    studentId: number
    date: number
    answered: number
    reason: number
    calledById: number
    createdAt: number
    callType: number
    recipient: number
    _all: number
  }


  export type AbsenteeCallLogAvgAggregateInputType = {
    id?: true
    studentId?: true
    calledById?: true
  }

  export type AbsenteeCallLogSumAggregateInputType = {
    id?: true
    studentId?: true
    calledById?: true
  }

  export type AbsenteeCallLogMinAggregateInputType = {
    id?: true
    studentId?: true
    date?: true
    answered?: true
    reason?: true
    calledById?: true
    createdAt?: true
    callType?: true
    recipient?: true
  }

  export type AbsenteeCallLogMaxAggregateInputType = {
    id?: true
    studentId?: true
    date?: true
    answered?: true
    reason?: true
    calledById?: true
    createdAt?: true
    callType?: true
    recipient?: true
  }

  export type AbsenteeCallLogCountAggregateInputType = {
    id?: true
    studentId?: true
    date?: true
    answered?: true
    reason?: true
    calledById?: true
    createdAt?: true
    callType?: true
    recipient?: true
    _all?: true
  }

  export type AbsenteeCallLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AbsenteeCallLog to aggregate.
     */
    where?: AbsenteeCallLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AbsenteeCallLogs to fetch.
     */
    orderBy?: AbsenteeCallLogOrderByWithRelationInput | AbsenteeCallLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AbsenteeCallLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AbsenteeCallLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AbsenteeCallLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AbsenteeCallLogs
    **/
    _count?: true | AbsenteeCallLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AbsenteeCallLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AbsenteeCallLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AbsenteeCallLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AbsenteeCallLogMaxAggregateInputType
  }

  export type GetAbsenteeCallLogAggregateType<T extends AbsenteeCallLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAbsenteeCallLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAbsenteeCallLog[P]>
      : GetScalarType<T[P], AggregateAbsenteeCallLog[P]>
  }




  export type AbsenteeCallLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AbsenteeCallLogWhereInput
    orderBy?: AbsenteeCallLogOrderByWithAggregationInput | AbsenteeCallLogOrderByWithAggregationInput[]
    by: AbsenteeCallLogScalarFieldEnum[] | AbsenteeCallLogScalarFieldEnum
    having?: AbsenteeCallLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AbsenteeCallLogCountAggregateInputType | true
    _avg?: AbsenteeCallLogAvgAggregateInputType
    _sum?: AbsenteeCallLogSumAggregateInputType
    _min?: AbsenteeCallLogMinAggregateInputType
    _max?: AbsenteeCallLogMaxAggregateInputType
  }

  export type AbsenteeCallLogGroupByOutputType = {
    id: number
    studentId: number
    date: string
    answered: boolean
    reason: string | null
    calledById: number
    createdAt: Date
    callType: string
    recipient: string
    _count: AbsenteeCallLogCountAggregateOutputType | null
    _avg: AbsenteeCallLogAvgAggregateOutputType | null
    _sum: AbsenteeCallLogSumAggregateOutputType | null
    _min: AbsenteeCallLogMinAggregateOutputType | null
    _max: AbsenteeCallLogMaxAggregateOutputType | null
  }

  type GetAbsenteeCallLogGroupByPayload<T extends AbsenteeCallLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AbsenteeCallLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AbsenteeCallLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AbsenteeCallLogGroupByOutputType[P]>
            : GetScalarType<T[P], AbsenteeCallLogGroupByOutputType[P]>
        }
      >
    >


  export type AbsenteeCallLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    date?: boolean
    answered?: boolean
    reason?: boolean
    calledById?: boolean
    createdAt?: boolean
    callType?: boolean
    recipient?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["absenteeCallLog"]>

  export type AbsenteeCallLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    date?: boolean
    answered?: boolean
    reason?: boolean
    calledById?: boolean
    createdAt?: boolean
    callType?: boolean
    recipient?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["absenteeCallLog"]>

  export type AbsenteeCallLogSelectScalar = {
    id?: boolean
    studentId?: boolean
    date?: boolean
    answered?: boolean
    reason?: boolean
    calledById?: boolean
    createdAt?: boolean
    callType?: boolean
    recipient?: boolean
  }

  export type AbsenteeCallLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type AbsenteeCallLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $AbsenteeCallLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AbsenteeCallLog"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: number
      date: string
      answered: boolean
      reason: string | null
      calledById: number
      createdAt: Date
      callType: string
      recipient: string
    }, ExtArgs["result"]["absenteeCallLog"]>
    composites: {}
  }

  type AbsenteeCallLogGetPayload<S extends boolean | null | undefined | AbsenteeCallLogDefaultArgs> = $Result.GetResult<Prisma.$AbsenteeCallLogPayload, S>

  type AbsenteeCallLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AbsenteeCallLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AbsenteeCallLogCountAggregateInputType | true
    }

  export interface AbsenteeCallLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AbsenteeCallLog'], meta: { name: 'AbsenteeCallLog' } }
    /**
     * Find zero or one AbsenteeCallLog that matches the filter.
     * @param {AbsenteeCallLogFindUniqueArgs} args - Arguments to find a AbsenteeCallLog
     * @example
     * // Get one AbsenteeCallLog
     * const absenteeCallLog = await prisma.absenteeCallLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AbsenteeCallLogFindUniqueArgs>(args: SelectSubset<T, AbsenteeCallLogFindUniqueArgs<ExtArgs>>): Prisma__AbsenteeCallLogClient<$Result.GetResult<Prisma.$AbsenteeCallLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AbsenteeCallLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AbsenteeCallLogFindUniqueOrThrowArgs} args - Arguments to find a AbsenteeCallLog
     * @example
     * // Get one AbsenteeCallLog
     * const absenteeCallLog = await prisma.absenteeCallLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AbsenteeCallLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AbsenteeCallLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AbsenteeCallLogClient<$Result.GetResult<Prisma.$AbsenteeCallLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AbsenteeCallLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsenteeCallLogFindFirstArgs} args - Arguments to find a AbsenteeCallLog
     * @example
     * // Get one AbsenteeCallLog
     * const absenteeCallLog = await prisma.absenteeCallLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AbsenteeCallLogFindFirstArgs>(args?: SelectSubset<T, AbsenteeCallLogFindFirstArgs<ExtArgs>>): Prisma__AbsenteeCallLogClient<$Result.GetResult<Prisma.$AbsenteeCallLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AbsenteeCallLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsenteeCallLogFindFirstOrThrowArgs} args - Arguments to find a AbsenteeCallLog
     * @example
     * // Get one AbsenteeCallLog
     * const absenteeCallLog = await prisma.absenteeCallLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AbsenteeCallLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AbsenteeCallLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AbsenteeCallLogClient<$Result.GetResult<Prisma.$AbsenteeCallLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AbsenteeCallLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsenteeCallLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AbsenteeCallLogs
     * const absenteeCallLogs = await prisma.absenteeCallLog.findMany()
     * 
     * // Get first 10 AbsenteeCallLogs
     * const absenteeCallLogs = await prisma.absenteeCallLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const absenteeCallLogWithIdOnly = await prisma.absenteeCallLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AbsenteeCallLogFindManyArgs>(args?: SelectSubset<T, AbsenteeCallLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AbsenteeCallLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AbsenteeCallLog.
     * @param {AbsenteeCallLogCreateArgs} args - Arguments to create a AbsenteeCallLog.
     * @example
     * // Create one AbsenteeCallLog
     * const AbsenteeCallLog = await prisma.absenteeCallLog.create({
     *   data: {
     *     // ... data to create a AbsenteeCallLog
     *   }
     * })
     * 
     */
    create<T extends AbsenteeCallLogCreateArgs>(args: SelectSubset<T, AbsenteeCallLogCreateArgs<ExtArgs>>): Prisma__AbsenteeCallLogClient<$Result.GetResult<Prisma.$AbsenteeCallLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AbsenteeCallLogs.
     * @param {AbsenteeCallLogCreateManyArgs} args - Arguments to create many AbsenteeCallLogs.
     * @example
     * // Create many AbsenteeCallLogs
     * const absenteeCallLog = await prisma.absenteeCallLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AbsenteeCallLogCreateManyArgs>(args?: SelectSubset<T, AbsenteeCallLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AbsenteeCallLogs and returns the data saved in the database.
     * @param {AbsenteeCallLogCreateManyAndReturnArgs} args - Arguments to create many AbsenteeCallLogs.
     * @example
     * // Create many AbsenteeCallLogs
     * const absenteeCallLog = await prisma.absenteeCallLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AbsenteeCallLogs and only return the `id`
     * const absenteeCallLogWithIdOnly = await prisma.absenteeCallLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AbsenteeCallLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AbsenteeCallLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AbsenteeCallLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AbsenteeCallLog.
     * @param {AbsenteeCallLogDeleteArgs} args - Arguments to delete one AbsenteeCallLog.
     * @example
     * // Delete one AbsenteeCallLog
     * const AbsenteeCallLog = await prisma.absenteeCallLog.delete({
     *   where: {
     *     // ... filter to delete one AbsenteeCallLog
     *   }
     * })
     * 
     */
    delete<T extends AbsenteeCallLogDeleteArgs>(args: SelectSubset<T, AbsenteeCallLogDeleteArgs<ExtArgs>>): Prisma__AbsenteeCallLogClient<$Result.GetResult<Prisma.$AbsenteeCallLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AbsenteeCallLog.
     * @param {AbsenteeCallLogUpdateArgs} args - Arguments to update one AbsenteeCallLog.
     * @example
     * // Update one AbsenteeCallLog
     * const absenteeCallLog = await prisma.absenteeCallLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AbsenteeCallLogUpdateArgs>(args: SelectSubset<T, AbsenteeCallLogUpdateArgs<ExtArgs>>): Prisma__AbsenteeCallLogClient<$Result.GetResult<Prisma.$AbsenteeCallLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AbsenteeCallLogs.
     * @param {AbsenteeCallLogDeleteManyArgs} args - Arguments to filter AbsenteeCallLogs to delete.
     * @example
     * // Delete a few AbsenteeCallLogs
     * const { count } = await prisma.absenteeCallLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AbsenteeCallLogDeleteManyArgs>(args?: SelectSubset<T, AbsenteeCallLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AbsenteeCallLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsenteeCallLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AbsenteeCallLogs
     * const absenteeCallLog = await prisma.absenteeCallLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AbsenteeCallLogUpdateManyArgs>(args: SelectSubset<T, AbsenteeCallLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AbsenteeCallLog.
     * @param {AbsenteeCallLogUpsertArgs} args - Arguments to update or create a AbsenteeCallLog.
     * @example
     * // Update or create a AbsenteeCallLog
     * const absenteeCallLog = await prisma.absenteeCallLog.upsert({
     *   create: {
     *     // ... data to create a AbsenteeCallLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AbsenteeCallLog we want to update
     *   }
     * })
     */
    upsert<T extends AbsenteeCallLogUpsertArgs>(args: SelectSubset<T, AbsenteeCallLogUpsertArgs<ExtArgs>>): Prisma__AbsenteeCallLogClient<$Result.GetResult<Prisma.$AbsenteeCallLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AbsenteeCallLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsenteeCallLogCountArgs} args - Arguments to filter AbsenteeCallLogs to count.
     * @example
     * // Count the number of AbsenteeCallLogs
     * const count = await prisma.absenteeCallLog.count({
     *   where: {
     *     // ... the filter for the AbsenteeCallLogs we want to count
     *   }
     * })
    **/
    count<T extends AbsenteeCallLogCountArgs>(
      args?: Subset<T, AbsenteeCallLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AbsenteeCallLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AbsenteeCallLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsenteeCallLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AbsenteeCallLogAggregateArgs>(args: Subset<T, AbsenteeCallLogAggregateArgs>): Prisma.PrismaPromise<GetAbsenteeCallLogAggregateType<T>>

    /**
     * Group by AbsenteeCallLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsenteeCallLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AbsenteeCallLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AbsenteeCallLogGroupByArgs['orderBy'] }
        : { orderBy?: AbsenteeCallLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AbsenteeCallLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAbsenteeCallLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AbsenteeCallLog model
   */
  readonly fields: AbsenteeCallLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AbsenteeCallLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AbsenteeCallLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AbsenteeCallLog model
   */ 
  interface AbsenteeCallLogFieldRefs {
    readonly id: FieldRef<"AbsenteeCallLog", 'Int'>
    readonly studentId: FieldRef<"AbsenteeCallLog", 'Int'>
    readonly date: FieldRef<"AbsenteeCallLog", 'String'>
    readonly answered: FieldRef<"AbsenteeCallLog", 'Boolean'>
    readonly reason: FieldRef<"AbsenteeCallLog", 'String'>
    readonly calledById: FieldRef<"AbsenteeCallLog", 'Int'>
    readonly createdAt: FieldRef<"AbsenteeCallLog", 'DateTime'>
    readonly callType: FieldRef<"AbsenteeCallLog", 'String'>
    readonly recipient: FieldRef<"AbsenteeCallLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AbsenteeCallLog findUnique
   */
  export type AbsenteeCallLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AbsenteeCallLog
     */
    select?: AbsenteeCallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenteeCallLogInclude<ExtArgs> | null
    /**
     * Filter, which AbsenteeCallLog to fetch.
     */
    where: AbsenteeCallLogWhereUniqueInput
  }

  /**
   * AbsenteeCallLog findUniqueOrThrow
   */
  export type AbsenteeCallLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AbsenteeCallLog
     */
    select?: AbsenteeCallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenteeCallLogInclude<ExtArgs> | null
    /**
     * Filter, which AbsenteeCallLog to fetch.
     */
    where: AbsenteeCallLogWhereUniqueInput
  }

  /**
   * AbsenteeCallLog findFirst
   */
  export type AbsenteeCallLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AbsenteeCallLog
     */
    select?: AbsenteeCallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenteeCallLogInclude<ExtArgs> | null
    /**
     * Filter, which AbsenteeCallLog to fetch.
     */
    where?: AbsenteeCallLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AbsenteeCallLogs to fetch.
     */
    orderBy?: AbsenteeCallLogOrderByWithRelationInput | AbsenteeCallLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AbsenteeCallLogs.
     */
    cursor?: AbsenteeCallLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AbsenteeCallLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AbsenteeCallLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AbsenteeCallLogs.
     */
    distinct?: AbsenteeCallLogScalarFieldEnum | AbsenteeCallLogScalarFieldEnum[]
  }

  /**
   * AbsenteeCallLog findFirstOrThrow
   */
  export type AbsenteeCallLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AbsenteeCallLog
     */
    select?: AbsenteeCallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenteeCallLogInclude<ExtArgs> | null
    /**
     * Filter, which AbsenteeCallLog to fetch.
     */
    where?: AbsenteeCallLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AbsenteeCallLogs to fetch.
     */
    orderBy?: AbsenteeCallLogOrderByWithRelationInput | AbsenteeCallLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AbsenteeCallLogs.
     */
    cursor?: AbsenteeCallLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AbsenteeCallLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AbsenteeCallLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AbsenteeCallLogs.
     */
    distinct?: AbsenteeCallLogScalarFieldEnum | AbsenteeCallLogScalarFieldEnum[]
  }

  /**
   * AbsenteeCallLog findMany
   */
  export type AbsenteeCallLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AbsenteeCallLog
     */
    select?: AbsenteeCallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenteeCallLogInclude<ExtArgs> | null
    /**
     * Filter, which AbsenteeCallLogs to fetch.
     */
    where?: AbsenteeCallLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AbsenteeCallLogs to fetch.
     */
    orderBy?: AbsenteeCallLogOrderByWithRelationInput | AbsenteeCallLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AbsenteeCallLogs.
     */
    cursor?: AbsenteeCallLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AbsenteeCallLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AbsenteeCallLogs.
     */
    skip?: number
    distinct?: AbsenteeCallLogScalarFieldEnum | AbsenteeCallLogScalarFieldEnum[]
  }

  /**
   * AbsenteeCallLog create
   */
  export type AbsenteeCallLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AbsenteeCallLog
     */
    select?: AbsenteeCallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenteeCallLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AbsenteeCallLog.
     */
    data: XOR<AbsenteeCallLogCreateInput, AbsenteeCallLogUncheckedCreateInput>
  }

  /**
   * AbsenteeCallLog createMany
   */
  export type AbsenteeCallLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AbsenteeCallLogs.
     */
    data: AbsenteeCallLogCreateManyInput | AbsenteeCallLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AbsenteeCallLog createManyAndReturn
   */
  export type AbsenteeCallLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AbsenteeCallLog
     */
    select?: AbsenteeCallLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AbsenteeCallLogs.
     */
    data: AbsenteeCallLogCreateManyInput | AbsenteeCallLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenteeCallLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AbsenteeCallLog update
   */
  export type AbsenteeCallLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AbsenteeCallLog
     */
    select?: AbsenteeCallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenteeCallLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AbsenteeCallLog.
     */
    data: XOR<AbsenteeCallLogUpdateInput, AbsenteeCallLogUncheckedUpdateInput>
    /**
     * Choose, which AbsenteeCallLog to update.
     */
    where: AbsenteeCallLogWhereUniqueInput
  }

  /**
   * AbsenteeCallLog updateMany
   */
  export type AbsenteeCallLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AbsenteeCallLogs.
     */
    data: XOR<AbsenteeCallLogUpdateManyMutationInput, AbsenteeCallLogUncheckedUpdateManyInput>
    /**
     * Filter which AbsenteeCallLogs to update
     */
    where?: AbsenteeCallLogWhereInput
  }

  /**
   * AbsenteeCallLog upsert
   */
  export type AbsenteeCallLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AbsenteeCallLog
     */
    select?: AbsenteeCallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenteeCallLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AbsenteeCallLog to update in case it exists.
     */
    where: AbsenteeCallLogWhereUniqueInput
    /**
     * In case the AbsenteeCallLog found by the `where` argument doesn't exist, create a new AbsenteeCallLog with this data.
     */
    create: XOR<AbsenteeCallLogCreateInput, AbsenteeCallLogUncheckedCreateInput>
    /**
     * In case the AbsenteeCallLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AbsenteeCallLogUpdateInput, AbsenteeCallLogUncheckedUpdateInput>
  }

  /**
   * AbsenteeCallLog delete
   */
  export type AbsenteeCallLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AbsenteeCallLog
     */
    select?: AbsenteeCallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenteeCallLogInclude<ExtArgs> | null
    /**
     * Filter which AbsenteeCallLog to delete.
     */
    where: AbsenteeCallLogWhereUniqueInput
  }

  /**
   * AbsenteeCallLog deleteMany
   */
  export type AbsenteeCallLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AbsenteeCallLogs to delete
     */
    where?: AbsenteeCallLogWhereInput
  }

  /**
   * AbsenteeCallLog without action
   */
  export type AbsenteeCallLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AbsenteeCallLog
     */
    select?: AbsenteeCallLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenteeCallLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    userId: 'userId',
    password: 'password',
    role: 'role',
    className: 'className',
    createdAt: 'createdAt',
    fingerprintEnabled: 'fingerprintEnabled'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ClassroomScalarFieldEnum: {
    id: 'id',
    roomNumber: 'roomNumber',
    className: 'className',
    createdAt: 'createdAt'
  };

  export type ClassroomScalarFieldEnum = (typeof ClassroomScalarFieldEnum)[keyof typeof ClassroomScalarFieldEnum]


  export const FacultyScalarFieldEnum: {
    id: 'id',
    facultyName: 'facultyName',
    phoneNumber: 'phoneNumber'
  };

  export type FacultyScalarFieldEnum = (typeof FacultyScalarFieldEnum)[keyof typeof FacultyScalarFieldEnum]


  export const TimetableScalarFieldEnum: {
    id: 'id',
    classroomId: 'classroomId',
    day: 'day',
    periodNo: 'periodNo',
    startTime: 'startTime',
    endTime: 'endTime',
    facultyName: 'facultyName',
    subjectName: 'subjectName'
  };

  export type TimetableScalarFieldEnum = (typeof TimetableScalarFieldEnum)[keyof typeof TimetableScalarFieldEnum]


  export const FacultyLogScalarFieldEnum: {
    id: 'id',
    classroomId: 'classroomId',
    facultyName: 'facultyName',
    periodNo: 'periodNo',
    entryTime: 'entryTime',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type FacultyLogScalarFieldEnum = (typeof FacultyLogScalarFieldEnum)[keyof typeof FacultyLogScalarFieldEnum]


  export const SystemSettingScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SystemSettingScalarFieldEnum = (typeof SystemSettingScalarFieldEnum)[keyof typeof SystemSettingScalarFieldEnum]


  export const FingerprintScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    credentialId: 'credentialId',
    publicKey: 'publicKey',
    counter: 'counter',
    transports: 'transports',
    createdAt: 'createdAt'
  };

  export type FingerprintScalarFieldEnum = (typeof FingerprintScalarFieldEnum)[keyof typeof FingerprintScalarFieldEnum]


  export const FingerprintAuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    action: 'action',
    details: 'details',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt'
  };

  export type FingerprintAuditLogScalarFieldEnum = (typeof FingerprintAuditLogScalarFieldEnum)[keyof typeof FingerprintAuditLogScalarFieldEnum]


  export const StudentScalarFieldEnum: {
    id: 'id',
    rollNumber: 'rollNumber',
    name: 'name',
    section: 'section',
    studentMobile: 'studentMobile',
    parentMobile: 'parentMobile',
    preExcusedStart: 'preExcusedStart',
    preExcusedEnd: 'preExcusedEnd',
    preExcusedReason: 'preExcusedReason',
    createdAt: 'createdAt'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const AttendanceScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    date: 'date',
    status: 'status',
    markedBy: 'markedBy',
    isLateComer: 'isLateComer',
    updatedAt: 'updatedAt'
  };

  export type AttendanceScalarFieldEnum = (typeof AttendanceScalarFieldEnum)[keyof typeof AttendanceScalarFieldEnum]


  export const AbsenteeCallLogScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    date: 'date',
    answered: 'answered',
    reason: 'reason',
    calledById: 'calledById',
    createdAt: 'createdAt',
    callType: 'callType',
    recipient: 'recipient'
  };

  export type AbsenteeCallLogScalarFieldEnum = (typeof AbsenteeCallLogScalarFieldEnum)[keyof typeof AbsenteeCallLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    userId?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    className?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    fingerprintEnabled?: BoolFilter<"User"> | boolean
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    password?: SortOrder
    role?: SortOrder
    className?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    fingerprintEnabled?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    className?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    fingerprintEnabled?: BoolFilter<"User"> | boolean
  }, "id" | "userId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    password?: SortOrder
    role?: SortOrder
    className?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    fingerprintEnabled?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    userId?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    className?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    fingerprintEnabled?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type ClassroomWhereInput = {
    AND?: ClassroomWhereInput | ClassroomWhereInput[]
    OR?: ClassroomWhereInput[]
    NOT?: ClassroomWhereInput | ClassroomWhereInput[]
    id?: IntFilter<"Classroom"> | number
    roomNumber?: StringFilter<"Classroom"> | string
    className?: StringFilter<"Classroom"> | string
    createdAt?: DateTimeFilter<"Classroom"> | Date | string
    timetables?: TimetableListRelationFilter
    logs?: FacultyLogListRelationFilter
  }

  export type ClassroomOrderByWithRelationInput = {
    id?: SortOrder
    roomNumber?: SortOrder
    className?: SortOrder
    createdAt?: SortOrder
    timetables?: TimetableOrderByRelationAggregateInput
    logs?: FacultyLogOrderByRelationAggregateInput
  }

  export type ClassroomWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    roomNumber_className?: ClassroomRoomNumberClassNameCompoundUniqueInput
    AND?: ClassroomWhereInput | ClassroomWhereInput[]
    OR?: ClassroomWhereInput[]
    NOT?: ClassroomWhereInput | ClassroomWhereInput[]
    roomNumber?: StringFilter<"Classroom"> | string
    className?: StringFilter<"Classroom"> | string
    createdAt?: DateTimeFilter<"Classroom"> | Date | string
    timetables?: TimetableListRelationFilter
    logs?: FacultyLogListRelationFilter
  }, "id" | "roomNumber_className">

  export type ClassroomOrderByWithAggregationInput = {
    id?: SortOrder
    roomNumber?: SortOrder
    className?: SortOrder
    createdAt?: SortOrder
    _count?: ClassroomCountOrderByAggregateInput
    _avg?: ClassroomAvgOrderByAggregateInput
    _max?: ClassroomMaxOrderByAggregateInput
    _min?: ClassroomMinOrderByAggregateInput
    _sum?: ClassroomSumOrderByAggregateInput
  }

  export type ClassroomScalarWhereWithAggregatesInput = {
    AND?: ClassroomScalarWhereWithAggregatesInput | ClassroomScalarWhereWithAggregatesInput[]
    OR?: ClassroomScalarWhereWithAggregatesInput[]
    NOT?: ClassroomScalarWhereWithAggregatesInput | ClassroomScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Classroom"> | number
    roomNumber?: StringWithAggregatesFilter<"Classroom"> | string
    className?: StringWithAggregatesFilter<"Classroom"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Classroom"> | Date | string
  }

  export type FacultyWhereInput = {
    AND?: FacultyWhereInput | FacultyWhereInput[]
    OR?: FacultyWhereInput[]
    NOT?: FacultyWhereInput | FacultyWhereInput[]
    id?: IntFilter<"Faculty"> | number
    facultyName?: StringFilter<"Faculty"> | string
    phoneNumber?: StringNullableFilter<"Faculty"> | string | null
  }

  export type FacultyOrderByWithRelationInput = {
    id?: SortOrder
    facultyName?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
  }

  export type FacultyWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    facultyName?: string
    AND?: FacultyWhereInput | FacultyWhereInput[]
    OR?: FacultyWhereInput[]
    NOT?: FacultyWhereInput | FacultyWhereInput[]
    phoneNumber?: StringNullableFilter<"Faculty"> | string | null
  }, "id" | "facultyName">

  export type FacultyOrderByWithAggregationInput = {
    id?: SortOrder
    facultyName?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    _count?: FacultyCountOrderByAggregateInput
    _avg?: FacultyAvgOrderByAggregateInput
    _max?: FacultyMaxOrderByAggregateInput
    _min?: FacultyMinOrderByAggregateInput
    _sum?: FacultySumOrderByAggregateInput
  }

  export type FacultyScalarWhereWithAggregatesInput = {
    AND?: FacultyScalarWhereWithAggregatesInput | FacultyScalarWhereWithAggregatesInput[]
    OR?: FacultyScalarWhereWithAggregatesInput[]
    NOT?: FacultyScalarWhereWithAggregatesInput | FacultyScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Faculty"> | number
    facultyName?: StringWithAggregatesFilter<"Faculty"> | string
    phoneNumber?: StringNullableWithAggregatesFilter<"Faculty"> | string | null
  }

  export type TimetableWhereInput = {
    AND?: TimetableWhereInput | TimetableWhereInput[]
    OR?: TimetableWhereInput[]
    NOT?: TimetableWhereInput | TimetableWhereInput[]
    id?: IntFilter<"Timetable"> | number
    classroomId?: IntFilter<"Timetable"> | number
    day?: StringFilter<"Timetable"> | string
    periodNo?: IntFilter<"Timetable"> | number
    startTime?: StringFilter<"Timetable"> | string
    endTime?: StringFilter<"Timetable"> | string
    facultyName?: StringFilter<"Timetable"> | string
    subjectName?: StringFilter<"Timetable"> | string
    classroom?: XOR<ClassroomRelationFilter, ClassroomWhereInput>
  }

  export type TimetableOrderByWithRelationInput = {
    id?: SortOrder
    classroomId?: SortOrder
    day?: SortOrder
    periodNo?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    facultyName?: SortOrder
    subjectName?: SortOrder
    classroom?: ClassroomOrderByWithRelationInput
  }

  export type TimetableWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TimetableWhereInput | TimetableWhereInput[]
    OR?: TimetableWhereInput[]
    NOT?: TimetableWhereInput | TimetableWhereInput[]
    classroomId?: IntFilter<"Timetable"> | number
    day?: StringFilter<"Timetable"> | string
    periodNo?: IntFilter<"Timetable"> | number
    startTime?: StringFilter<"Timetable"> | string
    endTime?: StringFilter<"Timetable"> | string
    facultyName?: StringFilter<"Timetable"> | string
    subjectName?: StringFilter<"Timetable"> | string
    classroom?: XOR<ClassroomRelationFilter, ClassroomWhereInput>
  }, "id">

  export type TimetableOrderByWithAggregationInput = {
    id?: SortOrder
    classroomId?: SortOrder
    day?: SortOrder
    periodNo?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    facultyName?: SortOrder
    subjectName?: SortOrder
    _count?: TimetableCountOrderByAggregateInput
    _avg?: TimetableAvgOrderByAggregateInput
    _max?: TimetableMaxOrderByAggregateInput
    _min?: TimetableMinOrderByAggregateInput
    _sum?: TimetableSumOrderByAggregateInput
  }

  export type TimetableScalarWhereWithAggregatesInput = {
    AND?: TimetableScalarWhereWithAggregatesInput | TimetableScalarWhereWithAggregatesInput[]
    OR?: TimetableScalarWhereWithAggregatesInput[]
    NOT?: TimetableScalarWhereWithAggregatesInput | TimetableScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Timetable"> | number
    classroomId?: IntWithAggregatesFilter<"Timetable"> | number
    day?: StringWithAggregatesFilter<"Timetable"> | string
    periodNo?: IntWithAggregatesFilter<"Timetable"> | number
    startTime?: StringWithAggregatesFilter<"Timetable"> | string
    endTime?: StringWithAggregatesFilter<"Timetable"> | string
    facultyName?: StringWithAggregatesFilter<"Timetable"> | string
    subjectName?: StringWithAggregatesFilter<"Timetable"> | string
  }

  export type FacultyLogWhereInput = {
    AND?: FacultyLogWhereInput | FacultyLogWhereInput[]
    OR?: FacultyLogWhereInput[]
    NOT?: FacultyLogWhereInput | FacultyLogWhereInput[]
    id?: IntFilter<"FacultyLog"> | number
    classroomId?: IntFilter<"FacultyLog"> | number
    facultyName?: StringFilter<"FacultyLog"> | string
    periodNo?: IntFilter<"FacultyLog"> | number
    entryTime?: DateTimeNullableFilter<"FacultyLog"> | Date | string | null
    status?: StringFilter<"FacultyLog"> | string
    createdAt?: DateTimeFilter<"FacultyLog"> | Date | string
    classroom?: XOR<ClassroomRelationFilter, ClassroomWhereInput>
  }

  export type FacultyLogOrderByWithRelationInput = {
    id?: SortOrder
    classroomId?: SortOrder
    facultyName?: SortOrder
    periodNo?: SortOrder
    entryTime?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    classroom?: ClassroomOrderByWithRelationInput
  }

  export type FacultyLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FacultyLogWhereInput | FacultyLogWhereInput[]
    OR?: FacultyLogWhereInput[]
    NOT?: FacultyLogWhereInput | FacultyLogWhereInput[]
    classroomId?: IntFilter<"FacultyLog"> | number
    facultyName?: StringFilter<"FacultyLog"> | string
    periodNo?: IntFilter<"FacultyLog"> | number
    entryTime?: DateTimeNullableFilter<"FacultyLog"> | Date | string | null
    status?: StringFilter<"FacultyLog"> | string
    createdAt?: DateTimeFilter<"FacultyLog"> | Date | string
    classroom?: XOR<ClassroomRelationFilter, ClassroomWhereInput>
  }, "id">

  export type FacultyLogOrderByWithAggregationInput = {
    id?: SortOrder
    classroomId?: SortOrder
    facultyName?: SortOrder
    periodNo?: SortOrder
    entryTime?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: FacultyLogCountOrderByAggregateInput
    _avg?: FacultyLogAvgOrderByAggregateInput
    _max?: FacultyLogMaxOrderByAggregateInput
    _min?: FacultyLogMinOrderByAggregateInput
    _sum?: FacultyLogSumOrderByAggregateInput
  }

  export type FacultyLogScalarWhereWithAggregatesInput = {
    AND?: FacultyLogScalarWhereWithAggregatesInput | FacultyLogScalarWhereWithAggregatesInput[]
    OR?: FacultyLogScalarWhereWithAggregatesInput[]
    NOT?: FacultyLogScalarWhereWithAggregatesInput | FacultyLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FacultyLog"> | number
    classroomId?: IntWithAggregatesFilter<"FacultyLog"> | number
    facultyName?: StringWithAggregatesFilter<"FacultyLog"> | string
    periodNo?: IntWithAggregatesFilter<"FacultyLog"> | number
    entryTime?: DateTimeNullableWithAggregatesFilter<"FacultyLog"> | Date | string | null
    status?: StringWithAggregatesFilter<"FacultyLog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FacultyLog"> | Date | string
  }

  export type SystemSettingWhereInput = {
    AND?: SystemSettingWhereInput | SystemSettingWhereInput[]
    OR?: SystemSettingWhereInput[]
    NOT?: SystemSettingWhereInput | SystemSettingWhereInput[]
    id?: IntFilter<"SystemSetting"> | number
    key?: StringFilter<"SystemSetting"> | string
    value?: StringFilter<"SystemSetting"> | string
    createdAt?: DateTimeFilter<"SystemSetting"> | Date | string
    updatedAt?: DateTimeFilter<"SystemSetting"> | Date | string
  }

  export type SystemSettingOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    key?: string
    AND?: SystemSettingWhereInput | SystemSettingWhereInput[]
    OR?: SystemSettingWhereInput[]
    NOT?: SystemSettingWhereInput | SystemSettingWhereInput[]
    value?: StringFilter<"SystemSetting"> | string
    createdAt?: DateTimeFilter<"SystemSetting"> | Date | string
    updatedAt?: DateTimeFilter<"SystemSetting"> | Date | string
  }, "id" | "key">

  export type SystemSettingOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SystemSettingCountOrderByAggregateInput
    _avg?: SystemSettingAvgOrderByAggregateInput
    _max?: SystemSettingMaxOrderByAggregateInput
    _min?: SystemSettingMinOrderByAggregateInput
    _sum?: SystemSettingSumOrderByAggregateInput
  }

  export type SystemSettingScalarWhereWithAggregatesInput = {
    AND?: SystemSettingScalarWhereWithAggregatesInput | SystemSettingScalarWhereWithAggregatesInput[]
    OR?: SystemSettingScalarWhereWithAggregatesInput[]
    NOT?: SystemSettingScalarWhereWithAggregatesInput | SystemSettingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SystemSetting"> | number
    key?: StringWithAggregatesFilter<"SystemSetting"> | string
    value?: StringWithAggregatesFilter<"SystemSetting"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SystemSetting"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SystemSetting"> | Date | string
  }

  export type FingerprintWhereInput = {
    AND?: FingerprintWhereInput | FingerprintWhereInput[]
    OR?: FingerprintWhereInput[]
    NOT?: FingerprintWhereInput | FingerprintWhereInput[]
    id?: IntFilter<"Fingerprint"> | number
    userId?: StringFilter<"Fingerprint"> | string
    credentialId?: StringFilter<"Fingerprint"> | string
    publicKey?: StringFilter<"Fingerprint"> | string
    counter?: IntFilter<"Fingerprint"> | number
    transports?: StringNullableFilter<"Fingerprint"> | string | null
    createdAt?: DateTimeFilter<"Fingerprint"> | Date | string
  }

  export type FingerprintOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    credentialId?: SortOrder
    publicKey?: SortOrder
    counter?: SortOrder
    transports?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type FingerprintWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: string
    AND?: FingerprintWhereInput | FingerprintWhereInput[]
    OR?: FingerprintWhereInput[]
    NOT?: FingerprintWhereInput | FingerprintWhereInput[]
    credentialId?: StringFilter<"Fingerprint"> | string
    publicKey?: StringFilter<"Fingerprint"> | string
    counter?: IntFilter<"Fingerprint"> | number
    transports?: StringNullableFilter<"Fingerprint"> | string | null
    createdAt?: DateTimeFilter<"Fingerprint"> | Date | string
  }, "id" | "userId">

  export type FingerprintOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    credentialId?: SortOrder
    publicKey?: SortOrder
    counter?: SortOrder
    transports?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FingerprintCountOrderByAggregateInput
    _avg?: FingerprintAvgOrderByAggregateInput
    _max?: FingerprintMaxOrderByAggregateInput
    _min?: FingerprintMinOrderByAggregateInput
    _sum?: FingerprintSumOrderByAggregateInput
  }

  export type FingerprintScalarWhereWithAggregatesInput = {
    AND?: FingerprintScalarWhereWithAggregatesInput | FingerprintScalarWhereWithAggregatesInput[]
    OR?: FingerprintScalarWhereWithAggregatesInput[]
    NOT?: FingerprintScalarWhereWithAggregatesInput | FingerprintScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Fingerprint"> | number
    userId?: StringWithAggregatesFilter<"Fingerprint"> | string
    credentialId?: StringWithAggregatesFilter<"Fingerprint"> | string
    publicKey?: StringWithAggregatesFilter<"Fingerprint"> | string
    counter?: IntWithAggregatesFilter<"Fingerprint"> | number
    transports?: StringNullableWithAggregatesFilter<"Fingerprint"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Fingerprint"> | Date | string
  }

  export type FingerprintAuditLogWhereInput = {
    AND?: FingerprintAuditLogWhereInput | FingerprintAuditLogWhereInput[]
    OR?: FingerprintAuditLogWhereInput[]
    NOT?: FingerprintAuditLogWhereInput | FingerprintAuditLogWhereInput[]
    id?: IntFilter<"FingerprintAuditLog"> | number
    userId?: StringFilter<"FingerprintAuditLog"> | string
    action?: StringFilter<"FingerprintAuditLog"> | string
    details?: StringNullableFilter<"FingerprintAuditLog"> | string | null
    ipAddress?: StringNullableFilter<"FingerprintAuditLog"> | string | null
    createdAt?: DateTimeFilter<"FingerprintAuditLog"> | Date | string
  }

  export type FingerprintAuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type FingerprintAuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FingerprintAuditLogWhereInput | FingerprintAuditLogWhereInput[]
    OR?: FingerprintAuditLogWhereInput[]
    NOT?: FingerprintAuditLogWhereInput | FingerprintAuditLogWhereInput[]
    userId?: StringFilter<"FingerprintAuditLog"> | string
    action?: StringFilter<"FingerprintAuditLog"> | string
    details?: StringNullableFilter<"FingerprintAuditLog"> | string | null
    ipAddress?: StringNullableFilter<"FingerprintAuditLog"> | string | null
    createdAt?: DateTimeFilter<"FingerprintAuditLog"> | Date | string
  }, "id">

  export type FingerprintAuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FingerprintAuditLogCountOrderByAggregateInput
    _avg?: FingerprintAuditLogAvgOrderByAggregateInput
    _max?: FingerprintAuditLogMaxOrderByAggregateInput
    _min?: FingerprintAuditLogMinOrderByAggregateInput
    _sum?: FingerprintAuditLogSumOrderByAggregateInput
  }

  export type FingerprintAuditLogScalarWhereWithAggregatesInput = {
    AND?: FingerprintAuditLogScalarWhereWithAggregatesInput | FingerprintAuditLogScalarWhereWithAggregatesInput[]
    OR?: FingerprintAuditLogScalarWhereWithAggregatesInput[]
    NOT?: FingerprintAuditLogScalarWhereWithAggregatesInput | FingerprintAuditLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FingerprintAuditLog"> | number
    userId?: StringWithAggregatesFilter<"FingerprintAuditLog"> | string
    action?: StringWithAggregatesFilter<"FingerprintAuditLog"> | string
    details?: StringNullableWithAggregatesFilter<"FingerprintAuditLog"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"FingerprintAuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FingerprintAuditLog"> | Date | string
  }

  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: IntFilter<"Student"> | number
    rollNumber?: StringFilter<"Student"> | string
    name?: StringFilter<"Student"> | string
    section?: StringFilter<"Student"> | string
    studentMobile?: StringFilter<"Student"> | string
    parentMobile?: StringFilter<"Student"> | string
    preExcusedStart?: StringNullableFilter<"Student"> | string | null
    preExcusedEnd?: StringNullableFilter<"Student"> | string | null
    preExcusedReason?: StringNullableFilter<"Student"> | string | null
    createdAt?: DateTimeFilter<"Student"> | Date | string
    attendance?: AttendanceListRelationFilter
    callLogs?: AbsenteeCallLogListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    rollNumber?: SortOrder
    name?: SortOrder
    section?: SortOrder
    studentMobile?: SortOrder
    parentMobile?: SortOrder
    preExcusedStart?: SortOrderInput | SortOrder
    preExcusedEnd?: SortOrderInput | SortOrder
    preExcusedReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    attendance?: AttendanceOrderByRelationAggregateInput
    callLogs?: AbsenteeCallLogOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    rollNumber?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    name?: StringFilter<"Student"> | string
    section?: StringFilter<"Student"> | string
    studentMobile?: StringFilter<"Student"> | string
    parentMobile?: StringFilter<"Student"> | string
    preExcusedStart?: StringNullableFilter<"Student"> | string | null
    preExcusedEnd?: StringNullableFilter<"Student"> | string | null
    preExcusedReason?: StringNullableFilter<"Student"> | string | null
    createdAt?: DateTimeFilter<"Student"> | Date | string
    attendance?: AttendanceListRelationFilter
    callLogs?: AbsenteeCallLogListRelationFilter
  }, "id" | "rollNumber">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    rollNumber?: SortOrder
    name?: SortOrder
    section?: SortOrder
    studentMobile?: SortOrder
    parentMobile?: SortOrder
    preExcusedStart?: SortOrderInput | SortOrder
    preExcusedEnd?: SortOrderInput | SortOrder
    preExcusedReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Student"> | number
    rollNumber?: StringWithAggregatesFilter<"Student"> | string
    name?: StringWithAggregatesFilter<"Student"> | string
    section?: StringWithAggregatesFilter<"Student"> | string
    studentMobile?: StringWithAggregatesFilter<"Student"> | string
    parentMobile?: StringWithAggregatesFilter<"Student"> | string
    preExcusedStart?: StringNullableWithAggregatesFilter<"Student"> | string | null
    preExcusedEnd?: StringNullableWithAggregatesFilter<"Student"> | string | null
    preExcusedReason?: StringNullableWithAggregatesFilter<"Student"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
  }

  export type AttendanceWhereInput = {
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    id?: IntFilter<"Attendance"> | number
    studentId?: IntFilter<"Attendance"> | number
    date?: StringFilter<"Attendance"> | string
    status?: StringFilter<"Attendance"> | string
    markedBy?: IntFilter<"Attendance"> | number
    isLateComer?: BoolFilter<"Attendance"> | boolean
    updatedAt?: DateTimeFilter<"Attendance"> | Date | string
    student?: XOR<StudentRelationFilter, StudentWhereInput>
  }

  export type AttendanceOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    markedBy?: SortOrder
    isLateComer?: SortOrder
    updatedAt?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type AttendanceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    studentId_date?: AttendanceStudentIdDateCompoundUniqueInput
    AND?: AttendanceWhereInput | AttendanceWhereInput[]
    OR?: AttendanceWhereInput[]
    NOT?: AttendanceWhereInput | AttendanceWhereInput[]
    studentId?: IntFilter<"Attendance"> | number
    date?: StringFilter<"Attendance"> | string
    status?: StringFilter<"Attendance"> | string
    markedBy?: IntFilter<"Attendance"> | number
    isLateComer?: BoolFilter<"Attendance"> | boolean
    updatedAt?: DateTimeFilter<"Attendance"> | Date | string
    student?: XOR<StudentRelationFilter, StudentWhereInput>
  }, "id" | "studentId_date">

  export type AttendanceOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    markedBy?: SortOrder
    isLateComer?: SortOrder
    updatedAt?: SortOrder
    _count?: AttendanceCountOrderByAggregateInput
    _avg?: AttendanceAvgOrderByAggregateInput
    _max?: AttendanceMaxOrderByAggregateInput
    _min?: AttendanceMinOrderByAggregateInput
    _sum?: AttendanceSumOrderByAggregateInput
  }

  export type AttendanceScalarWhereWithAggregatesInput = {
    AND?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    OR?: AttendanceScalarWhereWithAggregatesInput[]
    NOT?: AttendanceScalarWhereWithAggregatesInput | AttendanceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Attendance"> | number
    studentId?: IntWithAggregatesFilter<"Attendance"> | number
    date?: StringWithAggregatesFilter<"Attendance"> | string
    status?: StringWithAggregatesFilter<"Attendance"> | string
    markedBy?: IntWithAggregatesFilter<"Attendance"> | number
    isLateComer?: BoolWithAggregatesFilter<"Attendance"> | boolean
    updatedAt?: DateTimeWithAggregatesFilter<"Attendance"> | Date | string
  }

  export type AbsenteeCallLogWhereInput = {
    AND?: AbsenteeCallLogWhereInput | AbsenteeCallLogWhereInput[]
    OR?: AbsenteeCallLogWhereInput[]
    NOT?: AbsenteeCallLogWhereInput | AbsenteeCallLogWhereInput[]
    id?: IntFilter<"AbsenteeCallLog"> | number
    studentId?: IntFilter<"AbsenteeCallLog"> | number
    date?: StringFilter<"AbsenteeCallLog"> | string
    answered?: BoolFilter<"AbsenteeCallLog"> | boolean
    reason?: StringNullableFilter<"AbsenteeCallLog"> | string | null
    calledById?: IntFilter<"AbsenteeCallLog"> | number
    createdAt?: DateTimeFilter<"AbsenteeCallLog"> | Date | string
    callType?: StringFilter<"AbsenteeCallLog"> | string
    recipient?: StringFilter<"AbsenteeCallLog"> | string
    student?: XOR<StudentRelationFilter, StudentWhereInput>
  }

  export type AbsenteeCallLogOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    answered?: SortOrder
    reason?: SortOrderInput | SortOrder
    calledById?: SortOrder
    createdAt?: SortOrder
    callType?: SortOrder
    recipient?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type AbsenteeCallLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AbsenteeCallLogWhereInput | AbsenteeCallLogWhereInput[]
    OR?: AbsenteeCallLogWhereInput[]
    NOT?: AbsenteeCallLogWhereInput | AbsenteeCallLogWhereInput[]
    studentId?: IntFilter<"AbsenteeCallLog"> | number
    date?: StringFilter<"AbsenteeCallLog"> | string
    answered?: BoolFilter<"AbsenteeCallLog"> | boolean
    reason?: StringNullableFilter<"AbsenteeCallLog"> | string | null
    calledById?: IntFilter<"AbsenteeCallLog"> | number
    createdAt?: DateTimeFilter<"AbsenteeCallLog"> | Date | string
    callType?: StringFilter<"AbsenteeCallLog"> | string
    recipient?: StringFilter<"AbsenteeCallLog"> | string
    student?: XOR<StudentRelationFilter, StudentWhereInput>
  }, "id">

  export type AbsenteeCallLogOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    answered?: SortOrder
    reason?: SortOrderInput | SortOrder
    calledById?: SortOrder
    createdAt?: SortOrder
    callType?: SortOrder
    recipient?: SortOrder
    _count?: AbsenteeCallLogCountOrderByAggregateInput
    _avg?: AbsenteeCallLogAvgOrderByAggregateInput
    _max?: AbsenteeCallLogMaxOrderByAggregateInput
    _min?: AbsenteeCallLogMinOrderByAggregateInput
    _sum?: AbsenteeCallLogSumOrderByAggregateInput
  }

  export type AbsenteeCallLogScalarWhereWithAggregatesInput = {
    AND?: AbsenteeCallLogScalarWhereWithAggregatesInput | AbsenteeCallLogScalarWhereWithAggregatesInput[]
    OR?: AbsenteeCallLogScalarWhereWithAggregatesInput[]
    NOT?: AbsenteeCallLogScalarWhereWithAggregatesInput | AbsenteeCallLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AbsenteeCallLog"> | number
    studentId?: IntWithAggregatesFilter<"AbsenteeCallLog"> | number
    date?: StringWithAggregatesFilter<"AbsenteeCallLog"> | string
    answered?: BoolWithAggregatesFilter<"AbsenteeCallLog"> | boolean
    reason?: StringNullableWithAggregatesFilter<"AbsenteeCallLog"> | string | null
    calledById?: IntWithAggregatesFilter<"AbsenteeCallLog"> | number
    createdAt?: DateTimeWithAggregatesFilter<"AbsenteeCallLog"> | Date | string
    callType?: StringWithAggregatesFilter<"AbsenteeCallLog"> | string
    recipient?: StringWithAggregatesFilter<"AbsenteeCallLog"> | string
  }

  export type UserCreateInput = {
    name: string
    userId: string
    password: string
    role: $Enums.Role
    className?: string | null
    createdAt?: Date | string
    fingerprintEnabled?: boolean
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    userId: string
    password: string
    role: $Enums.Role
    className?: string | null
    createdAt?: Date | string
    fingerprintEnabled?: boolean
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    className?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fingerprintEnabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    className?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fingerprintEnabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    userId: string
    password: string
    role: $Enums.Role
    className?: string | null
    createdAt?: Date | string
    fingerprintEnabled?: boolean
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    className?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fingerprintEnabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    className?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fingerprintEnabled?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ClassroomCreateInput = {
    roomNumber: string
    className: string
    createdAt?: Date | string
    timetables?: TimetableCreateNestedManyWithoutClassroomInput
    logs?: FacultyLogCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomUncheckedCreateInput = {
    id?: number
    roomNumber: string
    className: string
    createdAt?: Date | string
    timetables?: TimetableUncheckedCreateNestedManyWithoutClassroomInput
    logs?: FacultyLogUncheckedCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomUpdateInput = {
    roomNumber?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timetables?: TimetableUpdateManyWithoutClassroomNestedInput
    logs?: FacultyLogUpdateManyWithoutClassroomNestedInput
  }

  export type ClassroomUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    roomNumber?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timetables?: TimetableUncheckedUpdateManyWithoutClassroomNestedInput
    logs?: FacultyLogUncheckedUpdateManyWithoutClassroomNestedInput
  }

  export type ClassroomCreateManyInput = {
    id?: number
    roomNumber: string
    className: string
    createdAt?: Date | string
  }

  export type ClassroomUpdateManyMutationInput = {
    roomNumber?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassroomUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    roomNumber?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FacultyCreateInput = {
    facultyName: string
    phoneNumber?: string | null
  }

  export type FacultyUncheckedCreateInput = {
    id?: number
    facultyName: string
    phoneNumber?: string | null
  }

  export type FacultyUpdateInput = {
    facultyName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FacultyUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    facultyName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FacultyCreateManyInput = {
    id?: number
    facultyName: string
    phoneNumber?: string | null
  }

  export type FacultyUpdateManyMutationInput = {
    facultyName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FacultyUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    facultyName?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TimetableCreateInput = {
    day: string
    periodNo: number
    startTime: string
    endTime: string
    facultyName: string
    subjectName: string
    classroom: ClassroomCreateNestedOneWithoutTimetablesInput
  }

  export type TimetableUncheckedCreateInput = {
    id?: number
    classroomId: number
    day: string
    periodNo: number
    startTime: string
    endTime: string
    facultyName: string
    subjectName: string
  }

  export type TimetableUpdateInput = {
    day?: StringFieldUpdateOperationsInput | string
    periodNo?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    facultyName?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
    classroom?: ClassroomUpdateOneRequiredWithoutTimetablesNestedInput
  }

  export type TimetableUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    classroomId?: IntFieldUpdateOperationsInput | number
    day?: StringFieldUpdateOperationsInput | string
    periodNo?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    facultyName?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
  }

  export type TimetableCreateManyInput = {
    id?: number
    classroomId: number
    day: string
    periodNo: number
    startTime: string
    endTime: string
    facultyName: string
    subjectName: string
  }

  export type TimetableUpdateManyMutationInput = {
    day?: StringFieldUpdateOperationsInput | string
    periodNo?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    facultyName?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
  }

  export type TimetableUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    classroomId?: IntFieldUpdateOperationsInput | number
    day?: StringFieldUpdateOperationsInput | string
    periodNo?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    facultyName?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
  }

  export type FacultyLogCreateInput = {
    facultyName: string
    periodNo: number
    entryTime?: Date | string | null
    status: string
    createdAt?: Date | string
    classroom: ClassroomCreateNestedOneWithoutLogsInput
  }

  export type FacultyLogUncheckedCreateInput = {
    id?: number
    classroomId: number
    facultyName: string
    periodNo: number
    entryTime?: Date | string | null
    status: string
    createdAt?: Date | string
  }

  export type FacultyLogUpdateInput = {
    facultyName?: StringFieldUpdateOperationsInput | string
    periodNo?: IntFieldUpdateOperationsInput | number
    entryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    classroom?: ClassroomUpdateOneRequiredWithoutLogsNestedInput
  }

  export type FacultyLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    classroomId?: IntFieldUpdateOperationsInput | number
    facultyName?: StringFieldUpdateOperationsInput | string
    periodNo?: IntFieldUpdateOperationsInput | number
    entryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FacultyLogCreateManyInput = {
    id?: number
    classroomId: number
    facultyName: string
    periodNo: number
    entryTime?: Date | string | null
    status: string
    createdAt?: Date | string
  }

  export type FacultyLogUpdateManyMutationInput = {
    facultyName?: StringFieldUpdateOperationsInput | string
    periodNo?: IntFieldUpdateOperationsInput | number
    entryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FacultyLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    classroomId?: IntFieldUpdateOperationsInput | number
    facultyName?: StringFieldUpdateOperationsInput | string
    periodNo?: IntFieldUpdateOperationsInput | number
    entryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingCreateInput = {
    key: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemSettingUncheckedCreateInput = {
    id?: number
    key: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemSettingUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingCreateManyInput = {
    id?: number
    key: string
    value: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SystemSettingUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SystemSettingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FingerprintCreateInput = {
    userId: string
    credentialId: string
    publicKey: string
    counter?: number
    transports?: string | null
    createdAt?: Date | string
  }

  export type FingerprintUncheckedCreateInput = {
    id?: number
    userId: string
    credentialId: string
    publicKey: string
    counter?: number
    transports?: string | null
    createdAt?: Date | string
  }

  export type FingerprintUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    credentialId?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FingerprintUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    credentialId?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FingerprintCreateManyInput = {
    id?: number
    userId: string
    credentialId: string
    publicKey: string
    counter?: number
    transports?: string | null
    createdAt?: Date | string
  }

  export type FingerprintUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    credentialId?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FingerprintUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    credentialId?: StringFieldUpdateOperationsInput | string
    publicKey?: StringFieldUpdateOperationsInput | string
    counter?: IntFieldUpdateOperationsInput | number
    transports?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FingerprintAuditLogCreateInput = {
    userId: string
    action: string
    details?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type FingerprintAuditLogUncheckedCreateInput = {
    id?: number
    userId: string
    action: string
    details?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type FingerprintAuditLogUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FingerprintAuditLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FingerprintAuditLogCreateManyInput = {
    id?: number
    userId: string
    action: string
    details?: string | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type FingerprintAuditLogUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FingerprintAuditLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateInput = {
    rollNumber: string
    name: string
    section: string
    studentMobile: string
    parentMobile: string
    preExcusedStart?: string | null
    preExcusedEnd?: string | null
    preExcusedReason?: string | null
    createdAt?: Date | string
    attendance?: AttendanceCreateNestedManyWithoutStudentInput
    callLogs?: AbsenteeCallLogCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: number
    rollNumber: string
    name: string
    section: string
    studentMobile: string
    parentMobile: string
    preExcusedStart?: string | null
    preExcusedEnd?: string | null
    preExcusedReason?: string | null
    createdAt?: Date | string
    attendance?: AttendanceUncheckedCreateNestedManyWithoutStudentInput
    callLogs?: AbsenteeCallLogUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentUpdateInput = {
    rollNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    studentMobile?: StringFieldUpdateOperationsInput | string
    parentMobile?: StringFieldUpdateOperationsInput | string
    preExcusedStart?: NullableStringFieldUpdateOperationsInput | string | null
    preExcusedEnd?: NullableStringFieldUpdateOperationsInput | string | null
    preExcusedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance?: AttendanceUpdateManyWithoutStudentNestedInput
    callLogs?: AbsenteeCallLogUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    rollNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    studentMobile?: StringFieldUpdateOperationsInput | string
    parentMobile?: StringFieldUpdateOperationsInput | string
    preExcusedStart?: NullableStringFieldUpdateOperationsInput | string | null
    preExcusedEnd?: NullableStringFieldUpdateOperationsInput | string | null
    preExcusedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance?: AttendanceUncheckedUpdateManyWithoutStudentNestedInput
    callLogs?: AbsenteeCallLogUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: number
    rollNumber: string
    name: string
    section: string
    studentMobile: string
    parentMobile: string
    preExcusedStart?: string | null
    preExcusedEnd?: string | null
    preExcusedReason?: string | null
    createdAt?: Date | string
  }

  export type StudentUpdateManyMutationInput = {
    rollNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    studentMobile?: StringFieldUpdateOperationsInput | string
    parentMobile?: StringFieldUpdateOperationsInput | string
    preExcusedStart?: NullableStringFieldUpdateOperationsInput | string | null
    preExcusedEnd?: NullableStringFieldUpdateOperationsInput | string | null
    preExcusedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    rollNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    studentMobile?: StringFieldUpdateOperationsInput | string
    parentMobile?: StringFieldUpdateOperationsInput | string
    preExcusedStart?: NullableStringFieldUpdateOperationsInput | string | null
    preExcusedEnd?: NullableStringFieldUpdateOperationsInput | string | null
    preExcusedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceCreateInput = {
    date: string
    status: string
    markedBy: number
    isLateComer?: boolean
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutAttendanceInput
  }

  export type AttendanceUncheckedCreateInput = {
    id?: number
    studentId: number
    date: string
    status: string
    markedBy: number
    isLateComer?: boolean
    updatedAt?: Date | string
  }

  export type AttendanceUpdateInput = {
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    markedBy?: IntFieldUpdateOperationsInput | number
    isLateComer?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutAttendanceNestedInput
  }

  export type AttendanceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    markedBy?: IntFieldUpdateOperationsInput | number
    isLateComer?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceCreateManyInput = {
    id?: number
    studentId: number
    date: string
    status: string
    markedBy: number
    isLateComer?: boolean
    updatedAt?: Date | string
  }

  export type AttendanceUpdateManyMutationInput = {
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    markedBy?: IntFieldUpdateOperationsInput | number
    isLateComer?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    markedBy?: IntFieldUpdateOperationsInput | number
    isLateComer?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AbsenteeCallLogCreateInput = {
    date: string
    answered: boolean
    reason?: string | null
    calledById: number
    createdAt?: Date | string
    callType?: string
    recipient?: string
    student: StudentCreateNestedOneWithoutCallLogsInput
  }

  export type AbsenteeCallLogUncheckedCreateInput = {
    id?: number
    studentId: number
    date: string
    answered: boolean
    reason?: string | null
    calledById: number
    createdAt?: Date | string
    callType?: string
    recipient?: string
  }

  export type AbsenteeCallLogUpdateInput = {
    date?: StringFieldUpdateOperationsInput | string
    answered?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    calledById?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callType?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
    student?: StudentUpdateOneRequiredWithoutCallLogsNestedInput
  }

  export type AbsenteeCallLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    answered?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    calledById?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callType?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
  }

  export type AbsenteeCallLogCreateManyInput = {
    id?: number
    studentId: number
    date: string
    answered: boolean
    reason?: string | null
    calledById: number
    createdAt?: Date | string
    callType?: string
    recipient?: string
  }

  export type AbsenteeCallLogUpdateManyMutationInput = {
    date?: StringFieldUpdateOperationsInput | string
    answered?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    calledById?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callType?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
  }

  export type AbsenteeCallLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    answered?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    calledById?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callType?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    password?: SortOrder
    role?: SortOrder
    className?: SortOrder
    createdAt?: SortOrder
    fingerprintEnabled?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    password?: SortOrder
    role?: SortOrder
    className?: SortOrder
    createdAt?: SortOrder
    fingerprintEnabled?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    password?: SortOrder
    role?: SortOrder
    className?: SortOrder
    createdAt?: SortOrder
    fingerprintEnabled?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TimetableListRelationFilter = {
    every?: TimetableWhereInput
    some?: TimetableWhereInput
    none?: TimetableWhereInput
  }

  export type FacultyLogListRelationFilter = {
    every?: FacultyLogWhereInput
    some?: FacultyLogWhereInput
    none?: FacultyLogWhereInput
  }

  export type TimetableOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FacultyLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClassroomRoomNumberClassNameCompoundUniqueInput = {
    roomNumber: string
    className: string
  }

  export type ClassroomCountOrderByAggregateInput = {
    id?: SortOrder
    roomNumber?: SortOrder
    className?: SortOrder
    createdAt?: SortOrder
  }

  export type ClassroomAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ClassroomMaxOrderByAggregateInput = {
    id?: SortOrder
    roomNumber?: SortOrder
    className?: SortOrder
    createdAt?: SortOrder
  }

  export type ClassroomMinOrderByAggregateInput = {
    id?: SortOrder
    roomNumber?: SortOrder
    className?: SortOrder
    createdAt?: SortOrder
  }

  export type ClassroomSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FacultyCountOrderByAggregateInput = {
    id?: SortOrder
    facultyName?: SortOrder
    phoneNumber?: SortOrder
  }

  export type FacultyAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FacultyMaxOrderByAggregateInput = {
    id?: SortOrder
    facultyName?: SortOrder
    phoneNumber?: SortOrder
  }

  export type FacultyMinOrderByAggregateInput = {
    id?: SortOrder
    facultyName?: SortOrder
    phoneNumber?: SortOrder
  }

  export type FacultySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ClassroomRelationFilter = {
    is?: ClassroomWhereInput
    isNot?: ClassroomWhereInput
  }

  export type TimetableCountOrderByAggregateInput = {
    id?: SortOrder
    classroomId?: SortOrder
    day?: SortOrder
    periodNo?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    facultyName?: SortOrder
    subjectName?: SortOrder
  }

  export type TimetableAvgOrderByAggregateInput = {
    id?: SortOrder
    classroomId?: SortOrder
    periodNo?: SortOrder
  }

  export type TimetableMaxOrderByAggregateInput = {
    id?: SortOrder
    classroomId?: SortOrder
    day?: SortOrder
    periodNo?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    facultyName?: SortOrder
    subjectName?: SortOrder
  }

  export type TimetableMinOrderByAggregateInput = {
    id?: SortOrder
    classroomId?: SortOrder
    day?: SortOrder
    periodNo?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    facultyName?: SortOrder
    subjectName?: SortOrder
  }

  export type TimetableSumOrderByAggregateInput = {
    id?: SortOrder
    classroomId?: SortOrder
    periodNo?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type FacultyLogCountOrderByAggregateInput = {
    id?: SortOrder
    classroomId?: SortOrder
    facultyName?: SortOrder
    periodNo?: SortOrder
    entryTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type FacultyLogAvgOrderByAggregateInput = {
    id?: SortOrder
    classroomId?: SortOrder
    periodNo?: SortOrder
  }

  export type FacultyLogMaxOrderByAggregateInput = {
    id?: SortOrder
    classroomId?: SortOrder
    facultyName?: SortOrder
    periodNo?: SortOrder
    entryTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type FacultyLogMinOrderByAggregateInput = {
    id?: SortOrder
    classroomId?: SortOrder
    facultyName?: SortOrder
    periodNo?: SortOrder
    entryTime?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type FacultyLogSumOrderByAggregateInput = {
    id?: SortOrder
    classroomId?: SortOrder
    periodNo?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type SystemSettingCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SystemSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SystemSettingSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FingerprintCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    credentialId?: SortOrder
    publicKey?: SortOrder
    counter?: SortOrder
    transports?: SortOrder
    createdAt?: SortOrder
  }

  export type FingerprintAvgOrderByAggregateInput = {
    id?: SortOrder
    counter?: SortOrder
  }

  export type FingerprintMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    credentialId?: SortOrder
    publicKey?: SortOrder
    counter?: SortOrder
    transports?: SortOrder
    createdAt?: SortOrder
  }

  export type FingerprintMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    credentialId?: SortOrder
    publicKey?: SortOrder
    counter?: SortOrder
    transports?: SortOrder
    createdAt?: SortOrder
  }

  export type FingerprintSumOrderByAggregateInput = {
    id?: SortOrder
    counter?: SortOrder
  }

  export type FingerprintAuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type FingerprintAuditLogAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FingerprintAuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type FingerprintAuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type FingerprintAuditLogSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AttendanceListRelationFilter = {
    every?: AttendanceWhereInput
    some?: AttendanceWhereInput
    none?: AttendanceWhereInput
  }

  export type AbsenteeCallLogListRelationFilter = {
    every?: AbsenteeCallLogWhereInput
    some?: AbsenteeCallLogWhereInput
    none?: AbsenteeCallLogWhereInput
  }

  export type AttendanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AbsenteeCallLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    rollNumber?: SortOrder
    name?: SortOrder
    section?: SortOrder
    studentMobile?: SortOrder
    parentMobile?: SortOrder
    preExcusedStart?: SortOrder
    preExcusedEnd?: SortOrder
    preExcusedReason?: SortOrder
    createdAt?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    rollNumber?: SortOrder
    name?: SortOrder
    section?: SortOrder
    studentMobile?: SortOrder
    parentMobile?: SortOrder
    preExcusedStart?: SortOrder
    preExcusedEnd?: SortOrder
    preExcusedReason?: SortOrder
    createdAt?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    rollNumber?: SortOrder
    name?: SortOrder
    section?: SortOrder
    studentMobile?: SortOrder
    parentMobile?: SortOrder
    preExcusedStart?: SortOrder
    preExcusedEnd?: SortOrder
    preExcusedReason?: SortOrder
    createdAt?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StudentRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type AttendanceStudentIdDateCompoundUniqueInput = {
    studentId: number
    date: string
  }

  export type AttendanceCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    markedBy?: SortOrder
    isLateComer?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttendanceAvgOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    markedBy?: SortOrder
  }

  export type AttendanceMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    markedBy?: SortOrder
    isLateComer?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttendanceMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    markedBy?: SortOrder
    isLateComer?: SortOrder
    updatedAt?: SortOrder
  }

  export type AttendanceSumOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    markedBy?: SortOrder
  }

  export type AbsenteeCallLogCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    answered?: SortOrder
    reason?: SortOrder
    calledById?: SortOrder
    createdAt?: SortOrder
    callType?: SortOrder
    recipient?: SortOrder
  }

  export type AbsenteeCallLogAvgOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    calledById?: SortOrder
  }

  export type AbsenteeCallLogMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    answered?: SortOrder
    reason?: SortOrder
    calledById?: SortOrder
    createdAt?: SortOrder
    callType?: SortOrder
    recipient?: SortOrder
  }

  export type AbsenteeCallLogMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    date?: SortOrder
    answered?: SortOrder
    reason?: SortOrder
    calledById?: SortOrder
    createdAt?: SortOrder
    callType?: SortOrder
    recipient?: SortOrder
  }

  export type AbsenteeCallLogSumOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    calledById?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TimetableCreateNestedManyWithoutClassroomInput = {
    create?: XOR<TimetableCreateWithoutClassroomInput, TimetableUncheckedCreateWithoutClassroomInput> | TimetableCreateWithoutClassroomInput[] | TimetableUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: TimetableCreateOrConnectWithoutClassroomInput | TimetableCreateOrConnectWithoutClassroomInput[]
    createMany?: TimetableCreateManyClassroomInputEnvelope
    connect?: TimetableWhereUniqueInput | TimetableWhereUniqueInput[]
  }

  export type FacultyLogCreateNestedManyWithoutClassroomInput = {
    create?: XOR<FacultyLogCreateWithoutClassroomInput, FacultyLogUncheckedCreateWithoutClassroomInput> | FacultyLogCreateWithoutClassroomInput[] | FacultyLogUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: FacultyLogCreateOrConnectWithoutClassroomInput | FacultyLogCreateOrConnectWithoutClassroomInput[]
    createMany?: FacultyLogCreateManyClassroomInputEnvelope
    connect?: FacultyLogWhereUniqueInput | FacultyLogWhereUniqueInput[]
  }

  export type TimetableUncheckedCreateNestedManyWithoutClassroomInput = {
    create?: XOR<TimetableCreateWithoutClassroomInput, TimetableUncheckedCreateWithoutClassroomInput> | TimetableCreateWithoutClassroomInput[] | TimetableUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: TimetableCreateOrConnectWithoutClassroomInput | TimetableCreateOrConnectWithoutClassroomInput[]
    createMany?: TimetableCreateManyClassroomInputEnvelope
    connect?: TimetableWhereUniqueInput | TimetableWhereUniqueInput[]
  }

  export type FacultyLogUncheckedCreateNestedManyWithoutClassroomInput = {
    create?: XOR<FacultyLogCreateWithoutClassroomInput, FacultyLogUncheckedCreateWithoutClassroomInput> | FacultyLogCreateWithoutClassroomInput[] | FacultyLogUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: FacultyLogCreateOrConnectWithoutClassroomInput | FacultyLogCreateOrConnectWithoutClassroomInput[]
    createMany?: FacultyLogCreateManyClassroomInputEnvelope
    connect?: FacultyLogWhereUniqueInput | FacultyLogWhereUniqueInput[]
  }

  export type TimetableUpdateManyWithoutClassroomNestedInput = {
    create?: XOR<TimetableCreateWithoutClassroomInput, TimetableUncheckedCreateWithoutClassroomInput> | TimetableCreateWithoutClassroomInput[] | TimetableUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: TimetableCreateOrConnectWithoutClassroomInput | TimetableCreateOrConnectWithoutClassroomInput[]
    upsert?: TimetableUpsertWithWhereUniqueWithoutClassroomInput | TimetableUpsertWithWhereUniqueWithoutClassroomInput[]
    createMany?: TimetableCreateManyClassroomInputEnvelope
    set?: TimetableWhereUniqueInput | TimetableWhereUniqueInput[]
    disconnect?: TimetableWhereUniqueInput | TimetableWhereUniqueInput[]
    delete?: TimetableWhereUniqueInput | TimetableWhereUniqueInput[]
    connect?: TimetableWhereUniqueInput | TimetableWhereUniqueInput[]
    update?: TimetableUpdateWithWhereUniqueWithoutClassroomInput | TimetableUpdateWithWhereUniqueWithoutClassroomInput[]
    updateMany?: TimetableUpdateManyWithWhereWithoutClassroomInput | TimetableUpdateManyWithWhereWithoutClassroomInput[]
    deleteMany?: TimetableScalarWhereInput | TimetableScalarWhereInput[]
  }

  export type FacultyLogUpdateManyWithoutClassroomNestedInput = {
    create?: XOR<FacultyLogCreateWithoutClassroomInput, FacultyLogUncheckedCreateWithoutClassroomInput> | FacultyLogCreateWithoutClassroomInput[] | FacultyLogUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: FacultyLogCreateOrConnectWithoutClassroomInput | FacultyLogCreateOrConnectWithoutClassroomInput[]
    upsert?: FacultyLogUpsertWithWhereUniqueWithoutClassroomInput | FacultyLogUpsertWithWhereUniqueWithoutClassroomInput[]
    createMany?: FacultyLogCreateManyClassroomInputEnvelope
    set?: FacultyLogWhereUniqueInput | FacultyLogWhereUniqueInput[]
    disconnect?: FacultyLogWhereUniqueInput | FacultyLogWhereUniqueInput[]
    delete?: FacultyLogWhereUniqueInput | FacultyLogWhereUniqueInput[]
    connect?: FacultyLogWhereUniqueInput | FacultyLogWhereUniqueInput[]
    update?: FacultyLogUpdateWithWhereUniqueWithoutClassroomInput | FacultyLogUpdateWithWhereUniqueWithoutClassroomInput[]
    updateMany?: FacultyLogUpdateManyWithWhereWithoutClassroomInput | FacultyLogUpdateManyWithWhereWithoutClassroomInput[]
    deleteMany?: FacultyLogScalarWhereInput | FacultyLogScalarWhereInput[]
  }

  export type TimetableUncheckedUpdateManyWithoutClassroomNestedInput = {
    create?: XOR<TimetableCreateWithoutClassroomInput, TimetableUncheckedCreateWithoutClassroomInput> | TimetableCreateWithoutClassroomInput[] | TimetableUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: TimetableCreateOrConnectWithoutClassroomInput | TimetableCreateOrConnectWithoutClassroomInput[]
    upsert?: TimetableUpsertWithWhereUniqueWithoutClassroomInput | TimetableUpsertWithWhereUniqueWithoutClassroomInput[]
    createMany?: TimetableCreateManyClassroomInputEnvelope
    set?: TimetableWhereUniqueInput | TimetableWhereUniqueInput[]
    disconnect?: TimetableWhereUniqueInput | TimetableWhereUniqueInput[]
    delete?: TimetableWhereUniqueInput | TimetableWhereUniqueInput[]
    connect?: TimetableWhereUniqueInput | TimetableWhereUniqueInput[]
    update?: TimetableUpdateWithWhereUniqueWithoutClassroomInput | TimetableUpdateWithWhereUniqueWithoutClassroomInput[]
    updateMany?: TimetableUpdateManyWithWhereWithoutClassroomInput | TimetableUpdateManyWithWhereWithoutClassroomInput[]
    deleteMany?: TimetableScalarWhereInput | TimetableScalarWhereInput[]
  }

  export type FacultyLogUncheckedUpdateManyWithoutClassroomNestedInput = {
    create?: XOR<FacultyLogCreateWithoutClassroomInput, FacultyLogUncheckedCreateWithoutClassroomInput> | FacultyLogCreateWithoutClassroomInput[] | FacultyLogUncheckedCreateWithoutClassroomInput[]
    connectOrCreate?: FacultyLogCreateOrConnectWithoutClassroomInput | FacultyLogCreateOrConnectWithoutClassroomInput[]
    upsert?: FacultyLogUpsertWithWhereUniqueWithoutClassroomInput | FacultyLogUpsertWithWhereUniqueWithoutClassroomInput[]
    createMany?: FacultyLogCreateManyClassroomInputEnvelope
    set?: FacultyLogWhereUniqueInput | FacultyLogWhereUniqueInput[]
    disconnect?: FacultyLogWhereUniqueInput | FacultyLogWhereUniqueInput[]
    delete?: FacultyLogWhereUniqueInput | FacultyLogWhereUniqueInput[]
    connect?: FacultyLogWhereUniqueInput | FacultyLogWhereUniqueInput[]
    update?: FacultyLogUpdateWithWhereUniqueWithoutClassroomInput | FacultyLogUpdateWithWhereUniqueWithoutClassroomInput[]
    updateMany?: FacultyLogUpdateManyWithWhereWithoutClassroomInput | FacultyLogUpdateManyWithWhereWithoutClassroomInput[]
    deleteMany?: FacultyLogScalarWhereInput | FacultyLogScalarWhereInput[]
  }

  export type ClassroomCreateNestedOneWithoutTimetablesInput = {
    create?: XOR<ClassroomCreateWithoutTimetablesInput, ClassroomUncheckedCreateWithoutTimetablesInput>
    connectOrCreate?: ClassroomCreateOrConnectWithoutTimetablesInput
    connect?: ClassroomWhereUniqueInput
  }

  export type ClassroomUpdateOneRequiredWithoutTimetablesNestedInput = {
    create?: XOR<ClassroomCreateWithoutTimetablesInput, ClassroomUncheckedCreateWithoutTimetablesInput>
    connectOrCreate?: ClassroomCreateOrConnectWithoutTimetablesInput
    upsert?: ClassroomUpsertWithoutTimetablesInput
    connect?: ClassroomWhereUniqueInput
    update?: XOR<XOR<ClassroomUpdateToOneWithWhereWithoutTimetablesInput, ClassroomUpdateWithoutTimetablesInput>, ClassroomUncheckedUpdateWithoutTimetablesInput>
  }

  export type ClassroomCreateNestedOneWithoutLogsInput = {
    create?: XOR<ClassroomCreateWithoutLogsInput, ClassroomUncheckedCreateWithoutLogsInput>
    connectOrCreate?: ClassroomCreateOrConnectWithoutLogsInput
    connect?: ClassroomWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ClassroomUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<ClassroomCreateWithoutLogsInput, ClassroomUncheckedCreateWithoutLogsInput>
    connectOrCreate?: ClassroomCreateOrConnectWithoutLogsInput
    upsert?: ClassroomUpsertWithoutLogsInput
    connect?: ClassroomWhereUniqueInput
    update?: XOR<XOR<ClassroomUpdateToOneWithWhereWithoutLogsInput, ClassroomUpdateWithoutLogsInput>, ClassroomUncheckedUpdateWithoutLogsInput>
  }

  export type AttendanceCreateNestedManyWithoutStudentInput = {
    create?: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput> | AttendanceCreateWithoutStudentInput[] | AttendanceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutStudentInput | AttendanceCreateOrConnectWithoutStudentInput[]
    createMany?: AttendanceCreateManyStudentInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type AbsenteeCallLogCreateNestedManyWithoutStudentInput = {
    create?: XOR<AbsenteeCallLogCreateWithoutStudentInput, AbsenteeCallLogUncheckedCreateWithoutStudentInput> | AbsenteeCallLogCreateWithoutStudentInput[] | AbsenteeCallLogUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AbsenteeCallLogCreateOrConnectWithoutStudentInput | AbsenteeCallLogCreateOrConnectWithoutStudentInput[]
    createMany?: AbsenteeCallLogCreateManyStudentInputEnvelope
    connect?: AbsenteeCallLogWhereUniqueInput | AbsenteeCallLogWhereUniqueInput[]
  }

  export type AttendanceUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput> | AttendanceCreateWithoutStudentInput[] | AttendanceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutStudentInput | AttendanceCreateOrConnectWithoutStudentInput[]
    createMany?: AttendanceCreateManyStudentInputEnvelope
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
  }

  export type AbsenteeCallLogUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<AbsenteeCallLogCreateWithoutStudentInput, AbsenteeCallLogUncheckedCreateWithoutStudentInput> | AbsenteeCallLogCreateWithoutStudentInput[] | AbsenteeCallLogUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AbsenteeCallLogCreateOrConnectWithoutStudentInput | AbsenteeCallLogCreateOrConnectWithoutStudentInput[]
    createMany?: AbsenteeCallLogCreateManyStudentInputEnvelope
    connect?: AbsenteeCallLogWhereUniqueInput | AbsenteeCallLogWhereUniqueInput[]
  }

  export type AttendanceUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput> | AttendanceCreateWithoutStudentInput[] | AttendanceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutStudentInput | AttendanceCreateOrConnectWithoutStudentInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutStudentInput | AttendanceUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AttendanceCreateManyStudentInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutStudentInput | AttendanceUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutStudentInput | AttendanceUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type AbsenteeCallLogUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AbsenteeCallLogCreateWithoutStudentInput, AbsenteeCallLogUncheckedCreateWithoutStudentInput> | AbsenteeCallLogCreateWithoutStudentInput[] | AbsenteeCallLogUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AbsenteeCallLogCreateOrConnectWithoutStudentInput | AbsenteeCallLogCreateOrConnectWithoutStudentInput[]
    upsert?: AbsenteeCallLogUpsertWithWhereUniqueWithoutStudentInput | AbsenteeCallLogUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AbsenteeCallLogCreateManyStudentInputEnvelope
    set?: AbsenteeCallLogWhereUniqueInput | AbsenteeCallLogWhereUniqueInput[]
    disconnect?: AbsenteeCallLogWhereUniqueInput | AbsenteeCallLogWhereUniqueInput[]
    delete?: AbsenteeCallLogWhereUniqueInput | AbsenteeCallLogWhereUniqueInput[]
    connect?: AbsenteeCallLogWhereUniqueInput | AbsenteeCallLogWhereUniqueInput[]
    update?: AbsenteeCallLogUpdateWithWhereUniqueWithoutStudentInput | AbsenteeCallLogUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AbsenteeCallLogUpdateManyWithWhereWithoutStudentInput | AbsenteeCallLogUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AbsenteeCallLogScalarWhereInput | AbsenteeCallLogScalarWhereInput[]
  }

  export type AttendanceUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput> | AttendanceCreateWithoutStudentInput[] | AttendanceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AttendanceCreateOrConnectWithoutStudentInput | AttendanceCreateOrConnectWithoutStudentInput[]
    upsert?: AttendanceUpsertWithWhereUniqueWithoutStudentInput | AttendanceUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AttendanceCreateManyStudentInputEnvelope
    set?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    disconnect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    delete?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    connect?: AttendanceWhereUniqueInput | AttendanceWhereUniqueInput[]
    update?: AttendanceUpdateWithWhereUniqueWithoutStudentInput | AttendanceUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AttendanceUpdateManyWithWhereWithoutStudentInput | AttendanceUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
  }

  export type AbsenteeCallLogUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AbsenteeCallLogCreateWithoutStudentInput, AbsenteeCallLogUncheckedCreateWithoutStudentInput> | AbsenteeCallLogCreateWithoutStudentInput[] | AbsenteeCallLogUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AbsenteeCallLogCreateOrConnectWithoutStudentInput | AbsenteeCallLogCreateOrConnectWithoutStudentInput[]
    upsert?: AbsenteeCallLogUpsertWithWhereUniqueWithoutStudentInput | AbsenteeCallLogUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AbsenteeCallLogCreateManyStudentInputEnvelope
    set?: AbsenteeCallLogWhereUniqueInput | AbsenteeCallLogWhereUniqueInput[]
    disconnect?: AbsenteeCallLogWhereUniqueInput | AbsenteeCallLogWhereUniqueInput[]
    delete?: AbsenteeCallLogWhereUniqueInput | AbsenteeCallLogWhereUniqueInput[]
    connect?: AbsenteeCallLogWhereUniqueInput | AbsenteeCallLogWhereUniqueInput[]
    update?: AbsenteeCallLogUpdateWithWhereUniqueWithoutStudentInput | AbsenteeCallLogUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AbsenteeCallLogUpdateManyWithWhereWithoutStudentInput | AbsenteeCallLogUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AbsenteeCallLogScalarWhereInput | AbsenteeCallLogScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutAttendanceInput = {
    create?: XOR<StudentCreateWithoutAttendanceInput, StudentUncheckedCreateWithoutAttendanceInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAttendanceInput
    connect?: StudentWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutAttendanceNestedInput = {
    create?: XOR<StudentCreateWithoutAttendanceInput, StudentUncheckedCreateWithoutAttendanceInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAttendanceInput
    upsert?: StudentUpsertWithoutAttendanceInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutAttendanceInput, StudentUpdateWithoutAttendanceInput>, StudentUncheckedUpdateWithoutAttendanceInput>
  }

  export type StudentCreateNestedOneWithoutCallLogsInput = {
    create?: XOR<StudentCreateWithoutCallLogsInput, StudentUncheckedCreateWithoutCallLogsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutCallLogsInput
    connect?: StudentWhereUniqueInput
  }

  export type StudentUpdateOneRequiredWithoutCallLogsNestedInput = {
    create?: XOR<StudentCreateWithoutCallLogsInput, StudentUncheckedCreateWithoutCallLogsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutCallLogsInput
    upsert?: StudentUpsertWithoutCallLogsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutCallLogsInput, StudentUpdateWithoutCallLogsInput>, StudentUncheckedUpdateWithoutCallLogsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type TimetableCreateWithoutClassroomInput = {
    day: string
    periodNo: number
    startTime: string
    endTime: string
    facultyName: string
    subjectName: string
  }

  export type TimetableUncheckedCreateWithoutClassroomInput = {
    id?: number
    day: string
    periodNo: number
    startTime: string
    endTime: string
    facultyName: string
    subjectName: string
  }

  export type TimetableCreateOrConnectWithoutClassroomInput = {
    where: TimetableWhereUniqueInput
    create: XOR<TimetableCreateWithoutClassroomInput, TimetableUncheckedCreateWithoutClassroomInput>
  }

  export type TimetableCreateManyClassroomInputEnvelope = {
    data: TimetableCreateManyClassroomInput | TimetableCreateManyClassroomInput[]
    skipDuplicates?: boolean
  }

  export type FacultyLogCreateWithoutClassroomInput = {
    facultyName: string
    periodNo: number
    entryTime?: Date | string | null
    status: string
    createdAt?: Date | string
  }

  export type FacultyLogUncheckedCreateWithoutClassroomInput = {
    id?: number
    facultyName: string
    periodNo: number
    entryTime?: Date | string | null
    status: string
    createdAt?: Date | string
  }

  export type FacultyLogCreateOrConnectWithoutClassroomInput = {
    where: FacultyLogWhereUniqueInput
    create: XOR<FacultyLogCreateWithoutClassroomInput, FacultyLogUncheckedCreateWithoutClassroomInput>
  }

  export type FacultyLogCreateManyClassroomInputEnvelope = {
    data: FacultyLogCreateManyClassroomInput | FacultyLogCreateManyClassroomInput[]
    skipDuplicates?: boolean
  }

  export type TimetableUpsertWithWhereUniqueWithoutClassroomInput = {
    where: TimetableWhereUniqueInput
    update: XOR<TimetableUpdateWithoutClassroomInput, TimetableUncheckedUpdateWithoutClassroomInput>
    create: XOR<TimetableCreateWithoutClassroomInput, TimetableUncheckedCreateWithoutClassroomInput>
  }

  export type TimetableUpdateWithWhereUniqueWithoutClassroomInput = {
    where: TimetableWhereUniqueInput
    data: XOR<TimetableUpdateWithoutClassroomInput, TimetableUncheckedUpdateWithoutClassroomInput>
  }

  export type TimetableUpdateManyWithWhereWithoutClassroomInput = {
    where: TimetableScalarWhereInput
    data: XOR<TimetableUpdateManyMutationInput, TimetableUncheckedUpdateManyWithoutClassroomInput>
  }

  export type TimetableScalarWhereInput = {
    AND?: TimetableScalarWhereInput | TimetableScalarWhereInput[]
    OR?: TimetableScalarWhereInput[]
    NOT?: TimetableScalarWhereInput | TimetableScalarWhereInput[]
    id?: IntFilter<"Timetable"> | number
    classroomId?: IntFilter<"Timetable"> | number
    day?: StringFilter<"Timetable"> | string
    periodNo?: IntFilter<"Timetable"> | number
    startTime?: StringFilter<"Timetable"> | string
    endTime?: StringFilter<"Timetable"> | string
    facultyName?: StringFilter<"Timetable"> | string
    subjectName?: StringFilter<"Timetable"> | string
  }

  export type FacultyLogUpsertWithWhereUniqueWithoutClassroomInput = {
    where: FacultyLogWhereUniqueInput
    update: XOR<FacultyLogUpdateWithoutClassroomInput, FacultyLogUncheckedUpdateWithoutClassroomInput>
    create: XOR<FacultyLogCreateWithoutClassroomInput, FacultyLogUncheckedCreateWithoutClassroomInput>
  }

  export type FacultyLogUpdateWithWhereUniqueWithoutClassroomInput = {
    where: FacultyLogWhereUniqueInput
    data: XOR<FacultyLogUpdateWithoutClassroomInput, FacultyLogUncheckedUpdateWithoutClassroomInput>
  }

  export type FacultyLogUpdateManyWithWhereWithoutClassroomInput = {
    where: FacultyLogScalarWhereInput
    data: XOR<FacultyLogUpdateManyMutationInput, FacultyLogUncheckedUpdateManyWithoutClassroomInput>
  }

  export type FacultyLogScalarWhereInput = {
    AND?: FacultyLogScalarWhereInput | FacultyLogScalarWhereInput[]
    OR?: FacultyLogScalarWhereInput[]
    NOT?: FacultyLogScalarWhereInput | FacultyLogScalarWhereInput[]
    id?: IntFilter<"FacultyLog"> | number
    classroomId?: IntFilter<"FacultyLog"> | number
    facultyName?: StringFilter<"FacultyLog"> | string
    periodNo?: IntFilter<"FacultyLog"> | number
    entryTime?: DateTimeNullableFilter<"FacultyLog"> | Date | string | null
    status?: StringFilter<"FacultyLog"> | string
    createdAt?: DateTimeFilter<"FacultyLog"> | Date | string
  }

  export type ClassroomCreateWithoutTimetablesInput = {
    roomNumber: string
    className: string
    createdAt?: Date | string
    logs?: FacultyLogCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomUncheckedCreateWithoutTimetablesInput = {
    id?: number
    roomNumber: string
    className: string
    createdAt?: Date | string
    logs?: FacultyLogUncheckedCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomCreateOrConnectWithoutTimetablesInput = {
    where: ClassroomWhereUniqueInput
    create: XOR<ClassroomCreateWithoutTimetablesInput, ClassroomUncheckedCreateWithoutTimetablesInput>
  }

  export type ClassroomUpsertWithoutTimetablesInput = {
    update: XOR<ClassroomUpdateWithoutTimetablesInput, ClassroomUncheckedUpdateWithoutTimetablesInput>
    create: XOR<ClassroomCreateWithoutTimetablesInput, ClassroomUncheckedCreateWithoutTimetablesInput>
    where?: ClassroomWhereInput
  }

  export type ClassroomUpdateToOneWithWhereWithoutTimetablesInput = {
    where?: ClassroomWhereInput
    data: XOR<ClassroomUpdateWithoutTimetablesInput, ClassroomUncheckedUpdateWithoutTimetablesInput>
  }

  export type ClassroomUpdateWithoutTimetablesInput = {
    roomNumber?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: FacultyLogUpdateManyWithoutClassroomNestedInput
  }

  export type ClassroomUncheckedUpdateWithoutTimetablesInput = {
    id?: IntFieldUpdateOperationsInput | number
    roomNumber?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: FacultyLogUncheckedUpdateManyWithoutClassroomNestedInput
  }

  export type ClassroomCreateWithoutLogsInput = {
    roomNumber: string
    className: string
    createdAt?: Date | string
    timetables?: TimetableCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomUncheckedCreateWithoutLogsInput = {
    id?: number
    roomNumber: string
    className: string
    createdAt?: Date | string
    timetables?: TimetableUncheckedCreateNestedManyWithoutClassroomInput
  }

  export type ClassroomCreateOrConnectWithoutLogsInput = {
    where: ClassroomWhereUniqueInput
    create: XOR<ClassroomCreateWithoutLogsInput, ClassroomUncheckedCreateWithoutLogsInput>
  }

  export type ClassroomUpsertWithoutLogsInput = {
    update: XOR<ClassroomUpdateWithoutLogsInput, ClassroomUncheckedUpdateWithoutLogsInput>
    create: XOR<ClassroomCreateWithoutLogsInput, ClassroomUncheckedCreateWithoutLogsInput>
    where?: ClassroomWhereInput
  }

  export type ClassroomUpdateToOneWithWhereWithoutLogsInput = {
    where?: ClassroomWhereInput
    data: XOR<ClassroomUpdateWithoutLogsInput, ClassroomUncheckedUpdateWithoutLogsInput>
  }

  export type ClassroomUpdateWithoutLogsInput = {
    roomNumber?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timetables?: TimetableUpdateManyWithoutClassroomNestedInput
  }

  export type ClassroomUncheckedUpdateWithoutLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    roomNumber?: StringFieldUpdateOperationsInput | string
    className?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    timetables?: TimetableUncheckedUpdateManyWithoutClassroomNestedInput
  }

  export type AttendanceCreateWithoutStudentInput = {
    date: string
    status: string
    markedBy: number
    isLateComer?: boolean
    updatedAt?: Date | string
  }

  export type AttendanceUncheckedCreateWithoutStudentInput = {
    id?: number
    date: string
    status: string
    markedBy: number
    isLateComer?: boolean
    updatedAt?: Date | string
  }

  export type AttendanceCreateOrConnectWithoutStudentInput = {
    where: AttendanceWhereUniqueInput
    create: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput>
  }

  export type AttendanceCreateManyStudentInputEnvelope = {
    data: AttendanceCreateManyStudentInput | AttendanceCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type AbsenteeCallLogCreateWithoutStudentInput = {
    date: string
    answered: boolean
    reason?: string | null
    calledById: number
    createdAt?: Date | string
    callType?: string
    recipient?: string
  }

  export type AbsenteeCallLogUncheckedCreateWithoutStudentInput = {
    id?: number
    date: string
    answered: boolean
    reason?: string | null
    calledById: number
    createdAt?: Date | string
    callType?: string
    recipient?: string
  }

  export type AbsenteeCallLogCreateOrConnectWithoutStudentInput = {
    where: AbsenteeCallLogWhereUniqueInput
    create: XOR<AbsenteeCallLogCreateWithoutStudentInput, AbsenteeCallLogUncheckedCreateWithoutStudentInput>
  }

  export type AbsenteeCallLogCreateManyStudentInputEnvelope = {
    data: AbsenteeCallLogCreateManyStudentInput | AbsenteeCallLogCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type AttendanceUpsertWithWhereUniqueWithoutStudentInput = {
    where: AttendanceWhereUniqueInput
    update: XOR<AttendanceUpdateWithoutStudentInput, AttendanceUncheckedUpdateWithoutStudentInput>
    create: XOR<AttendanceCreateWithoutStudentInput, AttendanceUncheckedCreateWithoutStudentInput>
  }

  export type AttendanceUpdateWithWhereUniqueWithoutStudentInput = {
    where: AttendanceWhereUniqueInput
    data: XOR<AttendanceUpdateWithoutStudentInput, AttendanceUncheckedUpdateWithoutStudentInput>
  }

  export type AttendanceUpdateManyWithWhereWithoutStudentInput = {
    where: AttendanceScalarWhereInput
    data: XOR<AttendanceUpdateManyMutationInput, AttendanceUncheckedUpdateManyWithoutStudentInput>
  }

  export type AttendanceScalarWhereInput = {
    AND?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    OR?: AttendanceScalarWhereInput[]
    NOT?: AttendanceScalarWhereInput | AttendanceScalarWhereInput[]
    id?: IntFilter<"Attendance"> | number
    studentId?: IntFilter<"Attendance"> | number
    date?: StringFilter<"Attendance"> | string
    status?: StringFilter<"Attendance"> | string
    markedBy?: IntFilter<"Attendance"> | number
    isLateComer?: BoolFilter<"Attendance"> | boolean
    updatedAt?: DateTimeFilter<"Attendance"> | Date | string
  }

  export type AbsenteeCallLogUpsertWithWhereUniqueWithoutStudentInput = {
    where: AbsenteeCallLogWhereUniqueInput
    update: XOR<AbsenteeCallLogUpdateWithoutStudentInput, AbsenteeCallLogUncheckedUpdateWithoutStudentInput>
    create: XOR<AbsenteeCallLogCreateWithoutStudentInput, AbsenteeCallLogUncheckedCreateWithoutStudentInput>
  }

  export type AbsenteeCallLogUpdateWithWhereUniqueWithoutStudentInput = {
    where: AbsenteeCallLogWhereUniqueInput
    data: XOR<AbsenteeCallLogUpdateWithoutStudentInput, AbsenteeCallLogUncheckedUpdateWithoutStudentInput>
  }

  export type AbsenteeCallLogUpdateManyWithWhereWithoutStudentInput = {
    where: AbsenteeCallLogScalarWhereInput
    data: XOR<AbsenteeCallLogUpdateManyMutationInput, AbsenteeCallLogUncheckedUpdateManyWithoutStudentInput>
  }

  export type AbsenteeCallLogScalarWhereInput = {
    AND?: AbsenteeCallLogScalarWhereInput | AbsenteeCallLogScalarWhereInput[]
    OR?: AbsenteeCallLogScalarWhereInput[]
    NOT?: AbsenteeCallLogScalarWhereInput | AbsenteeCallLogScalarWhereInput[]
    id?: IntFilter<"AbsenteeCallLog"> | number
    studentId?: IntFilter<"AbsenteeCallLog"> | number
    date?: StringFilter<"AbsenteeCallLog"> | string
    answered?: BoolFilter<"AbsenteeCallLog"> | boolean
    reason?: StringNullableFilter<"AbsenteeCallLog"> | string | null
    calledById?: IntFilter<"AbsenteeCallLog"> | number
    createdAt?: DateTimeFilter<"AbsenteeCallLog"> | Date | string
    callType?: StringFilter<"AbsenteeCallLog"> | string
    recipient?: StringFilter<"AbsenteeCallLog"> | string
  }

  export type StudentCreateWithoutAttendanceInput = {
    rollNumber: string
    name: string
    section: string
    studentMobile: string
    parentMobile: string
    preExcusedStart?: string | null
    preExcusedEnd?: string | null
    preExcusedReason?: string | null
    createdAt?: Date | string
    callLogs?: AbsenteeCallLogCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutAttendanceInput = {
    id?: number
    rollNumber: string
    name: string
    section: string
    studentMobile: string
    parentMobile: string
    preExcusedStart?: string | null
    preExcusedEnd?: string | null
    preExcusedReason?: string | null
    createdAt?: Date | string
    callLogs?: AbsenteeCallLogUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutAttendanceInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutAttendanceInput, StudentUncheckedCreateWithoutAttendanceInput>
  }

  export type StudentUpsertWithoutAttendanceInput = {
    update: XOR<StudentUpdateWithoutAttendanceInput, StudentUncheckedUpdateWithoutAttendanceInput>
    create: XOR<StudentCreateWithoutAttendanceInput, StudentUncheckedCreateWithoutAttendanceInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutAttendanceInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutAttendanceInput, StudentUncheckedUpdateWithoutAttendanceInput>
  }

  export type StudentUpdateWithoutAttendanceInput = {
    rollNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    studentMobile?: StringFieldUpdateOperationsInput | string
    parentMobile?: StringFieldUpdateOperationsInput | string
    preExcusedStart?: NullableStringFieldUpdateOperationsInput | string | null
    preExcusedEnd?: NullableStringFieldUpdateOperationsInput | string | null
    preExcusedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callLogs?: AbsenteeCallLogUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutAttendanceInput = {
    id?: IntFieldUpdateOperationsInput | number
    rollNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    studentMobile?: StringFieldUpdateOperationsInput | string
    parentMobile?: StringFieldUpdateOperationsInput | string
    preExcusedStart?: NullableStringFieldUpdateOperationsInput | string | null
    preExcusedEnd?: NullableStringFieldUpdateOperationsInput | string | null
    preExcusedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callLogs?: AbsenteeCallLogUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentCreateWithoutCallLogsInput = {
    rollNumber: string
    name: string
    section: string
    studentMobile: string
    parentMobile: string
    preExcusedStart?: string | null
    preExcusedEnd?: string | null
    preExcusedReason?: string | null
    createdAt?: Date | string
    attendance?: AttendanceCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutCallLogsInput = {
    id?: number
    rollNumber: string
    name: string
    section: string
    studentMobile: string
    parentMobile: string
    preExcusedStart?: string | null
    preExcusedEnd?: string | null
    preExcusedReason?: string | null
    createdAt?: Date | string
    attendance?: AttendanceUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutCallLogsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutCallLogsInput, StudentUncheckedCreateWithoutCallLogsInput>
  }

  export type StudentUpsertWithoutCallLogsInput = {
    update: XOR<StudentUpdateWithoutCallLogsInput, StudentUncheckedUpdateWithoutCallLogsInput>
    create: XOR<StudentCreateWithoutCallLogsInput, StudentUncheckedCreateWithoutCallLogsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutCallLogsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutCallLogsInput, StudentUncheckedUpdateWithoutCallLogsInput>
  }

  export type StudentUpdateWithoutCallLogsInput = {
    rollNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    studentMobile?: StringFieldUpdateOperationsInput | string
    parentMobile?: StringFieldUpdateOperationsInput | string
    preExcusedStart?: NullableStringFieldUpdateOperationsInput | string | null
    preExcusedEnd?: NullableStringFieldUpdateOperationsInput | string | null
    preExcusedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance?: AttendanceUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutCallLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    rollNumber?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    section?: StringFieldUpdateOperationsInput | string
    studentMobile?: StringFieldUpdateOperationsInput | string
    parentMobile?: StringFieldUpdateOperationsInput | string
    preExcusedStart?: NullableStringFieldUpdateOperationsInput | string | null
    preExcusedEnd?: NullableStringFieldUpdateOperationsInput | string | null
    preExcusedReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attendance?: AttendanceUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type TimetableCreateManyClassroomInput = {
    id?: number
    day: string
    periodNo: number
    startTime: string
    endTime: string
    facultyName: string
    subjectName: string
  }

  export type FacultyLogCreateManyClassroomInput = {
    id?: number
    facultyName: string
    periodNo: number
    entryTime?: Date | string | null
    status: string
    createdAt?: Date | string
  }

  export type TimetableUpdateWithoutClassroomInput = {
    day?: StringFieldUpdateOperationsInput | string
    periodNo?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    facultyName?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
  }

  export type TimetableUncheckedUpdateWithoutClassroomInput = {
    id?: IntFieldUpdateOperationsInput | number
    day?: StringFieldUpdateOperationsInput | string
    periodNo?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    facultyName?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
  }

  export type TimetableUncheckedUpdateManyWithoutClassroomInput = {
    id?: IntFieldUpdateOperationsInput | number
    day?: StringFieldUpdateOperationsInput | string
    periodNo?: IntFieldUpdateOperationsInput | number
    startTime?: StringFieldUpdateOperationsInput | string
    endTime?: StringFieldUpdateOperationsInput | string
    facultyName?: StringFieldUpdateOperationsInput | string
    subjectName?: StringFieldUpdateOperationsInput | string
  }

  export type FacultyLogUpdateWithoutClassroomInput = {
    facultyName?: StringFieldUpdateOperationsInput | string
    periodNo?: IntFieldUpdateOperationsInput | number
    entryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FacultyLogUncheckedUpdateWithoutClassroomInput = {
    id?: IntFieldUpdateOperationsInput | number
    facultyName?: StringFieldUpdateOperationsInput | string
    periodNo?: IntFieldUpdateOperationsInput | number
    entryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FacultyLogUncheckedUpdateManyWithoutClassroomInput = {
    id?: IntFieldUpdateOperationsInput | number
    facultyName?: StringFieldUpdateOperationsInput | string
    periodNo?: IntFieldUpdateOperationsInput | number
    entryTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceCreateManyStudentInput = {
    id?: number
    date: string
    status: string
    markedBy: number
    isLateComer?: boolean
    updatedAt?: Date | string
  }

  export type AbsenteeCallLogCreateManyStudentInput = {
    id?: number
    date: string
    answered: boolean
    reason?: string | null
    calledById: number
    createdAt?: Date | string
    callType?: string
    recipient?: string
  }

  export type AttendanceUpdateWithoutStudentInput = {
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    markedBy?: IntFieldUpdateOperationsInput | number
    isLateComer?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    markedBy?: IntFieldUpdateOperationsInput | number
    isLateComer?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttendanceUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    markedBy?: IntFieldUpdateOperationsInput | number
    isLateComer?: BoolFieldUpdateOperationsInput | boolean
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AbsenteeCallLogUpdateWithoutStudentInput = {
    date?: StringFieldUpdateOperationsInput | string
    answered?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    calledById?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callType?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
  }

  export type AbsenteeCallLogUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    answered?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    calledById?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callType?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
  }

  export type AbsenteeCallLogUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: StringFieldUpdateOperationsInput | string
    answered?: BoolFieldUpdateOperationsInput | boolean
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    calledById?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callType?: StringFieldUpdateOperationsInput | string
    recipient?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use ClassroomCountOutputTypeDefaultArgs instead
     */
    export type ClassroomCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClassroomCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentCountOutputTypeDefaultArgs instead
     */
    export type StudentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClassroomDefaultArgs instead
     */
    export type ClassroomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClassroomDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FacultyDefaultArgs instead
     */
    export type FacultyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FacultyDefaultArgs<ExtArgs>
    /**
     * @deprecated Use TimetableDefaultArgs instead
     */
    export type TimetableArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = TimetableDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FacultyLogDefaultArgs instead
     */
    export type FacultyLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FacultyLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SystemSettingDefaultArgs instead
     */
    export type SystemSettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SystemSettingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FingerprintDefaultArgs instead
     */
    export type FingerprintArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FingerprintDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FingerprintAuditLogDefaultArgs instead
     */
    export type FingerprintAuditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FingerprintAuditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentDefaultArgs instead
     */
    export type StudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AttendanceDefaultArgs instead
     */
    export type AttendanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AttendanceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AbsenteeCallLogDefaultArgs instead
     */
    export type AbsenteeCallLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AbsenteeCallLogDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}