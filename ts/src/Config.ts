
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://api.boomlify.com/v1',

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      temporary_email: {
      },

    }
  }


  entity = {
    "temporary_email": {
      "fields": [
        {
          "active": true,
          "name": "custom_domain",
          "req": false,
          "type": "`$STRING`",
          "index$": 0
        },
        {
          "active": true,
          "name": "data",
          "req": false,
          "type": "`$OBJECT`",
          "index$": 1
        },
        {
          "active": true,
          "name": "prefix",
          "req": false,
          "type": "`$STRING`",
          "index$": 2
        },
        {
          "active": true,
          "name": "success",
          "req": false,
          "type": "`$BOOLEAN`",
          "index$": 3
        },
        {
          "active": true,
          "name": "validity_period",
          "req": false,
          "type": "`$INTEGER`",
          "index$": 4
        }
      ],
      "name": "temporary_email",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "active": true,
              "args": {},
              "method": "POST",
              "orig": "/temp-mail/generate",
              "parts": [
                "temp-mail",
                "generate"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "create"
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "example": "user123@tempmail.boomlify.com",
                    "kind": "param",
                    "name": "email",
                    "orig": "email",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ],
                "query": [
                  {
                    "active": true,
                    "example": 20,
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  },
                  {
                    "active": true,
                    "example": 0,
                    "kind": "query",
                    "name": "offset",
                    "orig": "offset",
                    "reqd": false,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "method": "GET",
              "orig": "/temp-mail/{email}/inbox",
              "parts": [
                "temp-mail",
                "{email}",
                "inbox"
              ],
              "select": {
                "exist": [
                  "email",
                  "limit",
                  "offset"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            },
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "email",
                    "orig": "email",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  },
                  {
                    "active": true,
                    "kind": "param",
                    "name": "message_id",
                    "orig": "message_id",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 1
                  }
                ]
              },
              "method": "GET",
              "orig": "/temp-mail/{email}/messages/{messageId}",
              "parts": [
                "temp-mail",
                "{email}",
                "messages",
                "{message_id}"
              ],
              "rename": {
                "param": {
                  "messageId": "message_id"
                }
              },
              "select": {
                "exist": [
                  "email",
                  "message_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 1
            },
            {
              "active": true,
              "args": {},
              "method": "GET",
              "orig": "/temp-mail/domains",
              "parts": [
                "temp-mail",
                "domains"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 2
            }
          ],
          "key$": "load"
        },
        "remove": {
          "input": "data",
          "name": "remove",
          "points": [
            {
              "active": true,
              "args": {
                "params": [
                  {
                    "active": true,
                    "kind": "param",
                    "name": "email",
                    "orig": "email",
                    "reqd": true,
                    "type": "`$STRING`",
                    "index$": 0
                  }
                ]
              },
              "method": "DELETE",
              "orig": "/temp-mail/{email}/delete",
              "parts": [
                "temp-mail",
                "{email}",
                "delete"
              ],
              "select": {
                "exist": [
                  "email"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "index$": 0
            }
          ],
          "key$": "remove"
        }
      },
      "relations": {
        "ancestors": [
          [
            "temp_mail"
          ],
          [
            "temp_mail",
            "message"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config
}

