import './style.css';
import { colorPicker, getContrastColor } from '../../color_utils';

const Move = (props) => {
    return (
        <tr className="pokemon-move">
            <td>{props.name}</td>
            <td>
                <button style={{backgroundColor:colorPicker(props.type)}}>
                    <font color={getContrastColor(props.type)}>{props.type}</font>
                </button>
            </td>
        </tr>
    )
}

export default Move;