import { Checkbox, Form } from 'antd'
import { Link } from 'react-router-dom'
const CheckCard = () => {
  return (
    <><Form.Item
      name="checkbox1"
      valuePropName="checked"
      rules={[{ required: true, message: 'Please agree to this term.' }]}>
      <Checkbox>
        Ndemeza ko nasomye kandi numvishe neza amategeko n’amabwiriza ndetse n’ibindi bijyanye na serivisi yo kuguranirwa telefoni <Link className='u underline-offset-1 text-blue-700' to={'/amategeko-agenga-kompras'}>(yasome neza)</Link>
      </Checkbox>
    </Form.Item></>
  )
}

export default CheckCard