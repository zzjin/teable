export const TABLE_PROMPT = `
openapi: 3.0.0
paths:
  /api/table:
    post:
      operationId: TableController_createTable
      summary: Create table
      parameters: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateTableRo'
      responses:
        '201':
          description: The Table has been successfully created.
        '403':
          description: Forbidden.
      tags:
        - table
info:
  title: Teable App
  description: Manage Data as easy as drink a cup of tea
  version: 1.0.0
  contact: {}
tags: []
servers: []
components:
  schemas:
    SingleSelectOption:
      type: object
      properties:
        name:
          type: string
          example: light
          description: Name of the option.
        color:
          type: string
          enum:
            - blueBright
            - blueDark1
            - blueLight1
            - blueLight2
            - blue
            - cyanBright
            - cyanDark1
            - cyanLight1
            - cyanLight2
            - cyan
            - grayBright
            - grayDark1
            - grayLight1
            - grayLight2
            - gray
            - greenBright
            - greenDark1
            - greenLight1
            - greenLight2
            - green
            - orangeBright
            - orangeDark1
            - orangeLight1
            - orangeLight2
            - orange
            - pinkBright
            - pinkDark1
            - pinkLight1
            - pinkLight2
            - pink
            - purpleBright
            - purpleDark1
            - purpleLight1
            - purpleLight2
            - purple
            - redBright
            - redDark1
            - redLight1
            - redLight2
            - red
            - tealBright
            - tealDark1
            - tealLight1
            - tealLight2
            - teal
            - yellowBright
            - yellowDark1
            - yellowLight1
            - yellowLight2
            - yellow
          example: yellow
          description: The color of the option.
      required:
        - name
        - color
    SingleSelectOptionsDto:
      type: object
      properties:
        choices:
          description: 'The display precision of the number, caveat: the precision is just a formatter, it dose not effect the storing value of the record'
          type: array
          items:
            $ref: '#/components/schemas/SingleSelectOption'
      required:
        - choices
    NumberOptionsDto:
      type: object
      properties:
        precision:
          type: number
          example: 2
          description: 'the display precision of the number, caveat: the precision is just a formatter, it dose not effect the storing value of the record'
      required:
        - precision
    CreateFieldRo:
      type: object
      properties:
        name:
          type: string
          description: The name of the field.
          example: Single Select
        description:
          type: string
          description: The description of the field.
          example: this is a summary
        type:
          type: string
          description: The types supported by teable.
          example: singleSelect
        options:
          description: The configuration options of the field. The structure of the field's options depend on the field's type.
          oneOf:
            - $ref: '#/components/schemas/SingleSelectOptionsDto'
            - $ref: '#/components/schemas/NumberOptionsDto'
        defaultValue:
          type: string
          description: The defaultValue of the field. The datatype of the value depends on the field type.
          example:
            name: light
            color: yellow
        isPrimary:
          type: boolean
          description: Set if it is a primary field
        notNull:
          type: boolean
          description: Set if value are not allowed to be null, not all fields support this option.
          example: false
        unique:
          type: boolean
          description: Set if value are not allowed to be duplicated, not all fields support this option.
          example: false
      required:
        - name
        - description
        - type
    GridViewOptionsDto:
      type: object
      properties:
        rowHeight:
          type: string
          example: short
          default: short
          description: The row height level of row in view
      required:
        - rowHeight
    KanbanViewOptionsDto:
      type: object
      properties:
        groupingFieldId:
          type: string
          example: fldXXXXXXX
          description: The field id of the board group.
    CreateViewRo:
      type: object
      properties:
        name:
          type: string
          description: The name of the view.
          example: Grid view
        description:
          type: string
          description: The description of the view.
          example: this view show all records
        type:
          type: string
          description: The view type supported by teable.
          example: grid
        filter:
          type: object
          description: The filter config of the view.
        sort:
          type: object
          description: The sort config of the view.
        group:
          type: object
          description: The group config of the view.
        options:
          description: The configuration options of the View. The structure of the View's options depend on the View's type.
          oneOf:
            - $ref: '#/components/schemas/GridViewOptionsDto'
            - $ref: '#/components/schemas/KanbanViewOptionsDto'
      required:
        - name
        - description
        - type
    CreateRecordsDto:
      type: object
      properties:
        fieldKeyType:
          type: string
          description: Define the field key type when create and return records.
          example: id
          default: id
        records:
          description: Array of objects with a fields key mapping fieldId or field name to value for that field.
          example:
            - fields:
                fldXXXXXXXXXXXXXXX: text value
          type: array
          items:
            type: string
      required:
        - records
    CreateTableRo:
      type: object
      properties:
        name:
          type: string
          description: The name of the table.
          example: table1
        description:
          type: string
          description: The description of the table.
          example: my favorite songs
        icon:
          type: string
          description: The icon of the table.
        fields:
          description: The fields of the table. If it is empty, 3 fields include SingleLineText, Number, SingleSelect will be generated by default.
          type: array
          items:
            $ref: '#/components/schemas/CreateFieldRo'
        views:
          description: The views of the table. If it is empty, a grid view will be generated by default.
          type: array
          items:
            $ref: '#/components/schemas/CreateViewRo'
        rows:
          description: The record data of the table. If it is empty, 3 empty records will be generated by default.
          allOf:
            - $ref: '#/components/schemas/CreateRecordsDto'
      required:
        - name
`;