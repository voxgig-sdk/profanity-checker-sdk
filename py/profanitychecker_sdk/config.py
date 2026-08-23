# ProfanityChecker SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "ProfanityChecker",
            "slug": "profanity-checker",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://vector.profanity.dev",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "check_profanity": {},
            },
        },
        "entity": {
      "check_profanity": {
        "fields": [
          {
            "name": "flaggedWords",
            "short": "List of words that were flagged as profanity",
            "type": "`$ARRAY`",
          },
          {
            "name": "isProfanity",
            "short": "Indicates whether profanity was detected in the message",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "message",
            "req": True,
            "short": "The text message to check for profanity",
            "type": "`$STRING`",
          },
          {
            "name": "score",
            "short": "Confidence score for profanity detection",
            "type": "`$NUMBER`",
          },
        ],
        "name": "check_profanity",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/",
                "parts": [],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
