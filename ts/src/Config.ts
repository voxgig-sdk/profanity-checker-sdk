
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


  main = {
    name: 'ProfanityChecker',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
          "type": "`$ARRAY`"
        },
        {
          "name": "isProfanity",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "message",
          "req": true,
          "type": "`$STRING`"
        },
        {
          "name": "score",
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

