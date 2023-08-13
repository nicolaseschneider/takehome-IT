# Welcome

First of all, thank you for taking the time to work on this takehome.  We know that your time is valuable, and we want to make sure you (at minimum) have an enjoyable/productive time working on it.  Ultimately this is more about showing you how both we and you work, than a test of anything specific.  What we're looking for as part of this takehome is:

- How you approach problems.
- How you choose to organize/implement solutions.
- What your overall technical style is.

If you have any questions throughout this takehome, please ask them via email or we can setup a call.  We would much rather have a conversation, than have you assume/get frustrated/grind on a solution for something that is outside the scope of what we're looking for.

The way we're looking for you to approach this takehome is through a hypothetical story, and a desire for a solution.  Think of it like you're working with us, and a product manager is describing the market need, requesting you come up with a broad strokes solution.  Not necessarily production ready, but a first-round prototype of how you'd ultimately build a product.  Something you could show to team members, and demo, but (potentially) has work left to do.

If you'd like, feel free to put this git repository up somewhere you can share with us, and we'll follow along with you.

# Background

We're a small and scrappy startup, looking to build out a solution to a problem: we need to be able to query third-party data with arbitrary filters, ordering, and joins/enrichment with other data. That is, we can't rely on the third-party APIs provided to support our combination of needs or not to rate limit us.  The data needs to be available as "real time" as necessary, depending on the specific type of data ingested, and our use case.

Now, we could use an additional third-party to provide this functionality, but:

1) They could/would be expensive.
2) We would not be able to directly control our latency on data being updated from the third-party.
3) We would be limited on how we were able to query/join data across multiple data sources.

# Possible Implementation

At a high level, we want to:

- Store the remote data we're interested in locally, cached for local queries.
- Query the third party APIs periodically to see if data has changed, and update our local values accordingly.
- Provide an internal API to extensibly (and somewhat) arbitrarily query that data against other (potential) data sources we've ingested.
- Have support for only updating the local data when remote data changes.  Hopefully causing less load on the local cache, preventing unnecessary writes.

# Scope Of The Takehome

We've included a couple of pieces of code:

- The `thirdparty` server.  Please do not modify this code; treat it as an upstream server that we cannot change.
- The `worker` werver.  Feel free to modify this server however you want.

The idea is that the `worker` can be modified to not only do the above caching of data from `thirdparty`, but also needs to provide a querying API of your choosing to allow our internal querying of data (e.g. using `curl`).

# Building And Running The Example

In order to build and run the takehome, you need:

- `node`
- `pnpm`

## Installing Packages

To install all of the required packages, run:

```
pnpm install
```

## Building

To install all of the required packages, run:

```
pnpm -r build
```

## Running The Third-Party Server

To install all of the required packages, run:

```
(cd thirdparty && node build)
```

## Running The Worker

To install all of the required packages, run:

```
(cd worker && node build)
```
