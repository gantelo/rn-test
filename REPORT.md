## Data layer choice

Used `react-query` because of familiarity and its out-of-the box suspense, error boundary and cache configurations.

## Retry/backoff
Simple, used `react-query` config for the error boundary retry count.

## Performance optimizations
Didn't go too far with flatlist, it's simple enough and out-of-the-box native implementation.
Memo wasn't really necessary, added it for the details styles because of the straightforward props and reused components.

## AI usage
Helped myself to style using cursor, otherwise I couldn't have reached time

## Other stuff
Used create-expo-app and I didn't have xcode updated so lost a good chunk of time there. Left example files because of time constraints.

structure

```
app/
  index.tsx  ## <- entry point, suspense hoc
  feed.tsx ## <- actual fetch + data
  feed-details ## <- also with suspense pattern
```

