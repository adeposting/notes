---
title: 'JustFlipACoin.com is Not Random'
date: 2025-06-05
categories:
  - /bugs
tags:
  - random
  - bugs
  - software
---

> *If you are from [My Tech Tailor](https://mytechtailor.com/) and want to get in touch, [DM @adeposting on X.com](https://x.com/adeposting).*

---

[JustFlipACoin.com](https://justflipacoin.com/) is a simple website that provides functionality for a user to, well, just flip a coin, showing a neat animation of a coin flip.

[JustFlipACoin.com](https://justflipacoin.com/) makes the following claim:

> **"Just Flip A Coin utilizes JavaScript code which generates true random 50/50 results."**

**But does it really produce "true random" results?**

TL;DR: **no — it’s pseudorandom**, the actual implementation relies entirely on `Math.random()` — making it **pseudorandom**, **not cryptographically secure**, and **not "true random."**

So, [JustFlipACoin.com](https://justflipacoin.com/) is *lying to you*.

## What is "true random"?

"True random", or "secure random" refers to randomness generated in a way that is unpredictable and resistant to manipulation, typically for use in cryptography, authentication, token generation, or security-sensitive applications.

A random number generator (RNG) is considered secure (technically, cryptographically secure) if it has the following properties:

* Unpredictability: Even with knowledge of past outputs, an attacker cannot guess future outputs.
* Resistance to Reverse Engineering: Given one or more outputs, it should be infeasible to reconstruct the internal state of the generator.
* High Entropy Source: It draws from a source that contains real randomness (like mouse movement, hardware noise, an OS entropy pool, or by sampling [the cosmic background radiation of the universe](https://en.wikipedia.org/wiki/Cosmic_background_radiation)).


## How is the random coin flip implemented?

The random coin clip of [JustFlipACoin.com](https://justflipacoin.com/) is implemented in JavaScript. Lets break it down.

### Where is the coin flip logic implemented in the code?

The JavaScript code on [JustFlipACoin.com](https://justflipacoin.com/) is mininified and does not include a source map, however with a bit of digging we can determine that the logic for the "random" coin flip is contained in the following code snippet:

```javascript
function s(e){if(!(this instanceof s))return new s(e); ...
```

This expands to the following de-minified version:

```js
var e = new Random;
count = e.integer(7, 10);
```

This code in this snippet creates a new instance of a class called `Random`, and calls the method `integer(7, 10)` to generate a random number.


### So what is `Random`, and where does it come from?

The `Random` class is embedded directly in the JavaScript via the [random-js](https://github.com/ckknight/random-js) library. Here’s how the constructor is defined:

```js
function Random(engine) {
  if (!(this instanceof Random)) return new Random(engine);
  if (engine == null) engine = Random.engines.nativeMath;
  if (typeof engine !== "function") throw new TypeError("Expected engine to be a function");
  this.engine = engine;
}
```

Hence, when the site calls `new Random`, it ends up using:

```js
Random.engines.nativeMath
```

unless an engine is explicitly passed in — and in this case, it isn't.

### What does `Random.engines.nativeMath` do?

```js
Random.engines.nativeMath = function () {
  return (Math.random() * 0x100000000) | 0;
};
```

This engine:

* Calls `Math.random()`, which returns a floating point number between `0` and `1`.
* Scales it up to a 32-bit unsigned integer using `* 0x100000000`.
* Applies a bitwise OR with `0` to truncate to an integer.

So all randomness flows from this function:

```js
Math.random()
```

### Ok, how `integer(min, max)` work?

Once we have the engine, the actual method used to generate a number between `7` and `10` is `integer(min, max)`:

```js
Random.prototype.integer = function(min, max) {
  return Random.integer(min, max)(this.engine);
};
```

Which delegates to a factory function:

```js
Random.integer = function(min, max) {
  // internal logic omitted for brevity
  return function(engine) {
    // use the engine (in this case, Math.random wrapper) to produce an int between min and max
  };
};
```

So the `engine()` function — which is just a wrapped version `Math.random()` — is ultimately what determines the result.

### But why the range (`7`, `10`)?

The authors of the code appear to have chosen this range simply for aesthetic reasons, as the random number generated is actually the number of times the coin flips in the animation.

The number of flips determines whether the result lands on HEADS or TAILS based on whether the number is odd or even.

So whether you get heads or tails effectively boils down to:

```javascript
Random().integer(7, 10) % 2 === 1 ? HEADS : TAILS
```

### Lets recap what we have so far...

| Layer                         | Description                                |
| ----------------------------- | ------------------------------------------ |
| `flip()`                      | Calls `new Random().integer(7, 10)`        |
| `Random()`                    | Defaults to `Random.engines.nativeMath`    |
| `Random.engines.nativeMath()` | Wraps `Math.random()`                      |
| `Math.random()`               | A *deterministic*, non-cryptographic* RNG  |

### So why does this matter?

Well, `Math.random()` is **not cryptographically secure**.

It can be **predictable** under certain conditions or with access to the internal state.

It is **not suitable** for anything requiring strong guarantees of fairness, security, or statistical correctness.

So even though it *feels* random, it is **not true random**, and so, is **not guaranteed to be a fair coin flip**.

That is, **it is not a "true random" coin flip**.

## How could this issue be fixed?

Fixing this issue is actually trivial, and would in fact make the code more efficient, more simple, more readable, and avoid the need for the `random-js` dependency.

If the site truly wanted to ensure unpredictability, it could have used:

```js
crypto.getRandomValues(new Uint32Array(1));
```

or in `random-js`:

```js
new Random(Random.engines.browserCrypto)
```

This would draw entropy from the operating system’s secure RNG, suitable for cryptographic use.

## What can we do about it?

At the bottom of [JustFlipACoin.com](https://justflipacoin.com/), we find the following:

> *"This flipper was created and is maintained by [My Tech Tailor](https://mytechtailor.com/)... For more information, please visit [mytechtailor.com](https://mytechtailor.com/)"*

Visiting [mytechtailor.com](https://mytechtailor.com/), right in the middle of the page, is a big orange button that says "CONTACT US".

So if you wanted to, and I am not saying you should, you could use this form to politely let them know about this bug (a.k.a. the fact that they are lying to their users).

The even provide a phone number if you think this issue is urgent enough to give them a call!

If you do, all I ask is that you link back to this page using [adeposting.com/justflipacoin-com-is-not-random](https://adeposting.com/justflipacoin-com-is-not-random).

## See Also

* [JustFlipACoin.com](https://justflipacoin.com/) — the site in question
* [My Tech Tailor](https://mytechtailor.com/) — the company that created and maintains JustFlipACoin.com
* [`random-js` GitHub repository](https://github.com/ckknight/random-js) — the pseudorandom number generator library used by the site
* [`Math.random()` MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) — describes the default JavaScript RNG (not cryptographically secure)
* [`crypto.getRandomValues()` MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) — the secure alternative provided by the Web Crypto API
* [Cryptographically secure pseudorandom number generator – Wikipedia](https://en.wikipedia.org/wiki/Cryptographically_secure_pseudorandom_number_generator) — overview of secure RNGs and their cryptographic properties
