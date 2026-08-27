
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'ProfanityChecker',
        slug: "profanity-checker",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://vector.profanity.dev",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      check_profanity: {
      },

    }
  }


  entity = {
    "check_profanity": {
      "fields": [
        {
          "name": "flaggedWords",
          "short": "List of words that were flagged as profanity",
          "type": "`$ARRAY`"
        },
        {
          "name": "isProfanity",
          "short": "Indicates whether profanity was detected in the message",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "message",
          "req": true,
          "short": "The text message to check for profanity",
          "type": "`$STRING`"
        },
        {
          "name": "score",
          "short": "Confidence score for profanity detection",
          "type": "`$NUMBER`"
        }
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
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

