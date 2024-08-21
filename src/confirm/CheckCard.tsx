import { Star } from '@phosphor-icons/react'
import { Checkbox, Form } from 'antd'
const CheckCard = () => {
  return (
    <><Form.Item
          name="checkbox1"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please agree to this term.' }]}>
          <Checkbox>
              Ndemeza ko nasomye kandi numvishe neza amategeko n’amabwiriza ndetse n’ibindi bijyanye na serivisi yo kuguranirwa telefoni (yasome neza)
          </Checkbox>
      </Form.Item><div className="flex w-full">
              <Star className="text-red-500 my-auto justify-center" />
              <p className="ml-2">Soma amategeko n’amabwiriza agenga ibijyanye no kuguranirwa telefoni mu gihe utagishaka iyo ufite</p>
          </div></>
  )
}

export default CheckCard