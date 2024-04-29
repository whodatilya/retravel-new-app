import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'

export const defaultValidator = () => {
  return toTypedSchema(
    z.unknown({
      required_error: 'Поле обязательно для заполнения',
      invalid_type_error: 'Поле обязательно для заполнения'
    })
  )
}
