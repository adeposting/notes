---
title: "TypeScript Cheat Sheet"
date: 2025-07-04
tags:
    - cheatsheets
    - development
    - engineering
    - javascript
    - nextjs
    - react
    - software
    - software-development
    - software-engineering
    - typescript
    - web-dev
categories:
    - /web-dev/cheatsheets
description: "A cheatsheet for TypeScript."
---

## Basic Types

```ts
let n: number = 42
let s: string = "hello"
let b: boolean = true
let arr: number[] = [1, 2, 3]
let tuple: [string, number] = ["age", 30]
let u: undefined = undefined
let nu: null = null
let anyValue: any = "can be anything"
let unknownValue: unknown = "must check before use"
```

---

## Type Aliases & Interfaces

```ts
type User = {
  name: string
  age?: number  // optional
}

interface User {
  name: string
  age?: number
}

type Point = { x: number; y: number }
```

---

## Literal & Union Types

```ts
type Direction = "left" | "right" | "up" | "down"

function move(dir: Direction) {
  console.log(dir)
}

type ID = string | number
```

---

## Type Guards

```ts
function printId(id: string | number) {
  if (typeof id === "string") {
    console.log(id.toUpperCase())
  } else {
    console.log(id.toFixed(2))
  }
}
```

---

## Type Inference

```ts
let x = 10         // x: number
const msg = "hi"   // msg: "hi" (literal type)
```

---

## Functions

```ts
function add(a: number, b: number): number {
  return a + b
}

// Arrow function
const multiply = (x: number, y: number): number => x * y
```

---

## Higher-Order Functions

```ts
function map<T, U>(arr: T[], fn: (x: T) => U): U[] {
  return arr.map(fn)
}

const doubled = map([1, 2, 3], (x) => x * 2)
```

---

## Generics

```ts
function identity<T>(value: T): T {
  return value
}

const s = identity<string>("hello")
const n = identity(42)  // inferred as number

type Pair<T, U> = [T, U]
const pair: Pair<string, number> = ["age", 30]
```

---

## Generic Constraints

```ts
function len<T extends { length: number }>(item: T): number {
  return item.length
}

len("hello")     // ok
len([1, 2, 3])   // ok
```

---

## Mapped Types

```ts
type ReadOnly<T> = {
  readonly [K in keyof T]: T[K]
}

type User = { name: string; age: number }
type ROUser = ReadOnly<User> // { readonly name: string; readonly age: number }
```

---

## Record, Partial, Pick, Omit

```ts
type User = { name: string; age: number }

type PartialUser = Partial<User>
// { name?: string; age?: number }

type PickUser = Pick<User, "name">
// { name: string }

type OmitUser = Omit<User, "age">
// { name: string }

type UserMap = Record<string, User>
```

---

## Conditional Types

```ts
type IsString<T> = T extends string ? "yes" : "no"

type A = IsString<"hi">     // "yes"
type B = IsString<123>      // "no"
```

---

## Function Overloads

```ts
function reverse(str: string): string
function reverse(arr: any[]): any[]
function reverse(input: string | any[]): string | any[] {
  return typeof input === "string"
    ? input.split("").reverse().join("")
    : input.slice().reverse()
}

const s = reverse("hello")   // string
const a = reverse([1,2,3])   // number[]
```

---

## Utility Types in FP

##ReturnType

```ts
function greet() {
  return { message: "hello" }
}

type GreetReturn = ReturnType<typeof greet>
// { message: string }
```

##Parameters

```ts
function sum(a: number, b: number) { return a + b }
type SumParams = Parameters<typeof sum>
// [number, number]
```

---

## Function Argument Inference

```ts
type ArgType<T> = T extends (arg: infer U) => any ? U : never

type T1 = ArgType<(x: number) => void>  // number
```

---

## Extract & Exclude Types

```ts
type T = string | number | boolean

type StringsOnly = Extract<T, string> // string
type NotString = Exclude<T, string>   // number | boolean
```

---

## Function Type Alias

```ts
type Predicate<T> = (value: T) => boolean

const isEven: Predicate<number> = (x) => x % 2 === 0
```

---

## Function Composition

```ts
function compose<A, B, C>(
  f: (b: B) => C,
  g: (a: A) => B
): (a: A) => C {
  return (a) => f(g(a))
}

const add1 = (x: number) => x + 1
const double = (x: number) => x * 2

const add1ThenDouble = compose(double, add1)
console.log(add1ThenDouble(3)) // → 8
```

---

## Curried Functions

```ts
function curry<A, B, C>(
  f: (a: A, b: B) => C
): (a: A) => (b: B) => C {
  return (a) => (b) => f(a, b)
}

const add = (x: number, y: number) => x + y
const curriedAdd = curry(add)
console.log(curriedAdd(2)(3)) // 5
```

---

## Readonly & Immutable Patterns

```ts
const nums: readonly number[] = [1, 2, 3]

type ImmutableUser = Readonly<User>
```

---

## Discriminated Unions (Algebraic Data Types)

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; size: number }

function area(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radiu 2
    case "square":
      return shape.siz 2
  }
}
```

---
